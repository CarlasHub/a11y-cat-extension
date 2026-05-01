# A11Y Cat
![A11Y Cat logo](docs/assets/img/icon.png)


Local-first accessibility inspection extension.

A11Y Cat is a Chrome MV3 extension for deterministic live-page accessibility inspection, structured review workflows, and local evidence export.

Limitation:

A11Y Cat supports accessibility review workflows. It does not replace manual testing or assistive-technology validation.

## Documentation

- [Docs landing page](index.html)
- [Extension UI feature guide](EXTENSION_UI_FEATURE_GUIDE.md)
- [Docs introduction](docs/intro.html)
- [Installation](docs/installation.html)
- [Privacy and local data](docs/privacy-local-data.html)
- [Known limitations](docs/limitations.html)
- [Beta testing guide](docs/beta-testing.html)
- [Release notes and status](docs/changelog.html)

## User-facing source of truth

The canonical user-facing reference for the shipped extension UI is:

- `EXTENSION_UI_FEATURE_GUIDE.md`

The public docs page:

- `docs/ui-feature-guide.html`

publishes that canonical guide through a local renderer so the site stays aligned with the source guide.

If the extension UI, scanner taxonomy, result categories, counts, exports, storage behaviour, or release limitations change, update this guide in the same change set.

## Public repository scope

This repository should contain only public-facing files:

- the landing page
- the documentation pages
- the extension UI feature guide
- installation instructions
- privacy and local data documentation
- known limitations
- beta testing guidance
- release notes or changelog content
- screenshots or assets required by the public docs
- license and public README

It should not contain the private development codebase, tests, prompts, internal review artefacts, build pipelines, or secrets.

The only repository-infrastructure exception is the minimal GitHub Pages workflow under `.github/workflows/`, which exists solely to publish the static docs site.

## Site structure

```text
index.html
EXTENSION_UI_FEATURE_GUIDE.md
privacy-policy.md
docs/
  intro.html
  ui-feature-guide.html
  installation.html
  privacy-local-data.html
  limitations.html
  beta-testing.html
  changelog.html
assets/
  css/
    styles.css
  img/
    icon.png
  screenshots/
    extension-panel-overview.png
    scan-results-confirmed-issues.png
    severity-filters.png
    manual-review-items.png
    visual-composition-review.png
    scan-limitations.png
    previous-scan-comparison.png
    broken-links.png
    metadata-check.png
    language-mismatch.png
    spelling-check.png
    page-reflow-or-text-scale.png
    alt-text-analysis.png
    heading-structure.png
    screen-reader-review.png
    diagnostics-collapsed.png
    diagnostics-expanded.png
    exports-csv-json.png
    local-data-clearing.png
    theme-settings.png
    highlight-element.png
    ticket-dialog.png
    panel-resize-move-controls.png
  js/
    render-markdown.js
LICENSE
.nojekyll
```

## GitHub Pages deployment

This repository is prepared for GitHub Pages deployment through GitHub Actions.

Reason:

- it allows deployment to be completed from repository automation instead of depending on a manual branch-folder Pages configuration step
- it keeps the published artifact restricted to the site files rather than exposing unrelated repository files at the Pages root

Setup:

1. Open `Settings`.
2. Open `Pages`.
3. Under `Build and deployment`, choose `GitHub Actions`.
4. Ensure Actions are allowed for the repository.

Expected public URL after deployment:

`https://carlashub.github.io/a11y-cat-extension/`

Do not claim the site is live until that URL has been deployed and verified.

## Keeping this guide updated

This guide must be updated whenever the extension UI, scanner taxonomy, result categories, exports, storage behaviour, or release limitations change.

Future changes to UI labels, result categories, counts, exports, or storage behaviour must update this guide in the same change set.

## How to update the docs

1. Update the relevant HTML page when the public site copy changes.
2. Update `EXTENSION_UI_FEATURE_GUIDE.md` whenever the extension UI, scanner taxonomy, result categories, counts, exports, storage behaviour, or release limitations change.
3. Update `privacy-policy.md` and `docs/privacy-local-data.html` together when privacy or local-storage behaviour changes.
4. Keep the landing page, sidebar navigation, and README links aligned if page names or structure change.
5. Keep screenshots aligned with the shipped extension UI.
6. Run the documentation checks available in the source repo before publishing updates.

This repository is documentation-first. Do not add internal development files here.
