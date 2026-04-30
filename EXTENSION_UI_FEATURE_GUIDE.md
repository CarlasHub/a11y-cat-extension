# A11Y Cat Extension UI Feature Guide

## 1. What this guide is for

This guide explains the current Chrome extension UI as it is shipped in the extension product surface.

Use it to understand:
- what each section means
- where each count comes from
- what is confirmed by automation
- what still needs human review
- what is advisory only
- what data may be stored locally or exported

A11Y Cat supports accessibility review workflows. It does not replace manual testing or assistive-technology validation.

This guide is extension-first:
- it describes the current Chrome extension UI
- it does not describe the old bookmarklet flow as a current product feature
- it does not treat hidden or deferred AI surfaces as active beta features

Current top-level extension sections verified in the shipped extension path:
- Dashboard
- Scan Results
- Headings
- Language
- Alt Text Analysis
- Screen Reader Review
- Metadata Check
- Broken Links
- Page Text Scale
- Manual Checks
- Dev Sandbox

Visible global chrome and controls also covered here:
- theme toggle
- close button
- scan status
- dashboard quick actions
- issue filters
- severity filters
- local issue tracking
- exports
- privacy and local data clearing

## Keeping this guide updated

This guide must be updated whenever the extension UI, scanner taxonomy, result categories, exports, storage behaviour, or release limitations change.

Future changes to UI labels, result categories, counts, exports, or storage behaviour must update this guide in the same change set.

## 2. How to read the extension

Recommended reading order:

1. Start with Confirmed Issues.
2. Fix Critical and Serious confirmed issues first.
3. Review Manual / Incomplete items next.
4. Check Scan Limitations before assuming the scan was complete.
5. Treat Advisory Notes as guidance, not automatic failures.
6. Use exports for handoff, but inspect sensitive snippets before sharing.

## 3. Important result categories

Read these categories before you read individual findings.

### Confirmed Issues

Confirmed Issues are the items the extension currently treats as concrete findings in the tested page state.

What qualifies as confirmed:
- axe-core violations that survive exclusion and suppression rules
- deterministic custom findings
- corroborated custom findings

What does not qualify as confirmed:
- axe `incomplete`
- visual review prompts
- state-limited prompts
- human-judgement prompts
- advisory notes
- runtime diagnostics
- scan limitations

Confirmed does not mean:
- the entire page is compliant
- the entire page is non-compliant
- hidden states passed
- protected or cross-origin frames passed
- manual assistive-technology testing is no longer needed

What users should do next:
- start here first
- fix `Critical` and `Serious` confirmed issues first
- rescan the same page state after changes

### Manual / Incomplete / Review Items

Manual / Incomplete / Review Items are not auto-confirmed failures.

These items exist because the scanner found something that still needs context, state, or human judgement.

This category includes:
- axe `incomplete`
- `Engine-limited review`
- `State-limited review`
- `Visual composition review`
- `Human judgement review`

These are review tasks, not confirmed failures.

What users should do next:
- inspect the affected element or flow manually
- decide whether it is a real accessibility defect in context
- record the outcome if you use local issue tracking

### Advisory Notes

Advisory Notes are guidance and quality signals.

They can include:
- spelling suggestions
- language refinement notes
- metadata suggestions
- Open Graph or Schema.org warnings
- best-practice notes

Advisory Notes are not automatically WCAG failures.

What users should do next:
- treat them as guidance
- review them in context
- fix them where they are useful for quality, clarity, or editorial consistency

### Scan Limitations

Scan Limitations explain what the extension could not fully inspect or prove.

They can come from:
- blocked or unsupported page contexts
- restricted browser pages
- inaccessible frames
- state limitations
- incomplete runtime information
- partial scan coverage

A limitation is not the same as “no issues found”.

What users should do next:
- read limitations before assuming the scan was complete
- manually review the missing or blocked surface

## 4. Severity levels

In the current extension UI, the main severity counters shown in `Dashboard` and `Scan Results` are confirmed-only severity counts.

That means `Critical`, `Serious`, `Moderate`, and `Minor` count only confirmed issues.

They do not count:
- review items
- advisory notes
- diagnostics
- limitations

The extension separately shows:
- `Review`
- `Advisory`
- `Limitations`

Unknown or null axe impact is not mapped to `Moderate`. Uncertain items are routed into review-oriented output instead.

### Critical

- meaning: highest-priority confirmed issue
- source: axe impact `critical` or an equivalent confirmed deterministic severity
- counts: included in confirmed-only severity counts
- next step: review and fix first

### Serious

- meaning: high-priority confirmed issue
- source: axe impact `serious`
- counts: included in confirmed-only severity counts
- next step: review and fix early

### Moderate

- meaning: medium-priority confirmed issue
- source: axe impact `moderate`
- counts: included in confirmed-only severity counts
- next step: review after critical and serious

### Minor

- meaning: lower-priority confirmed issue
- source: axe impact `minor`
- counts: included in confirmed-only severity counts
- next step: review as part of cleanup

### Review / Incomplete

- meaning: review-oriented output, not a confirmed severity bucket
- source: axe `incomplete`, uncertain custom findings, and review-classified custom logic
- counts: excluded from confirmed severity counts and tracked separately as `Review`
- next step: manually inspect before treating the item as a defect

| UI severity | Source value | Meaning | User action |
| --- | --- | --- | --- |
| Critical | axe impact `critical` or equivalent deterministic severity | Highest-priority confirmed issue | Review and fix first |
| Serious | axe impact `serious` | High-priority confirmed issue | Review and fix early |
| Moderate | axe impact `moderate` | Medium-priority confirmed issue | Review after critical and serious |
| Minor | axe impact `minor` | Lower-priority confirmed issue | Review as part of cleanup |
| Review / Incomplete | axe `incomplete` or uncertain custom finding | Needs human review | Manually inspect before treating as failure |

### What the separate non-severity counters mean

- `Review`: count of issues routed to review-oriented handling rather than confirmed severity buckets
- `Advisory`: count of advisory notes
- `Limitations`: count of scan-limitations output

## 5. Scanner source types

### axe-core findings

What it can prove:
- deterministic rule violations on the tested page state

What it cannot prove:
- full page compliance
- every hidden or stateful interaction
- real assistive-technology output

How it appears in the UI:
- usually as Confirmed Issues when the result is a preserved axe violation
- sometimes as review output when the result is incomplete or limited
- details show `Engine: axe-core`

How it appears in export:
- JSON keeps `sourceEngine: axe-core`
- JSON keeps rule id, help URL, impact, tags, targets, and checks
- CSV includes source engine, rule id, severity, WCAG, selector/target, and help URL

### Custom A11Y Cat logic

What it can prove:
- deterministic product-owned checks for some patterns

What it cannot prove:
- visual meaning, context, or subjective quality without review

How it appears in the UI:
- confirmed when deterministic
- review or advisory when heuristic or contextual
- details use product-owned source attribution instead of `axe-core`

How it appears in export:
- JSON includes source attribution and classification
- CSV includes source engine and source rule id

### Manual review guidance

What it can prove:
- nothing on its own

What it cannot prove:
- pass or fail without a human reviewer

How it appears in the UI:
- in `Needs review`
- in Screen Reader Review and review-oriented panels

How it appears in export:
- in review/manual arrays, not confirmed arrays

### Advisory checks

What it can prove:
- guidance and bounded quality signals

What it cannot prove:
- deterministic accessibility failure by itself

How it appears in the UI:
- as advisory or review-oriented output
- metadata and spelling guidance stay out of the confirmed issue list

How it appears in export:
- under advisory categories with source engine and classification

### Diagnostics and runtime signals

What it can prove:
- runtime conditions, failures, support boundaries, and suppression bookkeeping

What it cannot prove:
- that a page fully passed accessibility checks

How it appears in the UI:
- in Dashboard diagnostics and scan limitations areas

How it appears in export:
- in diagnostics summaries and diagnostics finding arrays

## 6. Feature-by-feature guide

### Dashboard

**What it does**  
Shows the current scan status, top-level counts, severity overview, quick triage actions, comparison tools, history, and diagnostics.

**Where the count comes from**  
Counts come from the current deduped scan result set, current diagnostics state, and saved local scan history.

**How it is classified**  
diagnostic/limitation

**Does it map to WCAG?**  
Not directly. Some panels summarize findings that include WCAG mappings, but the dashboard itself is an overview surface.

**What the user should do next**  
Use it to decide where to start: confirmed issues first, then review items, then limitations.

**Limitations**  
The dashboard does not prove that all page states were tested or that the page is compliant.

**Privacy/storage note**  
History and dashboard preferences are stored locally in extension storage.

**Example**  
If the dashboard says `Needs immediate attention`, open `Scan Results` and start with the critical items.

### Scan Results

**What it does**  
Shows the main issue log for the current page state, including confirmed findings, review items, limitations, filters, exports, and local issue actions.

**Where the count comes from**  
Counts come from the current deduped scan issues after classification, suppression, and grouping.

**How it is classified**  
confirmed issue

**Does it map to WCAG?**  
Yes, where individual findings include WCAG mappings.

**What the user should do next**  
Use this as the main working list for fixing and triaging results.

**Limitations**  
This section only reflects the current tested state and current support boundary.

**Privacy/storage note**  
Issue selectors, snippets, local annotations, and exports can include sensitive page details and stay local until you export them.

**Example**  
After `Run WCAG Scan`, use `Scan Results` to review the highest-severity confirmed issues first.

### Confirmed Issues

**What it does**  
Shows findings treated as confirmed issues for the tested state.

**Where the count comes from**  
From classified scan issues of type `deterministic_failure` and `corroborated_failure`, including preserved axe-core violations and deterministic custom findings.

**How it is classified**  
confirmed issue

**Does it map to WCAG?**  
Yes, where the finding includes a WCAG mapping.

**What the user should do next**  
Review, fix, and rescan.

**Limitations**  
Confirmed does not mean the rest of the page passed.

**Example**  
A preserved axe violation with `critical` impact appears here as a confirmed issue.

### Manual / Incomplete / Review Items

**What it does**  
Shows items that still need context, manual judgement, or broader state coverage.

**Where the count comes from**  
From classified review items, including axe `incomplete`, engine-limited review, state-limited review, visual composition review, and human judgement review.

**How it is classified**  
manual/review item

**Does it map to WCAG?**  
Depends on manual review.

**What the user should do next**  
Inspect the affected element or flow before treating it as a failure.

**Limitations**  
These items are not auto-confirmed defects.

**Example**  
A link-purpose candidate that needs surrounding context appears here, not in Confirmed Issues.

### Critical / Serious / Moderate / Minor severity

**What it does**  
Lets you read and filter confirmed issues by severity.

**Where the count comes from**  
From confirmed-only severity buckets derived from axe impact or equivalent confirmed deterministic severity.

**How it is classified**  
confirmed issue

**Does it map to WCAG?**  
Yes, where the underlying finding includes WCAG mapping.

**What the user should do next**  
Fix `Critical` and `Serious` first, then `Moderate`, then `Minor`.

**Limitations**  
These counts do not include review items, advisory notes, or limitations.

**Example**  
If `Critical 2` is shown, there are two confirmed critical issues in the current scan set.

### Visual Composition Review

**What it does**  
Visual Composition Review means the scanner found items that may require visual judgement. These may relate to layout, spacing, overlays, focus visibility, visual grouping, contrast-adjacent concerns, or visual relationships that automated tools cannot confirm reliably. These are not automatically confirmed WCAG failures. They should be reviewed manually before being treated as defects.

**Where the count comes from**  
From custom review-oriented classification in the current issue set, not from confirmed severity counts. In the current implementation this bucket comes from product-owned review logic and review-classified findings, not from the confirmed severity buckets. It is separate from `Critical`, `Serious`, `Moderate`, and `Minor`.

**How it is classified**  
manual/review item

**Does it map to WCAG?**  
Depends on manual review.

**What the user should do next**  
Review the affected area visually and decide whether there is a real accessibility defect. If the item is attached to a specific selector, use `Highlight element` to inspect the target in context and then decide whether it should be treated as a real defect.

**Limitations**  
These items are not automatically confirmed WCAG failures. The number shown is the number of current findings routed into this review-oriented category. It does not mean all of them fail. It also does not mean axe-core proved them; this is a custom A11Y Cat review bucket.

**Privacy/storage note**  
Affected selectors and evidence can appear in local exports. These items are exportable in JSON and CSV with review/advisory classification rather than confirmed-failure classification.

**Example**  
A visually ambiguous overlay relationship can appear as `Visual Composition Review`, not as a confirmed issue.

### Human Judgement Review

**What it does**  
Human Judgement Review means automation found something that may need a person to confirm. The scanner is not saying the item definitely fails. It is saying the issue cannot be safely decided by automation alone.

**Where the count comes from**  
From custom human-review classification in the current issue set. This bucket is used for context-sensitive items such as accessible name quality, link purpose, visual meaning, content clarity, context-dependent controls, and some state-dependent behaviour.

**How it is classified**  
manual/review item

**Does it map to WCAG?**  
Depends on manual review.

**What the user should do next**  
Check the content in context and decide whether it is truly unclear, misleading, or inaccessible. Use the issue details, selector, and highlight action to inspect the affected content before deciding whether it is a real defect.

**Limitations**  
The scanner is not saying the item definitely fails. This bucket exists precisely because automation alone is not enough for these cases.

**Example**  
Accessible-name quality, link purpose, visual meaning, content clarity, context-dependent controls, or state-dependent behaviour can appear here.

### Deterministic Failures

**What it does**  
Represents findings confirmed by deterministic rule execution on the tested state.

**Where the count comes from**  
From issue types classified as `deterministic_failure`.

**How it is classified**  
confirmed issue

**Does it map to WCAG?**  
Yes, where the finding includes WCAG mapping.

**What the user should do next**  
Treat them as concrete defects to review and fix.

**Limitations**  
Deterministic does not mean the whole user journey was tested.

**Example**  
A deterministic form-label failure falls into this class.

### Corroborated Failures

**What it does**  
Represents confirmed findings with deterministic proof plus corroborating evidence.

**Where the count comes from**  
From issue types classified as `corroborated_failure`.

**How it is classified**  
confirmed issue

**Does it map to WCAG?**  
Yes, where the finding includes WCAG mapping.

**What the user should do next**  
Review and fix like other confirmed issues.

**Limitations**  
Corroborated still applies only to the tested state and evidence collected.

**Example**  
A finding confirmed by deterministic analysis and supporting evidence is classified here.

### Engine-limited Review

**What it does**  
Engine-limited Review means the scanner or underlying engine could not fully determine the result. This may come from axe incomplete results, blocked inspection, unavailable state, unsupported browser context, or missing computed information.

**Where the count comes from**  
From review classification, including axe `incomplete`, blocked inspection cases, unsupported runtime contexts, unavailable computed information, and other engine-boundary conditions that stop the scanner from making a safe confirmed determination.

**How it is classified**  
manual/review item

**Does it map to WCAG?**  
Depends on manual review.

**What the user should do next**  
Inspect manually and treat the item as unresolved until reviewed. Check diagnostics and scan limitations if you need to understand why the engine could not finish the determination.

**Limitations**  
This is not the same as pass. It is also not automatically fail. The user still needs to inspect manually before treating the item as a real defect or a non-issue.

**Example**  
An axe `incomplete` result is routed into engine-limited review rather than confirmed failure.

### State-limited Review

**What it does**  
State-limited Review means the scanner evaluated the page in the current state only. It may not have opened menus, dialogs, accordions, filters, tabs, validation messages, hover states, or authenticated states unless those were present during the scan.

**Where the count comes from**  
From stateful-scan review generation and state-limited classification. The current implementation can run bounded state passes, but it still routes unresolved state coverage into review rather than claiming those unseen states passed.

**How it is classified**  
manual/review item

**Does it map to WCAG?**  
Depends on manual review.

**What the user should do next**  
Manually test menus, dialogs, accordions, filters, tabs, validation messages, hover states, authenticated states, and any other hidden or delayed UI states that were not present during the scan. Stateful testing matters because many accessibility defects only appear after interaction, not in the default state.

**Limitations**  
The current scan does not automatically open every stateful control or navigate every application flow. This means the current page state can look cleaner than the full user journey actually is.

**Example**  
A menu, dialog, validation error, or authenticated view that was not open during the scan may produce state-limited review guidance.

### Scan Limitations

**What it does**  
Shows what the scanner could not inspect or could inspect only partially.

**Where the count comes from**  
From coverage analysis, blocked contexts, inaccessible frames, unsupported pages, and runtime limitation issues.

**How it is classified**  
diagnostic/limitation

**Does it map to WCAG?**  
Not directly.

**What the user should do next**  
Review the limitation before trusting the absence of findings in that area.

**Limitations**  
A limitation is evidence of incomplete coverage, not a pass.

**Example**  
A cross-origin frame that could not be inspected contributes to scan limitations.

### Previous Scan Comparison

**What it does**  
Compares the current scan with the newest earlier saved scan for the same page scope.

**Where the count comes from**  
From local history entries stored after completed scans. Each saved entry includes the page URL, derived domain and path, comparison scope key and label, scan timestamp fields, runtime mode, issue-type counts, total issue count, deduped finding fingerprints, reduced fingerprint metadata, and delta counts against the previous same-scope baseline.

**How it is classified**  
diagnostic/limitation

**Does it map to WCAG?**  
Not directly.

**What the user should do next**  
Use it to see what is new, resolved, or unchanged since the previous same-scope scan.

**Limitations**  
It does not compare by page title, current tab identity, or the latest scan globally. It matches by page scope only. If no previous same-scope scan exists, comparison stays unavailable or empty rather than comparing against an unrelated scan.

**Privacy/storage note**  
Comparison uses locally stored scan history in Chrome extension storage. Matching uses `origin + pathname` as the comparison scope. Query strings and hash fragments are ignored for baseline matching. Recent history keeps up to `60` entries and archived history keeps up to `240` older entries. Saved history can be cleared from `Dashboard` -> `Scan history` -> `Clear saved history`, or from `Scan Results` -> `Privacy and data use` -> `Clear all local extension data`.

**Example**  
If a second scan on the same origin and path adds one new issue, comparison shows that new count.

### Broken Links

**What it does**  
Checks visible page anchors and keeps every outcome visible: broken, valid, skipped, unverified, timeout, or restricted.

**Where the count comes from**  
From custom link checking over visible anchors. Same-origin page links can be verified with same-origin `HEAD` and, if needed, `GET` requests. Cross-origin links are not fetched automatically and are kept as `unverified`. In-page fragment links are checked against the current document. Empty `href`, placeholder `#`, `javascript:`, `mailto:`, and `tel:` links are skipped or classified separately. Unsupported or restricted schemes are marked `restricted`.

**How it is classified**  
advisory

**Does it map to WCAG?**  
Not directly.

**What the user should do next**  
Review broken destinations, then inspect unverified or timeout cases manually if they matter.

**Limitations**  
A broken link is not always an accessibility failure by itself. This tool checks destination quality and user-flow integrity, but it is not a direct WCAG pass/fail verdict on its own. `unverified` means the extension did not automatically fetch the destination, usually because it was cross-origin or otherwise not safely verifiable from the current page context. `timeout` means same-origin verification was attempted but did not complete inside the runtime timeout budget. `mailto:` and `tel:` links are intentionally skipped. In-page fragment links are treated as valid only when the target exists in the current document.

**Privacy/storage note**  
Same-origin checks can make same-origin `HEAD` or `GET` requests from the page context. That means the browser can request same-origin destinations while this tool runs. Cross-origin links stay `unverified` instead of being fetched automatically. Results can be exported locally.

**Example**  
A same-origin 404 link appears as `broken`; a cross-origin link stays `unverified`.

### Metadata Check

**What it does**  
Checks visible metadata signals such as Open Graph, social-preview-related metadata, and Schema.org/JSON-LD presence and parse quality.

**Where the count comes from**  
From custom metadata analysis in the scan engine. The current implementation explicitly checks Open Graph core tags such as `og:title`, `og:description`, `og:image`, and `og:type`, along with social-preview fallbacks such as Twitter title, description, and image fields. It also checks Schema.org presence across JSON-LD, Microdata, and RDFa detection paths, and checks whether JSON-LD blocks parse successfully.

**How it is classified**  
advisory

**Does it map to WCAG?**  
Advisory only.

**What the user should do next**  
Review invalid JSON-LD, missing metadata, or preview-image guidance if those matter to your project.

**Limitations**  
Missing metadata is not automatically a WCAG failure unless your project treats it as a requirement. Invalid JSON-LD is shown explicitly as a parse failure, not silently degraded into only “missing schema”. Missing Open Graph or Schema.org coverage stays advisory/review-oriented unless your project requires those fields for release.

**Privacy/storage note**  
Metadata checks can trigger normal image requests for declared preview images. Exported evidence can include page URL and metadata context.

**Example**  
Invalid JSON-LD is shown explicitly as a parse failure instead of only as missing schema.

### Language

**What it does**  
Runs deterministic language-markup checks and bounded language/spelling review across visible and accessibility text sources.

**Where the count comes from**  
From deterministic language checks plus review-oriented language and spelling analysis.

**How it is classified**  
advisory

**Does it map to WCAG?**  
Yes, where the language finding includes WCAG mapping; spelling remains advisory.

**What the user should do next**  
Review missing or invalid language markup first, then treat mismatch and spelling outputs as review guidance.

**Limitations**  
Heuristic language mismatch and spelling are not deterministic conformance verdicts.

**Privacy/storage note**  
Language and spelling analysis runs locally. The spelling allowlist is stored locally.

**Example**  
A page with invalid `lang` markup can produce a deterministic language issue while spelling remains advisory.

### Spelling Check

**What it does**  
Runs local spelling review using the bundled spelling engine and supported local dictionaries.

**Where the count comes from**  
From extracted text sources, language resolution, local allowlist handling, and supported-dictionary spelling analysis. The active runtime engine is `cspell`, loaded locally from bundled dictionaries.

**How it is classified**  
advisory

**Does it map to WCAG?**  
Advisory only.

**What the user should do next**  
Review suspected misspellings manually and ignore unsupported-language skips unless you decide to add support.

**Limitations**  
Spelling is advisory/editorial review, not a WCAG failure by itself. The current private-beta dictionary support is English only. The bundled English dictionary set is built from CSpell dictionaries and includes protected company, product, and software terms. Unsupported languages are skipped instead of being checked as English. Unknown language is also skipped instead of being treated as English. This means multilingual spelling coverage is intentionally limited in the current build.

**Privacy/storage note**  
Runs locally only. The custom spelling allowlist is stored locally. No page text is sent to a backend. Findings can include source context and selectors in export.

**Example**  
A real typo like `adress` can be flagged, while a protected term like `Coursera` is not.

### Language Mismatch

**What it does**  
Shows language-markup or language-content mismatch findings for the current page state.

**Where the count comes from**  
From custom language detection and language-source analysis over visible text and accessibility text. The implementation normalizes BCP 47 tags and compares expected primary language against detected or declared content language.

**How it is classified**  
advisory

**Does it map to WCAG?**  
Yes, where a language finding includes a direct WCAG mapping; otherwise it remains review guidance.

**What the user should do next**  
Review document language first, then inspect any mismatch candidates in context.

**Limitations**  
Language mismatch candidates can still need human judgement. Missing `lang` and invalid `lang` are deterministic markup problems. A generic language such as `en` is not automatically treated as a failure; in the current implementation it becomes an advisory note because generic language tags can still be valid. Regional tags such as `en-GB` and `en-US` are normalized to their primary language for some comparisons, but the original tag still matters for specificity and language-of-parts logic. The visible UI is a review surface; JSON export contains more technical language details such as detected language, normalized language values, source type, and evidence.

**Example**  
A mostly English page with a mismatched untranslated control may be surfaced for review.

### Detect language mismatch

**What it does**  
Runs the language-mismatch action inside the Language section.

**Where the count comes from**  
From custom language detection and language-source analysis over visible text and accessibility text.

**How it is classified**  
export/action feature

**Does it map to WCAG?**  
Yes, where a resulting finding includes a direct WCAG mapping; otherwise it remains review guidance.

**What the user should do next**  
Run it when you want mismatch candidates and language-markup findings for the current page state.

**Limitations**  
The action itself is just a trigger; the resulting candidates can still need human review.

**Example**  
Click `Detect language mismatch` to populate language findings for the current page state.

### Headings

**What it does**  
Builds the page heading outline in order and reports structural heading findings.

**Where the count comes from**  
From custom heading extraction and heading-structure checks.

**How it is classified**  
confirmed issue

**Does it map to WCAG?**  
Yes, where a heading finding includes WCAG mapping.

**What the user should do next**  
Review the outline and fix heading order, missing headings, or invalid heading patterns.

**Limitations**  
A structural outline does not prove content quality or page meaning by itself.

**Example**  
A heading jump from `h1` to `h4` can appear as a heading-structure finding.

### Heading Structure

**What it does**  
Represents the heading-outline and heading-order results shown by the Headings section.

**Where the count comes from**  
From custom heading extraction and heading-structure analysis.

**How it is classified**  
confirmed issue

**Does it map to WCAG?**  
Yes, where a finding includes WCAG mapping.

**What the user should do next**  
Review the ordered outline and fix structural heading defects before rescanning.

**Limitations**  
The heading outline does not prove the page content is understandable by itself.

**Example**  
If the page skips levels or uses empty headings, Heading Structure surfaces that in the Headings section.

### Analyze heading structure

**What it does**  
Runs the heading analysis action and populates the Headings section.

**Where the count comes from**  
From custom heading extraction and heading evaluation.

**How it is classified**  
confirmed issue

**Does it map to WCAG?**  
Yes, where a resulting finding includes WCAG mapping.

**What the user should do next**  
Run it after the page is in the state you want to review and then inspect the ordered outline.

**Limitations**  
The analysis only reflects the current page state.

**Example**  
After opening a page section, run heading analysis to verify the headings in that state.

### Alt Text Analysis

**What it does**  
Reviews image alt-text quality and flags likely failures, review flags, and good/no-finding cases.

**Where the count comes from**  
From custom alt-text analysis and manual-review flag generation.

**How it is classified**  
manual/review item

**Does it map to WCAG?**  
Depends on the specific finding and manual review.

**What the user should do next**  
Review images with poor or review-needed outcomes and confirm whether the alt text matches the image’s purpose in context.

**Limitations**  
Alt-text quality is context-dependent and not every image judgment is deterministic.

**Privacy/storage note**  
Results can include selectors and short evidence text. Export stays local unless shared.

**Example**  
A decorative image with empty `alt` can be rated good, while a meaningful image with weak alt text can be flagged for review.

### Analyze Alt Text

**What it does**  
Runs the alt-text analysis action and populates the Alt Text Analysis section.

**Where the count comes from**  
From custom image analysis on the current page state.

**How it is classified**  
manual/review item

**Does it map to WCAG?**  
Depends on the resulting finding and manual review.

**What the user should do next**  
Use it after the relevant page content has loaded, then review poor or review-needed rows.

**Limitations**  
It cannot infer full image meaning without context.

**Example**  
A linked image with surrounding link text can be recognized as acceptable rather than being flagged automatically.

### Screen Reader Review

**What it does**  
Provides a structured virtual review aid for reading order, keyboard path, announced text, manual review notes, automated review findings, and virtual QA handover output.

**Where the count comes from**  
From virtual screen-reader review state, automated capture, interaction logs, finding status overrides, manual findings, and local manual review state. In the current UI there is an automated-review mode and a manual-review workspace.

**How it is classified**  
manual/review item

**Does it map to WCAG?**  
Depends on manual review.

**What the user should do next**  
Use the automated review view to inspect deterministic findings, manual-review-required findings, and diagnostics captured during the virtual session. Use the manual review workspace to record reviewer judgement, create manual-only findings, and track finding lifecycle status. Then confirm important flows with real assistive technology such as NVDA, JAWS, or VoiceOver.

**Limitations**  
This is a virtual or simulated review aid. It is not real NVDA, JAWS, or VoiceOver testing, and it must not be treated as real screen-reader sign-off. The tool itself says it is Guidepup virtual spoken output for review support, not a real AT session. Top-document traversal is supported, but complex iframe or broader environment scenarios can still require additional manual validation.

**Privacy/storage note**  
Saved virtual review state is stored locally. The UI can export the virtual interaction log as JSON or TXT, and export a unified QA report as JSON or HTML. Logged data can include spoken-output phrases, event history, selectors, automated findings, manual findings, overrides, and reviewer notes.

**Example**  
Use Screen Reader Review to document a keyboard path before validating the same flow in a real screen reader.

### Metadata Check button

**What it does**  
Runs the metadata analysis action.

**Where the count comes from**  
From custom metadata checks in the current page state.

**How it is classified**  
export/action feature

**Does it map to WCAG?**  
Advisory only.

**What the user should do next**  
Run it when metadata quality matters for the page you are reviewing.

**Limitations**  
It does not change whether the page is accessible by itself.

**Example**  
Click `Check Metadata` to inspect Open Graph and JSON-LD issues before a content release.

### Broken Links button

**What it does**  
Runs the broken-links action.

**Where the count comes from**  
From visible anchors found on the current page and same-origin verification where allowed.

**How it is classified**  
export/action feature

**Does it map to WCAG?**  
Not directly.

**What the user should do next**  
Run it when link destinations are important to the reviewed page.

**Limitations**  
Cross-origin links remain unverified and broken links are not automatically accessibility failures.

**Example**  
Run `Check broken links` on a page before QA handoff.

### Page Text Scale

**What it does**  
Adjusts page text scale for accessibility scenarios without resizing the extension UI.

**Where the count comes from**  
User action only. This is a control, not a finding counter.

**How it is classified**  
export/action feature

**Does it map to WCAG?**  
Not directly.

**What the user should do next**  
Use it to inspect how page content behaves when text scale changes.

**Limitations**  
The current visible UI label is `Page Text Scale`, not `Page Reflow`. This control lets you inspect text scaling behavior, but it is not currently a full automated reflow checker. It does not by itself prove or measure all reflow-related concerns such as horizontal overflow, clipping, fixed-width layouts, or viewport constraint failures. It is best treated as a manual inspection aid that can support WCAG 1.4.10 review rather than a confirmed automated reflow verdict. A rename to `Page Reflow` would need separate implementation and documentation work if the product scope changes.

**Example**  
Increase page text scale and check whether key content still remains usable.

### Manual Checks

**What it does**  
Holds manual review workflow material that the automated scan cannot close out safely.

**Where the count comes from**  
From manual-review generation and user-driven review work.

**How it is classified**  
manual/review item

**Does it map to WCAG?**  
Depends on manual review.

**What the user should do next**  
Use it after the automated scan and review items to complete manual validation steps.

**Limitations**  
The section organizes work; it does not auto-confirm pass/fail.

**Example**  
Use Manual Checks to track items that require keyboard or content-context review.

### Diagnostics

**What it does**  
Shows structured runtime signals, scan limitations, support boundaries, suppression bookkeeping, and grouped page/runtime diagnostics.

**Where the count comes from**  
From runtime diagnostics, exclusion diagnostics, capability evaluation, and latest scan coverage state.

**How it is classified**  
diagnostic/limitation

**Does it map to WCAG?**  
Not directly.

**What the user should do next**  
Review diagnostics when scan behavior looks incomplete, blocked, or inconsistent.

**Limitations**  
Diagnostics are structured runtime signals, not a full DevTools log. Pre-attach events can be missing because some page events can happen before the extension bridge is attached. Protected, inaccessible, or unsupported frames can also be missing from what the diagnostics captured. Empty diagnostics does not always prove the page was fully inspectable. The diagnostics JSON is better suited to technical troubleshooting than to end-user accessibility interpretation. In the UI, the diagnostics panel is a collapsible details panel and the JSON is shown inside it rather than as always-visible top-level content.

**Privacy/storage note**  
Diagnostics JSON can include page URL, runtime details, and suppressed-finding bookkeeping. It stays local unless exported.

**Example**  
If a frame could not be scanned, diagnostics will show the boundary instead of pretending the frame passed.

### Exports and local state

**What it does**  
Groups export actions and local workflow-state actions under `More tools`.

**Where the count comes from**  
User action and current scan/workflow state.

**How it is classified**  
export/action feature

**Does it map to WCAG?**  
Not directly.

**What the user should do next**  
Use exports for handoff, evidence, or local workflow persistence.

**Limitations**  
Exports reflect the current saved state and current scan snapshot only.

**Privacy/storage note**  
Exports can include page URL, selectors, snippets, local annotations, and scan evidence.

**Example**  
Open `More tools` to export a CSV issue log or JSON evidence bundle.

### Exports

**What it does**  
Collects the visible export actions for issue logs, evidence bundles, local issue-state bundles, diagnostics JSON, release discussion JSON, and screen-reader review exports.

Format:
- CSV for flat issue logs
- JSON for evidence bundles, diagnostics, local issue-state, and release discussion summary
- TXT, JSON, and HTML for visible Screen Reader Review exports

What it contains:
- the current scan snapshot, workflow state, or review state relevant to the export you choose

What it does not contain:
- a live connection to the page after export
- proof that manual review is complete
- proof that the page is WCAG compliant

**Where the count comes from**  
From current scan state, local workflow state, diagnostics state, and virtual screen-reader review state.

**How it is classified**  
export/action feature

**Does it map to WCAG?**  
Not directly. Exported findings may include WCAG mappings where the underlying findings have them.

**What the user should do next**  
Choose the export that matches your handoff need: CSV for issue logs, JSON for provenance and diagnostics, local issue-state for local workflow continuity, and screen-reader exports for virtual review evidence.

**Limitations**  
Exports preserve the current saved state only. They do not prove the page still matches an older scan or that a manual review is complete.

**Privacy/storage note**  
Exports are local-only downloads from the extension. They can include selectors, snippets, page URL, page title, local notes, diagnostics, and review state. Review content before sharing.

**Example**  
Use CSV for spreadsheet triage and JSON when you need full technical provenance.

### Export issue log (CSV)

**What it does**  
Exports the current issue set as a CSV issue log.

Format:
- CSV

What it contains:
- one flat row per exported finding
- category and classification fields
- source engine
- rule id
- severity
- WCAG references where present
- selector/target references
- title/help text
- local workflow fields where present

What it does not contain:
- nested diagnostic objects
- full evidence provenance
- full screen-reader review logs
- full local-history records

**Where the count comes from**  
From the current classified finding set.

**How it is classified**  
export/action feature

**Does it map to WCAG?**  
Yes, where exported findings include WCAG mappings.

**What the user should do next**  
Use it for triage spreadsheets or issue handoff.

**Limitations**  
CSV is a flat export and does not preserve nested UI structure.

**Privacy/storage note**  
This is a local-only download. It can include selectors, page URL, page title, rule ids, WCAG references, and local status fields.

**Example**  
Export CSV when a team wants a spreadsheet-compatible issue list.

### Export evidence bundle (JSON)

**What it does**  
Exports the canonical evidence bundle with category splits and provenance.

Format:
- JSON

What it contains:
- confirmed findings
- review/manual findings
- advisory notes
- limitations
- diagnostics
- source attribution
- classification
- axe provenance where present
- evidence details
- export category splits

What it does not contain:
- a fresh live rescan
- a guarantee that every issue still exists after export
- real assistive-technology sign-off

**Where the count comes from**  
From the current canonical scan bundle.

**How it is classified**  
export/action feature

**Does it map to WCAG?**  
Yes, where findings in the bundle include WCAG mapping.

**What the user should do next**  
Use it when technical provenance, diagnostics, and category boundaries need to be preserved.

**Limitations**  
The bundle still reflects the current scan snapshot only.

**Privacy/storage note**  
This is a local-only download. It may include selectors, evidence snippets, page URL, page title, diagnostic state, and local annotations. Some evidence is explicitly marked sensitive. Review before sharing.

**Example**  
Export the evidence bundle for engineering handoff when CSV is too lossy.

### Export local issue-state bundle (JSON)

**What it does**  
Exports saved local workflow annotations and issue-state data.

Format:
- JSON

What it contains:
- local issue statuses
- local annotations/notes
- local workflow identifiers needed to restore issue-state data

What it does not contain:
- a full evidence bundle
- a fresh scan result set
- proof that the imported issue-state still matches the current page

**Where the count comes from**  
From local workflow state stored in extension storage.

**How it is classified**  
local workflow state

**Does it map to WCAG?**  
Not directly.

**What the user should do next**  
Use it to move local triage state between extension runs or browser profiles if your workflow needs that.

**Limitations**  
It exports local browser-profile workflow state, not shared organizational governance.

**Privacy/storage note**  
This is a local-only download. It contains locally stored annotations and issue statuses, and it can be used to restore those states later. It does not include the full scan evidence needed to justify those statuses on its own.

**Example**  
Export local issue-state before clearing your browser profile.

### Import local issue-state bundle

**What it does**  
Imports a previously exported local issue-state bundle.

**Where the count comes from**  
User action and imported local workflow data.

**How it is classified**  
local workflow state

**Does it map to WCAG?**  
Not directly.

**What the user should do next**  
Use it only when you trust the imported local workflow bundle.

**Limitations**  
Imported workflow state does not prove the current page still matches the old findings.

**Privacy/storage note**  
Writes local workflow annotations into extension storage.

**Example**  
Import a local bundle to restore saved issue statuses after moving to another browser profile.

### CSV issue export

**What it does**  
Exports the current issue log as CSV.

Format:
- CSV

What it contains:
- one flat row per exported finding
- category/classification
- source engine
- rule id
- severity
- WCAG references where present
- selector/target references
- local workflow fields where present

What it does not contain:
- full nested evidence provenance
- full diagnostics objects
- screen-reader review logs

**Where the count comes from**  
From the current classified issue set in Scan Results.

**How it is classified**  
export/action feature

**Does it map to WCAG?**  
Yes, where exported findings include WCAG mapping.

**What the user should do next**  
Use it for spreadsheets, simple triage lists, and defect intake workflows.

**Limitations**  
CSV is a flat format and does not preserve nested UI context.

**Privacy/storage note**  
This is a local-only download. It may include page URL, page title, selectors, rule ids, WCAG references, and local workflow fields.

**Example**  
Use CSV export for a spreadsheet-based QA backlog.

### JSON evidence export

**What it does**  
Exports the structured evidence bundle as JSON.

Format:
- JSON

What it contains:
- confirmed findings
- review/manual findings
- advisory notes
- limitations
- diagnostics
- provenance and evidence details

What it does not contain:
- a fresh rescan
- proof that the page still matches the exported snapshot
- real assistive-technology sign-off

**Where the count comes from**  
From the current canonical bundle of confirmed findings, review items, advisory notes, limitations, and diagnostics.

**How it is classified**  
export/action feature

**Does it map to WCAG?**  
Yes, where findings in the bundle include WCAG mapping.

**What the user should do next**  
Use it when you need full provenance, classification, diagnostics, and export category boundaries.

**Limitations**  
The bundle reflects the current scan snapshot only.

**Privacy/storage note**  
This is a local-only download. It may include selectors, snippets, page URL, page title, diagnostics, and local annotations. Review before sharing.

**Example**  
Use JSON evidence export for engineering handoff when CSV does not preserve enough context.

### Local issue tracking

**What it does**  
Lets you assign a local issue status and local note to an individual issue.

**Where the count comes from**  
From saved local workflow state per issue identity.

**How it is classified**  
local workflow state

**Does it map to WCAG?**  
Not directly.

**What the user should do next**  
Use it to track local triage progress such as open, needs review, false positive, or fixed pending retest.

**Limitations**  
This state is local to the current browser profile and depends on stable issue identity.

**Privacy/storage note**  
Stored only in the local browser profile.

**Example**  
Mark an issue as `needs_review` and save a note about why it is blocked.

### Issue status/workflow controls

**What it does**  
Lets you set a local issue status, add a local note, and save that local issue annotation.

**Where the count comes from**  
From local workflow state stored per issue identity in extension storage.

**How it is classified**  
local workflow state

**Does it map to WCAG?**  
Not directly.

**What the user should do next**  
Use the controls to track local triage outcomes such as `Open`, `Needs review`, `False positive`, `Accepted temporarily`, or `Fixed pending retest`.

**Limitations**  
These controls are local workflow aids only. They do not change the underlying scan classification.

**Privacy/storage note**  
Stored only in the current browser profile.

**Example**  
Set a finding to `False positive` and save a note explaining why.

### Save local annotation

**What it does**  
Persists the current local issue status and note.

**Where the count comes from**  
User action and local workflow state storage.

**How it is classified**  
local workflow state

**Does it map to WCAG?**  
Not directly.

**What the user should do next**  
Use it after updating the local issue status or note.

**Limitations**  
Saved annotation is not a central issue tracker update.

**Privacy/storage note**  
Stored locally only.

**Example**  
Save a local note saying the issue is blocked pending design confirmation.

### Issue filter

**What it does**  
Searches the current issue list by title, selector, WCAG criterion, or rule id.

**Where the count comes from**  
From user-entered filter text applied to the current issue set.

**How it is classified**  
export/action feature

**Does it map to WCAG?**  
Not directly.

**What the user should do next**  
Use it to narrow the issue list when you are working on a specific rule, selector, or criterion.

**Limitations**  
It filters what you see; it does not change the underlying scan results.

**Example**  
Search for `1.3.1` to find findings mapped to that WCAG criterion.

### Severity filters

**What it does**  
Lets you show or hide issue rows by confirmed severity and review bucket.

**Where the count comes from**  
From the current classified issue set and confirmed-only severity bucket logic.

**How it is classified**  
export/action feature

**Does it map to WCAG?**  
Not directly. It filters findings that may include WCAG mapping.

**What the user should do next**  
Use it to focus on the highest-priority confirmed issues or to isolate review items.

**Limitations**  
Filtering changes visibility only, not classification.

**Example**  
Turn off `Minor` and `Review` to focus only on `Critical` and `Serious` items.

### Search/filter controls

**What it does**  
Includes the issue search field, severity filters, issue-type filters, WCAG coverage filters, and related dashboard filter tabs.

**Where the count comes from**  
From current scan results, current dashboard filter state, and user-entered filter choices.

**How it is classified**  
export/action feature

**Does it map to WCAG?**  
Not directly. Filters can expose findings that carry WCAG mappings.

**What the user should do next**  
Use these controls to narrow the visible problem set to the area you are actively fixing or reviewing.

**Limitations**  
Filtering changes the visible subset only. It does not recalculate the underlying findings.

**Example**  
Use the search field and severity filters together to isolate one WCAG criterion on a specific component.

### Review critical issues button

**What it does**  
Applies a critical-only severity preset and opens the issue list.

**Where the count comes from**  
From the current `Critical` confirmed-only severity bucket.

**How it is classified**  
export/action feature

**Does it map to WCAG?**  
Not directly. It filters findings that may include WCAG mapping.

**What the user should do next**  
Use it as the fastest route to the highest-priority confirmed items.

**Limitations**  
It only reflects the current scan snapshot.

**Example**  
Click `Review critical issues` right after a scan to jump straight to the critical list.

### Review manual/incomplete items button

**What it does**  
Applies the review-and-limitations preset and opens the issue list.

**Where the count comes from**  
From review-item and limitation counts in the current issue set.

**How it is classified**  
export/action feature

**Does it map to WCAG?**  
Depends on the underlying reviewed items.

**What the user should do next**  
Use it after working through confirmed issues.

**Limitations**  
It does not decide which review items are real failures.

**Example**  
Click it to focus on `Needs review` and `Coverage gaps` items.

### Inspect scan limitations button

**What it does**  
Opens the diagnostics/limitations panel from the dashboard.

**Where the count comes from**  
From the latest scan coverage and diagnostics state.

**How it is classified**  
diagnostic/limitation

**Does it map to WCAG?**  
Not directly.

**What the user should do next**  
Use it whenever the scan was partial, blocked, or suspiciously quiet.

**Limitations**  
It opens diagnostics; it does not repair missing coverage.

**Example**  
If a page has inaccessible frames, use this button to inspect the limitation details.

### Compare with previous scan button

**What it does**  
Opens the comparison baseline panel from the dashboard.

**Where the count comes from**  
From local scan history for the same `origin + pathname` scope.

**How it is classified**  
diagnostic/limitation

**Does it map to WCAG?**  
Not directly.

**What the user should do next**  
Use it after a second or later scan on the same page scope.

**Limitations**  
If no previous same-scope scan exists, comparison is empty.

**Privacy/storage note**  
Uses locally stored scan history only.

**Example**  
After fixing issues on the same page path, compare to see what resolved.

### Dashboard/history comparison

**What it does**  
Shows baseline selection, current-vs-previous comparison, current-vs-selected-baseline comparison, and scan-history context in the dashboard advanced panels.

**Where the count comes from**  
From locally stored scan history entries, baseline selection, and delta counts between fingerprint sets.

**How it is classified**  
diagnostic/limitation

**Does it map to WCAG?**  
Not directly.

**What the user should do next**  
Use it to understand whether an issue is new, resolved, or unchanged in the same page scope.

**Limitations**  
Comparison depends on available same-scope history and does not compare by page title or tab identity.

**Privacy/storage note**  
Uses local history stored in Chrome extension storage.

**Example**  
Select an older same-scope baseline to compare a new scan against a specific earlier state.

### Highlight element action

**What it does**  
Highlights the issue element on the page.

**Where the count comes from**  
User action and the issue’s stored selector/evidence target.

**How it is classified**  
export/action feature

**Does it map to WCAG?**  
Not directly.

**What the user should do next**  
Use it to find the affected element quickly before inspecting or fixing it.

**Limitations**  
Highlighting depends on the selector still matching the current page.

**Example**  
Click `Highlight element` to locate the control associated with a form-label issue.

### Copy selector action

**What it does**  
Copies the issue selector to the clipboard.

**Where the count comes from**  
User action and the issue’s selector.

**How it is classified**  
export/action feature

**Does it map to WCAG?**  
Not directly.

**What the user should do next**  
Use it to share or inspect the target element in dev tools or handoff notes.

**Limitations**  
The selector is a locator aid, not proof that the current DOM still matches the earlier scan perfectly.

**Example**  
Copy the selector into dev tools to inspect the failing node.

### More actions

**What it does**  
Opens the secondary action row for the current issue.

**Where the count comes from**  
User action only.

**How it is classified**  
export/action feature

**Does it map to WCAG?**  
Not directly.

**What the user should do next**  
Open it when you need handoff or secondary issue actions beyond highlight/copy.

**Limitations**  
Available actions can vary by delivery channel and product boundary.

**Example**  
Open `More actions` to access `Create handoff draft`.

### Turn into ticket action

**What it does**  
In the current extension issue-card path, the visible ticket-style action is `Create handoff draft`. Some non-extension rendering paths use a `Turn into a ticket` label, but that is not the main shipped extension card label.

**Where the count comes from**  
User action and the current issue evidence.

**How it is classified**  
export/action feature

**Does it map to WCAG?**  
Not directly.

**What the user should do next**  
Use the visible ticket/handoff action when you need to turn a finding into a structured handoff item.

**Limitations**  
The exact visible label is product-surface-dependent. In the shipped extension issue cards, the current label is `Create handoff draft`.

**Privacy/storage note**  
Drafted content can include selectors, titles, rule ids, and descriptions.

**Example**  
Use `Create handoff draft` to prepare a ticket-style handoff for a confirmed issue.

### Explain with AI / Draft AI handoff

**What it does**  
These AI-labelled secondary issue actions still appear in the current extension issue-card renderer path.

**Where the count comes from**  
User action only.

**How it is classified**  
export/action feature

**Does it map to WCAG?**  
Not directly.

**What the user should do next**  
Treat these as visible but product-boundary-sensitive actions. Do not treat them as deterministic evidence or as a substitute for the main scan outputs.

**Limitations**  
The public product docs say the public package does not expose AI assistance as a stable release feature. These buttons are therefore a visible product-boundary inconsistency, not a basis for overclaiming AI support.

**Example**  
If you see `Explain with AI` in an issue card, treat it as a secondary helper action, not part of the confirmed scanner verdict.

### Create handoff draft

**What it does**  
Creates a structured handoff draft for the current issue.

**Where the count comes from**  
User action and the current issue evidence.

**How it is classified**  
export/action feature

**Does it map to WCAG?**  
Not directly.

**What the user should do next**  
Use it when you need to turn a finding into a QA or engineering handoff note.

**Limitations**  
It drafts handoff content from current issue evidence; it does not fix or verify the issue.

**Privacy/storage note**  
Draft content can include selectors, titles, rule ids, and issue descriptions.

**Example**  
Use it to prepare a defect handoff from a confirmed issue card.

### Route and freshness checks

**What it does**  
Shows route-monitor state and lets you enable auto-rescan on route changes.

**Where the count comes from**  
From route-monitor state and user preference.

**How it is classified**  
export/action feature

**Does it map to WCAG?**  
Not directly.

**What the user should do next**  
Use it on client-side routed apps when page content changes without a full reload.

**Limitations**  
Auto-rescan only helps if route changes are detectable in the current runtime.

**Privacy/storage note**  
The auto-rescan preference is stored locally.

**Example**  
Enable auto-rescan when testing a SPA that changes content by route.

### Local History

**What it does**  
Stores and displays recent and archived scan history used for previous-scan comparison and history browsing.

**Where the count comes from**  
From locally saved scan-history entries written after completed scans. The saved fields include full page URL, derived domain and path, comparison scope key and label, scan timestamp fields, runtime mode, issue-type counts, total issue count, deduped finding fingerprints, reduced fingerprint metadata, and delta counts against the previous same-scope baseline.

**How it is classified**  
local workflow state

**Does it map to WCAG?**  
Not directly.

**What the user should do next**  
Use it to compare scans across time for the same page scope and to understand what changed.

**Limitations**  
History is local to the current browser profile. Previous-scan comparison uses `origin + pathname` scope matching, not page title, not the latest scan globally, and not query-string or hash-specific variants.

**Privacy/storage note**  
Stored locally in `a11yCatScanHistoryV1` and `a11yCatScanHistoryArchiveV1`, with related dashboard comparison preferences in `a11yCatWorkflowStateV1`. Recent history keeps up to `60` entries and archived history keeps up to `240` older entries.

**Example**  
Use Local History to compare today’s scan of a page path to the most recent earlier scan of the same path.

### Local Data Clearing

**What it does**  
Provides the clear-all control for the extension’s local data contract.

**Where the count comes from**  
User action and local extension storage state.

**How it is classified**  
local workflow state

**Does it map to WCAG?**  
Not directly.

**What the user should do next**  
Use it when you need to remove saved settings, history, workflow state, virtual review state, benchmarks, and the spelling allowlist from the current profile.

**Limitations**  
It does not remove files you have already exported outside the extension.

**Privacy/storage note**  
Deletes the extension-managed local storage contract for the current browser profile.

**Example**  
Use Local Data Clearing before sharing a browser profile with another tester.

### History filters

**What it does**  
Filters visible saved history by `Domain`, `Page/path`, and `Sort`.

**Where the count comes from**  
From current local history entries plus the currently selected history filter values.

**How it is classified**  
local workflow state

**Does it map to WCAG?**  
Not directly.

**What the user should do next**  
Use it to narrow comparison candidates to the page scope or ordering you want.

**Limitations**  
Filtering affects the visible history set and baseline selection context only.

**Privacy/storage note**  
Filter preferences are stored locally with dashboard preferences.

**Example**  
Filter by domain and `/products` path to compare only product-page scans.

### Panel open/close controls

**What it does**  
Opens the extension panel from the toolbar action and closes it with the close button or keyboard dismissal behavior.

**Where the count comes from**  
User action only.

**How it is classified**  
export/action feature

**Does it map to WCAG?**  
Not directly.

**What the user should do next**  
Open the panel when you want to review the current tab and close it when you are done.

**Limitations**  
Opening the panel does not automatically prove the page is supported; some page categories still produce explicit limitations.

**Example**  
Open the panel from the toolbar, then close it with the visible close button when finished.

### Panel resize/move controls

**What it does**  
Provides visible keyboard-operable panel geometry controls under `Panel position and size`, plus pointer drag/resize affordances on the panel edges and corners.

**Where the count comes from**  
User action and saved panel geometry state.

**How it is classified**  
export/action feature

**Does it map to WCAG?**  
Not directly.

**What the user should do next**  
Use `Move up`, `Move left`, `Move right`, `Move down`, `Wider`, `Narrower`, `Taller`, and `Shorter` if pointer drag/resize is not suitable.

**Limitations**  
These controls change panel geometry only. They do not change scan behavior.

**Privacy/storage note**  
Panel geometry is stored locally as part of extension settings.

**Example**  
Open `Panel position and size` and press `Move right` if the panel is covering content you need to inspect.

### Settings/theme controls

**What it does**  
Includes extension-level preferences such as theme, route auto-rescan, dashboard history preferences, and saved panel geometry.

**Where the count comes from**  
From local extension settings and dashboard preference state.

**How it is classified**  
local workflow state

**Does it map to WCAG?**  
Not directly.

**What the user should do next**  
Adjust these controls to fit your testing workflow and readability needs.

**Limitations**  
These settings change extension behavior or appearance, not the page’s accessibility state.

**Privacy/storage note**  
Stored locally in extension storage.

**Example**  
Switch theme and enable route auto-rescan before testing a client-side routed app.

### Privacy and data use

**What it does**  
Explains what the extension reads, what stays local, what may leave the device, what storage keys are used, and how to clear local data.

**Where the count comes from**  
Static product behavior plus current storage contract.

**How it is classified**  
diagnostic/limitation

**Does it map to WCAG?**  
Not directly.

**What the user should do next**  
Read it before exporting or using features that store local state.

**Limitations**  
It explains current product behavior; it does not audit browser or OS behavior outside the extension.

**Privacy/storage note**  
This section is itself the privacy/storage note.

**Example**  
Use it to confirm that scan history and workflow notes are stored locally.

### Clear all local extension data

**What it does**  
Deletes saved extension settings, history, workflow annotations, virtual review state, benchmarks, and the spelling allowlist from the current browser profile.

**Where the count comes from**  
User action and local storage state.

**How it is classified**  
local workflow state

**Does it map to WCAG?**  
Not directly.

**What the user should do next**  
Use it when you need to reset the extension’s local state completely.

**Limitations**  
It removes local extension data; it does not change the page or clear exported files you already saved elsewhere.

**Privacy/storage note**  
Clears the current public local storage contract, including history and local annotations.

**Example**  
Use it before handing your browser profile to another tester.

### Theme toggle

**What it does**  
Switches the extension panel between light and dark themes.

**Where the count comes from**  
User action and saved theme preference.

**How it is classified**  
export/action feature

**Does it map to WCAG?**  
Not directly.

**What the user should do next**  
Use the theme that gives you the clearest working contrast and visual hierarchy.

**Limitations**  
This changes the extension UI theme, not the page theme.

**Privacy/storage note**  
The theme setting is stored locally.

**Example**  
Click the theme toggle to switch from light mode to dark mode.

### Diagnostics export/copy

**What it does**  
Provides `Copy diagnostics JSON` and `Export diagnostics JSON` in the diagnostics panel.

Format:
- copied JSON text
- downloaded JSON file

What it contains:
- current diagnostics summary
- runtime/support-boundary signals
- exclusion/suppression diagnostics
- limitation categories
- relevant scan troubleshooting state

What it does not contain:
- full issue-card workflow state
- full scan-history archive
- proof that the page was completely inspectable

**Where the count comes from**  
From the current diagnostics summary, exclusion diagnostics, support-boundary state, and latest scan diagnostics.

**How it is classified**  
export/action feature

**Does it map to WCAG?**  
Not directly.

**What the user should do next**  
Use these when you need technical troubleshooting evidence for runtime limits, suppressed findings, or blocked contexts.

**Limitations**  
Diagnostics JSON is troubleshooting data, not a compliance verdict.

**Privacy/storage note**  
Copy/export stays local to the browser unless you choose to paste or share it. It may include page URL, page title, runtime state, limitation categories, and suppression bookkeeping.

**Example**  
Export diagnostics JSON when a scan looks partial and engineering needs the runtime boundary details.

### Support diagnostics export

**What it does**  
In the current extension UI, the visible support-diagnostics export surface is the diagnostics-panel JSON copy/export actions.

Format:
- JSON copy/export via the diagnostics panel

What it contains:
- the same structured diagnostics payload shown in the diagnostics panel
- runtime troubleshooting details
- limitation and suppression context

What it does not contain:
- a complete issue-evidence bundle
- a formal release sign-off record
- proof that accessibility findings were resolved

**Where the count comes from**  
From current diagnostics state in the dashboard diagnostics panel.

**How it is classified**  
export/action feature

**Does it map to WCAG?**  
Not directly.

**What the user should do next**  
Use it for support or debugging handoff when a runtime problem needs technical evidence.

**Limitations**  
This export describes runtime/support state, not just accessibility findings.

**Privacy/storage note**  
This is local-only until you copy or share it. It may include runtime and page-context details, including page URL/title and support-boundary signals.

**Example**  
Use support diagnostics export when a restricted page or frame prevents normal scan coverage.

### Screen reader review export

**What it does**  
Exports the virtual Screen Reader Review interaction log and QA report in visible formats such as `Export JSON`, `Export TXT`, `Export QA report JSON`, and `Export QA report HTML`.

Format:
- JSON
- TXT
- QA report JSON
- QA report HTML

What it contains:
- virtual spoken-output logs
- interaction history
- manual review notes
- finding status overrides
- QA summary/report content

What it does not contain:
- real NVDA session logs
- real JAWS session logs
- real VoiceOver session logs
- proof of real assistive-technology sign-off

**Where the count comes from**  
From the current virtual screen-reader interaction log, manual findings, finding status overrides, and QA report summary state.

**How it is classified**  
export/action feature

**Does it map to WCAG?**  
Depends on the findings and manual review captured in the export.

**What the user should do next**  
Use it when you need a local artifact of the virtual review session or a QA handover report.

**Limitations**  
These exports are built from the virtual review aid, not from a real NVDA, JAWS, or VoiceOver session.

**Privacy/storage note**  
These are local-only exports until you share them. They can include spoken-output logs, selectors, page URL/title, finding status overrides, reviewer notes, and QA summary data.

**Example**  
Export QA report JSON after a virtual review session to hand off reviewer notes and manual findings.

### Performance benchmark export

**What it does**  
The runtime contains performance benchmark storage and export handlers, but I did not verify a visible benchmark export button in the current extension UI markup.

Format:
- JSON when exposed

What it contains:
- locally stored benchmark samples when the control is exposed

What it does not contain:
- accessibility issue evidence
- WCAG verdicts
- proof that the benchmark control is visible in every build

**Where the count comes from**  
From locally stored benchmark samples when benchmark export is exposed.

**How it is classified**  
diagnostic/limitation

**Does it map to WCAG?**  
Not directly.

**What the user should do next**  
Do not treat performance benchmark export as an active visible feature unless it is exposed in your current extension build.

**Limitations**  
This is intentionally not documented as an active visible control because I verified handlers but not a visible current UI button.

**Privacy/storage note**  
If exposed in your build, this would be a local-only export of locally recorded benchmark history.

**Example**  
If a future visible benchmark export button appears, it would export local benchmark history rather than accessibility findings.

### Close accessibility panel

**What it does**  
Closes the extension panel.

**Where the count comes from**  
User action only.

**How it is classified**  
export/action feature

**Does it map to WCAG?**  
Not directly.

**What the user should do next**  
Close the panel when you are done or need full-page space.

**Limitations**  
Closing the panel does not delete saved local state.

**Example**  
Press the close button after finishing a scan review.

### Dev Sandbox

**What it does**  
Provides a development/testing surface that remains visible in the current shipped extension path.

**Where the count comes from**  
User action and current sandbox state.

**How it is classified**  
export/action feature

**Does it map to WCAG?**  
Not directly.

**What the user should do next**  
Use it only if your workflow explicitly needs the sandbox tooling.

**Limitations**  
It is not part of the primary scan-results workflow.

**Example**  
Open Dev Sandbox when you need to inspect a development-only review tool path.

### Release discussion readiness (local aid)

**What it does**  
Provides a local readiness summary for release discussion based on current provenance, findings, comparison state, and manual-evidence state.

**Where the count comes from**  
From current release-readiness snapshot data, comparison state, and local manual-evidence state.

**How it is classified**  
diagnostic/limitation

**Does it map to WCAG?**  
Not directly.

**What the user should do next**  
Use it as a local discussion aid, not as a production sign-off source.

**Limitations**  
The UI itself calls this a local aid. It is not a formal release approval workflow.

**Privacy/storage note**  
Can be copied/exported locally as JSON summary data.

**Example**  
Use it to summarize whether critical issues or missing evidence still block release discussion.

### Release discussion summary export

**What it does**  
Provides the visible `Copy release discussion summary` and `Export release discussion summary (JSON)` actions for the local release-discussion aid.

Format:
- copied summary text
- downloaded JSON file

What it contains:
- the current local release-discussion summary
- readiness snapshot data
- supporting comparison/readiness context included by that summary

What it does not contain:
- a formal release approval record
- proof that production release criteria were met
- a fresh package verification run by itself

**Where the count comes from**  
From the current release-readiness snapshot, comparison state, and local manual-evidence state.

**How it is classified**  
export/action feature

**Does it map to WCAG?**  
Not directly.

**What the user should do next**  
Use it as a local release-triage handoff artifact, then verify release decisions against the actual package checks and review evidence.

**Limitations**  
The renderer labels this as a local aid. It is not a formal release-governance system and does not replace package verification or manual review.

**Privacy/storage note**  
Copy/export is local-only until you share it. It can include page URL/title, readiness summary data, and local supporting context.

**Example**  
Export the release discussion summary JSON before a release meeting so the team can review the current local readiness snapshot.

### Raw axe provenance

**What it does**  
Preserves the original axe-core rule metadata and node evidence so users can tell which confirmed or review item came directly from axe-core and what axe actually reported.

**Where the data comes from**  
From the original axe result payload kept on normalized findings, including rule id, impact, help text, help URL, description, tags, node targets, node HTML, and failure summaries.

**How it is classified**  
axe-core provenance metadata

**Does it map to WCAG?**  
Yes, where the preserved axe tags or mapped finding include WCAG references.

**What the user should do next**  
Use the preserved axe metadata when engineering, QA, or accessibility reviewers need rule-level evidence instead of a shortened UI summary.

**Limitations**  
Raw axe provenance does not prove full user impact by itself. It still reflects only the tested state and the engine output available at scan time.

**Privacy/storage note**  
Raw axe provenance is kept in local scan state and can appear in JSON evidence exports. CSV keeps only a reduced flat subset.

**Example**  
A confirmed button-name issue can retain the original axe `ruleId`, `impact`, `helpUrl`, and node target array in the JSON evidence bundle.

### Unsupported/restricted contexts

**What it does**  
Explains when the extension cannot fully inspect a page, frame, or runtime surface because browser, origin, policy, or platform boundaries limit what the scanner can access.

**Where the data comes from**  
From runtime diagnostics, blocked injection signals, restricted browser-page checks, frame access failures, and scan-limitation generation.

**How it is classified**  
diagnostic/limitation

**Does it map to WCAG?**  
Not directly.

**What the user should do next**  
Treat the affected surface as unverified and run manual review or an alternative test method for the blocked area.

**Limitations**  
Unsupported or restricted context output does not mean the blocked surface passed. It means the extension could not prove the result.

**Privacy/storage note**  
Restriction details can appear in local diagnostics and in exported support JSON or evidence bundles.

**Example**  
A protected browser page or inaccessible frame can appear as a limitation instead of a clean result.

### File access behaviour

**What it does**  
Defines the current extension boundary for local file URLs and other browser contexts that may require explicit browser access or may remain partially unavailable.

**Where the data comes from**  
From extension permission boundaries, browser runtime behaviour, and diagnostics produced when file or protected contexts are unavailable.

**How it is classified**  
diagnostic/limitation

**Does it map to WCAG?**  
Not directly.

**What the user should do next**  
If the page under test is a local file or similar protected context, confirm browser access settings and verify the result manually before trusting missing findings.

**Limitations**  
The extension cannot guarantee full inspection on every file-based or protected browser surface.

**Privacy/storage note**  
If the extension records file-context limitations, that information can remain in local diagnostics and exported troubleshooting JSON.

**Example**  
A local file page can require explicit browser permission before the panel can inspect it reliably.

### iframe/protected frame behaviour

**What it does**  
Explains how the extension handles iframes, especially cross-origin or protected frames that the content script cannot fully inspect.

**Where the data comes from**  
From frame enumeration, frame-access failures, same-origin limits, and diagnostics or limitation signals raised during scan orchestration.

**How it is classified**  
diagnostic/limitation

**Does it map to WCAG?**  
Not directly.

**What the user should do next**  
Check whether the relevant issue lives inside a same-origin frame the extension could inspect or a protected frame that still needs manual testing.

**Limitations**  
The extension cannot guarantee coverage for cross-origin or protected frames, and empty results do not prove those frames passed.

**Privacy/storage note**  
Frame limitation details can be stored locally in diagnostics and exported support data.

**Example**  
A cross-origin embedded checkout frame can remain outside the extension’s confirmed coverage and appear under scan limitations.

### Manual AT sign-off status

**What it does**  
Makes the release boundary explicit: A11Y Cat includes a virtual review aid, but it does not provide real screen-reader sign-off.

**Where the data comes from**  
From product scope, Screen Reader Review implementation limits, and the documented absence of real NVDA, JAWS, or VoiceOver evidence in the extension itself.

**How it is classified**  
diagnostic/limitation

**Does it map to WCAG?**  
Depends on manual review and real assistive-technology validation.

**What the user should do next**  
Repeat important user journeys in real assistive technology before signing off accessibility.

**Limitations**  
Virtual spoken-output review is not the same as real AT behaviour, support matrices, mode switching, or browser plus screen-reader interoperability.

**Privacy/storage note**  
Local Screen Reader Review logs and exports can document a virtual review path, but they are not proof of real AT validation.

**Example**  
A virtual review log can support QA notes, but final sign-off still needs real NVDA, JAWS, or VoiceOver testing.

### Privacy and local storage

**What it does**  
Explains what the extension processes locally, what it stores in extension storage, what exports can contain, and how users can clear that data.

**Where the data comes from**  
From Chrome extension local storage, export serializers, local issue workflow state, scan history, spelling allowlists, virtual review state, and diagnostics state.

**How it is classified**  
local workflow state

**Does it map to WCAG?**  
Not directly.

**What the user should do next**  
Read this section before sharing exports or a browser profile with another tester, and clear local data when you no longer need retained state.

**Limitations**  
Local-only processing reduces external exposure, but local exports can still include sensitive URLs, titles, selectors, snippets, annotations, and diagnostics.

**Privacy/storage note**  
Stored data can include settings, recent and archived scan history, workflow state, virtual Screen Reader Review state, performance benchmarks, spelling allowlists, and diagnostics. Exports can include selectors, snippets, page URL, page title, and runtime evidence.

**Example**  
Clearing local extension data removes saved history, workflow notes, and related local extension state from the current browser profile.

### Beta limitations

**What it does**  
Collects the current product-boundary limits that still apply in private beta.

**Where the data comes from**  
From current implementation scope, documented release limitations, diagnostics boundaries, unsupported language handling, and the absence of real AT sign-off in the extension.

**How it is classified**  
diagnostic/limitation

**Does it map to WCAG?**  
Not directly.

**What the user should do next**  
Use the beta as a review and triage tool, not as a final certification tool. Validate important flows manually and report gaps with diagnostics or screenshots.

**Limitations**  
Private beta still has bounded language coverage, bounded state coverage, restricted-context gaps, and virtual review limitations.

**Privacy/storage note**  
Beta behaviour still keeps processing local-first, but local exports and retained history need the same handling as any other potentially sensitive QA artefact.

**Example**  
A multilingual page can show supported English spelling review alongside skipped unsupported-language output during beta.

## 7. Screenshot and storage cross-reference

The feature sections above explain what each feature does, where the data comes from, how it is classified, whether it maps to WCAG, whether it is confirmed or review-oriented, what the user should do next, and what it cannot prove. This cross-reference adds the current screenshot evidence status and the main storage/export boundary for each required feature.

| Feature | What may be stored or exported | Screenshot or reason why no screenshot is published |
| --- | --- | --- |
| Scan Results | Current issue lists, counts, selectors, snippets, and exports can all reflect this surface. | `assets/screenshots/scan-results-confirmed-issues.png` |
| Confirmed Issues | Confirmed findings can be retained in local history and exported in CSV or JSON. | `assets/screenshots/scan-results-confirmed-issues.png` |
| axe-core findings | Original axe-backed findings can appear in local issue state and exports. | No dedicated screenshot; they appear inside Scan Results issue cards rather than as a separate top-level panel. |
| Raw axe provenance | Preserved in JSON evidence exports and reduced flat fields in CSV. | No dedicated screenshot; provenance is primarily detail/export data, not a stable top-level visual module. |
| Manual / Incomplete / Review Items | Review findings can be saved in local workflow state and exported in JSON or CSV. | `assets/screenshots/manual-review-items.png` |
| Advisory Notes | Advisory items can appear in local issue state and JSON or CSV exports. | No dedicated screenshot published; current public gallery focuses on the stable primary review surfaces. |
| Scan Limitations | Limitation diagnostics can be stored locally and exported in support or evidence JSON. | `assets/screenshots/scan-limitations.png` |
| Severity filters | Filter state is local UI state; filtered exports still reflect the underlying current issue set. | `assets/screenshots/severity-filters.png` |
| Critical / Serious / Moderate / Minor | Confirmed severity counts can appear in local history and exports. | `assets/screenshots/severity-filters.png` |
| Visual Composition Review | Review findings and their selectors can be exported locally. | `assets/screenshots/visual-composition-review.png` |
| Human Judgement Review | Review findings can be retained in local state and exported. | No dedicated screenshot published; the current safe fixture set does not isolate a stable Human Judgement Review label capture. |
| Engine-limited Review | Review findings plus diagnostics can be retained locally and exported. | No dedicated screenshot published; the current public gallery shows the broader review and limitations surfaces instead. |
| State-limited Review | Review findings, notes, and history deltas can be retained locally and exported. | No dedicated screenshot published; the current public gallery shows review buckets and limitations rather than a separate state-limited badge capture. |
| Deterministic Failures | Confirmed findings can be retained in history and exported in CSV or JSON. | No dedicated screenshot; deterministic failures are shown within the confirmed issues screenshots. |
| Corroborated Failures | Confirmed findings and evidence can be retained in history and exported. | No dedicated screenshot published; the current public gallery does not isolate a corroborated-only card state. |
| Previous Scan Comparison | Local comparison baselines and deltas are stored in local history. | `assets/screenshots/previous-scan-comparison.png` |
| Local History | Recent and archived scan history are stored locally. | `assets/screenshots/previous-scan-comparison.png` |
| Local Data Clearing | Clearing removes locally stored settings, history, workflow state, diagnostics, and related data. | `assets/screenshots/local-data-clearing.png` |
| Broken Links | Local results and exports can include link URLs, statuses, and same-origin verification outcomes. | `assets/screenshots/broken-links.png` |
| Metadata Check | Metadata findings can be exported in JSON or CSV and can include page URL or metadata context. | `assets/screenshots/metadata-check.png` |
| Language Mismatch | Review findings and selectors can be exported locally. | `assets/screenshots/language-mismatch.png` |
| Spelling Check | Advisory or review output and allowlist state stay local and can be exported. | `assets/screenshots/spelling-check.png` |
| Page Text Scale / Page Reflow | Local UI state only unless related findings or notes are exported. | `assets/screenshots/page-reflow-or-text-scale.png` |
| Alt Text Analysis | Alt-text findings, selectors, and snippets can be exported locally. | `assets/screenshots/alt-text-analysis.png` |
| Heading Structure | Heading findings and selectors can be exported locally. | `assets/screenshots/heading-structure.png` |
| Screen Reader Review | Virtual review state and logs are stored locally and can be exported in visible formats. | `assets/screenshots/screen-reader-review.png` |
| Diagnostics | Diagnostics JSON can include URL, runtime details, and suppression bookkeeping. | `assets/screenshots/diagnostics-expanded.png` and `assets/screenshots/diagnostics-collapsed.png` |
| CSV export | Produces a local CSV file with flat issue rows and selected issue metadata. | `assets/screenshots/exports-csv-json.png` |
| JSON evidence export | Produces a local JSON file with richer evidence, diagnostics, selectors, and snippets. | `assets/screenshots/exports-csv-json.png` |
| Local issue-state import/export | Produces or ingests local JSON workflow state bundles. | No dedicated screenshot published; the current export screenshot shows the export surface, but not a separate import interaction dialog. |
| Diagnostics export/copy | Produces copied or downloaded support diagnostics JSON. | No dedicated screenshot published; the public gallery shows diagnostics itself rather than every export button state. |
| Screen reader review export | Produces local JSON, TXT, JSON QA report, or HTML QA report files. | No dedicated screenshot published; current public gallery shows the review surface, not every export submenu state. |
| Performance benchmark export | Can export local benchmark history where the visible control is present. | No dedicated screenshot published; visible benchmark export presence remains bounded and is not highlighted as a primary public surface. |
| Release discussion summary export | Can export local release discussion summary data when the visible aid is present. | No dedicated screenshot published; the public gallery does not isolate this local-aid export control. |
| Highlight element | Does not itself store data, but related selectors can appear in exports. | `assets/screenshots/highlight-element.png` |
| Turn into ticket | Can contribute to local workflow notes or handoff text. | `assets/screenshots/ticket-dialog.png` |
| Issue workflow controls | Local issue status, local notes, and workflow state are stored locally and can be exported in issue-state bundles. | No dedicated screenshot published; current public gallery focuses on the visible issue actions rather than the full workflow-state control set. |
| Settings/theme controls | Theme and related preferences are stored locally. | `assets/screenshots/theme-settings.png` |
| Panel open/close controls | Local UI state only. | `assets/screenshots/extension-panel-overview.png` for open state; close control is visible in the same panel chrome. |
| Panel resize/move controls | Panel geometry preferences are stored locally. | `assets/screenshots/panel-resize-move-controls.png` |
| Unsupported/restricted contexts | Limitation and diagnostic data can be stored locally and exported. | `assets/screenshots/scan-limitations.png` |
| File access behaviour | File-context limitation details can appear in local diagnostics or support export. | No dedicated screenshot published; this is a browser-boundary behaviour, not a distinct visible module. |
| iframe/protected frame behaviour | Frame limitation details can appear in local diagnostics or support export. | `assets/screenshots/scan-limitations.png` as the current visible limitation proof; no separate frame-only screenshot is published. |
| Manual AT sign-off status | Local virtual-review logs can be exported, but they are not real AT proof. | `assets/screenshots/screen-reader-review.png` |
| Privacy and local storage | Local storage, history, annotations, diagnostics, and export contents are described here. | `assets/screenshots/local-data-clearing.png` |
| Beta limitations | Limitation and diagnostic evidence can be stored locally and exported. | `assets/screenshots/scan-limitations.png` |

## What A11Y Cat does not prove

A11Y Cat does not prove:
- full WCAG compliance
- that manual accessibility testing is unnecessary
- that real screen reader testing is unnecessary
- that every interaction state was tested automatically
- that restricted pages or protected frames were fully inspected
- that unsupported languages were checked
- that uncertain findings are confirmed defects
- that all accessibility issues were found

## 8. Terminology glossary

- `axe-core`: the deterministic rules engine used for preserved axe findings.
- `confirmed issue`: a finding currently treated as confirmed in the tested page state.
- `incomplete`: an engine result where automation could not fully determine the outcome.
- `manual review`: a finding or workflow step that needs human validation.
- `advisory`: guidance that is not automatically a failure.
- `deterministic failure`: a confirmed product-owned or preserved rules-engine finding.
- `corroborated failure`: a confirmed finding with deterministic proof plus corroborating evidence.
- `visual composition review`: a review item that needs visual judgement.
- `human judgement review`: a review item that needs human context or interpretation.
- `engine-limited review`: a review item caused by engine or runtime determination limits.
- `state-limited review`: a review item caused by incomplete state coverage.
- `scan limitation`: a record of blocked, unsupported, or partial scan coverage.
- `source engine`: the engine or product logic that produced the finding.
- `WCAG mapping`: the stored WCAG criterion reference attached to a finding where available.
- `selector`: the locator string used to identify an element in the page.
- `evidence snippet`: a short DOM or text snippet saved as finding evidence.
- `local history`: locally stored scan history used for comparison and workflow context.
- `previous scan`: the newest earlier saved scan for the same `origin + pathname` page scope.
- `export`: a local file or copied data artifact created from the current extension state, such as CSV, JSON, TXT, or HTML handoff output.
- `diagnostics`: structured runtime and support-boundary signals used for troubleshooting partial scans, blocked contexts, or suppressed findings.
- `unsupported context`: a page or runtime situation the extension cannot inspect fully or classify reliably, such as unavailable APIs or unsupported browser state.
- `restricted page`: a page or frame the extension cannot inspect normally because browser, origin, policy, or permission boundaries block full access.
- `virtual screen reader review`: the extension’s simulated review aid that records virtual spoken-output and interaction evidence, not a real NVDA, JAWS, or VoiceOver session.
