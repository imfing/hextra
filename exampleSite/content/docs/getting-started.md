---
title: Getting Started
weight: 1
---

## Start as New Project

Before we start, make sure we have [Hugo](https://gohugo.io/) installed. We also need to have Git and Go installed if we want to use Hugo modules.
Please refer to Hugo's [official installation guide](https://gohugo.io/installation/) for more details.

{{% steps %}}

### Initialize a new Hugo site

```bash
$ hugo new site my-site --format=yaml
```

### Configure Hextra theme

[Hugo modules](https://gohugo.io/hugo-modules/) are the recommended way to manage Hugo themes.

```shell
# initialize hugo module
$ cd my-site
$ hugo mod init github.com/username/my-site

# add Hextra theme
$ hugo mod get github.com/imfing/hextra
```

Edit `config.yaml` to enable Hextra theme:

```yaml
module:
  imports:
    - path: github.com/imfing/hextra
```

### Run Hugo server

```shell
$ hugo server -D
```

Voila! You can see your new site at `http://localhost:1313/`.

{{% /steps %}}
