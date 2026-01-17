# Open Graph Image Subpath Issue - Investigation Findings

## Issue Summary

Users deploying Hextra sites to subpaths (e.g., `https://wwology.github.io/disgo/`) encounter broken Open Graph images when specifying image paths with leading slashes in their configuration.

**Example of the problem:**

```yaml
params:
  images:
    - "/images/disgo-home-page.png"
```

This generates:

```html
<meta property="og:image" content="https://wwology.github.io/images/disgo-home-page.jpg" />
```

But should generate:

```html
<meta property="og:image" content="https://wwology.github.io/disgo/images/disgo-home-page.jpg" />
```

## Root Cause Analysis

### Hugo's URL Function Behavior with Leading Slashes

Testing reveals that Hugo's `absURL` function treats paths with leading slashes as absolute from the domain root:

**Test Configuration:**

```yaml
baseURL: "https://wwology.github.io/disgo/"
```

**Results:**

- `"/images/test.png" | absURL` → `https://wwology.github.io/images/test.png` ❌ (ignores subpath)
- `"images/test.png" | absURL` → `https://wwology.github.io/disgo/images/test.png` ✅ (includes subpath)
- `"/images/test.png" | relURL` → `/images/test.png` ❌ (absolute from root)
- `"images/test.png" | relURL` → `/disgo/images/test.png` ✅ (includes subpath)

**Key Finding:** Leading slashes (`/`) in paths are treated as absolute paths from the domain root, bypassing the subpath defined in `baseURL`.

## Current Implementation in opengraph.html

**File:** `/layouts/_partials/opengraph.html` (lines 24-38)

```go
{{- with $.Params.images -}}
  {{- range first 6 . }}
    {{- with $.Resources.GetMatch . }}
      <!-- If the string matches a page resource, use that -->
      <meta property="og:image" content="{{ .Permalink }}">
    {{- else }}
      <!-- Otherwise treat it as a site/global path -->
      <meta property="og:image" content="{{ . | absURL }}">
    {{- end }}
  {{- end }}
{{- else -}}
  {{- with $.Site.Params.images }}
    <meta property="og:image" content="{{ index . 0 | absURL }}">
  {{- end }}
{{- end -}}
```

**Problem:** Lines 31 and 36 use `absURL` directly on user-provided paths without handling leading slashes.

## How Other Theme Components Handle This

### ✅ Correct Pattern Used Throughout the Theme

The theme **already handles this correctly** in most other places by stripping leading slashes before using `relURL`:

#### 1. **Links in Shortcodes**

Files: `card.html:21`, `hero-badge.html:13`, `feature-card.html:26`, `hero-button.html:16`, `hero-container.html:33`

```go
{{- $href := cond (strings.HasPrefix $link "/") ($link | relURL) $link -}}
```

#### 2. **Images in Shortcodes**

Files: `card.html:50-51`, `feature-card.html:28-29`, `hero-container.html:34-35`

```go
{{- if hasPrefix $image "/" -}}
  {{- $image = relURL (strings.TrimPrefix "/" $image) -}}
{{- end -}}
```

#### 3. **Images in Markdown Render Hook**

File: `render-image.html:20`

```go
{{- $dest = (relURL (strings.TrimPrefix "/" $dest)) -}}
```

#### 4. **Navigation Links**

Files: `navbar.html`, `navbar-link.html`, `sidebar.html`

```go
{{- $link = relLangURL (strings.TrimPrefix "/" .) -}}
```

#### 5. **Favicon and Logo Paths**

Files: `favicons.html`, `navbar-title.html`

```go
{{ "favicon.ico" | relURL }}
{{ $logoPath | relURL }}
```

_Note: These use paths without leading slashes from the start_

### Pattern Summary

**The correct pattern used throughout the theme:**

```go
{{- if hasPrefix $path "/" -}}
  {{- $path = relURL (strings.TrimPrefix "/" $path) -}}
{{- end -}}
```

**Why this works:**

1. Strip leading slash: `strings.TrimPrefix "/" "/images/test.png"` → `"images/test.png"`
2. Apply relURL: `"images/test.png" | relURL` → `/subpath/images/test.png`
3. Then optionally apply absURL if needed for absolute URLs

## User Workarounds

### Immediate Fix: Remove Leading Slash

```yaml
# ❌ WRONG - will not work with subpaths
params:
  images:
    - "/images/disgo-home-page.png"

# ✅ CORRECT - works with subpaths
params:
  images:
    - "images/disgo-home-page.png"
```

**AND ensure baseURL includes the subpath:**

```yaml
baseURL: "https://wwology.github.io/disgo/" # ✅ includes /disgo/
```

## Recommended Theme Fix

Update `layouts/_partials/opengraph.html` to follow the same pattern as the rest of the theme:

```go
{{- with $.Params.images -}}
  {{- range first 6 . }}
    {{- with $.Resources.GetMatch . }}
      <!-- If the string matches a page resource, use that -->
      <meta property="og:image" content="{{ .Permalink }}">
    {{- else }}
      <!-- Otherwise treat it as a site/global path -->
      {{- $image := . -}}
      {{- if hasPrefix $image "/" -}}
        {{- $image = relURL (strings.TrimPrefix "/" $image) -}}
      {{- end -}}
      <meta property="og:image" content="{{ $image | absURL }}">
    {{- end }}
  {{- end }}
{{- else -}}
  {{- with $.Site.Params.images }}
    {{- $image := index . 0 -}}
    {{- if hasPrefix $image "/" -}}
      {{- $image = relURL (strings.TrimPrefix "/" $image) -}}
    {{- end -}}
    <meta property="og:image" content="{{ $image | absURL }}">
  {{- end }}
{{- end -}}
```

### Alternative Simpler Approach

Since `absURL` should work with relative paths, we could simply strip the leading slash and use `absURL` directly:

```go
{{- with $.Params.images -}}
  {{- range first 6 . }}
    {{- with $.Resources.GetMatch . }}
      <meta property="og:image" content="{{ .Permalink }}">
    {{- else }}
      {{- $image := strings.TrimPrefix "/" . -}}
      <meta property="og:image" content="{{ $image | absURL }}">
    {{- end }}
  {{- end }}
{{- else -}}
  {{- with $.Site.Params.images }}
    {{- $image := strings.TrimPrefix "/" (index . 0) -}}
    <meta property="og:image" content="{{ $image | absURL }}">
  {{- end }}
{{- end -}}
```

## Documentation Update Needed

The current documentation at `/docs/content/docs/guide/configuration.md` (lines 515-542) shows examples with leading slashes:

```yaml
params:
  images:
    - "/images/image01.jpg" # Leading slash shown in docs
```

**Recommendation:** Either:

1. Update documentation to remove leading slashes from examples, OR
2. Fix the theme code and add a note that both formats are supported

## Files Referenced

- `/layouts/_partials/opengraph.html` - Open Graph meta tags generation
- `/layouts/_partials/shortcodes/card.html` - Card component
- `/layouts/_shortcodes/hextra/feature-card.html` - Feature card shortcode
- `/layouts/_shortcodes/hextra/hero-container.html` - Hero container shortcode
- `/layouts/_markup/render-image.html` - Markdown image render hook
- `/layouts/_partials/navbar.html` - Navigation bar
- `/layouts/_partials/favicons.html` - Favicon links
- `/docs/content/docs/guide/configuration.md` - Configuration documentation

## Conclusion

This is an **inconsistency in the theme's handling of leading slashes**. While most components properly strip leading slashes before using `relURL`, the Open Graph partial does not. This causes issues for users deploying to subpaths.

**Recommendation:** Fix the theme to match the pattern used elsewhere in the codebase, ensuring consistent behavior and preventing user confusion.
