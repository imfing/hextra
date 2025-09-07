# CLAUDE.md

This file provides guidance to [Claude Code](claude.ai/code) when working with code in this repository.

## Project Overview

Hextra is a modern, responsive Hugo theme designed for creating documentation websites, technical blogs, and static sites. Built with Tailwind CSS and inspired by Nextra, it offers features like full-text search, dark mode, multi-language support, and extensive customization options.

## Development Commands

### Development Server

```bash
# Start development server with theme reloading (recommended for theme development)
npm run dev:theme

# Using Task runner
task dev
```

### Building

```bash
# Build the example site
npm run build
# or
task build

# Build CSS assets only
npm run build:css
# or
task css
```

### Alternative Task Commands

The project uses Task runner (`taskfile.yaml`) for simplified commands:

- `task dev` - Start development server (runs `npm run dev:theme`)
- `task build` - Build example site
- `task css` - Compile CSS (depends on build)

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
│   ├── styles.css              # Main stylesheet
│   ├── compiled/main.css       # Built CSS output (generated)
│   ├── components/             # Component-specific styles
│   └── chroma/                 # Syntax highlighting themes
├── js/                         # JavaScript components
└── lib/                        # External libraries
```

### Key Components

- **Search**: FlexSearch-powered full-text search (`assets/js/flexsearch.js`)
- **Navigation**: Responsive navbar and auto-generated sidebar
- **Theme Toggle**: Dark/light mode switching
- **Internationalization**: 20+ language support in `i18n/`

### Content Features

- **Shortcodes**: `callout`, `card`, `cards`, `tabs`, `details`, `steps`, `jupyter`, `filetree`
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
- `taskfile.yaml` - Task runner configuration

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
- Core JS components: `theme.js`, `search.js`, `nav-menu.js`, `code-copy.js`
- FlexSearch powers offline full-text search functionality

### CSS Architecture

- Uses Tailwind CSS v4+ with PostCSS processing
- Component-based CSS organization in `assets/css/components/`
- Compiled output goes to `assets/css/compiled/main.css`
- Prettier formatting for Go templates and code consistency

### Testing & Quality Assurance

- Test all changes in `docs/` before releasing
- Use `npm run dev:theme` for theme development with hot reloading
- Format code with `npx prettier --write .` before committing
- Verify multi-language functionality across supported languages
