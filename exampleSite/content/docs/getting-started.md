---
title: Getting Started
weight: 1
next: /docs/guide
prev: /docs
---

## Quick Start from Template

{{< icon "github" >}}&nbsp;[imfing/hextra-starter-template](https://github.com/imfing/hextra-starter-template)

You will be able to quickly get started by using the above template repository.

<img src="https://docs.github.com/assets/cb-77734/mw-1440/images/help/repository/use-this-template-button.webp" width="500">

We have provided a [GitHub Actions workflow](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site#publishing-with-a-custom-github-actions-workflow) which can help automatically build and deploy your site to GitHub Pages, and host it for free.

[🌐 Demo ↗](https://imfing.github.io/hextra-starter-template/)

## Start as New Project

### Prerequisites

Before we start, make sure we have [Hugo](https://gohugo.io/) installed.
Please refer to Hugo's [official installation guide](https://gohugo.io/installation/) for more details.

[Hugo modules](https://gohugo.io/hugo-modules/) are the recommended way to manage Hugo themes. To use Hugo modules, we need to install [Git](https://git-scm.com/) and [Go](https://go.dev/).

{{% steps %}}

### Initialize a new Hugo site

```bash
$ hugo new site my-site --format=yaml
```

### Configure Hextra theme via module

```shell
# initialize hugo module
$ cd my-site
$ hugo mod init github.com/username/my-site

# add Hextra theme
$ hugo mod get github.com/imfing/hextra
```

Edit `hugo.yaml` to enable Hextra theme:

```yaml
module:
  imports:
    - path: github.com/imfing/hextra
```

### Create your first content pages

Let's create a new content page for the home page and the documentation page:

```shell
$ hugo new content/_index.md
$ hugo new content/docs/_index.md
```

### Preview the site locally

```shell
$ hugo server --buildDrafts --disableFastRender
```

Voila! You can see your new site at `http://localhost:1313/`.

{{% /steps %}}


## Update Theme

{{% details title="How to update theme?" %}}

To update the theme to the [latest released version](https://github.com/imfing/hextra/releases), run the following command:

```shell
$ hugo mod get -u
```

See [Hugo Modules](https://gohugo.io/hugo-modules/use-modules/#update-all-modules) for more details.

{{% /details %}}


## Next

Explore the following sections to start adding more contents:

{{< cards >}}
  {{< card link="../guide/organize-files" title="Organize Files" icon="document-duplicate" >}}
  {{< card link="../guide/configuration" title="Configuration" icon="adjustments" >}}
  {{< card link="../guide/markdown" title="Markdown" icon="markdown" >}}
{{< /cards >}}
