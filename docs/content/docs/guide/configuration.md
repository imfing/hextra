---
title: Configuration
weight: 2
tags:
  - Config
---

Hugo reads its configuration from `hugo.yaml` in the root of your Hugo site.
The config file is where you can configure all aspects of your site.
Check out the config file for this site [`docs/hugo.yaml`](https://github.com/imfing/hextra/blob/main/docs/hugo.yaml) on GitHub to get a comprehensive idea of available settings and best practices.

<!--more-->

## Navigation

### Menu

Top right menu is defined under the `menu.main` section in the config file:

```yaml {filename="hugo.yaml"}
menu:
  main:
    - name: Documentation
      pageRef: /docs
      weight: 1
    - name: Blog
      pageRef: /blog
      weight: 2
    - name: About
      pageRef: /about
      weight: 3
    - name: Search
      weight: 4
      params:
        type: search
    - name: GitHub
      weight: 5
      url: "https://github.com/imfing/hextra"
      params:
        icon: github
```

There are different types of menu items:

1. Link to a page in the site with `pageRef`
   ```yaml
   - name: Documentation
     pageRef: /docs
   ```
2. Link to an external URL with `url`
   ```yaml
   - name: GitHub
     url: "https://github.com"
   ```
3. Search bar with `type: search`
   ```yaml
   - name: Search
     params:
       type: search
   ```
4. Icon Only
   ```yaml
   - name: GitHub
     params:
       icon: github
   ```
5. Link with Icon
   ```yaml
   - name: Blog
     params:
       type: link
       icon: rss
   ```
6. Theme Toggle
   ```yaml
    - name: Theme Toggle
      params:
        type: theme-toggle
        label: true # optional, default is false
   ```
7. Language Switcher
   ```yaml
    - name: Language Switcher
      params:
        type: language-switch
        label: true # optional, default is false
        icon: "globe-alt" # optional, default is "translate"
   ```

These menu items can be sorted by setting the `weight` parameter.

### Nested Menus

You can create dropdown menus by defining child menu items. Child menus appear when clicking on the parent menu item.

```yaml {filename="hugo.yaml"}
menu:
  main:
    - identifier: sdk
      name: SDK
    - identifier: python
      name: Python ↗
      url: https://python.org
      parent: sdk
    - identifier: go
      name: Go
      url: https://go.dev
      parent: sdk
```

Child menu items need to specify the `parent` parameter with the parent's `identifier` value.

### Logo and Title

To modify the default logo, edit `hugo.yaml` and add the path to your logo file under `static` directory.
Optionally, you can change the link that users are redirected to when clicking on your logo, as well as set the width & height of the logo in pixels.

```yaml {filename="hugo.yaml"}
params:
  navbar:
    displayTitle: true
    displayLogo: true
    logo:
      path: images/logo.svg
      dark: images/logo-dark.svg
      link: /
      width: 40
      height: 20
```

### Pagination

To disable the previous/next navigation at the bottom of docs pages or blog articles:

```yaml {filename="hugo.yaml"}
params:
  page:
    displayPagination: false  # for docs pages
  blog:
    article:
      displayPagination: false  # for blog articles
```

## Sidebar

### Main Sidebar

For the main sidebar, it is automatically generated from the structure of the content directory.
See the [Organize Files](/docs/guide/organize-files) page for more details.

To exclude a single page from the left sidebar, set the `sidebar.exclude` parameter in the front matter of the page:

```yaml {filename="content/docs/guide/configuration.md"}
---
title: Configuration
sidebar:
  exclude: true
---
```

### Extra Links

Sidebar extra links are defined under the `menu.sidebar` section in the config file:

```yaml {filename="hugo.yaml"}
menu:
  sidebar:
    - name: More
      params:
        type: separator
      weight: 1
    - name: "About"
      pageRef: "/about"
      weight: 2
    - name: "Hugo Docs ↗"
      url: "https://gohugo.io/documentation/"
      weight: 3
```

### Hiding

Hiding the sidebar can be done using front matter:

```yaml {filename="content/docs/guide/configuration.md"}
---
title: Configuration
sidebar:
  hide: true
---
```

This will hide the main sidebar from the page, freeing up space for the main content of the page.


## Right Sidebar

### Table of Contents

Table of contents is automatically generated from the headings in the content file. It can be disabled by setting `toc: false` in the front matter of the page.

```yaml {filename="content/docs/guide/configuration.md"}
---
title: Configuration
toc: false
---
```

### Page Edit Link

To configure the page edit link, we can set the `params.editURL.base` parameter in the config file:

```yaml {filename="hugo.yaml"}
params:
  editURL:
    enable: true
    base: "https://github.com/your-username/your-repo/edit/main"
```

The edit links will be automatically generated for each page based on the provided url as root directory.
If you want to set edit link for a specific page, you can set the `editURL` parameter in the front matter of the page:

```yaml {filename="content/docs/guide/configuration.md"}
---
title: Configuration
editURL: "https://example.com/edit/this/page"
---
```

## Footer

### Copyright

To modify the copyright text displayed in your website's footer, you'll need to create a file named `i18n/en.yaml`.
In this file, specify your new copyright text as shown below:

```yaml {filename="i18n/en.yaml"}
copyright: "© 2024 YOUR TEXT HERE"
```

For your reference, an example [`i18n/en.yaml`](https://github.com/imfing/hextra/blob/main/i18n/en.yaml) file can be found in the GitHub repository. Additionally, you could use Markdown format in the copyright text.

## Others

### Favicon

To customize the [favicon](https://en.wikipedia.org/wiki/Favicon) for your site, place icon files under the `static` folder to override the [default favicons from the theme](https://github.com/imfing/hextra/tree/main/static):

{{< filetree/container >}}
  {{< filetree/folder name="static" >}}
    {{< filetree/file name="android-chrome-192x192.png" >}}
    {{< filetree/file name="android-chrome-512x512.png" >}}
    {{< filetree/file name="apple-touch-icon.png" >}}
    {{< filetree/file name="favicon-16x16.png" >}}
    {{< filetree/file name="favicon-32x32.png" >}}
    {{< filetree/file name="favicon-dark.svg" >}}
    {{< filetree/file name="favicon.ico" >}}
    {{< filetree/file name="favicon.svg" >}}
    {{< filetree/file name="site.webmanifest" >}}
  {{< /filetree/folder >}}
{{< /filetree/container >}}

#### Basic Setup

At minimum, include `favicon.svg` in your `static` folder. This will be used as the default favicon for your site.

You can create an adaptive SVG favicon that responds to system theme preferences by using CSS media queries within the SVG itself, following the approach described in [Building an Adaptive Favicon](https://web.dev/articles/building/an-adaptive-favicon).

#### Dark Mode Support

For enhanced dark mode support, add `favicon-dark.svg` to your `static` folder alongside `favicon.svg`. When both files are present, Hextra will automatically:

- Use `favicon.svg` for light mode or when no theme preference is detected
- Switch to `favicon-dark.svg` when the user's system is set to dark mode
- Respect the system's `prefers-color-scheme` setting for automatic switching

The dark mode favicon switching works across all modern browsers, including Firefox, and provides a seamless experience that matches your site's theme.

#### Additional Formats

While `favicon.ico` is generally for older browsers, modern browsers support SVG favicons which are preferred for their scalability and small file size.
Use tools like [favicon.io](https://favicon.io/) or [favycon](https://github.com/ruisaraiva19/favycon) to generate additional favicon formats if needed.

### Theme Configuration

Use the `theme` setting to configure the default theme mode and toggle button, allowing visitors to switch between light or dark mode.

```yaml {filename="hugo.yaml"}
params:
  theme:
    # light | dark | system
    default: system
    displayToggle: true
```

Options for `theme.default`:

- `light` - always use light mode
- `dark` - always use dark mode
- `system` - sync with the operating system setting (default)

The `theme.displayToggle` parameter allows you to display a toggle button for changing themes.
When set to `true`, visitors can switch between light or dark mode, overriding the default setting.

### Page Last Modification

The date of the page's last modification can be displayed by enabling the `params.displayUpdatedDate` flag. To use Git commit date as the source, enable also the `enableGitInfo` flag.

To customize the date format, set the `params.dateFormat` parameter. Its layout matches Hugo's [`time.Format`](https://gohugo.io/functions/time/format/).

Additionally, the author of the last modification can be displayed by enabling the `params.displayUpdatedAuthor` flag. This requires `enableGitInfo: true` to be set.

```yaml {filename="hugo.yaml"}
# Parse Git commit
enableGitInfo: true

params:
  # Display the last modification date
  displayUpdatedDate: true
  dateFormat: "January 2, 2006"
  # Display the author of the last modification
  displayUpdatedAuthor: true
```

### Tags

To display page tags, set following flags in the config file:

```yaml {filename="hugo.yaml"}
params:
  blog:
    list:
      displayTags: true
  toc:
    displayTags: true
```

### Image Zoom

Image zoom is disabled by default. When enabled, clicking a Markdown image opens a zoomed view.

```yaml {filename="hugo.yaml"}
params:
  imageZoom:
    enable: true
```

To disable zoom on a specific page, add this to the page front matter:

```yaml {filename="content/docs/guide/configuration.md"}
---
imageZoom: false
---
```

If you want to pin the Medium Zoom asset or load it from local assets:

```yaml {filename="hugo.yaml"}
params:
  imageZoom:
    enable: true
    base: "https://cdn.jsdelivr.net/npm/medium-zoom@1.1.0/dist"
    # js: "js/medium-zoom.min.js" # optional, relative to the base or local assets
```

### Page Width

The layout shell width can be customized by the `params.page.width` parameter in the config file:

```yaml {filename="hugo.yaml"}
params:
  page:
    # full (100%), wide (90rem), normal (1280px)
    width: wide
```

Available options for `params.page.width`: `full`, `wide`, `normal`.

The main reading content width remains fixed at `72rem` by default.

To customize content width, override the CSS variable in your custom stylesheet:

```css {filename="assets/css/custom.css"}
:root {
  --hextra-max-content-width: 100%;
}
```

Similarly, the width of the navbar and footer can be customized by the `params.navbar.width` and `params.footer.width` parameters.

### Page Context Menu

The page context menu provides a dropdown button that allows users to copy the page content as Markdown or view the raw Markdown source. This feature is useful for documentation sites where readers may want to share or reference the content in Markdown format.

#### Enabling the Context Menu

To enable the context menu globally, add the following to your config file:

```yaml {filename="hugo.yaml"}
params:
  page:
    contextMenu:
      enable: true
```

You also need to enable the `markdown` output format for pages:

```yaml {filename="hugo.yaml"}
outputs:
  page: [html, markdown]
  section: [html, rss, markdown]
```

#### Per-Page Control

To enable or disable the context menu for a specific page, use the `contextMenu` parameter in the front matter:

```yaml {filename="content/docs/example.md"}
---
title: Example Page
contextMenu: false
---
```

#### Custom Links

You can add custom links to the context menu dropdown. This is useful for integrating with external services. The links support the following placeholders:

- `{url}` - The page URL (URL-encoded)
- `{title}` - The page title (URL-encoded)
- `{markdown_url}` - The URL to the raw Markdown content (URL-encoded)

```yaml {filename="hugo.yaml"}
params:
  page:
    contextMenu:
      enable: true
      links:
        - name: Open in ChatGPT
          icon: chatgpt
          url: "https://chatgpt.com/?hints=search&q=I%27m+looking+at+this+documentation%3A+{url}%0AHelp+me+understand+how+to+use+it."
```

Each link can have:
- `name` - The display text for the link
- `icon` - An optional icon name (see [Icons]({{% relref "docs/guide/shortcodes/icon" %}}))
- `url` - The URL with optional placeholders

### FlexSearch Index

Full-text search powered by [FlexSearch](https://github.com/nextapps-de/flexsearch) is enabled by default.
To customize the search index, set the `params.search.flexsearch.index` parameter in the config file:

```yaml {filename="hugo.yaml"}
params:
  # Search
  search:
    enable: true
    type: flexsearch

    flexsearch:
      # index page by: content | summary | heading | title
      index: content
```

Options for `flexsearch.index`:

- `content` - full content of the page (default)
- `summary` - summary of the page, see [Hugo Content Summaries](https://gohugo.io/content-management/summaries/) for more details
- `heading` - level 1 and level 2 headings
- `title` - only include the page title

To customize the search tokenize, set the `params.search.flexsearch.tokenize` parameter in the config file:

```yaml {filename="hugo.yaml"}
params:
  search:
    # ...
    flexsearch:
      # full | forward | reverse | strict
      tokenize: forward
```

Options for [`flexsearch.tokenize`](https://github.com/nextapps-de/flexsearch/#tokenizer-prefix-search):

- `strict` - index whole words
- `forward` - incrementally index words in forward direction
- `reverse` - incrementally index words in both directions
- `full` - index every possible combination

To exclude a page from the FlexSearch search index, set the `excludeSearch: true` in the front matter of the page:

```yaml {filename="content/docs/guide/configuration.md"}
---
title: Configuration
excludeSearch: true
---
```

### Google Search Index

To [block Google Search](https://developers.google.com/search/docs/crawling-indexing/block-indexing) from indexing a page, set `noindex` to true in your page frontmatter:

```yaml
title: Configuration (archive version)
params:
  noindex: true
```

To exclude an entire directory, use the [`cascade`](https://gohugo.io/configuration/cascade/) key in the parent `_index.md` file.

> [!NOTE]
> To block search crawlers, you can make a [`robots.txt` template](https://gohugo.io/templates/robots/).
> However, `robots.txt` instructions do not necessarily keep a page out of Google search results.

### Analytics

Hextra has support for several different analytics solutions. Hextra only supports analytics in production environments. This is to ensure that you do not accidentally send analytic events when working locally. If, however, you do want to test analytics locally, you can run a production server using:

```
hugo server --environment production
```

#### Google Analytics

To enable [Google Analytics](https://marketingplatform.google.com/about/analytics/), set `services.googleAnalytics.ID` flag in `hugo.yaml`:

```yaml {filename="hugo.yaml"}
services:
  googleAnalytics:
    ID: G-MEASUREMENT_ID
```

#### Umami Analytics

To enable [Umami](https://umami.is/docs/), set `params.analytics.umami.serverURL` and `params.analytics.umami.websiteID` flag in `hugo.yaml`:

```yaml {filename="hugo.yaml"}
params:
  analytics:
    umami:
      serverURL: "https://example.com"
      websiteID: "94db1cb1-74f4-4a40-ad6c-962362670409"
      # scriptName: "script.js" # optional (default: script.js)
      # https://umami.is/docs/tracker-configuration#data-host-url
      # hostURL: "http://stats.example.org" # optional
      # https://umami.is/docs/tracker-configuration#data-auto-track
      # autoTrack: "false" # optional
      # https://umami.is/docs/tracker-configuration#data-tag
      # domains: "example.net,example.org" # optional
      # https://umami.is/docs/tracker-configuration#data-exclude-search
      # tag: "umami-eu" # optional
      # https://umami.is/docs/tracker-configuration#data-exclude-hash
      # excludeSearch: "true" # optional
      # https://umami.is/docs/tracker-configuration#data-do-not-track
      # excludeHash: "true" # optional
      # https://umami.is/docs/tracker-configuration#data-domains
      # doNotTrack: "true" # optional
```

#### Matomo Analytics

To enable [Matomo](https://matomo.org/), set `params.analytics.matomo.URL` and `params.analytics.matomo.ID` flag in `hugo.yaml`:

```yaml {filename="hugo.yaml"}
params:
  analytics:
    matomo:
      serverURL: "https://example.com"
      websiteID: "94db1cb1-74f4-4a40-ad6c-962362670409"
```

#### GoatCounter Analytics

To enable [GoatCounter](https://www.goatcounter.com/), set `params.analytics.goatCounter.code` in `hugo.yaml`
All settings available here are mirrors of the settings described in GoatCounter [settings](https://www.goatcounter.com/help/js#settings-44186)

```yaml {filename="hugo.yaml"}
params:
  analytics:
    goatCounter:
      code: "ABCDE"

      # Optional Settings
      #------------------
      # disables automatic collection of data
      # noOnload: true
      
      # disables event binding. See more here https://www.goatcounter.com/help/events
      # noEvents: true

      # allows data collection from local addresses. Use this with a production environment to test locally
      # allowLocal: true

      # Allow data collection when a page is loaded in a frame or iframe
      # allowFrame: true
```

### LLMS.txt Support

To enable [llms.txt](https://llmstxt.org/) output format for your site, which provides a structured text outline for [large language models](https://en.wikipedia.org/wiki/Large_language_model) and AI agents, add the `llms` output format to your site's `hugo.yaml`:

```diff {filename="hugo.yaml"}
outputs:
- home: [html]
+ home: [html, llms]
  page: [html]
  section: [html, rss]
```

This will generate an `llms.txt` file at your site's root containing:

- Site title and description
- Hierarchical listing of all sections and pages
- Page summaries and publication dates
- Direct links to all content

You can exclude specific pages or sections by setting `llms: false` in their front matter:

```yaml
---
title: "Internal Notes"
llms: false
---
```

The llms.txt file is automatically generated from your content structure and makes your site more accessible to AI tools and language models for context and reference.

### Open Graph

To add [Open Graph](https://ogp.me/) metadata, you can:
- add values in the front-matter params of a page
- or add values in the Hugo configuration file

As a page can have multiple `image` and `video` tags, place their values in an array.
Other Open Graph properties can have only one value.

{{< tabs >}}
{{< tab name="Page Level" >}}

```md {filename="mypage.md"}
---
title: "My Page"
params:
  images:
    - "images/image01.jpg"
  audio: "podcast02.mp3"
  videos:
    - "video01.mp4"
---

Page content.
```
{{< /tab >}}
{{< tab name="Global Level" >}}
```yaml {filename="hugo.yaml"}
params:
  images:
    - "images/image01.jpg"
  audio: "podcast02.mp3"
  videos:
    - "video01.mp4"
```
{{< /tab >}}
{{< /tabs >}}

### Banner

To add a banner to your site, add the following to your `hugo.yaml`:

```yaml
params:
  banner:
    key: 'announcement-xxx'
    message: |
      🎉 Welcome! [Hextra](https://github.com/hextra/hextra) is a static site generator that helps you build modern websites.
```

The banner will be displayed on all pages.

The field `message` supports Markdown syntax.

If you want to use template syntax, you can define the partial in `layouts/_partials/custom/banner.html`.
In this case, the field `message` will be ignored.

### External Link Decoration

Adds an arrow icon to external links (default: false) when rendering links from Markdown.

```yaml
params:
  externalLinkDecoration: true
```
