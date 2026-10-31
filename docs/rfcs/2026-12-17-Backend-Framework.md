<!-- docs/rfcs/2026-12-17-Backend-Framework.md -->

# RFC: Backend Framework

<!-- Decision record header. Leave Status as "Proposed" until your team decides,  
     before or after the reviews. Then fill in the outcome and the decision date.  
     The document stays where it is; this header is what makes it a record. -->

| Field | Value |  
| --- | --- |  
| Author | Seth Taylor |  
| Date | 2026-10-25 |  
| Status | Proposed |  
| Decision Date | (fill when decided) |  
| Deciders | (who agreed to the outcome) |  
| Superseded By | (link, if applicable) |

## Problem and Context

We are building a customizable, game-based study app for PharmD students getting ready for their final licensing exam. Learners play a matching game with two to four columns (generic name, brand name, mechanism of action, disease use). One decision we have to make is what to use for the backend of the site. We need to decide now because the data model and the admin workflow are the core of the product, and they are costly to change once built. If we do nothing, the project cannot move forward. We expect the scale to be small: hundreds to low thousands of drug records, a few admin editors, and busy periods around exam prep. We do not expect speed to be a deciding factor among the options below.

## Options

### Option A:
Flask is a small Python web framework. It handles routing and requests, and leaves other choices, like the database layer, the admin interface, and login, to separate libraries.

- **Benefits:** Small, easy to learn, and flexible. We pick every part, so there is little extra code we do not need. Python works well for the question-making logic and for reading and checking CSV files.

- **Costs (what we give up):** Flask does not come with an admin interface, user management, or an ORM, so we have to put these together and maintain them ourselves. A good editing experience for non-technical users depends on extensions or custom code that we must build and test. Login, permissions, and CSRF protection are our job to set up correctly.

- **Right choice when:** The team already knows Flask, the admin needs are small, or we want the lightest possible API behind a React frontend.

### Option B:
Django (a full Python web framework) with Postgres. Django comes with an ORM, migrations, login, permissions, and an admin interface that is built for us automatically. We would set up models for drugs, names, mechanisms, and uses, add them to the admin, and add CSV import with the django-import-export package. Django REST Framework could provide a JSON API if we use React, or we could use Django templates.

- **Benefits:** The built-in admin gives a non-technical partner a working edit screen almost right away, with login and permissions by role already included. Model rules (foreign keys, unique values) keep the relationships we need. It is well established and well documented, with strong security by default.

- **Costs (what we give up):** It is bigger and has more fixed ways of doing things than Flask, so it is harder to learn if the team has not used it, and we have to follow its rules. The default admin works but does not look polished. If we use React, we must build and maintain an API layer on top, which repeats some of what templates would have given us.

- **Right choice when:** It is a top priority that a non-technical user can manage the data on their own, and the team is willing to learn how Django works.

### Option C:
Do Nothing. Keep the drug data as plain JSON/CSV files in the repository and ship them with an app that only runs in the browser (for example, React). The question maker runs in the browser, and there is no server.

- **Costs (what we give up):** A non-technical user has no way to edit the data, so every change has to go through a developer and a new release. There is no admin page, no checked CSV import, and nowhere to enforce data quality or record verification status and sources, except in ad hoc file formats. All the data goes to every browser, so we cannot control who sees it. The cost shows up the first time the partner asks for a correction, which will likely happen in the first week of use.

- **Benefits:** The simplest setup possible, with nothing to secure or run on a server.

- **Right choice when:** The data will not change, a developer will always make the edits, and the partner confirms they do not need to edit the data themselves.

## Analysis
**Fit to the data model.** Here is what we need: a drug has several names, one or more mechanisms, and uses marked as primary or off-label, each with a verification status and a source. Both Flask and Django can handle this, and Django's model layer and migrations give it to us by default.

**Admin and CSV import.** Django comes with an admin interface, and CSV import is available through a third-party package. Flask has Flask-Admin as a similar third-party option, but it takes more setup, and the team has to handle more of the login and permissions work.

**Complexity and maintainability.** Flask has fewer ideas to learn but more to put together. Django has more to learn but comes with more of what we need. Django's standard way of doing things also makes the project easier for a future maintainer to pick up, while the structure of a Flask app depends on the choices we make.

**Security.** Django's defaults, like password handling, CSRF protection, and permission checks, lower the chance of a mistake that gives people write access to the drug data. Flask can offer the same protections through extensions, but we have to choose and set them up correctly.

**Uncertainties.**
- How well the team already knows Flask vs. Django
- Whether the partner only needs editing and CSV import, or a fuller review and approval process.

## Recommendation and Verification Plan
**Recommend Option B (Django with Postgres).** It meets the needs for non-technical editing and data quality most directly, with the least custom code, because the admin, login, and permissions come with the framework.

**What we accept by choosing it:** a harder learning curve, following Django's rules, an admin that needs changes to support a verification process, and an extra API layer if we use React.

**How we will know it worked**

The framework choice has worked if the team can build the behavior we need without fighting the framework. 

1. **Before committing:** Build the drug models and import a sample CSV (about 50 drugs, including rows with missing or conflicting fields). It passes if relationships stay intact, unknown fields are saved as flagged/unverified instead of being filled in with blanks, and bad rows are rejected or flagged instead of being quietly accepted.

2. **Learning curve:** Every team member who will work on the backend can add a model and a view without outside help.

3. **Non-technical usability:** The partner can add, edit, and fix a drug record in the admin without help from a developer.

4. **Access control:** Check that an anonymous user and a non-admin user cannot create, edit, or delete drug records.

5. **Generator correctness:** Automated tests can make questions for each column count, and check that no answers repeat within a question.

6. **Reproducible deployment:** Deploy from a clean checkout, check that migrations run, and check that the app still serves data after a restart.

## Constraints

There are no constraints we need to worry about for this decision as the data for the data base will be writen by the project partner and is made up of publicly available information.

## Delegation and Validation

- **What you handed to AI tools:** none

- **What checks made that reasonable:** none

- **Where you stopped and validated the result yourself, and why those points:** none


## Decision
Proposed
