---
title: 快速开始
weight: 1
tags:
  - 文档
  - 指南
next: /docs/guide
prev: /docs
sidebar:
  icon: lightning-bolt
---

## 从模板快速启动

{{< icon "github" >}}&nbsp;[imfing/hextra-starter-template](https://github.com/imfing/hextra-starter-template)

您可以通过使用上述模板仓库快速开始。

<img src="https://docs.github.com/assets/cb-77734/mw-1440/images/help/repository/use-this-template-button.webp" width="500" alt="显示“Use this template”按钮的 GitHub 仓库页面">

我们提供了一个[GitHub Actions工作流](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site#publishing-with-a-custom-github-actions-workflow)，可以帮助自动构建并将您的站点部署到GitHub Pages，并免费托管。
更多选项，请查看[部署站点](../guide/deploy-site)。

[🌐 演示 ↗](https://imfing.github.io/hextra-starter-template/)

## 作为新项目启动

有两种主要方式将Hextra主题添加到您的Hugo项目中：

1. **Hugo模块（推荐）**：最简单且推荐的方法。[Hugo模块](https://gohugo.io/hugo-modules/)允许您直接从在线源拉取主题。主题会自动下载并由Hugo管理。

2. **Git子模块**：或者，将Hextra添加为[Git子模块](https://git-scm.com/book/en/v2/Git-Tools-Submodules)。主题由Git下载并存储在项目的`themes`文件夹中。

### 将Hextra设置为Hugo模块

#### 先决条件

在开始之前，您需要安装以下软件：

- [Hugo（扩展版）](https://gohugo.io/installation/)
- [Git](https://git-scm.com/)
- [Go](https://go.dev/)

#### 步骤

{{% steps %}}

### 初始化一个新的Hugo站点

```shell
hugo new site my-site --format=yaml
```

### 通过模块配置Hextra主题

```shell
# 初始化Hugo模块
cd my-site
hugo mod init github.com/username/my-site

# 添加Hextra主题
hugo mod get github.com/imfing/hextra
```

配置`hugo.yaml`以使用Hextra主题，添加以下内容：

```yaml
module:
  imports:
    - path: github.com/imfing/hextra
```

### 创建您的内容页面

为主页和文档页面创建新内容：

```shell
hugo new content/_index.md
hugo new content/docs/_index.md
```

### 本地预览站点

```shell
hugo server --buildDrafts --disableFastRender
```

恭喜，您的新站点预览可在`http://localhost:1313/`查看。

{{% /steps %}}


{{% details title="如何更新主题？" %}}

要更新项目中的所有Hugo模块到最新版本，运行以下命令：

```shell
hugo mod get -u
```

要将Hextra更新到[最新发布版本](https://github.com/imfing/hextra/releases)，运行以下命令：

```shell
hugo mod get -u github.com/imfing/hextra
```

更多详情请参阅[Hugo模块](https://gohugo.io/hugo-modules/use-modules/#update-all-modules)。

{{% /details %}}

### 将Hextra设置为Git子模块

#### 先决条件

在开始之前，您需要安装以下软件：

- [Hugo（扩展版）](https://gohugo.io/installation/)
- [Git](https://git-scm.com/)

#### 步骤

{{% steps %}}

### 初始化一个新的Hugo站点

```shell
hugo new site my-site --format=yaml
```

### 将Hextra主题添加为Git子模块

切换到站点目录并初始化一个新的Git仓库：

```shell
cd my-site
git init
```

然后，将Hextra主题添加为Git子模块：

```shell
git submodule add https://github.com/imfing/hextra.git themes/hextra
```

配置`hugo.yaml`以使用Hextra主题，添加以下内容：

```yaml
theme: hextra
```

### 创建您的内容页面

为主页和文档页面创建新内容：

```shell
hugo new content/_index.md
hugo new content/docs/_index.md
```

### 本地预览站点

```shell
hugo server --buildDrafts --disableFastRender
```

您的新站点预览可在`http://localhost:1313/`查看。

{{% /steps %}}


当使用[CI/CD](https://en.wikipedia.org/wiki/CI/CD)部署Hugo网站时，确保在运行`hugo`命令之前执行以下命令至关重要。

```shell
git submodule update --init
```

如果不运行此命令，主题文件夹将不会被填充Hextra主题文件，导致构建失败。


{{% details title="如何更新主题？" %}}

要更新仓库中的所有子模块到最新提交，运行以下命令：

```shell
git submodule update --remote
```

要将Hextra更新到最新提交，运行以下命令：

```shell
git submodule update --remote themes/hextra
```

更多详情请参阅[Git子模块](https://git-scm.com/book/en/v2/Git-Tools-Submodules)。

{{% /details %}}

## 下一步

探索以下部分以开始添加更多内容：

{{< cards >}}
  {{< card link="../guide/organize-files" title="组织文件" icon="document-duplicate" >}}
  {{< card link="../guide/configuration" title="配置" icon="adjustments" >}}
  {{< card link="../guide/markdown" title="Markdown" icon="markdown" >}}
{{< /cards >}}
