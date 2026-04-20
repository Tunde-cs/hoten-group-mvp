# Contributing To Hoten Group MVP

Hoten Group MVP is an existing production-shaped repository. Changes should be small, reviewed, and designed to preserve current production behavior unless an issue explicitly approves a behavior change.

## Production Change Policy

All production changes must go through a pull request into protected `main`.

Pull requests must pass required CI checks and receive approval before merge.

Production deployment occurs only after merge to `main`. Protected environments may require manual approval before deployment proceeds.

Do not commit secrets, passwords, API keys, private keys, production data, or customer data.

## Branch Naming

Use short issue-based branch names:

- `feature/<issue-number>-short-name`
- `fix/<issue-number>-short-name`
- `chore/<issue-number>-short-name`
- `infra/<issue-number>-short-name`
- `docs/<issue-number>-short-name`
- `hotfix/<issue-number>-short-name`

`main` is the production branch. Avoid direct commits to `main`; branch protection should enforce this once enabled.

## Issue Workflow

Create or select an issue before opening a PR. Use the relevant issue template:

- Bug report
- Feature request
- Infrastructure task
- Security task
- Release task

Each issue should define priority, risk, area, acceptance criteria, dependencies, and deployment impact.

## Pull Request Workflow

Before requesting review:

1. Keep the PR focused on one issue or tightly related set of changes.
2. Complete the PR template.
3. Identify production impact and rollback notes.
4. Run the relevant local checks where possible.
5. Confirm no secrets or production data are included.

Reviewers should verify:

- The change matches the linked issue.
- The acceptance criteria are satisfied.
- Required checks pass.
- Production behavior is preserved unless the issue explicitly approves a behavior change.
- Deployment and rollback notes are clear.

## Local Validation Commands

Frontend:

```bash
npm run lint
npm run build
```

Backend syntax check:

```bash
python3 -m compileall backend/app
```

Infrastructure:

```bash
cd infra
npm run build
npm test
```

Run the checks that match your change area. CI may require additional checks once PR validation workflows are introduced.

## Deployment Expectations

The current deployment model is push/merge-to-`main` with path-filtered GitHub Actions workflows. Merging to `main` can trigger production deployment for the affected area.

Deployment workflows must not be changed casually. Workflow, infrastructure, and security-infrastructure changes should receive careful review and protected environment approval where applicable.

## Hotfixes

Use `hotfix/<issue-number>-short-name` for urgent production fixes. Hotfixes still require a pull request, required checks, approval, and clear rollback notes unless an explicitly documented emergency process allows otherwise.
