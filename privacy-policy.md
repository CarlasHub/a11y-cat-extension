# Privacy Policy

Effective date: 1 May 2026

Maintainer: CarlasHub Accessibility Engineering  
Contact: info@carlashub.com

A11Y Cat is a local-first Chrome extension. Scan processing occurs locally in the browser runtime.

## Data use

- Scan analysis is performed locally.
- Settings, issue workflow state, saved review state, saved history, and local performance benchmarks are stored locally.
- Export files are generated only when the user explicitly requests export.
- The public package does not auto-send scan data to a developer server.
- The public package does not include analytics or telemetry endpoints.

## Local storage keys used by the public extension

`chrome.storage.local`
- `a11yCatExtSettingsV1`
- `a11yCatScanHistoryV1`
- `a11yCatScanHistoryArchiveV1`
- `a11yCatWorkflowStateV1`
- `a11yCatVirtualSrReviewStateV1`
- `a11yCatPerfBenchmarksV1`
- `a11yCatSpellingAllowlistV1`

## Legacy/internal historical keys

The following keys can appear in older tester profiles from earlier internal builds. They are outside the current public-beta storage contract and are not required by this release:

- `a11yCatVirtualSrSessionsV1` (`chrome.storage.session`)
- `__a11y_cat_vsr_stale_v1` (`sessionStorage`)
- `a11y_cat_assistant_url` (`localStorage`, legacy internal assistant URL marker)

## Retention

- `a11yCatScanHistoryV1`: up to 60 recent entries
- `a11yCatScanHistoryArchiveV1`: up to 240 archived entries
- `a11yCatPerfBenchmarksV1`: up to 120 entries
- Other local extension state remains until user changes it or clears local data

## Previous scan comparison

- Comparison scope uses `origin + pathname`.
- Query strings and hash fragments are ignored for scope matching.
- Comparison is not global across unrelated pages.

## User controls

- Use **Scan Results → Privacy and data use → Clear all local extension data** to clear extension-managed local keys.
- Removing the extension also clears extension-managed storage.

## GDPR / UK GDPR note

Where GDPR or UK GDPR applies, public-package processing is user-initiated and local to the user environment unless the user chooses to export/share data.

## HTML policy page

User-facing policy page: `docs/privacy-policy.html`
