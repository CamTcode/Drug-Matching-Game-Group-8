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

React and TypeScript for the app, Vitest for tests, and Supabase for the study database.

## How it works

1. **Menu:** pick at least two categories (Generic Name, Trade Name, Disease treated, Pathway targeted), then press Play.
2. **Game:** each selected category appears as a column of five tiles. Click a tile to select it, and click again to deselect it. Quit returns to the menu.

Tile contents are placeholders until the database is connected.

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

Run `npm run dev` to open the category selection screen locally.

### Lint and test

```bash
npm run lint       # check code style
npm run lint:fix   # auto-fix lint issues
npm test           # run all tests once
```

CI runs lint and tests on every pull request. See `.github/workflows/`.

### Backend

For a live read check, create a `.env.local` file in the project folder.
Set `VITE_SUPABASE_URL` to the team's Supabase project URL and
`VITE_SUPABASE_PUBLISHABLE_KEY` to the project's publishable key.
Keep the file out of Git and use the publishable key for this check.

```bash
npm run check:supabase
```

A passing check prints one drug from the hosted project, including its
mechanism, trade names, and disease uses. It keeps the connection settings
out of the output. Run it separately from `npm test`, which uses local
fixtures and works offline.

The standalone question generator draft and its tests live in
`src/question.ts` and `src/question.test.ts`. Run
`npm test -- src/question.test.ts --reporter=verbose` to see the test names
and a study term with four distinct card options and one correct match.
The tests use five drug records copied from the supplied sample CSV and run
offline.

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
