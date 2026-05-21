# AGENTS.md

This repository is the canonical public GitHub Pages mirror for:

`https://carlashub.github.io/a11y-cat-extension/`

It is not a generated output directory from `a11y-cat`.

## Non-negotiable Site Boundary

- Do not bulk-copy `docs/`, `dist-docs/`, generated docs output, or root `index.html` from another repository into this repository.
- Do not replace the live homepage structure when updating wording.
- Preserve the homepage video section, current extension screenshots, footer credit, and mirror-specific navigation unless the user explicitly asks to redesign them.
- Do not publish internal Chrome install links in this public repository.
- Internal Chrome approval may be documented, but the install link must stay in approved internal channels only.

## Required Checks Before Commit

Run:

```bash
node scripts/check-site-regression.mjs
```

This check exists specifically to prevent the live site from being overwritten by older generated documentation output.

