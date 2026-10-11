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

For a branch to be considered finalized, it must complete this checklist.
- Pass the projects automatic linter. A CI linting job will automatically check the code when a pull request is opened, which will be made by the quality owner. 
- Has a test file with 80% coverage, which will be verified by the test suite and coverage tool. 
- Is peer reviewed by a Quality owner with a pull request and follows the pull request guidelines. 
- Edits the README file to include a small explanation of how to use the files in your branch. Checked by the reviewer. 
- Project manager reviews that it follows the direction of the project and what the partner wants.
- Gets reviewed by AI coordinators so that it follows AI guidelines.

This checklist must be performed before any commits to main, to assure proper testing and quality. If a branch cannot follow any of these steps it must be listed as to why and recorded.

The Automatic linter, coverage tool, and test suite will be finished by Sprint 1, with these owners assigned to complete them.
Linter: Project Manager
Coverage tool: AI Coordinator
Test Suite: Quality Owner

## Contribution Norm

A contribution can be various things, with examples listed below.
- A new feature: Must follow the definition of done checklist
- A bug fix or extra testing: Logged in either Issues or as a pull request
- Document, style, or formatting changes: Discussed in your communication channel, and making sure all other files follow this change
- Code reviews: Logged in Github

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

To be determined and made, when we have a more concrete foundation of where we want the project to go. Will be written by project manager by Sprint 1. 

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
