# Examples Directory Design

**Date:** 2026-04-18  
**Status:** Approved

## Goal

Add three minimal, self-contained starter examples to `examples/` demonstrating Hextra for different use cases: developer documentation, a writer's blog, and a personal portfolio. Each example is independently runnable without touching any parent repository files.

## Directory Layout

```
examples/
├── README.md          # index: what each example shows, link to each
├── docs/
│   ├── go.mod         # requires github.com/imfing/hextra (published module)
│   ├── hugo.yaml      # commented config showcasing relevant features
│   ├── README.md      # what it demonstrates, how to run, what to tweak
│   ├── assets/css/custom.css
│   └── content/
├── blog/              # same shape
└── portfolio/         # same shape
```

Each example is self-contained: a user copies one folder, runs `hugo mod get && hugo server`, and gets a working site. No parent files, no path setup required.

For development inside the hextra repo, a `replace` directive is added manually to the example's `go.mod` and not committed.

## Example 1 — `examples/docs/`

**Theme:** Clean developer docs — neutral blue accent, compact sans-serif, tight line-height.

**Config features showcased** (commented in `hugo.yaml`):
- `params.search.enable` + FlexSearch
- `params.editURL` (GitHub edit links)
- Auto-generated sidebar from content sections
- `params.toc` (table of contents)
- `params.breadcrumb`

**`custom.css` tweaks:**
- Override `--hextra-primary-hue` for blue accent
- Slight sidebar font-size reduction for compact feel

**Content (~5 files):**
- `_index.md` — landing page with short intro
- `getting-started/_index.md` — section intro
- `getting-started/installation.md` — sample content
- `guides/_index.md` — section intro
- `guides/configuration.md` — sample content

## Example 2 — `examples/blog/`

**Theme:** Writer's blog — warm sepia/paper palette, serif headings, wider reading column.

**Config features showcased** (commented in `hugo.yaml`):
- `taxonomies` (tags)
- RSS output (`outputs`)
- `params.page.width` for wider reading column
- Author metadata in frontmatter convention
- `params.dateFormat`

**`custom.css` tweaks:**
- Serif font stack for headings
- Warm `--hextra-primary-hue` for paper/sepia tone

**Content (~5 files):**
- `_index.md` — post list homepage
- `posts/hello-world.md` — first post with tags
- `posts/on-writing.md` — second post
- `posts/using-hextra.md` — third post (demonstrates config)
- `about.md` — about page linked from navbar

## Example 3 — `examples/portfolio/`

**Theme:** Personal portfolio — bold dark-mode-first palette, strong accent color, hero homepage.

**Config features showcased** (commented in `hugo.yaml`):
- `menu.main` entries (nav links)
- `hextra-home` layout with hero + `cards` shortcode
- Social links in `params.footer`
- `params.theme.default` set to `dark`

**`custom.css` tweaks:**
- Override accent hue for bold brand color
- Optional hero background tint

**Content (~4 files):**
- `_index.md` — `layout: hextra-home`, hero block + project cards via shortcodes
- `projects/_index.md` — projects listing
- `projects/project-one.md` — sample project page
- `projects/project-two.md` — sample project page

## `hugo.yaml` Convention

Each `hugo.yaml` is generously commented. Every non-obvious setting gets an inline comment explaining what it does and why the example sets it that way. This makes reading the config a learning experience, not just boilerplate.

## `README.md` Convention

Each example's `README.md` has three short sections:
1. **What this shows** — one paragraph on the use-case and featured configs
2. **How to run** — `hugo mod get && hugo server`
3. **What to change first** — 3–5 bullet points pointing to the most relevant config keys or CSS vars

## Top-level `examples/README.md`

Links to all three examples, one-line description each, and a note on how to run any of them.

## Out of Scope

- Shared assets or base configs across examples (keep them independent)
- CI testing of examples (can be added later)
- More than three examples in this iteration
