# Security Policy

Hoten Group MVP may include production-facing application, backend, infrastructure, and deployment workflow code. Treat security-sensitive information carefully.

## Reporting A Vulnerability

Do not open a public GitHub issue for vulnerabilities that expose secrets, private infrastructure details, customer data, authentication bypasses, or exploit instructions.

Report sensitive security concerns privately to the repository owner or Hoten Group LLC maintainer. Include:

- A concise summary of the concern.
- Affected area: frontend, backend, auth, infrastructure, GitHub Actions, deployment, or data access.
- Impact and likelihood.
- Safe reproduction steps, if applicable.
- Suggested remediation, if known.

Do not include passwords, API keys, private keys, production database values, or customer data in the report.

## Public Security Tasks

Use the Security Task issue template only for work that can be discussed publicly without exposing sensitive details.

Examples that may be appropriate for public issues:

- Add missing auth tests.
- Improve secret-handling documentation.
- Tighten deployment role permissions at a high level.
- Add protected environment approval.

Examples that should be handled privately first:

- Active exploit details.
- Exposed secret values.
- Customer or lead data exposure.
- Authentication bypass details.

## Production Security Change Policy

Security changes that affect production must go through a pull request into protected `main`.

Pull requests must pass required CI checks and receive approval before merge.

Production deployment occurs only after merge. Protected environments may require manual approval before deployment proceeds.

Security-sensitive pull requests should include:

- Risk summary.
- Validation plan.
- Deployment impact.
- Rollback plan.
- Confirmation that no secrets are committed.

## Supported Scope

This policy applies to the Hoten Group MVP repository, including:

- Next.js frontend
- FastAPI backend
- AWS CDK infrastructure
- GitHub Actions workflows
- GitHub governance and release process files
