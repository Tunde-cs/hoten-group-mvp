import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as rds from 'aws-cdk-lib/aws-rds';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as apprunner from 'aws-cdk-lib/aws-apprunner';
import * as ecrAssets from 'aws-cdk-lib/aws-ecr-assets';
import { Platform } from 'aws-cdk-lib/aws-ecr-assets';
import * as path from 'path';
import * as wafv2 from 'aws-cdk-lib/aws-wafv2';

export class BackendStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const frontendUrl = new cdk.CfnParameter(this, 'FrontendUrl', {
      type: 'String',
      default: 'https://hotengroup.com',
    });

    const frontendProdWwwUrl = new cdk.CfnParameter(this, 'FrontendProdWwwUrl', {
      type: 'String',
      default: 'https://www.hotengroup.com',
    });

    const frontendPreviewUrl = new cdk.CfnParameter(this, 'FrontendPreviewUrl', {
      type: 'String',
      default: '',
    });

    const databaseUrl = new cdk.CfnParameter(this, 'DatabaseUrl', {
      type: 'String',
      noEcho: true,
    });

    const secretKey = new cdk.CfnParameter(this, 'SecretKey', {
      type: 'String',
      noEcho: true,
    });

    const vpc = new ec2.Vpc(this, 'HotenGroupVpc', {
      ipAddresses: ec2.IpAddresses.cidr('10.20.0.0/16'),
      maxAzs: 2,
      natGateways: 0,
      subnetConfiguration: [
        {
          name: 'public',
          subnetType: ec2.SubnetType.PUBLIC,
          cidrMask: 24,
        },
        {
          name: 'db',
          subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
          cidrMask: 24,
        },
      ],
    });

    const dbSecurityGroup = new ec2.SecurityGroup(this, 'HotenGroupDbSecurityGroup', {
      vpc,
      description: 'Security group for Hoten Group PostgreSQL',
      allowAllOutbound: true,
    });

    const appRunnerSecurityGroup = new ec2.SecurityGroup(this, 'HotenGroupAppRunnerSecurityGroup', {
      vpc,
      description: 'Security group for Hoten Group App Runner VPC connector',
      allowAllOutbound: true,
    });

    dbSecurityGroup.addIngressRule(
      appRunnerSecurityGroup,
      ec2.Port.tcp(5432),
      'Allow App Runner to connect to PostgreSQL'
    );

    const db = new rds.DatabaseInstance(this, 'HotenGroupPostgres', {
      engine: rds.DatabaseInstanceEngine.postgres({
        version: rds.PostgresEngineVersion.VER_16_3,
      }),
      instanceType: ec2.InstanceType.of(
        ec2.InstanceClass.BURSTABLE3,
        ec2.InstanceSize.MICRO
      ),
      vpc,
      vpcSubnets: {
        subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
      },
      publiclyAccessible: false,
      securityGroups: [dbSecurityGroup],
      credentials: rds.Credentials.fromGeneratedSecret('postgres'),
      allocatedStorage: 20,
      storageType: rds.StorageType.GP3,
      databaseName: 'hotengroup',
      multiAz: false,
      deletionProtection: false,
      backupRetention: cdk.Duration.days(7),
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      deleteAutomatedBackups: true,
    });

    const backendImage = new ecrAssets.DockerImageAsset(this, 'BackendImage', {
      directory: path.join(__dirname, '../../backend'),
      platform: Platform.LINUX_AMD64,
    });

    const appRunnerEcrAccessRole = new iam.Role(this, 'AppRunnerEcrAccessRole', {
      assumedBy: new iam.ServicePrincipal('build.apprunner.amazonaws.com'),
      managedPolicies: [
        iam.ManagedPolicy.fromManagedPolicyArn(
          this,
          'AppRunnerEcrManagedPolicy',
          'arn:aws:iam::aws:policy/service-role/AWSAppRunnerServicePolicyForECRAccess'
        ),
      ],
    });

    const vpcConnector = new apprunner.CfnVpcConnector(this, 'HotenGroupVpcConnector', {
      vpcConnectorName: 'hotengroup-vpc-connector',
      subnets: vpc.isolatedSubnets.map((subnet) => subnet.subnetId),
      securityGroups: [appRunnerSecurityGroup.securityGroupId],
    });

    const service = new apprunner.CfnService(this, 'HotenGroupApiService', {
      serviceName: 'hotengroup-api',
      sourceConfiguration: {
        authenticationConfiguration: {
          accessRoleArn: appRunnerEcrAccessRole.roleArn,
        },
        autoDeploymentsEnabled: true,
        imageRepository: {
          imageIdentifier: backendImage.imageUri,
          imageRepositoryType: 'ECR',
          imageConfiguration: {
            port: '8001',
            runtimeEnvironmentVariables: [
              { name: 'APP_NAME', value: 'Hoten Group API' },
              { name: 'APP_ENV', value: 'production' },
              { name: 'DEBUG', value: 'false' },
              { name: 'API_V1_PREFIX', value: '/api/v1' },
              { name: 'FRONTEND_URL', value: frontendUrl.valueAsString },
              { name: 'FRONTEND_PROD_URL', value: frontendUrl.valueAsString },
              { name: 'FRONTEND_PROD_WWW_URL', value: frontendProdWwwUrl.valueAsString },
              { name: 'FRONTEND_PREVIEW_URL', value: frontendPreviewUrl.valueAsString },
              { name: 'SECRET_KEY', value: secretKey.valueAsString },
              { name: 'ACCESS_TOKEN_EXPIRE_MINUTES', value: '60' },
              { name: 'DATABASE_URL', value: databaseUrl.valueAsString },
            ],
          },
        },
      },
      networkConfiguration: {
        egressConfiguration: {
          egressType: 'VPC',
          vpcConnectorArn: vpcConnector.attrVpcConnectorArn,
        },
      },
      healthCheckConfiguration: {
        protocol: 'HTTP',
        path: '/api/v1/dashboard/health',
        healthyThreshold: 1,
        unhealthyThreshold: 5,
        interval: 10,
        timeout: 5,
      },
    });

    service.node.addDependency(appRunnerEcrAccessRole);
    service.node.addDependency(backendImage);
    service.node.addDependency(vpcConnector);
    service.node.addDependency(db);

    const apiWebAcl = new wafv2.CfnWebACL(this, 'HotenGroupApiWebAcl', {
      name: 'hotengroup-api-web-acl',
      scope: 'REGIONAL',
      defaultAction: { allow: {} },
      visibilityConfig: {
        cloudWatchMetricsEnabled: true,
        metricName: 'hotengroup-api-web-acl',
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
            metricName: 'aws-amazon-ip-reputation',
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
            metricName: 'aws-known-bad-inputs',
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
            metricName: 'aws-common-rule-set',
            sampledRequestsEnabled: true,
          },
        },
        {
          name: 'ApiRateLimit',
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
            metricName: 'api-rate-limit',
            sampledRequestsEnabled: true,
          },
        },
      ],
    });

    const apiWebAclAssociation = new wafv2.CfnWebACLAssociation(this, 'HotenGroupApiWebAclAssociation', {
      resourceArn: service.attrServiceArn,
      webAclArn: apiWebAcl.attrArn,
    });

    apiWebAclAssociation.node.addDependency(service);
    apiWebAclAssociation.node.addDependency(apiWebAcl);

    new cdk.CfnOutput(this, 'ApiWebAclArn', {
      value: apiWebAcl.attrArn,
    });

    new cdk.CfnOutput(this, 'VpcId', {
      value: vpc.vpcId,
    });

    new cdk.CfnOutput(this, 'DbEndpoint', {
      value: db.instanceEndpoint.hostname,
    });

    new cdk.CfnOutput(this, 'DbPort', {
      value: db.instanceEndpoint.port.toString(),
    });

    new cdk.CfnOutput(this, 'DbSecretArn', {
      value: db.secret!.secretArn,
    });

    new cdk.CfnOutput(this, 'AppRunnerServiceUrl', {
      value: `https://${service.attrServiceUrl}`,
    });
  }
}