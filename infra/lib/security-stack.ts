import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as logs from 'aws-cdk-lib/aws-logs';
import * as wafv2 from 'aws-cdk-lib/aws-wafv2';
import * as cloudwatch from 'aws-cdk-lib/aws-cloudwatch';
import * as cwActions from 'aws-cdk-lib/aws-cloudwatch-actions';
import * as sns from 'aws-cdk-lib/aws-sns';
import * as subs from 'aws-cdk-lib/aws-sns-subscriptions';

export interface SecurityStackProps extends cdk.StackProps {
  githubOrg: string;
  githubRepo: string;

  frontendWebAclArn: string;
  backendWebAclArn: string;

  frontendBucketName: string;
  frontendDistributionId: string;

  notificationEmail?: string;
}

export class SecurityStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: SecurityStackProps) {
    super(scope, id, props);

    const githubTrustedSubjects = [
      `repo:${props.githubOrg}/${props.githubRepo}:ref:refs/heads/main`,
      `repo:${props.githubOrg}/${props.githubRepo}:environment:production-frontend`,
      `repo:${props.githubOrg}/${props.githubRepo}:environment:production-backend`,
      `repo:${props.githubOrg}/${props.githubRepo}:environment:production-frontend-infra`,
      `repo:${props.githubOrg}/${props.githubRepo}:environment:production-security-infra`,
    ];

    const githubOidcProvider = iam.OpenIdConnectProvider.fromOpenIdConnectProviderArn(
      this,
      'GitHubOidcProvider',
      `arn:aws:iam::${cdk.Stack.of(this).account}:oidc-provider/token.actions.githubusercontent.com`
    );

    const githubPrincipal = new iam.WebIdentityPrincipal(
      githubOidcProvider.openIdConnectProviderArn,
      {
        StringEquals: {
          'token.actions.githubusercontent.com:aud': 'sts.amazonaws.com',
        },
        StringLike: {
          'token.actions.githubusercontent.com:sub': githubTrustedSubjects,
        },
      }
    );

    const frontendDistributionArn = `arn:aws:cloudfront::${cdk.Stack.of(this).account}:distribution/${props.frontendDistributionId}`;

    const alertsTopic = new sns.Topic(this, 'SecurityAlertsTopic', {
      topicName: 'hotengroup-security-alerts',
      displayName: 'Hoten Group Security Alerts',
    });

    if (props.notificationEmail) {
      alertsTopic.addSubscription(
        new subs.EmailSubscription(props.notificationEmail)
      );
    }

    const frontendWafLogGroup = new logs.LogGroup(this, 'FrontendWafLogGroup', {
      logGroupName: 'aws-waf-logs-hoten-frontend',
      retention: logs.RetentionDays.ONE_MONTH,
      removalPolicy: cdk.RemovalPolicy.RETAIN,
    });

    const backendWafLogGroup = new logs.LogGroup(this, 'BackendWafLogGroup', {
      logGroupName: 'aws-waf-logs-hoten-backend',
      retention: logs.RetentionDays.ONE_MONTH,
      removalPolicy: cdk.RemovalPolicy.RETAIN,
    });

    new wafv2.CfnLoggingConfiguration(this, 'FrontendWafLogging', {
      resourceArn: props.frontendWebAclArn,
      logDestinationConfigs: [frontendWafLogGroup.logGroupArn],
    });

    new wafv2.CfnLoggingConfiguration(this, 'BackendWafLogging', {
      resourceArn: props.backendWebAclArn,
      logDestinationConfigs: [backendWafLogGroup.logGroupArn],
    });

    const frontendBlockedRequests = new cloudwatch.Metric({
      namespace: 'AWS/WAFV2',
      metricName: 'BlockedRequests',
      dimensionsMap: {
        Region: 'Global',
        WebACL: 'hotengroup-frontend-web-acl',
        Rule: 'ALL',
      },
      statistic: 'Sum',
      period: cdk.Duration.minutes(5),
    });

    const backendBlockedRequests = new cloudwatch.Metric({
      namespace: 'AWS/WAFV2',
      metricName: 'BlockedRequests',
      dimensionsMap: {
        Region: this.region,
        WebACL: 'hotengroup-api-web-acl',
        Rule: 'ALL',
      },
      statistic: 'Sum',
      period: cdk.Duration.minutes(5),
    });

    const frontendRateLimitBlocks = new cloudwatch.Metric({
      namespace: 'AWS/WAFV2',
      metricName: 'BlockedRequests',
      dimensionsMap: {
        Region: 'Global',
        WebACL: 'hotengroup-frontend-web-acl',
        Rule: 'frontend-rate-limit',
      },
      statistic: 'Sum',
      period: cdk.Duration.minutes(5),
    });

    const backendRateLimitBlocks = new cloudwatch.Metric({
      namespace: 'AWS/WAFV2',
      metricName: 'BlockedRequests',
      dimensionsMap: {
        Region: this.region,
        WebACL: 'hotengroup-api-web-acl',
        Rule: 'api-rate-limit',
      },
      statistic: 'Sum',
      period: cdk.Duration.minutes(5),
    });

    const frontendBlockedAlarm = new cloudwatch.Alarm(this, 'FrontendBlockedRequestsAlarm', {
      alarmName: 'hotengroup-frontend-blocked-requests',
      alarmDescription: 'Spike in blocked requests on the frontend WAF',
      metric: frontendBlockedRequests,
      threshold: 50,
      evaluationPeriods: 1,
      datapointsToAlarm: 1,
      comparisonOperator: cloudwatch.ComparisonOperator.GREATER_THAN_OR_EQUAL_TO_THRESHOLD,
      treatMissingData: cloudwatch.TreatMissingData.NOT_BREACHING,
    });

    const backendBlockedAlarm = new cloudwatch.Alarm(this, 'BackendBlockedRequestsAlarm', {
      alarmName: 'hotengroup-backend-blocked-requests',
      alarmDescription: 'Spike in blocked requests on the backend WAF',
      metric: backendBlockedRequests,
      threshold: 20,
      evaluationPeriods: 1,
      datapointsToAlarm: 1,
      comparisonOperator: cloudwatch.ComparisonOperator.GREATER_THAN_OR_EQUAL_TO_THRESHOLD,
      treatMissingData: cloudwatch.TreatMissingData.NOT_BREACHING,
    });

    const frontendRateLimitAlarm = new cloudwatch.Alarm(this, 'FrontendRateLimitAlarm', {
      alarmName: 'hotengroup-frontend-rate-limit-triggered',
      alarmDescription: 'Frontend WAF rate-limit rule has blocked traffic',
      metric: frontendRateLimitBlocks,
      threshold: 1,
      evaluationPeriods: 1,
      datapointsToAlarm: 1,
      comparisonOperator: cloudwatch.ComparisonOperator.GREATER_THAN_OR_EQUAL_TO_THRESHOLD,
      treatMissingData: cloudwatch.TreatMissingData.NOT_BREACHING,
    });

    const backendRateLimitAlarm = new cloudwatch.Alarm(this, 'BackendRateLimitAlarm', {
      alarmName: 'hotengroup-backend-rate-limit-triggered',
      alarmDescription: 'Backend WAF rate-limit rule has blocked traffic',
      metric: backendRateLimitBlocks,
      threshold: 1,
      evaluationPeriods: 1,
      datapointsToAlarm: 1,
      comparisonOperator: cloudwatch.ComparisonOperator.GREATER_THAN_OR_EQUAL_TO_THRESHOLD,
      treatMissingData: cloudwatch.TreatMissingData.NOT_BREACHING,
    });

    frontendBlockedAlarm.addAlarmAction(new cwActions.SnsAction(alertsTopic));
    backendBlockedAlarm.addAlarmAction(new cwActions.SnsAction(alertsTopic));
    frontendRateLimitAlarm.addAlarmAction(new cwActions.SnsAction(alertsTopic));
    backendRateLimitAlarm.addAlarmAction(new cwActions.SnsAction(alertsTopic));

    const frontendAppRole = new iam.Role(this, 'GitHubActionsHotenFrontendAppRole', {
      roleName: 'GitHubActionsHotenFrontendAppRole',
      assumedBy: githubPrincipal,
      description: 'OIDC role for GitHub Actions frontend app deploys',
    });

    frontendAppRole.addToPolicy(
      new iam.PolicyStatement({
        sid: 'ListFrontendBucket',
        effect: iam.Effect.ALLOW,
        actions: ['s3:ListBucket'],
        resources: [`arn:aws:s3:::${props.frontendBucketName}`],
      })
    );

    frontendAppRole.addToPolicy(
      new iam.PolicyStatement({
        sid: 'ManageFrontendObjects',
        effect: iam.Effect.ALLOW,
        actions: [
          's3:GetObject',
          's3:PutObject',
          's3:DeleteObject',
          's3:AbortMultipartUpload',
          's3:ListBucketMultipartUploads',
        ],
        resources: [`arn:aws:s3:::${props.frontendBucketName}/*`],
      })
    );

    frontendAppRole.addToPolicy(
      new iam.PolicyStatement({
        sid: 'InvalidateFrontendDistribution',
        effect: iam.Effect.ALLOW,
        actions: [
          'cloudfront:CreateInvalidation',
          'cloudfront:GetInvalidation',
          'cloudfront:GetDistribution',
          'cloudfront:GetDistributionConfig',
        ],
        resources: [frontendDistributionArn],
      })
    );

    const backendRole = new iam.Role(this, 'GitHubActionsHotenBackendRole', {
      roleName: 'GitHubActionsHotenBackendRole',
      assumedBy: githubPrincipal,
      description: 'OIDC role for GitHub Actions backend deploys',
    });

    backendRole.addToPolicy(
      new iam.PolicyStatement({
        sid: 'BackendDeployServices',
        effect: iam.Effect.ALLOW,
        actions: [
          'cloudformation:*',
          's3:*',
          'ecr:*',
          'ec2:*',
          'rds:*',
          'apprunner:*',
          'secretsmanager:*',
          'logs:*',
          'cloudwatch:*',
          'wafv2:*',
          'ssm:GetParameter',
          'ssm:GetParameters',
          'ssm:GetParametersByPath',
          'iam:PassRole',
          'iam:GetRole',
          'iam:CreateRole',
          'iam:DeleteRole',
          'iam:UpdateRole',
          'iam:AttachRolePolicy',
          'iam:DetachRolePolicy',
          'iam:PutRolePolicy',
          'iam:DeleteRolePolicy',
          'iam:TagRole',
          'iam:UntagRole',
          'iam:CreateServiceLinkedRole',
        ],
        resources: ['*'],
      })
    );

    const frontendInfraRole = new iam.Role(this, 'GitHubActionsHotenFrontendInfraRole', {
      roleName: 'GitHubActionsHotenFrontendInfraRole',
      assumedBy: githubPrincipal,
      description: 'OIDC role for GitHub Actions frontend infrastructure deploys',
    });

    frontendInfraRole.addToPolicy(
      new iam.PolicyStatement({
        sid: 'FrontendInfraDeployServices',
        effect: iam.Effect.ALLOW,
        actions: [
          'cloudformation:*',
          's3:*',
          'cloudfront:*',
          'route53:*',
          'wafv2:*',
          'logs:*',
          'cloudwatch:*',
          'ssm:GetParameter',
          'ssm:GetParameters',
          'ssm:GetParametersByPath',
          'acm:DescribeCertificate',
          'acm:ListCertificates',
          'iam:CreateServiceLinkedRole',
          'iam:PassRole',
        ],
        resources: ['*'],
      })
    );

    const securityInfraRole = new iam.Role(this, 'GitHubActionsHotenSecurityInfraRole', {
      roleName: 'GitHubActionsHotenSecurityInfraRole',
      assumedBy: githubPrincipal,
      description: 'OIDC role for GitHub Actions security infrastructure deploys',
    });

    securityInfraRole.addToPolicy(
      new iam.PolicyStatement({
        sid: 'SecurityInfraDeployServices',
        effect: iam.Effect.ALLOW,
        actions: [
          'cloudformation:*',
          'iam:GetRole',
          'iam:CreateRole',
          'iam:DeleteRole',
          'iam:UpdateRole',
          'iam:AttachRolePolicy',
          'iam:DetachRolePolicy',
          'iam:PutRolePolicy',
          'iam:DeleteRolePolicy',
          'iam:TagRole',
          'iam:UntagRole',
          'iam:PassRole',
          'iam:CreateServiceLinkedRole',
          'logs:*',
          'cloudwatch:*',
          'wafv2:*',
          'sns:*',
          'ssm:GetParameter',
          'ssm:GetParameters',
          'ssm:GetParametersByPath',
        ],
        resources: ['*'],
      })
    );

    securityInfraRole.addToPolicy(
      new iam.PolicyStatement({
        sid: 'CdkBootstrapBucketAccess',
        effect: iam.Effect.ALLOW,
        actions: [
          's3:ListBucket',
          's3:GetBucketLocation',
          's3:ListBucketMultipartUploads',
        ],
        resources: [
          'arn:aws:s3:::cdk-hnb659fds-assets-629965575535-us-east-1',
        ],
      })
    );

    securityInfraRole.addToPolicy(
      new iam.PolicyStatement({
        sid: 'CdkBootstrapObjectsAccess',
        effect: iam.Effect.ALLOW,
        actions: [
          's3:GetObject',
          's3:PutObject',
          's3:DeleteObject',
          's3:AbortMultipartUpload',
        ],
        resources: [
          'arn:aws:s3:::cdk-hnb659fds-assets-629965575535-us-east-1/*',
        ],
      })
    );

    new cdk.CfnOutput(this, 'FrontendWafLogGroupName', {
      value: frontendWafLogGroup.logGroupName,
    });

    new cdk.CfnOutput(this, 'BackendWafLogGroupName', {
      value: backendWafLogGroup.logGroupName,
    });

    new cdk.CfnOutput(this, 'SecurityAlertsTopicArn', {
      value: alertsTopic.topicArn,
    });

    new cdk.CfnOutput(this, 'FrontendAppRoleArn', {
      value: frontendAppRole.roleArn,
    });

    new cdk.CfnOutput(this, 'BackendRoleArn', {
      value: backendRole.roleArn,
    });

    new cdk.CfnOutput(this, 'FrontendInfraRoleArn', {
      value: frontendInfraRole.roleArn,
    });

    new cdk.CfnOutput(this, 'SecurityInfraRoleArn', {
      value: securityInfraRole.roleArn,
    });
  }
}
