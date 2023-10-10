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

To modify the copyright text displayed in your website's footer, you'll need to create a file named `i18n/en.yaml`.
In this file, specify your new copyright text as shown below:

```yaml {filename="i18n/en.yaml"}
copyright: "© 2023 YOUR TEXT HERE"
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

Include both `favicon.ico` and `favicon.svg` files in your project to ensure your site's favicons display correctly.

While `favicon.ico` is generally for older browsers, `favicon.svg` is supported by modern ones. The optional `favicon-dark.svg` can be included for a tailored experience in dark mode.
Feel free to use tools like [favicon.io](https://favicon.io/) or [favycon](https://github.com/ruisaraiva19/favycon) to generate these icons.


### Page Width

The width of the page can be customized by the `params.page.width` parameter in the config file:

```yaml {filename="hugo.yaml"}
params:
  page:
    # full (100%), wide (90rem), normal (1280px)
    width: wide
```

There are three available options: `full`, `wide`, and `normal`.
By default, the page width is set to `normal`.

Similarly, the width of the navbar and footer can be customized by the `params.navbar.width` and `params.footer.width` parameters.


### Google Analytics

To enable Google Analytics, set the `googleAnalytics` parameter in the config file:

```yaml {filename="hugo.yaml"}
googleAnalytics: G-XXXXXXXXXX
```
