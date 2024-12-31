---
title: 配置
weight: 2
---

Hugo 从您 Hugo 站点根目录下的 `hugo.yaml` 文件中读取配置。
配置文件是您可以配置站点所有方面的地方。
查看此站点的配置文件 [`exampleSite/hugo.yaml`](https://github.com/imfing/hextra/blob/main/exampleSite/hugo.yaml) 在 GitHub 上，以全面了解可用的设置和最佳实践。

<!--more-->

## 导航

### 菜单

右上角的菜单在配置文件的 `menu.main` 部分中定义：

```yaml {filename="hugo.yaml"}
menu:
  main:
    - name: 文档
      pageRef: /docs
      weight: 1
    - name: 博客
      pageRef: /blog
      weight: 2
    - name: 关于
      pageRef: /about
      weight: 3
    - name: 搜索
      weight: 4
      params:
        type: search
    - name: GitHub
      weight: 5
      url: "https://github.com/imfing/hextra"
      params:
        icon: github
```

有不同类型的菜单项：

1. 使用 `pageRef` 链接到站点内的页面
    ```yaml
    - name: 文档
      pageRef: /docs
    ```
2. 使用 `url` 链接到外部 URL
    ```yaml
    - name: GitHub
      url: "https://github.com"
    ```
3. 使用 `type: search` 的搜索栏
    ```yaml
    - name: 搜索
      params:
        type: search
    ```
4. 图标
    ```yaml
    - name: GitHub
      params:
        icon: github
    ```

这些菜单项可以通过设置 `weight` 参数进行排序。

### 徽标和标题

要修改默认徽标，编辑 `hugo.yaml` 并在 `static` 目录下添加徽标文件的路径。
您还可以更改用户点击徽标时重定向的链接，以及设置徽标的宽度和高度（以像素为单位）。

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

## 侧边栏

### 主侧边栏

主侧边栏是根据内容目录的结构自动生成的。
有关更多详细信息，请参阅 [组织文件](/docs/guide/organize-files) 页面。

要从左侧边栏中排除单个页面，请在页面的 front matter 中设置 `sidebar.exclude` 参数：

```yaml {filename="content/docs/guide/configuration.md"}
---
title: 配置
sidebar:
  exclude: true
---
```

### 额外链接

侧边栏的额外链接在配置文件的 `menu.sidebar` 部分中定义：

```yaml {filename="hugo.yaml"}
menu:
  sidebar:
    - name: 更多
      params:
        type: separator
      weight: 1
    - name: "关于"
      pageRef: "/about"
      weight: 2
    - name: "Hugo 文档 ↗"
      url: "https://gohugo.io/documentation/"
      weight: 3
```

## 右侧边栏

### 目录

目录是根据内容文件中的标题自动生成的。可以通过在页面的 front matter 中设置 `toc: false` 来禁用它。

```yaml {filename="content/docs/guide/configuration.md"}
---
title: 配置
toc: false
---
```

### 页面编辑链接

要配置页面编辑链接，我们可以在配置文件中设置 `params.editURL.base` 参数：

```yaml {filename="hugo.yaml"}
params:
  editURL:
    enable: true
    base: "https://github.com/your-username/your-repo/edit/main"
```

编辑链接将根据提供的 URL 作为根目录自动为每个页面生成。
如果要为特定页面设置编辑链接，可以在页面的 front matter 中设置 `editURL` 参数：

```yaml {filename="content/docs/guide/configuration.md"}
---
title: 配置
editURL: "https://example.com/edit/this/page"
---
```

## 页脚

### 版权

要修改网站页脚中显示的版权文本，您需要创建一个名为 `i18n/en.yaml` 的文件。
在此文件中，指定您的新版权文本，如下所示：

```yaml {filename="i18n/en.yaml"}
copyright: "© 2024 您的文本"
```

作为参考，可以在 GitHub 仓库中找到示例 [`i18n/en.yaml`](https://github.com/imfing/hextra/blob/main/i18n/en.yaml) 文件。此外，您可以在版权文本中使用 Markdown 格式。

## 其他

### 网站图标

要为您的站点自定义 [网站图标](https://en.wikipedia.org/wiki/Favicon)，请将图标文件放在 `static` 文件夹下，以覆盖 [主题的默认网站图标](https://github.com/imfing/hextra/tree/main/static)：

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

在您的项目中包含 `favicon.ico`、`favicon.svg` 和 `favicon-dark.svg` 文件，以确保您的站点图标正确显示。

虽然 `favicon.ico` 通常用于旧版浏览器，但 `favicon.svg` 和 `favicon-dark.svg` 受现代浏览器支持。
使用 [favicon.io](https://favicon.io/) 或 [favycon](https://github.com/ruisaraiva19/favycon) 等工具生成此类图标。

### 主题配置

使用 `theme` 设置来配置默认主题模式和切换按钮，允许访问者在浅色或深色模式之间切换。

```yaml {filename="hugo.yaml"}
params:
  theme:
    # light | dark | system
    default: system
    displayToggle: true
```

`theme.default` 的选项：

- `light` - 始终使用浅色模式
- `dark` - 始终使用深色模式
- `system` - 与操作系统设置同步（默认）

`theme.displayToggle` 参数允许您显示一个切换按钮以更改主题。
当设置为 `true` 时，访问者可以在浅色或深色模式之间切换，覆盖默认设置。

### 页面宽度

页面的宽度可以通过配置文件中的 `params.page.width` 参数进行自定义：

```yaml {filename="hugo.yaml"}
params:
  page:
    # full (100%), wide (90rem), normal (1280px)
    width: wide
```

有三个可用选项：`full`、`wide` 和 `normal`。默认情况下，页面宽度设置为 `normal`。

同样，导航栏和页脚的宽度可以通过 `params.navbar.width` 和 `params.footer.width` 参数进行自定义。

### 搜索索引

默认启用由 [FlexSearch](https://github.com/nextapps-de/flexsearch) 提供的全文搜索。
要自定义搜索索引，请在配置文件中设置 `params.search.flexsearch.index` 参数：

```yaml {filename="hugo.yaml"}
params:
  # 搜索
  search:
    enable: true
    type: flexsearch

    flexsearch:
      # 按以下内容索引页面：content | summary | heading | title
      index: content
```

`flexsearch.index` 的选项：

- `content` - 页面的完整内容（默认）
- `summary` - 页面的摘要，请参阅 [Hugo 内容摘要](https://gohugo.io/content-management/summaries/) 了解更多详细信息
- `heading` - 一级和二级标题
- `title` - 仅包括页面标题

要自定义搜索分词，请在配置文件中设置 `params.search.flexsearch.tokenize` 参数：

```yaml {filename="hugo.yaml"}
params:
    # ...
    flexsearch:
      # full | forward | reverse | strict 
      tokenize: forward
```

[`flexsearch.tokenize`](https://github.com/nextapps-de/flexsearch/#tokenizer-prefix-search) 的选项：

- `strict` - 索引整个单词
- `forward` - 向前方向逐步索引单词
- `reverse` - 双向逐步索引单词
- `full` - 索引所有可能的组合

要从搜索索引中排除页面，请在页面的 front matter 中设置 `excludeSearch: true`：

```yaml {filename="content/docs/guide/configuration.md"}
---
title: 配置
excludeSearch: true
---
```

### Google Analytics

要启用 [Google Analytics](https://marketingplatform.google.com/about/analytics/)，请在 `hugo.yaml` 中设置 `services.googleAnalytics.ID` 标志：

```yaml {filename="hugo.yaml"}
services:
  googleAnalytics:
    ID: G-MEASUREMENT_ID
```