# A11Y Cat

A11Y Cat is a local-first Chrome extension for accessibility inspection, structured review, and evidence handoff.

Private beta. Not public production. Manual assistive-technology sign-off is still pending.

## Company reviewer quick path (5 minutes)

If you are reviewing A11Y Cat for internal pilot use:
1. Confirm release status and boundaries in [Current status](#current-status).
2. Confirm private-beta installation path in [Installation](#installation).
3. Confirm evidence and confidence model in [Result model](#result-model).
4. Confirm privacy/storage/export boundaries in [Privacy and local data](#privacy-and-local-data).
5. Confirm operational risk boundaries in [Known limitations](#known-limitations).
6. Use [Documentation](#documentation) links for full page-level technical detail.

## Current status

| Field | Value |
| --- | --- |
| Product | A11Y Cat Chrome extension |
| Status | Private beta |
| Version | v1.0.0-beta (manifest/package version 1.0.0 with beta release label) |
| Build | 4b05134 |
| Documentation version/date | Docs v1.0.0-beta · 2026-05-01 |
| Release state | Private beta |
| Package name | Manifest name: A11Y Cat · npm package: a11y-cat |
| Chrome Store status | No public production listing declared in this repository |
| Public production | Not yet approved |
| Manual AT sign-off | Pending |

Release boundary summary:
- Chrome MV3 extension is the current product path.
- Broad public rollout ready: no.
- AI-assist controls are present in the extension runtime and are optional.
- Deterministic scan/classification workflows do not require AI actions.
- If users configure local assistant actions, selected issue context can be sent to a user-provided local endpoint.
- Test-only extension output (`dist-extension-test/`) is not a release artifact.

## What A11Y Cat does

- Runs local accessibility inspection on the active page.
- Uses bundled axe-core for automated findings.
- Separates confirmed, review, advisory, and limitation results.
- Provides a scan result dashboard with grouped output.
- Supports severity filtering.
- Supports manual/incomplete review items.
- Supports metadata, broken links, language, spelling, alt text, headings, and page text scale/reflow checks where available in the extension UI.
- Supports virtual Screen Reader Review as a review aid, not real AT testing.
- Supports CSV and JSON exports.
- Stores scan history and workflow state locally.
- Supports local data clearing.

## What A11Y Cat does not prove

- It does not prove full WCAG compliance.
- It does not replace manual accessibility testing.
- It does not replace real screen reader testing with NVDA, JAWS, or VoiceOver.
- It does not test every interactive state automatically.
- It may not inspect restricted pages, protected frames, file URLs, or unsupported contexts.
- It may classify uncertain findings as review/advisory.
- Automated tools can produce false positives and false negatives.

## Result model

- Confirmed Issues: strongest automated evidence available for the current scanned state.
- Manual / Incomplete / Review Items: require human judgement before filing as defects.
- Advisory Notes: guidance signals, not confirmed failures.
- Scan Limitations: explicit coverage boundaries.
- Diagnostics: runtime/context evidence to explain scan boundaries.

| Category | Meaning | User action |
| --- | --- | --- |
| Confirmed Issues | Deterministic/high-confidence automated findings | Prioritize remediation and retest |
| Manual / Incomplete / Review Items | Uncertain or context-dependent findings | Perform manual review before defect classification |
| Advisory Notes | Quality guidance signals | Improve quality where relevant; do not treat as confirmed failures |
| Scan Limitations | Scanner could not fully inspect context/state | Run additional manual checks in uncovered areas |
| Diagnostics | Runtime limitation/context trace | Use for troubleshooting and support evidence |

How to read results safely:
1. Start with Confirmed Issues and severity filters for immediate remediation candidates.
2. Review Manual/Incomplete/Review Items before defect filing.
3. Treat Advisory Notes as guidance, not confirmed failures.
4. Check Scan Limitations and Diagnostics before making coverage claims.
5. Validate high-impact issues with manual testing and real assistive-technology checks.

## Scanner engines and source attribution

- axe-core findings come from bundled axe-core execution in-page.
- Custom A11Y Cat checks are separate from axe-core and should be interpreted as extension-origin signals.
- Manual review generation creates review-focused items where automation cannot confirm failure deterministically.
- Diagnostics/runtime signals capture context limits (for example restricted pages/frames/state boundaries).
- source attribution fields (for example `sourceEngine`, `sourceRuleId` where surfaced/exported) preserve provenance for evidence handoff.

Why provenance matters:
- axe-core findings should remain traceable to engine/rule source.
- custom logic should remain distinguishable from axe-core.
- advisory/review findings should not be treated as confirmed failures.

## Severity model

- Critical
- Serious
- Moderate
- Minor
- Review/Incomplete/Unspecified

Severity mapping notes:
- For axe-core violations, UI severity follows axe impact categories (`critical`, `serious`, `moderate`, `minor`) where present.
- Review/incomplete/advisory/limitation outputs can appear without a confirmed axe impact and should be treated as manual-review workflow signals.
- Do not treat severity alone as compliance proof.

## Core features

### Scan Results
Shows grouped scanner output with category boundaries. It does not prove full coverage of every state. Read more: [Understanding results](https://carlashub.github.io/a11y-cat-extension/docs/understanding-results.html).

### Confirmed Issues
Highlights deterministic/high-confidence findings for triage. It does not remove the need for context verification. Read more: [Results and severity](https://carlashub.github.io/a11y-cat-extension/docs/results-and-severity.html).

### Manual and Incomplete Review
Surfaces findings needing human judgement. It does not classify uncertain findings as confirmed failures. Read more: [Review categories](https://carlashub.github.io/a11y-cat-extension/docs/review-categories.html).

### Visual Composition Review
Flags visual/composition checks requiring interpretation. It does not replace manual visual QA. Read more: [Review categories](https://carlashub.github.io/a11y-cat-extension/docs/review-categories.html).

### Human Judgement Review
Groups issues that need human interpretation. It does not provide deterministic pass/fail verdicts. Read more: [Review categories](https://carlashub.github.io/a11y-cat-extension/docs/review-categories.html).

### Broken Links
Checks link status signals in supported contexts. It does not guarantee full cross-origin verification in all cases. Read more: [Scanner tools](https://carlashub.github.io/a11y-cat-extension/docs/scanner-tools.html).

### Metadata Check
Reviews metadata completeness/quality signals. It does not prove SEO or accessibility compliance by itself. Read more: [Scanner tools](https://carlashub.github.io/a11y-cat-extension/docs/scanner-tools.html).

### Language Mismatch
Detects language consistency concerns where supported. It does not replace human language QA. Read more: [Scanner tools](https://carlashub.github.io/a11y-cat-extension/docs/scanner-tools.html).

### Spelling Check
Flags potential spelling issues in supported language workflows. It does not guarantee linguistic correctness across all languages. Read more: [Scanner tools](https://carlashub.github.io/a11y-cat-extension/docs/scanner-tools.html).

### Page Text Scale / Page Reflow
Assesses text scaling/reflow-related heuristics where available. It does not replace manual responsive/accessibility testing. Read more: [Scanner tools](https://carlashub.github.io/a11y-cat-extension/docs/scanner-tools.html).

### Alt Text Analysis
Evaluates alt-text-related signals. It does not prove semantic intent quality without manual review. Read more: [Scanner tools](https://carlashub.github.io/a11y-cat-extension/docs/scanner-tools.html).

### Heading Structure
Checks heading hierarchy signals. It does not validate full information architecture quality. Read more: [Scanner tools](https://carlashub.github.io/a11y-cat-extension/docs/scanner-tools.html).

### Screen Reader Review
Provides virtual review aid workflows and exports. It is not real NVDA/JAWS/VoiceOver evidence. Read more: [Screen Reader Review](https://carlashub.github.io/a11y-cat-extension/docs/screen-reader-review.html).

### Previous Scan Comparison
Compares current and previous saved scans within scope. It does not compare unrelated pages/scopes. Read more: [Previous scan and history](https://carlashub.github.io/a11y-cat-extension/docs/previous-scan-and-history.html).

### Exports
Produces CSV/JSON and related evidence artifacts. It does not control data after user export/share. Read more: [Exports and local data](https://carlashub.github.io/a11y-cat-extension/docs/exports-and-local-data.html).

### Diagnostics
Shows runtime/context evidence about coverage boundaries. It does not represent confirmed accessibility failures by itself. Read more: [Diagnostics and limitations](https://carlashub.github.io/a11y-cat-extension/docs/diagnostics-and-limitations.html).

### Local History and Data Clearing
Stores scan/workflow state locally and supports clear-data actions. It does not keep server-side scan history for the public beta package. Read more: [Privacy and local data](https://carlashub.github.io/a11y-cat-extension/docs/privacy-local-data.html).

## Privacy and local data

Local-first means A11Y Cat processes scan results in the browser runtime.

For the public beta package documented here:
- no developer database is used for scan data storage
- no developer-operated server is used for scan processing
- no analytics/telemetry endpoint is declared as part of the public beta runtime flow
- optional assistant actions, when enabled/configured by the user, can call a user-provided local assistant endpoint

Local data may include scan history/workflow state. Exports may include sensitive snippets, selectors, page URL, and page title depending on user action and tested page content.

Users control export creation and sharing. After a file is exported/shared, it is outside extension control.

Local data can be cleared from extension UI controls documented in privacy/docs pages.

Read full details:
- [Privacy and local data](https://carlashub.github.io/a11y-cat-extension/docs/privacy-local-data.html)
- [Privacy policy](https://carlashub.github.io/a11y-cat-extension/docs/privacy-policy.html)

## Installation

### Private beta install

Private beta packages are distributed to approved testers by the maintainer. Do not use source-build instructions unless you are developing the extension.

Current documented path:
- approved tester access via maintainer-provided beta package/instructions
- install flow and verification steps: [Installation guide](https://carlashub.github.io/a11y-cat-extension/docs/installation.html)
- support/access requests: [GitHub Issues](https://github.com/CarlasHub/a11y-cat-extension/issues)

### Developer build

Prerequisites:
- Chrome/Chromium desktop
- Node.js and npm compatible with this repository tooling

Developer flow:
1. Install dependencies: `npm install`
2. Build extension: `npm run build:extension`
3. Verify package integrity: `npm run check:extension`
4. Build test extension (if needed): `npm run build:extension:test`
5. Verify test package (if used): `npm run check:extension:test`
6. Load unpacked extension in `chrome://extensions` with Developer mode
7. Run release checks as required by your workflow

## Supported environments

| Environment | Status | Notes |
| --- | --- | --- |
| Chrome desktop | Supported | Primary MV3 target for current private beta |
| Edge Chromium | Expected | Validate in your environment before rollout |
| Firefox | Not supported | No public release path documented |
| Safari | Not supported | No public release path documented |
| Windows | Pending/verify | Validate packaged runtime in target environment |
| macOS | Supported | Used in current private beta docs/testing workflow |
| Linux | Expected | Validate before team rollout |
| file:// pages | Restricted | Depends on extension file-access permissions |
| restricted pages (browser internal/protected contexts) | Blocked/limited | Coverage boundaries documented as limitations |

## Documentation

- Documentation site: [https://carlashub.github.io/a11y-cat-extension/](https://carlashub.github.io/a11y-cat-extension/)
- UI Feature Guide: [https://carlashub.github.io/a11y-cat-extension/docs/ui-feature-guide.html](https://carlashub.github.io/a11y-cat-extension/docs/ui-feature-guide.html)
- Installation: [https://carlashub.github.io/a11y-cat-extension/docs/installation.html](https://carlashub.github.io/a11y-cat-extension/docs/installation.html)
- Privacy and local data: [https://carlashub.github.io/a11y-cat-extension/docs/privacy-local-data.html](https://carlashub.github.io/a11y-cat-extension/docs/privacy-local-data.html)
- Known limitations: [https://carlashub.github.io/a11y-cat-extension/docs/limitations.html](https://carlashub.github.io/a11y-cat-extension/docs/limitations.html)
- Beta testing guide: [https://carlashub.github.io/a11y-cat-extension/docs/beta-testing.html](https://carlashub.github.io/a11y-cat-extension/docs/beta-testing.html)
- Troubleshooting: [https://carlashub.github.io/a11y-cat-extension/docs/troubleshooting.html](https://carlashub.github.io/a11y-cat-extension/docs/troubleshooting.html)
- FAQ: [https://carlashub.github.io/a11y-cat-extension/docs/faq.html](https://carlashub.github.io/a11y-cat-extension/docs/faq.html)
- Accessibility statement: [https://carlashub.github.io/a11y-cat-extension/docs/accessibility-statement.html](https://carlashub.github.io/a11y-cat-extension/docs/accessibility-statement.html)
- Changelog/release status: [https://carlashub.github.io/a11y-cat-extension/docs/changelog.html](https://carlashub.github.io/a11y-cat-extension/docs/changelog.html)

## Known limitations

- Manual AT sign-off is still pending.
- Real VoiceOver/NVDA/JAWS evidence is not complete.
- file-access behavior can be limited by browser permission state.
- Protected iframes/frames and restricted pages can reduce coverage.
- Unsupported or limited language scenarios affect spelling/language checks.
- Virtual Screen Reader Review is not real screen reader testing.
- Scanner/runtime limitations are part of expected beta behavior and are surfaced in UI/diagnostics.

Full details: [Known limitations](https://carlashub.github.io/a11y-cat-extension/docs/limitations.html)

## Testing and release gates

| Command | What it proves |
| --- | --- |
| `npm run check:docs` | Documentation-required files and rules pass repository doc checks |
| `npm run check:dist` | Distribution output structure and required dist files are validated |
| `npm run build:extension` | Production extension bundle can be built |
| `npm run check:extension` | Extension package structure/integrity checks pass |
| `npm run check:package` | Built extension package structure/integrity passes package checks |
| `npm run package:store-submission` | Store-submission artifact package can be generated |
| `npm run check:store-submission` | Store-submission artifact checks pass |
| `npm run check:workflow-syntax` | Workflow YAML syntax/required workflow guard checks pass |
| `npm run check:repo-discipline` | Repository discipline checks pass |
| `npm run test:release-gate` | Core release-gate test sequence runs (runtime/link/contrast/screen-reader virtual/extension tests) |
| `npm run verify:release` | Full release verification chain (syntax, discipline, docs, builds, package, tests) passes |
| `npm run ci:local-dry-run` | Local end-to-end CI dry run installs deps, installs browsers, and runs release verification |

Manual boundary:
- Release checks do not replace manual assistive-technology validation.

## Reporting bugs

Report issues in [GitHub Issues](https://github.com/CarlasHub/a11y-cat-extension/issues).

Include:
- extension version/build
- browser and OS
- page type/context (public demo, internal, restricted, file URL, etc.)
- feature tested
- expected result
- actual result
- screenshots
- console/runtime errors if present
- exported report snippets only when safe

Do not include sensitive client/private data in public issues.

## Documentation maintenance policy

The UI feature guide is the user-facing source of truth.

Every change to visible UI, result categories, counts, exports, storage behaviour, privacy claims, or release limitations must update the docs in the same change set.

## Legacy bookmarklet history

This section is archive-only and not part of the Chrome extension release path.

- Legacy bookmarklet materials: [docs/legacy-bookmarklet/README.md](docs/legacy-bookmarklet/README.md)
- Legacy command surface references (archive): `audit`, `contrast`, `button`, `modal`, `semantics`, `form fields`, `fill`, `find`, `submit`, `ticket last`, `ticket issue <number>`, `scan <selector>`, `check contrast <selector>`, `fields`, `try to submit [form-selector]`.

## Maintainer / support

- Maintainer: Carla Gonçalves
- Support route: [GitHub Issues](https://github.com/CarlasHub/a11y-cat-extension/issues)
- Privacy/support route: [GitHub Issues](https://github.com/CarlasHub/a11y-cat-extension/issues)

## Licence

Licensed under [Apache-2.0](LICENSE).
