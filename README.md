# A11Y Cat documentation site

This directory is the static documentation-site root for GitHub Pages deployment.

## Version and build identity

- A11Y Cat Extension Beta
- Version: `v1.0.0-beta` (source: `package.json` and `extension/manifest.json` version `1.0.0` with beta label)
- Build: `4b05134` (source: current project commit short SHA)
- Docs updated: `2026-05-01`

## Maintainer and support

- Maintained by Carla Gonçalves
- Repository: [CarlasHub/a11y-cat-extension](https://github.com/CarlasHub/a11y-cat-extension)
- Support and beta feedback: [GitHub Issues](https://github.com/CarlasHub/a11y-cat-extension/issues)

## Why this structure

This repository uses `docs/` as the site root because GitHub Pages can serve directly from the `/docs` folder on the default branch without adding a site build pipeline, framework, deployment action, or static-site generator.

That is the lowest-friction fit for this repo because:
- the repository already keeps user-facing extension documentation in `docs/`
- the existing screenshots and verification assets already live under `docs/assets/`, now normalized under `assets/screenshots/`
- the site can stay static HTML and CSS only
- no extra bundler, framework, or remote runtime is needed

Chosen Pages mode:
- Deploy from branch
- Branch: `main`
- Folder: `/docs`

This is the simplest valid setup for the current site because the docs are already static and do not need a build step.

## Site structure

- `index.html` — landing page
- `docs/intro.html` — docs introduction page
- `docs/ui-feature-guide.html` — docs-site entry page for the extension UI guide
- `docs/installation.html` — installation page
- `docs/privacy-local-data.html` — privacy and local data page
- `docs/limitations.html` — known limitations page
- `docs/beta-testing.html` — beta testing guide page
- `docs/changelog.html` — release notes and current status page
- `assets/css/styles.css` — site stylesheet
- `assets/img/icon.png` — reused extension icon
- `assets/js/render-markdown.js` — local markdown renderer used by the UI feature guide page
- `assets/screenshots/` — normalized real extension UI screenshots used across the public docs

## Public URL

Target public URL after deployment:

`https://carlashub.github.io/a11y-cat-extension/`

Do not claim this URL is live until GitHub Pages is actually enabled and the published site is verified.

## How to update the docs

1. Update the relevant HTML page in this site when the user-facing site copy changes.
2. Update `EXTENSION_UI_FEATURE_GUIDE.md` when the extension UI, scanner taxonomy, result categories, exports, storage behaviour, or release limitations change.
3. Keep screenshots and image assets under `assets/screenshots/` aligned with the shipped UI.
4. Capture extension screenshots in dark theme only, from the current shipped/beta build, using safe fixture pages.
5. Keep screenshot dimensions and file sizes reasonable for docs performance (optimize before commit; avoid oversized captures).
6. When a static screenshot cannot explain a workflow clearly (for example multi-step triage flows), record a short local demo clip and reference it in the relevant docs page.
7. Update README links if the site structure changes.
8. Run the repository docs check before publishing:

```bash
npm run check:docs
```

If a change affects user-facing behaviour, do not leave the site or guide stale in a follow-up commit. Update them in the same change set.

## GitHub Pages deployment steps

1. Open the repository on GitHub.
2. Go to `Settings`.
3. Go to `Pages`.
4. Under `Build and deployment`, choose `Deploy from a branch`.
5. Select the `main` branch.
6. Select the `/docs` folder.
7. Save the configuration.

After GitHub Pages publishes successfully, the expected public URL is:

`https://carlashub.github.io/a11y-cat-extension/`

Do not state that the site is live until that URL is actually reachable and checked.

## Canonical detailed content

The site pages are a static documentation layer.

The canonical detailed user-facing feature reference remains:
- `EXTENSION_UI_FEATURE_GUIDE.md`
- `ENTERPRISE_READINESS_GAP.md` (includes the free-integration roadmap and capability-gap plan)

The site page:
- `docs/ui-feature-guide.html`

imports the canonical UI guide content from that markdown file through a local renderer so the public site can stay aligned without duplicating the guide text manually.

If the extension UI, taxonomy, result categories, exports, storage behaviour, or release limitations change, the canonical guide and the relevant site pages must be updated in the same change set.
