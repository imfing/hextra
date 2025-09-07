---
title: Getting Started
weight: 1
tags:
  - Docs
  - Guide
next: /docs/guide
prev: /docs
---

## Quick Start from Template

{{< icon "github" >}}&nbsp;[imfing/hextra-starter-template](https://github.com/imfing/hextra-starter-template)

You could quickly get started by using the above template repository.

<img src="https://docs.github.com/assets/cb-77734/mw-1440/images/help/repository/use-this-template-button.webp" width="500">

We have provided a [GitHub Actions workflow](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site#publishing-with-a-custom-github-actions-workflow) which can help automatically build and deploy your site to GitHub Pages, and host it for free.
For more options, check out [Deploy Site](../guide/deploy-site).

[🌐 Demo ↗](https://imfing.github.io/hextra-starter-template/)

## Start as New Project

There are two main ways to add the Hextra theme to your Hugo project:

1. **Hugo Modules (Recommended)**: The simplest and recommended method. [Hugo modules](https://gohugo.io/hugo-modules/) let you pull in the theme directly from its online source. Theme is downloaded automatically and managed by Hugo.

2. **Git Submodule**: Alternatively, add Hextra as a [Git Submodule](https://git-scm.com/book/en/v2/Git-Tools-Submodules). The theme is downloaded by Git and stored in your project's `themes` folder.

### Setup Hextra as Hugo module

#### Prerequisites

Before starting, you need to have the following software installed:

- [Hugo (extended version)](https://gohugo.io/installation/)
- [Git](https://git-scm.com/)
- [Go](https://go.dev/)

#### Steps

{{% steps %}}

### Initialize a new Hugo site

```shell
hugo new site my-site --format=yaml
```

### Configure Hextra theme via module

```shell
# initialize hugo module
cd my-site
hugo mod init github.com/username/my-site

# add Hextra theme
hugo mod get github.com/imfing/hextra
```

Configure `hugo.yaml` to use Hextra theme by adding the following:

```yaml
module:
  imports:
    - path: github.com/imfing/hextra
```

### Create your first content pages

Create new content page for the home page and the documentation page:

```shell
hugo new content/_index.md
hugo new content/docs/_index.md
```

### Preview the site locally

```shell
hugo server --buildDrafts --disableFastRender
```

Voila, your new site preview is available at `http://localhost:1313/`.

{{% /steps %}}


{{% details title="How to update theme?" %}}

To update all Hugo modules in your project to their latest versions, run the following command:

```shell
hugo mod get -u
```

To update Hextra to the [latest released version](https://github.com/imfing/hextra/releases), run the following command:

```shell
hugo mod get -u github.com/imfing/hextra
```

If you want to try the most recent changes before the next release, update the module to the development branch directly (⚠️ may contain unstable/breaking changes):

```shell
hugo mod get -u github.com/imfing/hextra@main
```

See [Hugo Modules](https://gohugo.io/hugo-modules/use-modules/#update-all-modules) for more details.

{{% /details %}}


### Setup Hextra as Git submodule

#### Prerequisites

Before starting, you need to have the following software installed:

- [Hugo (extended version)](https://gohugo.io/installation/)
- [Git](https://git-scm.com/)

#### Steps

{{% steps %}}

### Initialize a new Hugo site

```shell
hugo new site my-site --format=yaml
```

### Add Hextra theme as a Git submodule

Switch to the site directory and initialize a new Git repository:

```shell
cd my-site
git init
```

Then, add Hextra theme as a Git submodule:

```shell
git submodule add https://github.com/imfing/hextra.git themes/hextra
```

Configure `hugo.yaml` to use Hextra theme by adding the following:

```yaml
theme: hextra
```

### Create your first content pages

Create new content page for the home page and the documentation page:

```shell
hugo new content/_index.md
hugo new content/docs/_index.md
```

### Preview the site locally

```shell
hugo server --buildDrafts --disableFastRender
```

Your new site preview is available at `http://localhost:1313/`.

{{% /steps %}}


When using [CI/CD](https://en.wikipedia.org/wiki/CI/CD) for Hugo website deployment, it's essential to ensure that the following command is executed before running the `hugo` command.

```shell
git submodule update --init
```

Failure to run this command results in the theme folder not being populated with Hextra theme files, leading to a build failure.


{{% details title="How to update theme?" %}}

To update all submodules in your repository to their latest commits, run the following command:

```shell
git submodule update --remote
```

To update Hextra to the latest commit, run the following command:

```shell
git submodule update --remote themes/hextra
```

See [Git submodules](https://git-scm.com/book/en/v2/Git-Tools-Submodules) for more details.

{{% /details %}}

## Next

Explore the following sections to start adding more contents:

{{< cards >}}
  {{< card link="../guide/organize-files" title="Organize Files" icon="document-duplicate" >}}
  {{< card link="../guide/configuration" title="Configuration" icon="adjustments" >}}
  {{< card link="../guide/markdown" title="Markdown" icon="markdown" >}}
{{< /cards >}}
