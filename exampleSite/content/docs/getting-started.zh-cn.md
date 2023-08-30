---
title: 快速开始
weight: 1
next: /docs/guide
prev: /docs
---

## 使用模板快速开始

{{< icon "github" >}}&nbsp;[imfing/hextra-starter-template](https://github.com/imfing/hextra-starter-template)

你可以使用此模板仓库以便于快速开始.

<img src="https://docs.github.com/assets/cb-77734/mw-1440/images/help/repository/use-this-template-button.webp" width="500">

我们提供了一个 [GitHub Actions workflow](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site#publishing-with-a-custom-github-actions-workflow) 来帮助你免费在 GitHub Pages 上自动构建和部署网站.

[🌐 演示 ↗](https://imfing.github.io/hextra-starter-template/)

## 全新开始

### 先决条件

在我们开始之前, 必须先确保 [Hugo](https://gohugo.io/) 已被正确安装.
转至 Hugo 的 [official installation guide](https://gohugo.io/installation/) 以获取更多信息.

推荐使用 [Hugo modules](https://gohugo.io/hugo-modules/) 管理 Hugo 主题. 使用 Hugo modules 需要先正确安装 [Git](https://git-scm.com/) 和 [Go](https://go.dev/).

{{% steps %}}

### 初始化 Hugo 站点

```bash
$ hugo new site my-site --format=yaml
```

### 通过 module 配置 Hextra

```shell
# 初始化 Hugo 模块
$ cd my-site
$ hugo mod init github.com/username/my-site

# 添加 Hextra 
$ hugo mod get github.com/imfing/hextra
```

编辑 `hugo.yaml` 以启用 Hextra:

```yaml
module:
  imports:
    - path: github.com/imfing/hextra
```

### 创建你的第一个内容页

现在, 创建一些新的内容页, 比如 主页 和 文档:

```shell
$ hugo new content/_index.md
$ hugo new content/docs/_index.md
```

### 在本地预览站点

```shell
$ hugo server --buildDrafts --disableFastRender
```

瞧! 你现在可以在 `http://localhost:1313/` 看到你的新站点.

{{% /steps %}}

## 接下来

你可以探索以下部分来添加更多内容:

{{< cards >}}
  {{< card link="../guide/organize-files" title="目录结构" icon="document-duplicate" >}}
  {{< card link="../guide/configuration" title="配置文件指南" icon="adjustments" >}}
  {{< card link="../guide/markdown" title="Markdown" icon="markdown" >}}
{{< /cards >}}
