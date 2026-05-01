# A11Y Cat
![A11Y Cat logo](docs/assets/img/icon.png)

A11Y Cat is a Chrome MV3 extension for deterministic live-page accessibility checks. Open it from the browser toolbar, run a scan on the current page, inspect grouped findings, review limitations honestly, and export evidence without leaving the page.

This repository is extension-first. The Chrome extension is the release product. Legacy bookmarklet assets remain in this repository only as historical or internal engineering material and are not part of the Chrome Web Store release.

Supported-environment and release boundary:
- [SUPPORTED_ENVIRONMENTS.md](SUPPORTED_ENVIRONMENTS.md)
- [EXTENSION_RELEASE_CHECKLIST.md](EXTENSION_RELEASE_CHECKLIST.md)
- [docs/RELEASE_READINESS_CHECKLIST.md](docs/RELEASE_READINESS_CHECKLIST.md)

## Current status

- Controlled pilot on desktop Chromium: active engineering scope.
- Broad public rollout ready: no.
- Manual assistive-technology validation is still required for VoiceOver, NVDA, and JAWS before any production readiness claim.
- The test-only MV3 package lives in `dist-extension-test/` and must never be shipped.
- AI assistance is out of scope for the current private Chrome Store beta.
- The public Chrome Store package does not expose AI assistance or local assistant backend actions.

## Primary product surface

- Deterministic WCAG scan on the current page after a toolbar click.
- Findings dashboard with explicit issue classes and source attribution.
- Metadata, broken-links, headings, language, spelling, alt-text, and export workflows.
- Local offline spelling review with bundled CSpell English dictionaries, protected product vocabulary, and explicit skipped-language reporting.
- `Screen Reader Review` with virtual review support, structured manual review tasks, and QA handoff exports.
- Local issue annotations stored through `chrome.storage.local`.
- [UI feature guide](docs/EXTENSION_UI_FEATURE_GUIDE.md)
- [Documentation site](docs/index.html)

## Extension documentation

- [UI feature guide](docs/EXTENSION_UI_FEATURE_GUIDE.md) is the user-facing source of truth for the shipped extension UI, scanner taxonomy, result categories, exports, local storage behaviour, and release limitations.
- Future changes to UI labels, result categories, counts, exports, or storage behaviour must update the UI feature guide in the same change set.
- [Enterprise readiness gap + free integration roadmap](docs/ENTERPRISE_READINESS_GAP.md) tracks capability gaps and phased free-integration work.
- The static documentation site is prepared for GitHub Pages from the `main` branch `docs/` folder.
- Target public URL after deployment: `https://carlashub.github.io/a11y-cat-extension/`
- Do not claim the public docs URL is live unless GitHub Pages is enabled and the published site is verified.

## Privacy and runtime boundary

- Core scanning stays local in the browser.
- The extension injects a bundled local copy of `axe-core` for page scans. It does not fetch the axe engine from a hosted service in the release path.
- Page scans exclude the A11Y Cat panel itself and known injected support overlays such as BugHerd-style fixed widgets when they are detected as third-party surfaces.
- Exported evidence preserves raw axe rule metadata and keeps axe `incomplete` results in review/manual-review output instead of promoting them to confirmed failures.
- The public release package does not call a paid API or hosted backend.
- Experimental AI code may remain in source and test-only paths, but it is excluded from the current public Chrome Store beta package.
- The release extension package contains no analytics or telemetry endpoint.

## Previous scan comparison and local history

- `Previous scan` means the newest earlier saved scan in the same page scope.
- Page scope is matched by `origin + pathname`.
- Query string and hash do not create a separate comparison scope.
- Comparison is not based on the same tab, page title, or the latest scan globally.
- Each completed scan is saved into local extension history after the scan finishes.
- Recent history is stored in `chrome.storage.local.a11yCatScanHistoryV1` and keeps up to 60 entries.
- Older overflow entries are moved into `chrome.storage.local.a11yCatScanHistoryArchiveV1` and kept up to 240 entries.
- Baseline-selection and history-filter preferences are stored in `chrome.storage.local.a11yCatWorkflowStateV1`.
- Saved history entries include:
  - full page URL
  - derived domain and path
  - comparison scope key/label
  - scan timestamp fields
  - runtime mode
  - issue-type counts and total issue count
  - deduped finding fingerprints
  - reduced fingerprint metadata: rule id, selector lineage, and issue type
  - delta counts against the previous same-scope baseline
- Saved history entries do not store:
  - page title
  - raw HTML snippets
  - exported evidence bundles
  - full issue code snippets
  - full selector lists beyond reduced selector lineage metadata
- `Compare with previous scan` uses the newest earlier saved entry from the same page scope. If only unrelated pages exist in history, comparison stays unavailable.
- Users can remove comparison history from:
  - `Dashboard` → `Scan history` → `Clear saved history`
  - `Scan Results` → `Privacy and data use` → `Clear all local extension data`
- Privacy impact:
  - saved history keeps URLs and reduced selector-lineage metadata locally in this browser profile
  - local workflow annotations are stored separately in `a11yCatWorkflowStateV1`
  - nothing in the public beta history flow is sent to a hosted backend

## Build and verification commands

Extension release path:

```bash
npm install
npm run build:extension
npm run check:extension
npm run package:store-submission
npm run check:store-submission
npm run verify:release
```

Additional repository checks:

```bash
npm run check:workflow-syntax
npm run check:repo-discipline
npm run check:dist
npm run ci:local-dry-run
```

Test package for Playwright automation:

```bash
npm run build:extension:test
npm run check:extension:test
npm run test:extension
npm run test:extension:smoke
```

Legacy bookmarklet history:
- [docs/legacy-bookmarklet/README.md](docs/legacy-bookmarklet/README.md)
- `npm run legacy:build:bookmarklet`
- `npm run legacy:test:bookmarklet`

## Command surface

Primary commands:
- `audit`
- `contrast`
- `button`
- `modal`
- `semantics`
- `form fields`
- `fill`
- `find`
- `submit`
- `ticket last`
- `ticket issue <number>`

Aliases:
- `scan <selector>`
- `check contrast <selector>`
- `fields`
- `try to submit [form-selector]`

## Repository layout

- `src/runtime/modules/` — source-of-truth runtime modules.
- `shared/a11y-cat-core.js` — generated shared runtime bundle; regenerate and verify with `npm run generate:core` and `npm run check:generated-core`.
- `extension/` — extension source files, manifest, permissions notes, and background/content entry points.
- `release/artifacts/` — canonical packaged store-submission artifact and metadata.

## What this repository does not claim

- It does not replace manual assistive-technology validation.
- It does not treat virtual review as equal to real NVDA, JAWS, or VoiceOver output.
- It does not treat spelling findings as deterministic WCAG failures.
- It does not treat restricted pages or unsupported contexts as passed coverage.
