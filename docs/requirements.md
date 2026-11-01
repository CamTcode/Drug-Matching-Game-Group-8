# Requirements

## Problem statement

PharmD students preparing for their final licensing exam need to practice the relationships between drug names, the receptors or pathways drugs target, and the diseases they treat. This project is a customizable, game-based study application for them, to be rolled out in Spring 2027, ahead of the Summer 2027 licensing exam.

## Functional requirements

### Matching game

- **FR-1**: A learner chooses 2, 3, or 4 information categories for a matching activity. The categories are generic drug name, trade (brand) name, disease treated, and receptor or pathway targeted.
  Acceptance: choosing N categories produces a matching activity with exactly N columns, for N = 2, 3, and 4.
- **FR-2**: A learner chooses which of the four categories they want to study.
  Acceptance: a question uses only the categories the learner selected.
- **FR-3**: Each generated question contains no duplicate answers within that question.
  Acceptance: no question contains the same answer twice in any column.
- **FR-4**: The relationships between a drug's records, names, receptors or pathways, and diseases are preserved when a question is generated, so a correct match is always a true relationship.
  Acceptance: for every generated question, each correct pairing exists in the stored drug data.

### Administration and data updates

- **FR-5**: A non-technical person adds, edits, and removes drug information through an administrative page, without a developer.
  Acceptance:  A new drug missing a required field is rejected with the field named. The maintainer completes all three tasks using only the guide, with no developer help.
- **FR-6**: An administrator imports drug information in bulk from a CSV file. *File format and error behavior are open questions.*
  Acceptance: Importing a valid CSV saves every row and shows the count imported, while invalid or duplicate rows are rejected with their row number and reason and leave existing entries unchanged.

## Non-functional requirements

- NFR-1 (Must: a game that doesn't fit a phone screen fails a confirmed priority): Every game screen is fully usable, at widths from 360 px to 1920 px, by touch on a phone and by mouse and keyboard on desktop.
- NFR-2 (Must: Chromium on mobile and desktop is the stated platform target): A full round completes with no errors on the latest stable versions of Chrome and Edge on desktop and the latest Chrome on Android. Open: every iPhone browser uses WebKit, so iOS support needs a decision.
- NFR-3 (Must: a confirmed priority is that the maintainer can update content): A non-technical maintainer adds, edits, removes, and bulk-imports drug entries without code changes or a redeploy.
- NFR-4 (Must: customization is a confirmed priority): A learner starts a round with 2, 3, or 4 categories, and can change categories between rounds without reloading.

## Constraints

- **C-1**: Rollout is targeted for Spring 2027, ahead of the Summer 2027 licensing exam.
- **C-2**: Drug content comes from the project partner.
- **C-3**: The application must be successfully deployed.
- **C-4**: The project starts from nothing. There is no existing application, development workflow, or codebase to inherit.

## Success metrics

- **SM-1: Deployed in time.** A working version is live and reachable by learners by the end of Spring 2027, ahead of the Summer 2027 licensing exam.
- **SM-2: Works on every supported platform.** The full matching game, from choosing categories to finishing a round, completes without error on a Chromium browser on desktop and on a Chromium browser on a phone.
- **SM-3: Maintainer can update content unaided.** The intended maintainer adds a drug, edits a drug, removes a drug, and completes a bulk CSV import without help from a developer.
- **SM-4: Learners can customize their study.** A learner picks 2, 3, and 4 categories, chooses which categories to study, and plays both the simpler and more challenging modes.

## Non-goals

- Game modes other than matching, such as flashcards, timed quizzes, or multiplayer. The partner's confirmed scope is the matching game and its simpler and harder modes.
- Student accounts, sign-in, progress tracking, scores, or leaderboards. The app collects no learner data, so there is no privacy surface to review, and none of the success metrics need it. If this is added later, revisit the privacy section of the design.
- Offline use or installing the game as an app (PWA). Deployment on mobile isn't settled, and the confirmed requirement is that the game works in a mobile browser.
- Native iOS or Android apps. Mobile support comes from a responsive web app. 

## Open questions

| # | Question | Owner | Answer needed by |
|---|----------|-------|------------------|
| 1 | Is iOS supported? Every iPhone browser uses WebKit, so the Chromium target in NFR-2 can't be met there. Is Safari on iOS in scope, or is iOS excluded? | TBD | TBD |
| 2 | Are non Chromium browsers supported? | TBD | TBD |
| 3 | How is the admin page protected so learners can't edit content? | TBD | TBD |
| 4 | What exact date counts as the end of Spring 2027 for SM-1? | TBD | TBD |
