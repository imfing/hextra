---
title: Getting Started
weight: 1
next: /docs/guide
prev: /docs
---

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
$ hugo server
```

Voila! You can see your new site at `http://localhost:1313/`.

{{% /steps %}}


## Next

Explore the following sections to start adding more contents:

{{< cards >}}
  {{< card link="organize-files" title="Organize Files" icon="document-duplicate" >}}
  {{< card link="configuration" title="Configuration" icon="adjustments" >}}
  {{< card link="markdown" title="Markdown" icon="markdown" >}}
{{< /cards >}}
