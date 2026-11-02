# Contributing Guide

How to set up, code, test, review, and release so contributions meet our Definition of Done.
A lot of this will be changed and edited as we get a more cohesive idea/structure of what we want to do, as we are building this from scratch.  

## Code of Conduct

Everyone must communicate with each other respectfully, maintain a professional and collaborative environment. Any issues between team members should be addressed so they can be solved as a team. If it starts to get out of hand you should contact your designated TA, or Professor while keeping your partner informed of what's going on. 

## Getting Started

This will be filled out more later by our teams project manager, since we are making it from scratch we aren't 100% sure about how its going to be set up, especially since its more open ended. 

## Branching & Workflow

We will be using a trunk-based workflow, as it allows team members to work more asynchronously. Each team member will work on their own branch, pulling from main after any recent changes, after finishing their feature on their branch they will then make a pull request so it can be reviewed by your teams designated Quality owner, and finally be pushed to main. Changes to main should be done solely with a merge, while rebases can be used on your own branch/branches.

The general process to follow is:
- Create your own branch with the name representing your feature
- Pull from main so it follows the latest changes
- Make changes locally on your branch
- Commit changes to your branch following the commit messages guide below
- Create a pull request once finished
- Quality owner reviews the pull request for any issues
- Merge your branch into main

Conventions on how to name your branch can be found here:
| Type | Description | Example |
|------|-------------|---------|
| Feat | A new feature | feat/pause-button |
| Test | Adding tests or fixing tests | test/score-calculation |
| Fix | Bug fix | fix/title-not-showing |
| Docs | Adding documents or changes to one | docs/update-readme |
| Style | Changes to the style/format | style/add-header-credits |


## Issues & Planning

Issues can be addressed and logged in the 'Issues' tab in this repo. Provide a cohesive title of the issue, as well as a more in depth description. Include a proper label based on the intensity of the issue, and who you think is applicable to help. Issues should also be notified through a communication channel of your choice, but addressed in the repository.  

## Commit Messages

Follow a conventional commits format, with the type of commit in front, then a brief description after. Some examples can be found below as well as the general format of a commit. 

| Type | Description | Example |
|------|-------------|---------|
| Feat | A new feature | feat: added pause button to menu |
| Test | Adding tests or fixing tests | test: new test for score calculation |
| Fix | Bug fix | bug: fixed title not showing up |
| Docs | Adding documents or changes to one | docs: edited README for the changes from xxxx branch |
| Style | Changes to the style/format | style: added header with credits |

If none of the listed commit types fit, a team member may create a new type, as long as it follows the example format. They must communicate their reasoning for the new type and the details of what it covers to the rest of the team before using it.

## Code Style, Linting & Formatting

The technology stack has not been finalized. Our client’s previous teams used Unity (C#), so we are evaluating it as our likely option. We will confirm the stack by end of week 4 and update this section when we do. Until then, this is our plan:

- **Automated check (CI):** a GitHub Actions job will run the formatter and linter on every pull request, and a PR cannot merge until it passes. 
- **If we use Unity (C#):** the formatter is `dotnet format` and linting is done with Roslyn analyzers. Config lives in `.editorconfig` at the repository root.
  - Check locally (same command CI runs): `dotnet format --verify-no-changes`
  - Fix locally: `dotnet format`
- **If we choose a different stack:** we will adopt the standard formatter and linter for that language and document the config file locations and commands here.

## Testing

Tests should be held in a separate file using the testing framework (TBD, depending on how we code this it may change, but it will most likely be done with Unittest), to test individual functions. Manual testing can be done by other team members during a review, to ensure that the quality of the project is upheld and that a new feature isn't confusing from a users perspective. 

Each major file should have its own test file, with a coverage threshold of 80%, and new tests should be made for that file whenever a new feature is made, to make sure both parts work cohesively together. 

## Definition of Done

A change is done when every check below passes. This is a shared commitment: the author, the reviewer, and the role owners each have a part. The checks must pass before anything merges to `main`. Branch protection on `main` (see table) is what makes that rule enforceable instead of a matter of memory.

| # | Check | Enforced by | Status | Sprint | Owner |
|---|-------|-------------|--------|--------|-------|
| 1 | Lint and format pass | `.github/workflows/lint.yml`, set as a required status check. Config in `.editorconfig` (Unity/C#: `dotnet format --verify-no-changes`) | Not built yet | 2 | Project Manager |
| 2 | Tests pass | `.github/workflows/test.yml`, set as a required status check. Framework depends on the final stack (Unity: Unity Test Framework/NUnit; otherwise the standard framework for that language) | Not built yet | 2 | Quality Owner |
| 3 | 80% coverage on changed files | Coverage step in `test.yml` that fails below 80% (Unity: Code Coverage package) | Not built yet | 2 | AI Coordinator |
| 4 | No secrets committed | GitHub secret scanning with push protection | Not built yet | 2 | Project Manager |
| 5 | Dependencies checked | `.github/dependabot.yml`, with updates tested before merge (see Security & Secrets) | Not built yet | 2 | Project Manager |
| 6 | Peer review approved | Branch protection on `main`: 1 approving review required, direct pushes blocked | Not built yet | 1 | Project Manager |
| 7 | README, CHANGELOG, and (if direction changes) DIRECTIONS updated | PR template checklist (`.github/pull_request_template.md`), verified by the reviewer | Not built yet | 1 | Quality Owner |
| 8 | Follows project direction and partner needs | PR template checkbox, confirmed by the Project Manager's review | Not built yet | 1 | Project Manager |
| 9 | Follows AI guidelines | PR template checkbox, confirmed by the AI Coordinator's review | Not built yet | 1 | AI Coordinator |
| 10 | Commit messages follow our format | Reviewer checks against the Commit Messages section (a commitlint CI job may be added later) | Manual | n/a | Quality Owner |

**Until the CI gates exist (before Sprint 2):** the reviewer manually runs the formatter, tests, and coverage check locally and records the results in the PR description. Items 6 to 9 are manual checks until the PR template and branch protection are in place.

**Who opens and reviews PRs:** the author opens the PR and fills in the template. The Quality Owner reviews it. If the Quality Owner is the author, a different team member reviews it, so no one approves their own work.

**If a check cannot be met:** the author lists which check and why in the PR description, and the reviewer records the decision there. It is not skipped silently.

## Contribution Norm

**The norm:** every team member owns at least one piece of accepted work in every sprint. This is what feeds the contribution lines in Sprint Notes, so we write it as something we will actually follow.

**Where our work lives:** this GitHub repository. Pull requests, Issues, and PR reviews are the record. Work that happens elsewhere (Discord discussions, calls with our partner) counts only once it is logged in an Issue or PR.

**What "accepted" means:**

| Kind of work | Accepted when |
|--------------|---------------|
| New feature | PR merged to `main` after meeting the Definition of Done |
| Bug fix | Issue closed and linked to a merged PR |
| Tests | PR merged that adds or fixes tests, with coverage requirement met |
| Docs, style, or formatting | PR merged after review by someone other than the author (a Discord discussion alone does not count) |
| Code review | Review logged on GitHub on a PR you did not author, with substantive comments or an approval |

**Making the norm workable:**

- **Sizing:** one feature or change per PR, small enough to review in about 30 minutes ✱. If a feature is bigger, split it across several PRs or Issues so each person's contribution is visible.
- **Review turnaround:** reviewers respond within 2 business days. If a PR sits longer, the author pings the reviewer in Discord, then asks the Project Manager to reassign it.
- **Pairing:** pair work is allowed. The pair opens one PR with both names in the description and uses `Co-authored-by:` in the commit, so both people are credited.
- **Mid-sprint check:** at the midpoint of each sprint, the team checks that everyone has an open Issue or PR assigned. If someone is blocked, we adjust scope or pair them with a teammate instead of waiting until the end.
- **Missing the norm:** if someone can't land accepted work in a sprint (illness, blocker), they tell the team before the sprint ends, and the reason is noted in Sprint Notes.

## Pull Requests & Reviews

All code changes should be submitted through a pull request. Extra communication through your designated channel should also be created for large features being added and to make sure all roles give proper input. 

For the person creating a pull request:
- Have a clear title and description, as well as a summary of the feature/changes
- Keep it scoped, it should be one feature or one change. 
- The results of their own test file and the linting checker

For the person reviewing:
- Check that they follow the initial steps for the defintion of done checklist
- That they have ran their code through the lint checker and have a test file
- Create new tests to make sure they didn't miss any major bugs 
- Check they followed the commit style
- Review their README changes to make sure its a proper summary

## CI/CD

To be determined and made, when we have a more concrete foundation of where we want the project to go. Will be written by project manager by Sprint 2. 

## Security & Secrets

Private user info should not be committed to the repository as well as, passwords, keys, and access tokens. Any concerns should be reported privately to the project partner and discussed amongst the team about how to solve the issue. Dependencies should be up to date, and checked before being used. When updating a dependency, it should be tested for compatibility with the current code before being changed to prevent code from breaking. 

Should be edited later by project manager to include scanning tools assigned in the definition of done section. 

## Documentation Expectations

As stated in the definition of done, necessary changes must be made to the `README.md` if a feature is major enough or setup instructions change, as well as adding a summary in `CHANGELOG.md`. If a feature could potentially change the direction of the project it should also be logged in `DIRECTIONS.md`.

## Release Process

We will be using a semantic versioning scheme (v1.0.0.0) for any releases, and tagging a commit with that semantic format as a release. `CHANGELOG.md` will follow this format, and act as a traceable history of our releases. Rollbacks should be done when a major bug in a new release has been found that makes it near unusable, otherwise minor updates should be made to attempt to solve the issue. The team should be notified, restore a previous version, fix the bug and add tests, then release the fixed version. 

Publishing method is to be determined and will be edited in by the project manager in Sprint 2. 

## Support & Contact

Use GitHub Issues for bugs and the Discord channel for general questions. Response time is around 1-2 business days. 

Project Maintainer info:  
Name: Olivia Cleveland  
Email: clevelol@oregonstate.edu  
Discord: https://discord.gg/dVwCYbRMav  
Hours: 9:00am - 10:00pm PST  
