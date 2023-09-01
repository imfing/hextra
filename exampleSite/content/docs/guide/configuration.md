---
title: Configuration
weight: 2
---

Hugo reads its configuration from `hugo.yaml` in the root of your Hugo site.
The config file is where you can configure all aspects of your site.
You can find the config file for this site in `exampleSite/hugo.yaml` as a good starting point.

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
4. Icon
    ```yaml
    - name: GitHub
      params:
        icon: github
    ```

These menu items can be sorted by setting the `weight` parameter.

## Sidebar

### Main Sidebar

For the main sidebar, it is automatically generated from the structure of the content directory.
See the [Organize Files](/docs/guide/organize-files) page for more details.

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
    base: "https://github.com/your-username/your-repo/edit/main"
```

The edit links will be automatically generated for each page.
If you want to set edit link for a specific page, you can set the `params.editURL` parameter in the front matter of the page:

```yaml {filename="content/docs/guide/configuration.md"}
---
title: Configuration
params:
  editURL: "https://example.com/edit/this/page"
---
```

## Footer

### Copyright

To edit the copyright text, create file `en.yaml` in the `i18n/` directory with content:

```yaml {filename="i18n/en.yaml"}
copyright: "© 2023 YOUR TEXT HERE"
```
