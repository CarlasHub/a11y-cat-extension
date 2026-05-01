# Contributing

## Source-of-truth boundaries

- `src/runtime/modules/` is the runtime source of truth.
- `shared/a11y-cat-core.js` is generated output and must stay current.
- `dist-extension-test/` is a test-only package and must not be treated as releasable.
- `release/artifacts/manifest.json` is the canonical packaged-artifact manifest.

## Required checks

Before handing off a release-facing implementation:

```bash
npm run check:repo-discipline
npm run verify:release
```

Use `npm run check:generated-core` whenever runtime modules change.

## Product scope

The Chrome MV3 extension is the release product.

Legacy bookmarklet material may remain for engineering history or internal comparison, but it must not be treated as Chrome Store release truth.

