<!-- docs/rfcs/YYYY-MM-DD-short-title.md (or docs/adr/, whichever your repo uses) -->

# RFC: Tech Stack Final

| Field | Value |
| --- | --- |
| Author | Camden Thompson|
| Date | 2026-10-23 |
| Status | Accepted |
| Decision Date | 2026-11-1 |
| Deciders | The whole group |
| Superseded By | (link, if applicable) |

https://github.com/CamTcode/Drug-Matching-Game-Group-8

## Problem and Context

We are building a Pharmacy Study Game for Pharmacy students preparing for their licensing exam. They will have the option to customize what they study from the four categories:generic names, trade names, mechanisms of action, and disease uses. And will involve matching the correct relations. We are required to make a portal for the project partner to upload study data, requiring no technical skills. The game is required to be usable on computers and phones with no downloads. We also have to handle the logic around there being the same right answer for certain matching question.

For this project we needed to make a decision on the language, framework, and database. In order to separate tasks and assign work between the group we needed to set the foundation of what we will work on with as our shared stack.   

We need to make this decision because as we move away from drafts and mocks, switching to a different stack would mean replacing interfaces and rebuilding parts of the test suite and requiring a lot of rework, meaning a high cost for this decision is high. These decisions will also guide our future decisions as we conisder compatibility and ease of integration. In this RFC we came to the conclusion of using React and TypeScript for the browser application and Supabase for the database. We have to consider a database as it ties into our choice of languages.  

If we do nothing then we can't move forward on any design choices or work on the foundation of the project. And can be confusing when thinking of logic and design. Without consideration we might choose an inconvenient language type that isn't ideal but fits the decisions we made before choosing a language. 

## Options

### Option A: [TypeScript and React]

**Description:** build a website that works in a browser on computers, tablets, and phones. React builds the screens, TypeScript helps catch coding mistakes, can use Supabase provides the database and backend services. 

**Benefits:** Must build but easy to implement admin portal. Works with phone and desktop

**Costs:** Will likely require additional technology for phone port, will need to configure the database's security policies

### Option B: [Python + Django]

**Description:** Python handles the application logic, Django provides the web framework and a built-in admin interface

**Benefits:** Works across computers and tablets. Easy to learn/use. Django includes an admin interface that can be customized. Python can easily handle matching rules, CSV imports

**Costs:** Must learn Django's structure, could require additional JavaScript. Test the layout on phones, and configure database access rules.

### Option C: Do Nothing

**Benefits:** Can get more information and research to make the right decision and plan with what would fit our needs more.

**Costs:** Can't begin any actual work in main project work and makes it harder to plan out and make future design and tool decisions.


### Best Fits:
**Option A.** This makes sense if we want one browser app for phone and desktop and can build a small editing screen around the project partner’s tasks.

**Option B.** This makes sense if a built-in interface for editing individual records would save enough time to justify maintaining a Python server. A custom CSV import would still need its own validation.

**Option C.** A short delay makes sense as we need to ensure the foundation we build upon is the best path and wouldn't cause issues further down the road could rule out one of the options. The team could keep testing mockups during that time. The cost arrives when teammates start building features with different assumptions about how the game will get its data and it's compatibility.

## Analysis

The typescript will handle the game logic of question selection and questioning logic. And the supabase schema table links each trade name and disease use to a drug with a id key. This can help differentiate repeated answers. Testing the use of Typescript for game logic and questioning selection using sample information we made a isolated program that filters through all rows with the right answer and picks one at random and discard the rest so only one appears among the cards. 
https://github.com/CamTcode/Drug-Matching-Game-Group-8/pull/44


Another test was done for the integration of supabase and retrieving from the database by printing a single row. This demonstrates that the matching logic work independently and can run in the browser without a request on each tile click while in Typescript. And that we can easily read from the Supabase database using Typescript. 

Supabase is known for it's simplicity and usability and has the ability to give some information on completion when uploading data. And it also has it's own login authentication that we can utilize. Supabase lets a browser use a public key that accesses with as much  as  the database permissions and row-level security is set to. Django would make the application server responsible for checking permissions before writing. Both need configuration so that a student cannot change the records and only the project partner can. Both Django and Supabase also allows multiple people to be working on a project with admin and owner roles.

Django’s built-in admin would give the project partner an easy and earlier way to edit individual records. While with React and Supabase, we have to build that screen, but allows us to design it around the partner’s actual workflow and preference. The partner should be able to upload a file and see which row needs correction and Django might return this information better. But either stack would need to validate a CSV that updates related records and return the information back in a digestable way. The value of Django’s admin depends on how much editing the partner can do through the built-in interface without us needing to write custom screens or portals and how the results of an upload is presented back to us.

Any option would likely not need any monetary investment and as the scope of the project isn't large and the user base likely wouldn't warrant any kind of subrscription or upgrade from the free version. 

- https://horizon.dev/blog/react-django-enterpriseperformance/
- https://horizon.dev/blog/react-django-enterprise-performance/ 
- https://krify.co
- https://www.angularminds.com/blog/react-js-vs-django
- https://effective-programmer.com/typescript-vs-python-battle-for-theinterpreted-backend-2026-edition-338f25e81fbb
- https://www.dotsquares.com/press-and-events/tech/react-withtypescript-or-javascript
- https://docs.djangoproject.com/en/5.2/ref/contrib/admin/
- https://github.com/CamTcode/Drug-Matching-Game-Group-8/pull/40
- https://github.com/CamTcode/Drug-Matching-Game-Group-8/pull/44

## Recommendation and Verification Plan

Our team went with Typescript and react with Supabase (Option A). It fits being used in the browser, and supports the game logic and matching rules while accounting for duplicate shared answers, and properly merges with the database and pulling from it. Reason to reconsider would be failure to support the partner's uploading information workflow. 

We did testing on the use of Typescript for game logic and questioning selection using sample information and pulling from the database and all were successful. What would make these difficult to use is the complexity of Typescript compared to our typical coursework. There is also the need to learn how to set up the database with proper security and protocols. Also needing to make sure everything is compatible and appears right with no bugs in the mobile version and accessing the mobile version isn't technically difficult. Importing properly with a CSV and making it easy and non-technical can also have some difficulty.

### Checks
- Build and run code: checks npm run lint, npm test, and npm run build for a proposed change. Any errors or bugs on exit, blocks approval. GitHub lint and tests passes too.

- Question correctness: Test independently the logic and also test when integrated and compare results and if there are no same answers then testing passed. If any same answers in the options then testing failed. For example if a disease has two drugs that could treat it then our testing should show that from the answer selections we are showing only one valid match. 

- Database access / Admin portal: npm run check:supabase has returned one linked row. Before enabling edits, use a separate environment to check that anonymous reads work, and can't do anything else and the project partner has the ability to add, edit, and remove from the testing record/environment. Compare the records before and after each attempt to confirm. 
https://github.com/CamTcode/Drug-Matching-Game-Group-8/pull/40

- Compatibility and Usability: Have two teammates at the same time use the mobile and desktop version and test every screen page and complete a round and return to the menu without instructions. Require both to have no bugs or errors like overlapping headings, or hidden required controls or miss sized graphics. And also the teammates should be able to navigate without any help or mistakenly select unwanted selections.


## Constraints

No constraints apply. We talked to project partner and he gave us full control with no confidentiality and just wants an end product. Although he wants no duplicate answers within a single question. We will not be keeping or storing any confidential data and have no contraints from project partner on use of AI other than the games play design. 

And will continue to verify the licenses of our chosen dependencies, and check whether any intellectual-property agreement applies to the project if necessary.


## Delegation and Validation
- What you handed to AI tools on this decision, whether that was the analysis, the prototype, the tests, or the writing.

  I uploaded this document and gave it my two options and asked:

  compare these questions to the two options and give evidence:

  python and django vs typescript and react Can it work well on both phones and computers? Building the admin portal How will drug information be stored? Difficulty developing? Cost Monetary?

  it gave back alot of information in the analysis and I entered in most of it in own words or paraphrased

  Also entered in claude and asked to "point out any obvious mistakes and quick fixes, no nit picking" for a quick check before submitting to catch grammar, spelling, etc.

  Used ChatGPT for making the table format and Summarizing the feedback and how where and why I could accept or not accept.

- What checks made that reasonable: Every big decision gets review by the group and also any changes pushed to main have to be reviewed.

  Also reviewed the output to what the reviewers actually gave before making a decision.

- Where you stopped and validated the result yourself, and why those points. I checked the results from researching the options and checked the sources. I also considered our project scope and requirements. I have not yet built a prototype to verify usability or performance and will need to fully test and verify mobile compatibility with a mock and exploring an admin like feature. While also analyzing the learning curve for myself as this can be opinionated.

## Decision

 The team chose React, TypeScript, and Supabase. Accepted (2026-11-01) Whole Group, Camden Thompson initially. 

## Reviewers: Revision Log
| Source | Feedback | Decision | Where or why |
| --- | --- | --- | --- |
|Alexander Jiang | Explain what the team would have to redo if it changed stacks late. | Changed | **Problem and Context** Added the cost of switching stacks and leaned on how these decisions are foundational and cascade. |
| Alexander Jiang | Unity and C# could be another option if the team had a reason to use them. | Declined | The project needs browser play and a partner editing workflow. The team had no confirmed requirement and found Unity to be out of scope for the project with a steep learning curve and unnecessary to consider as another option|
| Alexander Jiang | Add automated tests that would catch failures in the interface or its logic. | Changed | **Recommendation and Verification Plan** Explained and added the testing made for the database integration and retrieving and the matching logic for questions. |
| Ellie Ding | Define what would make the interface difficult to use. | Changed | **Recommendation and Verification Plan** Included the difficulty of mobile compatibility and learning the new tech stack including the database and Admin Portal|
| Ellie Ding | Say how many people should test the interface and when their findings would justify reconsidering the stack. | Changed | **Recommendation and Verification Plan** Accepted the need to have checks and verifications on functionality and how we would know but didn't find it neccessary to set a amount of people and whether it would unjustify the whole stack |
| Ellie Ding | Clarify the hosting budget or how the team will judge costs. | Changed | **Analysis** added more emphasis on how we are likely gonna have zero costs in term of monetary. |
| Ellie Ding | Fix incomplete sentences and awkward wording, especially in Constraints. | Changed | **Constraints** Tried to have more complete sentences and explains what each limit means. |
