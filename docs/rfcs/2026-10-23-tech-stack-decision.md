<!-- docs/rfcs/YYYY-MM-DD-short-title.md (or docs/adr/, whichever your repo uses) -->

# RFC: Ground work and Setting Environment

<!-- Decision record header. Leave Status as "Draft" while the RFC is under review.
     When your team decides, fill in the outcome and the decision date. The
     document stays where it is; this header is what makes it a record. -->

| Field | Value |
| --- | --- |
| Author | Camden Thompson|
| Date | 2026-10-23 |
| Status | Draft |
| Decision Date | (fill when decided) |
| Deciders | Whole Group |
| Superseded By | (link, if applicable) |

## Problem and Context

We are building a game-based study app for Pharmacy students preparing for their licensing exam. Students match drug names from mechanisms of action, and disease uses. We are hoping to have this done and have some tester for Spring of 2027. There is no previous work or setup the group has creative freedom on the design and framework. Though there are three requirements: the game must run on both phones and laptops/computers; a drug can have several trade names and uses and they must not overlap; and it must have a admin like portal for project manager to edit and import drug data with non-technical skill.

For this assignment we have not yet chosen a language, framework, database or host yet and the client's previous teams used Unity C#, but I think this is out of our scope. Instead I will be analyzing a combination of Backend and database, and  we will confirm which language we will choose for the stack by the end of week 5. 

We need to make this decision because it is what we will be using to build off of and will guide our future decisions. It is what we will build off of and base alot of decisions and workflow around so changing it would require us to rework most of the project and reconsider alot of other decisions we will make in the future.

If we do nothing then we might have to choose an inconvenient language type that isn't ideal but fits the decisions we made before choosing a language.

## Options

### Option A: TypeScript and React

Description: build a website that works in a browser on computers, tablets, and phones. React builds the screens, TypeScript helps catch coding mistakes, can use Supabase provides the database and backend services. 

Benefits: Must build but easy to implement admin portal. Works with phone and desktop

Costs: Will likely require additional technology for phone port, will need to configure the database's security policies

### Option B: Python + Django

Description: Python handles the application logic, Django provides the web framework and a built-in admin interface

Benefits: Works across computers and tablets. Easy to learn/use. Django includes an admin interface that can be customized. Python can easily handle matching rules, CSV imports

Costs: Must learn Django's structure, could require additional JavaScript. 

### Option C: Do Nothing

What staying on the current path actually costs, and when that cost arrives.

Benefits: Can get more information and research to make the right decision and plan with what would fit our needs more.

Costs: Can't begin any actual work in main project work and makes it harder to plan out and make future design and tool decisions.

## Analysis

Can it work well on both phones and computers?
Building the admin portal
How will drug information be stored?
Difficulty developing? 
Cost Monetary?

I know from talking to my group mates we overall have experience with python but also some specialize in TypeScript. So I don't think this should sway our decision greatly.

React supports TypeScript and is a good option for a complex app and for teams. Combining React with TypeScript is optimal for highly interactive or data-complex applications due to static typing and data rules. https://www.dotsquares.com/press-and-events/tech/react-with-typescript-or-javascript

Instead of forcing the browser to repaint the entire webpage every time a user makes a move, React computes the structural changes in memory first and updates that specific change.

 Django excels at text-heavy or backend computing, though using it for real time frontend feedback requires some JavaScript integration, possibly adding network latency to mobile taps. https://horizon.dev/blog/react-django-enterprise-performance/

 anecdotes from Horizon Dev says teams transitioning to React for 
 data management frequently experience an increase in code 
 complexity, as developers are forced to spend time configuring, or building custom admin components from scratch
 https://horizon.dev/blog/react-django-enterprise-performance/

 Some things that I am not sure of is what their definition of admin components and what ours will require and look like. 

 React is a client-side frontend library, it cannot securely connect directly to database servers without exposing critical credentials to the user's browser. It must query an external database via API endpoints. This is can be resolved by using serverless systems like Supabase, which provide ready relational table models which is easy with TypeScript.
 https://supabase.com/docs/guides/database/postgres/row-level-security
 
 Django includes a built-in, highly secure Object-Relational Mapper (ORM) and it provides default protection against SQL injection attacks. However, the learning curve is structurally steeper because it forces developers to follow strict Model-Template-View architectural patterns. https://krify.co/is-django-still-relevant-in-2026-trends-future-scope/

 A Python runtime engine continuously executes on a remote virtual instance to listen for network routes and generally charge monthly. So free hosting for Python backends looks to be rare and restrictive compared to alternatives.

 While with TypeScript + React some frontend hosting architectures provide some sort of free tiers for static web content. This can be beneficial for mocks.
 https://horizon.dev/blog/react-django-enterprise-performance/


 https://horizon.dev/blog/react-django-enterprise-performance/
 https://krify.co 
 

 https://www.angularminds.com/blog/react-js-vs-django

https://effective-programmer.com/typescript-vs-python-battle-for-the-interpreted-backend-2026-edition-338f25e81fbb

 https://www.dotsquares.com/press-and-events/tech/react-with-typescript-or-javascript
## Recommendation and Verification Plan

I think Option A "TypeScript and React" would be the best choice if we can find a suitable database backend like Supabase to help with the responsive web interface. TypeScript can help catch coding mistakes, and Supabase can help with csv importing. I think it has a better learning curve (though this has to be explored), and would make it easier to do mocks and work cross platform. And the pricing is a plus.
Although we would have to come up with our own way to maintain and update the information so our project partner can update it.

We will detect potential failures if the interface is too difficult to use on either device or importing has many error and the project partner cannot manage drug information without technical help, or the hosting costs exceed our budget.

We will also review the required workload and learning curve as a whole group. If implementing the required features becomes too complicated for our timeline or requires more training than anticipated, we can reconsider our choice before committing to the final stack. We will review the results with the group and project partner before making a finalizing decision.

## Constraints

None apply, talked to project partner and gave us full control with no confidentiality and just wants an end product. Although wants no duplicate answers within one question. 

And will continue to verify the licenses of our chosen dependencies, and check whether any intellectual-property agreement applies to the project if necessary.

## Delegation and Validation

- **What you handed to AI tools** on this decision, whether that was the analysis, the prototype, the tests, or the writing.

I uploaded this document and gave it my two options and asked:

compare these questions to the two options and give evidence:

python and django vs typescript and react
Can it work well on both phones and computers?
Building the admin portal
How will drug information be stored?
Difficulty developing? 
Cost Monetary?
 
 it gave back alot of information in the analysis and I entered in most of it in own words or paraphrased 

Also entered in claude and asked to "point out any obvious mistakes and quick fixes, no nit picking" for a quick check before submitting to catch grammar, spelling, etc.

- **What checks made that reasonable**: Every big decision gets review by the group and also any changes pushed to main have to be reviewed.
- **Where you stopped and validated the result yourself, and why those points.** I checked the results from researching the options and checked the sources. I also considered our project scope and requirements. I have not yet built a prototype to verify usability or performance and will need to fully test and verify mobile compatibility with a mock and exploring an admin like feature. While also analyzing the learning curve for myself as this can be opinionated.

What is assessed is in the [AI policy](https://capstone.alexulbrich.com/assignments/introduction/#ai-policy-applies-to-every-assignment).

## Decision

TBD need group review.
