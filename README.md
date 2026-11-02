# Drug-Matching-Game-Group-8

Customizable Drug-Matching Study Game for PharmD Licensing Exam Preparation:
a fast-paced, game-based study app where players match drug information
across two to four columns: **generic name**, **trade name**,
**mechanism of action**, and **disease use**.

> Status: Checkpoint 1 (scaffold). The game itself is not implemented yet.

Details: [docs/requirements.md](docs/requirements.md) and
[docs/design.md](docs/design.md).

This is an educational tool, not medical advice. Any drug data used in
development is sample data and has not been verified.

## Tech stack

React and TypeScript for the app, Vitest for tests. Supabase is the planned
backend and is not set up yet.

## Quickstart

### Prerequisites

- Node.js 22.22.1 or newer, and npm (included with Node)

### Run it

```bash
git clone https://github.com/CamTcode/Drug-Matching-Game-Group-8.git
cd Drug-Matching-Game-Group-8
npm install      # also installs the Husky pre-commit hook
npm run lint     # runs ESLint
npm test         # runs the Vitest suite
```

There is no dev server yet. This section will be updated when the app
scaffold is merged.

### Lint and test

```bash
npm run lint       # check code style
npm run lint:fix   # auto-fix lint issues
npm test           # run all tests once
```

CI runs lint and tests on every pull request. See `.github/workflows/`.

### Backend

Supabase is not set up yet, so there are no environment variables or
database steps. This section will be updated when the project is created.

## Project layout

```
.github/workflows/   CI workflows (lint.yml, test.yml)
docs/                Requirements, design, and risk register
src/                 Application source and tests
eslint.config.mjs    ESLint configuration
vitest.config.ts     Vitest configuration
```

## Deployment

The hosting platform is undecided. The decision, its owner, and its due
date are tracked in [docs/risks.md](docs/risks.md), and the plan will be in
the Deployment section of [docs/design.md](docs/design.md).

## Rollback

Revert the merge commit on `main` and push through a pull request. The
staging plan is tracked in [docs/risks.md](docs/risks.md), landing by [DATE].

## Contributing

- [CONTRIBUTING.md](CONTRIBUTING.md): branch, commit, pull request, and
  review rules.
- [AGENTS.md](AGENTS.md): instructions for AI coding tools working in
  this repo.
