# RFC: Where Drug Data Lives and How Our Partner Edits It
 
| Field | Value |
| --- | --- |
| Author | Aimee Wong |
| Date | 2026-10-25 (final revision 2026-11-20) |
| Status | Accepted |
| Decision Date | 2026-11-17 |
| Deciders | Whole project team |
| Superseded By | n/a |
 
## Problem and Context
 
The Pharmacy Matching Game (course CS.008) is a web app that helps PharmD students prepare for the final licensing exam in Summer 2027, with rollout planned for Spring 2027. Students choose two to four categories (generic name, trade name, mechanism of action, disease use) and match items across columns. Everything the game shows is drug content supplied by our project partner, who collects it from an official pharmaceutical source. The repository holds about ten sample rows today. The partner expects up to about 300 drugs with four categories each and up to about 90 student users. One drug can have several trade names and several disease uses, primary and off-label (project objectives).
 
This RFC covers two linked choices: where the drug data is stored and served to the student app, and how the partner changes it and has edits validated. We decide them together because the store limits the editing paths, but the analysis scores them separately. Both are hard to reverse: the schema sits under the generator, import code, and every test, and once the partner has entered real content, switching means migrating data and retraining a non-technical person.
 
The data rule, stated once: the database must never hold two records for the same drug, and an answer may repeat within a question (metoprolol and amlodipine can both match "Hypertension") but identical answers must be interchangeable, so grading compares the answer itself, never one drug's tile. Only the partner may edit content.
 
Why now: the game's tiles still read a hardcoded `SAMPLE_TERMS` array in `App.tsx`, marked with a TODO to replace it with database content, and the partner's real data arrives soon for testing. The hosting stack has also changed. We first planned Supabase for data and Vercel for hosting. A teammate found Vercel made team collaboration hard, and Vercel's documentation says working with other team members requires a paid Pro or Enterprise plan rather than the free Hobby plan. We moved to Cloudflare, which can host the app and store data, so the storage options differ from those in our first draft. If we do nothing, each developer builds against an invented data shape, we learn the partner's real needs when correcting them is hardest, and the partner cannot edit content without us.
 
## Options
 
Five options follow. "Do nothing" is Option E.
 
### Option A: Supabase (hosted Postgres with its table editor)
 
A hosted Postgres database. The partner edits rows in the provider's dashboard, or a small admin view we write, through the only account with write access. Benefits: SQL constraints reject duplicates however they are inserted, and edits go live without redeploying. Costs: a second vendor beside Cloudflare; a raw table editor lets a non-technical user delete or mistype rows; write restriction needs correct configuration; and free projects pause after a week of inactivity [Supabase pricing], a risk for an app used in bursts. Avoiding the pause means the $25 per month Pro plan, an ongoing cost that makes this a poor fit if the game must live on after this project ends, since someone must keep paying. Right choice if the partner prefers a browser grid and the team will pay for Pro.
 
### Option B: Cloudflare D1 with CSV import through a partner-only page
 
The partner keeps editing a spreadsheet or CSV. An Admin login on the game's home page lets the partner, and only the partner, upload the file themselves, so we never handle it. An automatic format check, run by a Cloudflare Worker (a small program on Cloudflare's servers; no person reviews the data), rejects a badly formatted file and tells the partner what is wrong. A valid file is written into normalized tables (drugs, trade names, and uses with a primary or off-label flag) in D1 under UNIQUE and foreign-key constraints. Benefits: one vendor, a familiar tool, data-layer constraints. Costs: we maintain the import and format-check code; the CSV needs a convention for several trade names or uses in one cell; errors must be readable; and D1's per-request limits shape the code (see Analysis). Right choice if the partner is comfortable with spreadsheets and updates arrive in batches.
 
### Option C: Airtable as the editing layer
 
The partner edits in Airtable's grid and the app reads through its API or a synced copy. Benefits: the friendliest interface for a non-technical editor. Costs: community threads report no native way to enforce unique values, so duplicate checks fall to scripts [Airtable forum]. The free plan allows only 1,000 API calls per month per workspace [Airtable API limits], so student reads cannot go to Airtable directly; the data must be copied to another store, creating two sources of truth and a sync job. Whether permissions can limit editing to one person on our plan is unverified. Our partner has confirmed they will most likely use CSV files, so this is the weaker fit; it would be right only if that changed and we accepted a sync job with its own duplicate check.
 
### Option D: Headless CMS (for example Directus)
 
A CMS gives the partner an admin interface with roles and validation over a database we choose. Benefits: no custom admin page; scales to more editors. Costs: a separate Node.js service we must host and patch [Directus requirements; Railway template]; a Business Source License that is free below $5 million in total finances, with grant terms being revised [Directus v12 license change]; and managed hosting from $99 per month [Railway template]. Right choice if we need multiple editors, roles, or richer content.
 
### Option E: Do nothing (data file in the repository)
 
Keep JSON or CSV in the repo, validate in application code, and route corrections through us. Benefits: no new infrastructure or vendor. Costs: the partner cannot edit without GitHub, so we are the bottleneck, and only our code enforces uniqueness. The cost arrives when the partner first changes content. Right choice if the dataset is frozen.
 
## Analysis
 
**Duplicates.** Two different guarantees are involved. Record uniqueness (no repeated drug or trade name) belongs in the database. Cloudflare documents that D1 enforces foreign keys by default [D1 foreign keys], and a third-party D1 driver's documentation shows UNIQUE-constraint failures coming back from D1 [TundraLibs wiki]. I found no first-party page showing it, so check 1 tests it. Airtable forum threads from 2016 to 2022 report no uniqueness setting [Airtable forum]; that may have changed, so a prototype would need to confirm it. Answer interchangeability cannot be a database constraint, because many drugs legitimately share a disease or a mechanism, so repeated answers must be allowed. Grading must judge a match by the answer's value, not by which tile was clicked. That needs all candidate items at once, which favors loading the selected deck once and generating and grading questions from it, rather than querying per question. The design is still open: `App.tsx` is only a test that tiles display, using placeholder terms from `SAMPLE_TERMS`. It is not the final layout and contains no generator.
 
**Load and limits.** D1's free plan allows 5 million rows read and 100,000 rows written per day, and Workers allow 100,000 requests per day [D1 pricing; Workers pricing]. Since 1 September 2026, free-plan queries fail once a daily limit is exceeded [D1 changelog], so an exam-week spike would show as errors. A full table scan counts every row it reads [D1 FAQ]. My estimate, on assumptions to be replaced by measurement: 90 students, 10 sessions each, and about 1,500 rows per deck load (300 drugs with about two trade names and two uses each) comes to 1.35 million reads a day, 27 percent of the limit. Querying per question with a full scan (20 questions of 300 rows per session) would be about 5.4 million, over the limit. Airtable's free cap of 1,000 calls per month would not survive 900 sessions. Supabase's 500 MB free database is ample, but the inactivity pause applies [Supabase pricing].
 
**Import complexity.** D1 allows 100 bound parameters per query and, on the free plan, 50 queries per Worker invocation [D1 limits]. A 300-drug import is roughly 1,500 rows, so it must be chunked. I could not confirm whether D1's `batch()` call counts once against the 50-query limit or rolls back on failure, so checks 4 and 5 test both.
 
**Security.** "Only the partner edits" needs an admin login in front of the import path, which students never touch. Cloudflare Access is one ready-made way: free for up to 50 users, admitting specific emails by one-time PIN [Cloudflare Access; HackerNoon]. A login we write ourselves adds credential handling we must get right. Supabase and a CMS offer equivalents, but need configuration we would have to test.
 
**Cost and maintenance.** Option B costs nothing at the estimated load and adds code we own. Option A adds a vendor and possibly $25 per month. Option D adds a service to host and a license to track [Directus self-hosting overview].
 
**Reversibility.** At 300 rows, moving between SQL stores is a table copy; the costly parts are the partner's habits and the CSV convention (my judgment).
 
**Uncertainty.** No option has been prototyped. Unverified: how the admin login is enforced on the import path, D1 batch behavior, Airtable's current uniqueness support, how Cloudflare's collaboration model compares with Vercel's, and whether the partner's real data fits the schema.
 
## Recommendation and Verification Plan
 
**Recommendation: Option B.** It is the only option that gives the partner a familiar tool, constraints in the data layer, one vendor with no pausing, and zero cost at the estimated load, and the analysis found no limit that rules it out. Its main risk, the import code, can be tested now.
 
We will know it worked if these checks pass:
 
1. **Record duplicates** (the week the schema is created): inserting a duplicate generic name, and a duplicate trade name for the same drug, are both rejected, and the error text reaches the import report.
2. **Interchangeable answers** (before the generator merges, then on every pull request): over a 300-row test set (synthetic if real data has not arrived), in 1,000 generated questions per mode (2, 3, and 4 columns), whenever two tiles share an answer, either pairing is graded correct, and no drug is marked wrong for matching an identical answer to the other tile. Until CI exists, run it by hand.
3. **Partner-only writes** (before the partner gets the link): a request to the import endpoint with no admin login, and one from a non-admin account, are both refused.
4. **Atomic, repeatable import** (before the partner gets access): a 300-row file with one bad row applies no rows and names the bad row; uploading the same valid file twice leaves row counts unchanged.
5. **Load** (before Spring 2027 rollout): we have not confirmed an expected load, but a rough estimate is 90 students at about 10 sessions each on a heavy day. We load the 300-row deck once, read the `rows_read` count D1 reports, and multiply by that estimate. It passes if the daily total stays under half the 5 million free limit, and the 300-row import completes without hitting the 50-query limit.
6. **Partner usability** (first meeting after setup): using only our written guide, the partner adds a drug with two trade names, changes one disease use, and removes a drug within 10 minutes, asking us no questions.
7. **Real data** (when it arrives): row counts in each table match the partner's source file; every rejected row has a stated reason resolved with the partner; none are dropped silently; and an export followed by a re-import reproduces the same counts.
Reconsider if check 6 fails after one revision of the guide (reopen the editing options, including Option D), if check 5 exceeds half the free limit (add caching or a paid Workers plan), or if checks 1, 3, or 4 cannot be made to pass (look again at Option A).
 
## Constraints
 
- **Source data license.** The partner says the data comes from an official pharmaceutical source. We have not yet recorded which one or its terms of use, and will get both before loading real data. If those terms restrict storing or redistributing it, the app may serve only what the partner may share, and options copying data to another vendor (A and C) need that check first. Condition on the recommendation: real partner data and credentials are never committed, and the repository holds only the ten sample rows.
- **Dependency and vendor licenses.** Option D's license is free below $5 million in total finances, with grant terms under revision [Directus v12 license change], so adopting it requires a recorded license check. Options A and C bring vendor terms already reflected in their costs.
- **Personal data.** Students need no accounts in the current menu-to-game flow (`App.tsx`), so no student data is stored. The only personal data is the partner's admin login details, kept in deployment configuration and out of the repository.
- **Data ownership.** The data belongs to the partner. This adds the export round trip to check 7, so the content is never stuck in D1.
## Delegation and Validation
 
- **What I handed to AI tools.** Claude (Anthropic) drafted the original structure and option text. For this revision it searched vendor documentation (Cloudflare, Supabase, Airtable, Directus, Vercel), proposed Options C and D in response to review, and drafted this text from my draft, the reviews, and my project description. No schema, import code, or tests were generated for this decision.
- **Checks that exist today.** Pull requests are required to merge to `main` and direct pushes are blocked, and `AGENTS.md` sets rules for AI use and drug-data verification. We have some React tests in place, but none yet cover the data store, import, or answer grading, which do not exist. We have no CI or staging. The verification plan adds the tests this decision needs.
- **Where I validated myself, and why.** I opened every cited vendor page and checked the figures, because a wrong limit would mis-size the architecture. I will run checks 1 to 4 myself before the partner enters real data, because a wrong assumption about uniqueness or write access is the costliest to undo once content exists. I will replace my load estimate with measured `rows_read`, and load the partner's real file into the schema before this decision is final, because the first import is effectively a migration.
## Decision
 
Accepted. The team chose Option B (Cloudflare D1 with CSV import behind an admin login) on 2026-11-17, decided by the whole project team. The reconsider triggers in the Recommendation section stand. Not superseded.
 
## References
 
Project sources: `App.tsx` (hardcoded `SAMPLE_TERMS`, category menu, no accounts); `AGENTS.md`; repository branch protection settings; partner's statements to the team on data volume, user count, and the unique-answer rule; teammate's explanation for leaving Vercel.
 
- [Vercel Accounts] Vercel docs, Account Management: https://vercel.com/docs/accounts
- [Workers pricing] Cloudflare Workers pricing: https://developers.cloudflare.com/workers/platform/pricing/
- [D1 pricing] Cloudflare D1 pricing: https://developers.cloudflare.com/d1/platform/pricing/
- [D1 changelog] D1 enforces free tier daily query limits (2026-09-01): https://developers.cloudflare.com/changelog/post/2026-09-01-d1-free-tier-limit-enforcement/
- [D1 limits] Cloudflare D1 limits: https://developers.cloudflare.com/d1/platform/limits
- [D1 FAQ] Cloudflare D1 FAQ: https://developers.cloudflare.com/d1/reference/faq/
- [D1 foreign keys] Cloudflare D1, Define foreign keys: https://developers.cloudflare.com/d1/sql-api/foreign-keys/
- [TundraLibs wiki] Drivers D1: https://github.com/TundraSoft/TundraLibs/wiki/Drivers-D1
- [Cloudflare Access] Cloudflare Access plans: https://www.cloudflare.com/en-gb/sase/products/access/
- [HackerNoon] How to Protect Private Domains With Cloudflare Access: https://hackernoon.com/how-to-protect-private-domains-with-cloudflare-access
- [Supabase pricing] Supabase pricing: https://supabase.com/pricing
- [Airtable API limits] Managing API call limits in Airtable: https://support.airtable.com/docs/managing-api-call-limits-in-airtable
- [Airtable forum] An option to require unique values for any given field: https://community.airtable.com/legacy-product-ideas-75/an-option-to-require-unique-values-for-any-given-field-43145
- [Directus requirements] Directus overview (Node.js 22): https://www.mintlify.com/directus/directus
- [Railway template] Deploy Directus on Railway: https://railway.com/deploy/directus-open-source-cms
- [Directus v12 license change] https://directus.com/resources/directus-v12-license-change
- [Directus self-hosting overview] https://directus.io/docs/self-hosting/overview
 
