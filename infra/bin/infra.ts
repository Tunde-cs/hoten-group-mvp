#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { BackendStack } from '../lib/infra-stack';
import { FrontendStack } from '../lib/frontend-stack';
import { SecurityStack } from '../lib/security-stack';

const app = new cdk.App();

const env = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION ?? 'us-east-1',
};

const backendStack = new BackendStack(app, 'BackendStack', { env });
const frontendStack = new FrontendStack(app, 'FrontendStack', { env });

new SecurityStack(app, 'SecurityStack', {
  env,
  githubOrg: 'Tunde-cs',
  githubRepo: 'hoten-group-mvp',
  backendWebAclArn: backendStack.apiWebAclArn,
  frontendWebAclArn: frontendStack.frontendWebAclArn,
  frontendBucketName: frontendStack.frontendBucketName,
  frontendDistributionId: frontendStack.frontendDistributionId,
  // notificationEmail: 'your-email@example.com',
});