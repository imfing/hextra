# AGENTS.md

This file provides guidance to AI coding agents when working with code in this repository.

## Project Overview

Hextra is a modern, responsive Hugo theme designed for creating documentation websites, technical blogs, and static sites. Built with Tailwind CSS, it offers features like full-text search, dark mode, multi-language support, and extensive customization options.

## Development Commands

### Initial Setup

When working in a new worktree or fresh clone without `node_modules`, run `npm install` first to install dependencies:

```bash
npm install
```

### Development Server

```bash
# Start development server with theme reloading (recommended for theme development)
npm run dev:theme
```

### Building

```bash
# Build the example site
npm run build

# Build CSS assets only
npm run build:css
```

## Architecture Overview

### Hugo Theme Structure

- **Base Layout**: `layouts/baseof.html` wraps all pages
- **Specialized Layouts**: `layouts/docs/`, `layouts/blog/`, `layouts/hextra-home.html`
- **Partials**: Reusable components in `layouts/_partials/`
  - Core UI: `navbar.html`, `sidebar.html`, `footer.html`, `breadcrumb.html`, `toc.html`
  - Utilities: `layouts/_partials/utils/` for helper functions
  - Custom overrides: `layouts/_partials/custom/` for user customizations
- **Shortcodes**: Custom Markdown extensions in `layouts/_shortcodes/`
- **Render Hooks**: Custom Markdown rendering in `layouts/_markup/` for codeblocks, headings, images, and links

### Asset Organization

```
assets/
├── css/
│   ├── styles.css              # Main stylesheet (Tailwind entry point)
│   ├── compiled/main.css       # Built CSS output (generated)
│   ├── components/             # Component-specific styles
│   ├── chroma/                 # Syntax highlighting themes
│   └── custom.css              # User customization entry point
└── js/
    ├── core/                   # Core JS components
    └── flexsearch.js           # Search functionality
```

### Key Components

- **Search**: FlexSearch-powered full-text search (`assets/js/flexsearch.js`)
- **Navigation**: Responsive navbar and auto-generated sidebar
- **Theme Toggle**: Dark/light mode switching
- **Internationalization**: 20+ language support in `i18n/`

### Content Features

- **Shortcodes**: `callout`, `card`, `cards`, `tabs`, `tab`, `details`, `steps`, `filetree`, `jupyter`, `badge`, `icon`, `pdf`, `include`, `asciinema`, `term`
- **Code Features**: Syntax highlighting (Chroma), copy buttons, line numbers via render hooks
- **SEO**: Open Graph, Twitter Cards, structured data
- **Performance**: Minimal JavaScript, optimized CSS with Tailwind

## Development Workflow

### Example Site Development

The `docs/` directory serves as both documentation and testing ground:

- Test new features here before releasing
- Configuration examples in `docs/hugo.yaml` showing multi-language setup
- Content examples demonstrate all theme capabilities
- Run from docs with: `hugo server --themesDir=../..`

### CSS Development Workflow

- Source: `assets/css/styles.css` (main stylesheet)
- Build process: Tailwind CSS → PostCSS → `assets/css/compiled/main.css`
- Component styles organized in `assets/css/components/`
- Chroma syntax highlighting themes in `assets/css/chroma/`
- CSS compilation requires Node.js dependencies (PostCSS, Tailwind CSS v4+)

#### Rebuilding CSS after template changes

Tailwind CSS relies on `docs/hugo_stats.json` to know which HTML tags, classes, and IDs are actually used in the built site, so it can tree-shake unused styles. When you modify layouts, partials, or shortcodes you must **regenerate `hugo_stats.json` first**, then rebuild the CSS:

1. **Generate `docs/hugo_stats.json`** — Run Hugo with the `dev.toml` config (which sets `build.buildStats.enable = true`):

   ```bash
   # Using npm (starts a dev server that writes hugo_stats.json on every rebuild):
   npm run dev:theme

   # Or a one-shot build using the raw Hugo command:
   hugo --config=hugo.yaml,../dev.toml --themesDir=../.. --source=docs
   ```

2. **Build the CSS** — With an up-to-date `hugo_stats.json` in place, compile the stylesheet:

   ```bash
   npm run build:css
   ```

> **Why two steps?** `dev.toml` mounts `docs/hugo_stats.json` into the Hugo asset pipeline (`assets/notwatching/hugo_stats.json`) and configures a cache-buster so that changes to the stats file trigger a CSS recompile during `dev:theme`. When running outside the dev server you need to perform these steps manually in order.

### Customization Points

- Custom partials: `layouts/_partials/custom/`
- Custom CSS: `assets/css/custom.css`
- Site-specific overrides: Copy any layout to your site's `layouts/` directory

## Configuration & Requirements

### Theme Requirements

- Hugo minimum version: 0.146.0 (extended version required - see `theme.toml`)
- Go 1.20+ (as specified in `go.mod`)
- Node.js for CSS compilation (PostCSS, Tailwind CSS v4+)

### Key Configuration Files

- `docs/hugo.yaml` - Example Hugo configuration with multi-language setup
- `postcss.config.mjs` - PostCSS configuration for CSS processing
- `package.json` - Node.js dependencies and build scripts

### Development Environment

- Default Hugo development server: Port 1313
- Development server runs with `--disableFastRender -D` for better development experience
- Theme development uses `--logLevel=debug` for detailed logging

### Multi-language Support

- Configure languages in `hugo.yaml` (supports 20+ languages including RTL)
- Translation files in `i18n/` directory (e.g., `en.yaml`, `fa.yaml`, `ja.yaml`, `zh-cn.yaml`)
- Example supports English, Persian (RTL), Japanese, and Simplified Chinese

## Theme Development Guidelines

### Hugo Theme Conventions

- Theme files in this repository override Hugo defaults
- Follow Hugo's theme development guidelines for compatibility
- Maintain backward compatibility with existing configurations

### JavaScript & Performance

- All JavaScript components are designed to have minimal footprint
- Core JS components in `assets/js/core/`: `theme.js`, `nav-menu.js`, `code-copy.js`, `sidebar.js`, `tabs.js`, etc.
- FlexSearch powers offline full-text search (`assets/js/flexsearch.js`)

### CSS Architecture

- Uses Tailwind CSS v4+ with PostCSS processing
- Component-based CSS organization in `assets/css/components/`
- Compiled output goes to `assets/css/compiled/main.css`
- Prettier formatting for Go templates and code consistency

### Accessibility (WCAG Compliance)

All new features and UI changes must follow the [Web Content Accessibility Guidelines (WCAG) 2.2](https://www.w3.org/TR/WCAG22/) at the **AA** conformance level. Key requirements:

- **Semantic HTML**: Use appropriate elements (`<nav>`, `<main>`, `<aside>`, `<button>`, `<ul>`, etc.) instead of generic `<div>`/`<span>` where applicable.
- **ARIA attributes**: Add `aria-label`, `aria-expanded`, `aria-controls`, `aria-current`, `role`, and other ARIA attributes to interactive components (menus, toggles, dropdowns, modals) so screen readers can interpret them.
- **Keyboard navigation**: All interactive elements must be reachable and operable via keyboard (`Tab`, `Enter`, `Escape`, arrow keys). Manage focus appropriately when opening/closing menus, modals, and drawers.
- **Focus indicators**: Never remove visible focus outlines. Use the existing `hextra-focus` utility or equivalent visible focus ring styles.
- **Color contrast**: Text and interactive elements must meet WCAG AA contrast ratios (4.5:1 for normal text, 3:1 for large text). Verify in both light and dark modes.
- **Images and icons**: Decorative SVGs/icons should have `aria-hidden="true"`. Meaningful images need descriptive `alt` text.
- **Skip links and landmarks**: Preserve existing skip-navigation links and ARIA landmark roles (`role="navigation"`, `role="search"`, etc.).
- **Live regions**: Use `aria-live` for dynamic content updates (e.g., search results, status messages) so assistive technology announces changes.
- **Form controls**: Associate `<label>` elements with inputs. Provide accessible names for buttons that contain only icons.

When introducing a new component or modifying an existing one, verify it works with keyboard-only navigation and review the rendered HTML for proper semantics and ARIA usage.

### Testing & Quality Assurance

- Test all changes in `docs/` before releasing
- Use `npm run dev:theme` for theme development with hot reloading
- Format code with `npx prettier --write .` before committing
- Verify multi-language functionality across supported languages
