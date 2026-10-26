<!-- docs/rfcs/2026-10-25-data-editing-tool-aimee-wong.md -->

# RFC: Where Drug Question Data Lives and How Our Partner Edits It

| Field | Value |
| --- | --- |
| Author | [Aimee Wong] |
| Date | 2026-10-25 |
| Status | Proposed |
| Decision Date | 11/01 |
| Deciders | Team |
| Superseded By | TBD |

## Problem and Context

Our game (CS.008, a customizable drug-matching study game for PharmD
licensing exam preparation) is driven by content: drug names and the
answers they match to. Our project partner wants to control that content
themselves. They are not very technical, and we have agreed that only the
partner should be able to edit it. The partner has also said each question
must have a unique answer, with no duplicate entries.

We have to decide where this data is stored and what interface the partner
uses to change it. This is hard to reverse for two reasons. First, the
schema shapes everything built on top of it (game logic, import code,
tests). Second, once the partner has built their editing habits and entered
real content, changing tools means migrating data and retraining a
non-technical user. The partner will supply the real data in the coming weeks
when we are ready for testing, so we must choose a structure before
seeing the data we will store.

If we do nothing, each developer will build against an invented data shape.
We would then discover the partner's actual needs late, with the least time
to correct them, and we would still have no way for the partner to edit
content without our help. Our framework is not fully settled, and the CI
setup depends on it, so we also want a choice that does not lock us into a
frontend framework [verify with backend teammate].

## Options

### Option A: Hosted database with a web editing interface (e.g., Supabase)

A hosted relational database, with Supabase as the candidate one teammate
raised. The partner edits through the provider's table editor or a small
admin view we build, using an account that is the only one allowed to write.

- **Benefits:** the database itself can enforce uniqueness, so duplicates are
  rejected whatever code or person tries to insert them. Edits are live
  without redeploying. The partner needs no developer tooling.
- **Costs:** the partner must learn a new tool, so we would produce demo
  videos or written steps. Write access must be configured correctly to 
  meet "only the partner can edit", and a misconfiguration is a real risk. 
  A table editor lets a non-technical user make mistakes (deleting rows, mistyping), 
  so we need to decide whether we build a friendlier admin view.
- **Right choice if:** the partner is comfortable with a spreadsheet-like
  web table, and we want uniqueness guaranteed at the data layer.

### Option B: Spreadsheet as the partner's source of truth, imported into the app

The partner keeps the data in a spreadsheet or CSV and we import it into the
app on a schedule or on request.

- **Benefits:** the partner uses a tool they probably already know. Very
  low learning cost.
- **Costs:** we must write and maintain an import and validation script.
  Duplicates can only be caught at import time, not at the moment of entry.
  The partner could end up with several versions of the file, and
  re-importing can overwrite or conflict with earlier data. Restricting
  who may edit depends on file sharing rather than enforced permissions.
- **Right choice if:** the partner refuses any new tool, the dataset is
  small, and a delay between editing and the app updating is acceptable.

### Option C: Do nothing special (data file committed to the repository)

We keep data as a JSON or CSV file in the repo, validate in app code, and
make no dedicated provision for partner editing.

- **Benefits:** no new infrastructure, cost, or vendor. Changes are
  versioned in git and reviewed through pull requests.
- **Costs:** the partner cannot edit without GitHub or going through us,
  which makes us the bottleneck and conflicts with their wish to control
  content. Uniqueness is only enforced by our own code and tests. The cost
  arrives when the partner first needs to change content during testing.
- **Right choice if:** the dataset is small and rarely changes, and the
  partner is content to send us corrections.

## Analysis

**Partner editing.** The partner is the only editor, so the deciding factor is
how much of the work lands on them. Option A asks them to learn one new interface.
Option B asks for none but moves complexity into our import step. Option C asks for 
the most, because editing requires developer tooling.

**Uniqueness.** A database constraint rejects a duplicate no matter how it is
inserted, while checks in application code or an import script only protect
paths that run that code. Furthermore, we must comply with the unique question
to unique answer criteria.

**Access control.** Option A can restrict writes to one account, but this must
be configured and tested rather than assumed.

**Cost and limits.** Our expecteddata volume (drug names) is will most likely
be a large dataset from various topics given this is for the national license exam.

**Reversibility.** Leaving a hosted relational database later is likely
easier than leaving a proprietary format, because the data is relational and
can be exported. The harder cost to reverse is the partner's workflow and our 
schema, which is why this is decided now.

**Uncertainty.** None of us has prototyped any option. We have read some
documentation on sufficient databases to utilize, and we have not yet
seen the real data. The schema may need to change once the partner supplies
it.

## Recommendation and Verification Plan

**Recommendation: Option A.** It is the only option where the database
enforces uniqueness and the partner can edit directly without developer
tools or us in the loop. Its main cost, a new tool for a non-technical user,
can be reduced with demo videos and a restricted interface.

We will know it worked if these checks pass:

1. **Duplicate rejection:** a test inserts a duplicate answer and the
   database rejects it. Checked the week we create the schema.
2. **Partner-only writes:** a second, non-partner account attempts to
   insert, update, and delete, and all are refused. Checked before the
   partner receives access.
3. **Partner usability:** the partner adds, edits, and deletes an entry using
   only our video or written guide, without our help. Checked at the first
   partner meeting after setup. **[Set your own pass criteria, e.g. time
   limit or number of questions asked.]**
4. **Real data:** when the partner supplies their data, it loads with entry
   counts matching their source and no unexplained rejections. Checked at
   testing.

**Reconsider if** the partner cannot complete check 3 after one round of
revising the guide, or check 2 cannot be made to pass. In that case we
would look again at Option B.

## Constraints

- **Partner confidentiality:** the partner will supply the data, and we do
  not yet know whether it is confidential. We will not commit partner data
  or credentials to the repository.
- **Licensing and IP:** the drug data comes from a licensed source as stated
  by our project partner. We will also read the hosting provider's terms of
  service for restrictions on storing this content.
- **Data use:** we assume the data contains no patient or personal
  information, only drug names and answers.

## Delegation and Validation

- **What we handed to AI tools:** the AI tool helped draft this RFC's
  structure and the first draft of the option descriptions.
- **Checks that exist today:** pull requests are required to merge to main
  and direct pushes are blocked, and AGENTS.md sets rules for AI use and
  drug-data verification. We have no CI, tests, or staging yet, so none of
  those are checks on this decision.
- **Where we validated ourselves:** I looked into which databases could fit 
  our project, including MongoDB, Supabase, Firebase, PlanetScale, and Airtable to see how they compare for a 
  non-technical partner who needs to edit data. I did not build a prototype, so 
  I have not verified that a database can reject duplicate answers or restrict 
  writes to the partner’s account. I treated those as open questions, not confirmed 
  facts. Before the decision is accepted, I plan to research and create a prototype using 
  Supabase and Airtable to see which form of data insertion would be best for our project partner. 
  I chose those points because a wrong assumption about uniqueness or write access would be the 
  hardest to undo after the partner has entered real data.

## Decision

Proposed.
