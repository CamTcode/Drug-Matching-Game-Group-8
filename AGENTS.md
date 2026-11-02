# AI Agent Instructions

## Project Overview

We are building a customizable, game-based study application for PharmD students preparing for their final licensing exam. The game helps students practice relationships between drug names, mechanisms of action, and disease uses.

The planned rollout is Spring 2027, ahead of the Summer 2027 licensing exam.

## Project Status

This project is starting from the ground up. There is currently no established application implementation or development workflow. Inspect the repository before assuming that a file, feature, tool, command, or convention already exists.

Confirmed project priorities:

- The application must work across platforms and support mobile devices.
- The result should be successfully deployed and have an interface that its intended maintainer can update.
- The game should be customizable for different study needs.

The programming language, framework, database, hosting platform, deployment process, and automated checks have not yet been finalized. Do not present guesses about them as team decisions.

## Core Product Requirements

### Matching Game

- Let a learner choose between two and four information columns for a matching activity.
- The four planned information types are generic drug name, trade or brand name, mechanism of action, and disease use.
- Let learners choose which information they want to study and provide simpler and more challenging matching modes.
- Generate each question without duplicate answers within that question.

### Drug Information

- Distinguish primary uses from off-label uses when that information is available and verified.
- Preserve the relationships between drug records, names, mechanisms, and uses when generating matching questions.
- Do not invent drug information. Flag unknown or conflicting information for verification against sources approved by the team or project partner.

### Administration and Data Updates

- Provide an editable way for a non-technical user to maintain drug information.
- An administrative page and bulk CSV import are possibilities to investigate. Confirm the expected scope and import behavior with the team or project partner before treating them as finalized requirements.

## Current Project Decisions and Open Questions

Confirmed:

- Cross-platform operation and mobile capability are required.
- The intended outcome is a deployed game with an updateable interface.

Still to be decided and documented once agreed:

- Application stack and architecture.
- Database and drug-data source and maintenance process.
- Hosting, deployment, and access ownership.
- Repository branch and pull-request rules.
- Test, lint, security, and continuous-integration checks.
- CSV import requirements and the exact administrative workflow.

Do not silently make these decisions on behalf of the team. When a decision is needed, offer a small number of reasonable options, explain the trade-offs briefly, and ask the team or partner when the decision affects project scope, security, data, architecture, or deployment.

## Default Development Workflow

Use this as the initial team workflow until the team documents a different one in `CONTRIBUTING.md`. Do not assume that all repository settings or automation described below already exist.

1. **Inspect first.** Read the relevant files and documentation, check the repository status, and identify the existing stack and commands before changing anything.
2. **Understand the task.** Follow the issue or task description. If an important requirement is unclear, state the uncertainty before making a consequential assumption.
3. **Keep changes focused.** Make the smallest coherent change that addresses the task. Avoid unrelated rewrites, unnecessary dependencies, and premature architecture.
4. **Use a separate branch.** When working with Git, make changes on a task-specific branch rather than directly on the default branch. Check the repository's actual default branch and existing rules first.
5. **Check your work.** Run relevant tests, formatting, lint, type checks, or other commands that actually exist in the repository. Do not invent command names or claim that a check passed unless you ran it and it passed.
6. **Handle missing checks honestly.** If the project has no relevant tests or automation yet, explain that limitation and suggest a practical check to add. Do not install a new tool or introduce a large testing setup without considering the team's current plan.
7. **Update documentation.** Update setup or feature documentation when a change makes it inaccurate or when new instructions are needed.
8. **Review the diff.** Before presenting work as ready, inspect the changed files for accidental edits, unrelated changes, secrets, obvious errors, and requirements that were missed.
9. **Summarize clearly.** Report what changed, which checks were actually run and their results, and any remaining limitations or decisions needed.
10. **Use the team's review process.** Once established, follow the branch, pull-request, review, and merge rules in `CONTRIBUTING.md`. Until then, propose changes for teammate review rather than assuming that work should be merged automatically.

## General Coding Practices

- Prefer clear, readable, maintainable code over clever or unnecessarily complex solutions.
- Follow conventions already present in the repository. If none exist, use the conventions of the chosen language and framework and document the team's decision when appropriate.
- Keep application logic, user-interface code, and data access reasonably organized for the chosen stack. Do not impose a specific architecture before the stack is selected.
- Consider small screens, touch input, accessibility, and readable text when designing the game interface.
- Use representative example data for development. Clearly label mock or sample records so they are not mistaken for verified drug data.
- Avoid duplicate matching choices within a question and account for drugs that have multiple trade names or disease uses.
- Do not claim the application is cross-platform, accessible, secure, or deployable without checking the relevant behavior.

## AI Use, Drug Information, and Confidentiality

- Follow the team's and project partner's rules for approved AI tools and permitted data sharing.
- Never put passwords, API keys, access tokens, or other credentials in prompts, source code, issues, commits, or documentation.
- Do not send non-public partner information, restricted datasets, private meeting content, or other confidential materials to an external AI tool unless explicitly permitted.
- If it is unclear whether a tool may receive particular information, do not paste it. Ask the team or project partner first.
- Treat AI-generated drug information as unverified until checked against appropriate sources agreed on by the team.
- Keep the application educational. Do not present game content as personalized medical advice.

## Documentation to Add as the Project Takes Shape

The following information is not yet available or finalized. Add it when the team makes the relevant decisions or the implementation exists.

The AI Coordinator is responsible for tracking these gaps and keeping this file current.

- Chosen stack, directory structure, and architecture.
- Exact setup instructions and commands to run the application locally.
- Actual commands for tests, formatting, linting, and type checks.
- How the database is structured and how drug information is verified and updated.
- The deployment target, release procedure, and who controls required accounts.

## Keeping These Instructions Current

Update this file when the team makes a confirmed technical or process decision, establishes an important convention, or discovers a constraint that AI tools need to follow.

Keep instructions accurate and concise. If this file conflicts with a newer documented team or partner decision, flag the conflict and ask the team to resolve it instead of silently choosing one.
