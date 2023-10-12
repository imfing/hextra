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

There are several ways to use a Hugo theme, all of which are supported by Hextra.

1. **Hugo module (recommended)**: The easiest and recommended way to use Hextra is by incorporating it as a [Hugo Module](https://gohugo.io/hugo-modules/). Hugo modules allow you to include external dependencies, like themes or content, in your Hugo website directly from a specific repository. 

    In this method:
    - theme files are fetched from the Hextra repository by Hugo
    - theme files are stored in Hugo's module cache folder
    - theme can be updated by running

      ```shell
      hugo mod get -u github.com/imfing/hextra
      ```

2. **Git submodule**: You can also add Hextra as a [Git submodule](https://git-scm.com/book/en/v2/Git-Tools-Submodules). Git submodule allows you to include a Git repository in an existing Git repository. 

    In this method:
    - theme files are fetched from the Hextra repository by Git
    - theme files are stored in your project's `themes` folder
    - theme can be updated by running

      ```shell
      git submodule update --remote
      ```

### Setup Hextra as Hugo module

#### Prerequisites

Before starting, you need to have the following softwares installed:

- [Hugo (extended version)](https://gohugo.io/installation/)
- [Git](https://git-scm.com/)
- [Go](https://go.dev/)

#### Steps

{{% steps %}}

### Initialize a new Hugo site

```shell
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

Configure your `hugo.yaml` file to use Hextra theme by including the following:

```yaml
module:
  imports:
    - path: github.com/imfing/hextra
```

### Create your first content pages

Let's create new content page for the home page and the documentation page:

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


{{% details title="How to update theme?" %}}

To update all Hugo modules in your project to their latest versions, run the following command:

```shell
$ hugo mod get -u
```

To update only Hextra to the [latest released version](https://github.com/imfing/hextra/releases), run the following command:

```shell
hugo mod get -u github.com/imfing/hextra
```

See [Hugo Modules](https://gohugo.io/hugo-modules/use-modules/#update-all-modules) for more details.

{{% /details %}}

### Setup Hextra as Git submodule

#### Prerequisites

Before starting, you need to have the following softwares installed:

- [Hugo (extended version)](https://gohugo.io/installation/)
- [Git](https://git-scm.com/)

#### Steps

{{% steps %}}

### Initialize a new Hugo site

```shell
$ hugo new site my-site --format=yaml
```

### Add Hextra theme as a Git submodule

```shell
git submodule add https://github.com/imfing/hextra.git themes/hextra
```

Configure your `hugo.yaml` file to use Hextra theme by including the following:

```yaml
theme: hextra
```

### Create your first content pages

Let's create new content page for the home page and the documentation page:

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

{{< callout type="info" >}}
  When using [CI/CD](https://en.wikipedia.org/wiki/CI/CD) for Hugo website deployment, it's essential to ensure that the following command is executed before running the `hugo` command.

  ```shell
  git submodule update --init
  ```

  Failure to run this command will result in your theme folder not being populated with the necessary Hextra theme files, leading to a build failure.
{{< /callout >}}


{{% details title="How to update theme?" %}}

To update all submodules in your repository to their latest commits, run the following command:

```shell
$ git submodule update --remote
```

To update only Hextra to the latest commit, run the following command:

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
