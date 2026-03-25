import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins';
import * as wafv2 from 'aws-cdk-lib/aws-wafv2';
import * as route53 from 'aws-cdk-lib/aws-route53';
import * as targets from 'aws-cdk-lib/aws-route53-targets';
import * as certificatemanager from 'aws-cdk-lib/aws-certificatemanager';

export class FrontendStack extends cdk.Stack {
  public readonly frontendWebAclArn: string;
  public readonly frontendBucketName: string;
  public readonly frontendDistributionId: string;
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const siteBucket = new s3.Bucket(this, 'HotenGroupFrontendBucket', {
      bucketName: `hotengroup-site-v2-${cdk.Stack.of(this).account}`,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      encryption: s3.BucketEncryption.S3_MANAGED,
      versioned: true,
      enforceSSL: true,
      removalPolicy: cdk.RemovalPolicy.RETAIN,
      autoDeleteObjects: false,
    });
    this.frontendBucketName = siteBucket.bucketName;

    const staticRoutesFunction = new cloudfront.Function(this, 'HotenGroupStaticRoutesFunctionV2', {
      functionName: 'hotengroup-static-routes-v2',
      runtime: cloudfront.FunctionRuntime.JS_2_0,
      code: cloudfront.FunctionCode.fromInline(`
    function handler(event) {
        var request = event.request;
        var uri = request.uri;

        // Leave Next metadata/icon routes alone
        if (
            uri === "/icon" ||
            uri.startsWith("/icon/") ||
            uri === "/apple-icon" ||
            uri.startsWith("/apple-icon/") ||
            uri === "/favicon.ico" ||
            uri === "/manifest.webmanifest" ||
            uri === "/robots.txt" ||
            uri === "/sitemap.xml"
        ) {
            return request;
        }

        if (uri === "/") {
            request.uri = "/index.html";
            return request;
        }

        if (!uri.includes(".")) {
            if (uri.endsWith("/")) {
                request.uri = uri + "index.html";
            } else {
                request.uri = uri + "/index.html";
            }
        }

        return request;
    }
          `),
    });

    const frontendWebAcl = new wafv2.CfnWebACL(this, 'HotenGroupFrontendWebAcl', {
      name: 'hotengroup-frontend-web-acl',
      scope: 'CLOUDFRONT',
      defaultAction: { allow: {} },
      visibilityConfig: {
        cloudWatchMetricsEnabled: true,
        metricName: 'hotengroup-frontend-web-acl',
        sampledRequestsEnabled: true,
      },
      rules: [
        {
          name: 'AWS-AmazonIpReputationList',
          priority: 0,
          statement: {
            managedRuleGroupStatement: {
              vendorName: 'AWS',
              name: 'AWSManagedRulesAmazonIpReputationList',
            },
          },
          overrideAction: { none: {} },
          visibilityConfig: {
            cloudWatchMetricsEnabled: true,
            metricName: 'frontend-amazon-ip-reputation',
            sampledRequestsEnabled: true,
          },
        },
        {
          name: 'AWS-KnownBadInputs',
          priority: 1,
          statement: {
            managedRuleGroupStatement: {
              vendorName: 'AWS',
              name: 'AWSManagedRulesKnownBadInputsRuleSet',
            },
          },
          overrideAction: { none: {} },
          visibilityConfig: {
            cloudWatchMetricsEnabled: true,
            metricName: 'frontend-known-bad-inputs',
            sampledRequestsEnabled: true,
          },
        },
        {
          name: 'AWS-CommonRuleSet',
          priority: 2,
          statement: {
            managedRuleGroupStatement: {
              vendorName: 'AWS',
              name: 'AWSManagedRulesCommonRuleSet',
            },
          },
          overrideAction: { none: {} },
          visibilityConfig: {
            cloudWatchMetricsEnabled: true,
            metricName: 'frontend-common-rule-set',
            sampledRequestsEnabled: true,
          },
        },
        {
          name: 'FrontendRateLimit',
          priority: 3,
          statement: {
            rateBasedStatement: {
              limit: 1000,
              aggregateKeyType: 'IP',
            },
          },
          action: { block: {} },
          visibilityConfig: {
            cloudWatchMetricsEnabled: true,
            metricName: 'frontend-rate-limit',
            sampledRequestsEnabled: true,
          },
        },
      ],
    });
    this.frontendWebAclArn = frontendWebAcl.attrArn;

    const siteCertificate = certificatemanager.Certificate.fromCertificateArn(
      this,
      'HotenGroupSiteCertificate',
      'arn:aws:acm:us-east-1:629965575535:certificate/c2289adf-7994-45e6-8236-c7469de9a56a'
    );

    const previewDistribution = new cloudfront.Distribution(this, 'HotenGroupFrontendDistribution', {
      defaultRootObject: 'index.html',
      priceClass: cloudfront.PriceClass.PRICE_CLASS_ALL,
      minimumProtocolVersion: cloudfront.SecurityPolicyProtocol.TLS_V1_2_2021,
      certificate: siteCertificate,
      domainNames: ['hotengroup.com', 'www.hotengroup.com'],
      webAclId: frontendWebAcl.attrArn,
      defaultBehavior: {
        origin: origins.S3BucketOrigin.withOriginAccessControl(siteBucket),
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        allowedMethods: cloudfront.AllowedMethods.ALLOW_GET_HEAD,
        cachePolicy: cloudfront.CachePolicy.CACHING_OPTIMIZED,
        compress: true,
        functionAssociations: [
          {
            function: staticRoutesFunction,
            eventType: cloudfront.FunctionEventType.VIEWER_REQUEST,
          },
        ],
      },
    });
    this.frontendDistributionId = previewDistribution.distributionId;

    // Route 53 public hosted zone for hotengroup.com.
    // DNS records now point to the new frontend distribution.
    const hostedZone = new route53.HostedZone(this, 'HotenGroupHostedZone', {
      zoneName: 'hotengroup.com',
      comment: 'Route 53 public hosted zone for Hoten Group',
    });

    new route53.ARecord(this, 'RootAliasA', {
      zone: hostedZone,
      target: route53.RecordTarget.fromAlias(
        new targets.CloudFrontTarget(previewDistribution)
      ),
    });

    new route53.AaaaRecord(this, 'RootAliasAAAA', {
      zone: hostedZone,
      target: route53.RecordTarget.fromAlias(
        new targets.CloudFrontTarget(previewDistribution)
      ),
    });

    new route53.ARecord(this, 'WwwAliasA', {
      zone: hostedZone,
      recordName: 'www',
      target: route53.RecordTarget.fromAlias(
        new targets.CloudFrontTarget(previewDistribution)
      ),
    });

    new route53.AaaaRecord(this, 'WwwAliasAAAA', {
      zone: hostedZone,
      recordName: 'www',
      target: route53.RecordTarget.fromAlias(
        new targets.CloudFrontTarget(previewDistribution)
      ),
    });

    new cdk.CfnOutput(this, 'FrontendBucketName', {
      value: siteBucket.bucketName,
    });

    new cdk.CfnOutput(this, 'FrontendDistributionId', {
      value: previewDistribution.distributionId,
    });

    new cdk.CfnOutput(this, 'FrontendDistributionDomainName', {
      value: previewDistribution.domainName,
    });

    new cdk.CfnOutput(this, 'FrontendWebAclArn', {
      value: frontendWebAcl.attrArn,
    });

    new cdk.CfnOutput(this, 'HostedZoneId', {
      value: hostedZone.hostedZoneId,
    });

    new cdk.CfnOutput(this, 'HostedZoneNameServers', {
      value: cdk.Fn.join(', ', hostedZone.hostedZoneNameServers ?? []),
    });
  }
}