# Privacy Policy

A11Y Cat is a Chrome extension that processes page content locally in the browser.

## Data use

- Scan analysis is performed locally.
- Issue annotations, settings, saved review state, saved history, and local performance benchmarks are stored locally through Chrome extension storage.
- Export files are created only when the user explicitly requests them.
- Page text, scan results, and issue annotations are not sent to an external service by the public release package.
- The broken-links check can make same-origin `HEAD` or `GET` requests from the page context to verify linked destinations.
- Cross-origin links are not fetched automatically by the broken-links check; they remain `unverified`.
- Metadata checks can trigger normal image requests for declared preview-image URLs when the page itself would ordinarily request them.

## Local storage keys used by the public extension

`chrome.storage.local`
- `a11yCatExtSettingsV1`: theme, route auto-scan preference, and saved panel geometry
- `a11yCatScanHistoryV1`: recent saved scan history
- `a11yCatScanHistoryArchiveV1`: archived saved scan history beyond the recent-entry cap
- `a11yCatWorkflowStateV1`: local workflow annotations and dashboard history/filter preferences
- `a11yCatVirtualSrReviewStateV1`: saved Screen Reader Review notes and review state
- `a11yCatPerfBenchmarksV1`: local benchmark history
- `a11yCatSpellingAllowlistV1`: saved custom spelling allowlist entries

Historical non-local keys from earlier internal builds:
- `a11yCatVirtualSrSessionsV1` in `chrome.storage.session`: hidden virtual review session snapshot key; not part of the current public beta `chrome.storage.local` inventory
- `__a11y_cat_vsr_stale_v1` in `sessionStorage`: hidden current-tab virtual review marker; not part of the current public beta `chrome.storage.local` inventory
- `a11y_cat_assistant_url` in `localStorage`: legacy hidden assistant URL key; not part of the public beta workflow or `chrome.storage.local` inventory

## Retention

- `a11yCatScanHistoryV1`: up to 60 recent entries
- `a11yCatScanHistoryArchiveV1`: up to 240 archived entries
- `a11yCatPerfBenchmarksV1`: up to 120 entries
- other local extension state remains until the user changes it, clears local extension data, clears browser storage, or removes the extension

## Scan history and previous-scan comparison

- `Previous scan` means the newest earlier saved scan in the same page scope.
- Page scope is matched by `origin + pathname`.
- Query string and hash are ignored for baseline matching.
- Comparison is not based on the same tab, page title, or the latest scan globally.
- A completed scan saves a compact history entry after the scan finishes.

Saved history entry fields:
- full page URL
- derived domain and path
- comparison scope key and label
- scan timestamp fields
- runtime mode
- issue-type counts and total issue count
- deduped finding fingerprints
- reduced fingerprint metadata: rule id, selector lineage, and issue type
- delta counts against the previous same-scope baseline

Not stored in scan history entries:
- page title
- raw HTML snippets
- exported evidence-bundle payloads
- full issue code snippets
- full selector lists beyond reduced selector-lineage metadata

Related local state:
- `a11yCatWorkflowStateV1` stores local workflow annotations and dashboard preferences, including history filters and selected baseline id.

## How users clear saved local data

- The extension UI exposes `Clear all local extension data` under `Scan Results` → `Privacy and data use`.
- That control removes the saved extension settings, scan history, archived history, workflow annotations, saved virtual review state, performance benchmarks, and saved spelling allowlist.
- The hidden historical keys listed above are outside the current public beta `chrome.storage.local` contract.
- Removing the extension also clears extension-managed storage.

## What the public package does not do

- does not send scan data to a backend
- does not include analytics or telemetry
- does not require a paid API
- does not require a hosted assistant service
