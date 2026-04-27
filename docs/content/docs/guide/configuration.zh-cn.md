---
title: 配置
weight: 2
tags:
  - 配置
---

Hugo 从站点根目录的 `hugo.yaml` 读取配置。
配置文件可用来调整站点的所有方面。
查看本网站的示例配置文件 [`docs/hugo.yaml`](https://github.com/imfing/hextra/blob/main/docs/hugo.yaml) 以全面了解可用设置和最佳实践。

<!--more-->

## 导航

### 菜单

右上角菜单在配置文件的 `menu.main` 部分定义：

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

菜单项有以下几种类型：

1. 通过 `pageRef` 链接到站内页面
   ```yaml
   - name: 文档
     pageRef: /docs
   ```
2. 通过 `url` 链接到外部网址
   ```yaml
   - name: GitHub
     url: "https://github.com"
   ```
3. 搜索栏，使用 `type: search`
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
5. 主题切换
   ```yaml
    - name: Theme Toggle
      params:
        type: theme-toggle
        label: true # optional, default is false
   ```
6. 语言切换器
   ```yaml
    - name: 语言切换器
      params:
        type: language-switch
        label: true # optional, default is false
        icon: "globe-alt" # optional, default is "translate"
   ```

通过设置 `weight` 参数可以调整菜单项的排序。

### 嵌套菜单

通过定义子菜单项可以创建下拉菜单。点击父菜单项时会显示子菜单。

```yaml {filename="hugo.yaml"}
menu:
  main:
    - identifier: sdk
      name: SDK
    - identifier: python
      name: Python ↗
      url: https://python.org
      parent: sdk
    - identifier: go
      name: Go
      url: https://go.dev
      parent: sdk
```

子菜单项需要通过 `parent` 参数指定父菜单的 `identifier` 值。

### 徽标与标题

要修改默认徽标，编辑 `hugo.yaml` 并在 `static` 目录下添加徽标文件路径。
可选地，可以更改点击徽标时的跳转链接，以及设置徽标的像素宽度和高度。

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

### 分页导航

禁用文档页面或博客文章底部的上一篇/下一篇导航：

```yaml {filename="hugo.yaml"}
params:
  page:
    displayPagination: false  # 文档页面
  blog:
    article:
      displayPagination: false  # 博客文章
```

## 侧边栏

### 主侧边栏

主侧边栏会根据内容目录结构自动生成。
详情参见[文件组织](/docs/guide/organize-files)页面。

要从左侧边栏排除单个页面，在页面的 front matter 中设置 `sidebar.exclude` 参数：

```yaml {filename="content/docs/guide/configuration.md"}
---
title: 配置
sidebar:
  exclude: true
---
```

### 额外链接

侧边栏额外链接在配置文件的 `menu.sidebar` 部分定义：

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

目录会根据内容文件中的标题自动生成。可以通过在页面的 front matter 中设置 `toc: false` 来禁用。

```yaml {filename="content/docs/guide/configuration.md"}
---
title: 配置
toc: false
---
```

### 页面编辑链接

要配置页面编辑链接，可以在配置文件中设置 `params.editURL.base` 参数：

```yaml {filename="hugo.yaml"}
params:
  editURL:
    enable: true
    base: "https://github.com/your-username/your-repo/edit/main"
```

编辑链接将基于提供的 URL 作为根目录自动为每个页面生成。
如果想为特定页面设置编辑链接，可以在页面的 front matter 中设置 `editURL` 参数：

```yaml {filename="content/docs/guide/configuration.md"}
---
title: 配置
editURL: "https://example.com/edit/this/page"
---
```

## 页脚

### 版权信息

要修改网站页脚显示的版权文本，需要创建一个名为 `i18n/en.yaml` 的文件。
在该文件中指定新的版权文本，如下所示：

```yaml {filename="i18n/en.yaml"}
copyright: "© 2024 你的文本内容"
```

可以参考 GitHub 仓库中的示例 [`i18n/en.yaml`](https://github.com/imfing/hextra/blob/main/i18n/en.yaml) 文件。此外，可以在版权文本中使用 Markdown 格式。

## 其他

### 网站图标

要自定义网站的 [favicon](https://en.wikipedia.org/wiki/Favicon)，将图标文件放在 `static` 文件夹下以覆盖[主题默认的网站图标](https://github.com/imfing/hextra/tree/main/static)：

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

#### 基本设置

至少需要在 `static` 文件夹中包含 `favicon.svg`。这将作为网站的默认图标。

可以通过在 SVG 文件中使用 CSS 媒体查询来创建自适应图标，响应系统主题偏好，具体方法参考[构建自适应网站图标](https://web.dev/articles/building/an-adaptive-favicon)。

#### 暗色模式支持

为了增强暗色模式支持，在 `static` 文件夹中添加 `favicon-dark.svg` 与 `favicon.svg` 一起。当两个文件都存在时，Hextra 会自动：

- 在亮色模式或未检测到主题偏好时使用 `favicon.svg`
- 当用户系统设置为暗色模式时切换到 `favicon-dark.svg`
- 尊重系统的 `prefers-color-scheme` 设置实现自动切换

暗色模式图标切换在所有现代浏览器中都有效，包括 Firefox，提供与网站主题一致的无缝体验。

#### 其他格式

虽然 `favicon.ico` 通常用于旧版浏览器，现代浏览器支持 SVG 图标，因其可缩放性和小文件大小而更受青睐。
如果需要，可以使用 [favicon.io](https://favicon.io/) 或 [favycon](https://github.com/ruisaraiva19/favycon) 等工具生成其他格式的图标。

### 主题配置

使用 `theme` 设置来配置默认主题模式和切换按钮，允许访问者在亮色或暗色模式之间切换。

```yaml {filename="hugo.yaml"}
params:
  theme:
    # light | dark | system
    default: system
    displayToggle: true
```

`theme.default` 的选项：

- `light` - 始终使用亮色模式
- `dark` - 始终使用暗色模式
- `system` - 与操作系统设置同步（默认）

`theme.displayToggle` 参数允许显示主题切换按钮。
当设置为 `true` 时，访问者可以切换亮色或暗色模式，覆盖默认设置。

### 页面最后修改时间

可以通过启用 `params.displayUpdatedDate` 标志来显示页面的最后修改日期。要使用 Git 提交日期作为来源，还需启用 `enableGitInfo` 标志。

要自定义日期格式，设置 `params.dateFormat` 参数。其布局与 Hugo 的 [`time.Format`](https://gohugo.io/functions/time/format/) 匹配。

此外，可以通过启用 `params.displayUpdatedAuthor` 标志来显示最后修改的作者。这需要设置 `enableGitInfo: true`。

```yaml {filename="hugo.yaml"}
# 解析 Git 提交
enableGitInfo: true

params:
  # 显示最后修改日期
  displayUpdatedDate: true
  dateFormat: "2006年1月2日"
  # 显示最后修改的作者
  displayUpdatedAuthor: true
```

### 标签

要显示页面标签，在配置文件中设置以下标志：

```yaml {filename="hugo.yaml"}
params:
  blog:
    list:
      displayTags: true
  toc:
    displayTags: true
```

Hugo 默认会为 `tags` 和 `categories` 创建分类页面。如果你的网站不使用分类页面，并且想省略生成的 `public/tags/` 和 `public/categories/` 目录，请禁用 `taxonomy` 和 `term` 页面类型：

```yaml {filename="hugo.yaml"}
disableKinds:
  - taxonomy
  - term
```

只有在不依赖标签或分类归档页面时，才禁用这些类型。

### 图片缩放

图片缩放默认禁用。启用后，点击 Markdown 图片会打开放大视图。

```yaml {filename="hugo.yaml"}
params:
  imageZoom:
    enable: true
```

要在特定页面禁用缩放，在页面的 front matter 中添加：

```yaml {filename="content/docs/guide/configuration.md"}
---
imageZoom: false
---
```

如果想固定 Medium Zoom 资源或从本地资源加载：

```yaml {filename="hugo.yaml"}
params:
  imageZoom:
    enable: true
    base: "https://cdn.jsdelivr.net/npm/medium-zoom@1.1.0/dist"
    # js: "js/medium-zoom.min.js" # 可选，相对于 base 或本地资源
```

### 本地与镜像脚本资源

Hextra 可以从多种来源加载可选的前端依赖：

- 主题默认配置（CDN）
- 通过 `base` 指定的内部镜像 URL
- 通过 `js` / `css` 指定的 Hugo 本地资源

对于本地资源，请将 vendor 文件放在站点的 `assets/` 目录下，并在配置中引用这些资源路径：

```yaml {filename="hugo.yaml"}
params:
  imageZoom:
    enable: true
    js: "js/vendor/medium-zoom.min.js"

  mermaid:
    js: "js/vendor/mermaid.min.js"

  asciinema:
    js: "js/vendor/asciinema-player.min.js"
    css: "css/vendor/asciinema-player.css"

  math:
    engine: katex
    katex:
      css: "css/vendor/katex.min.css"
      assets:
        - "fonts/KaTeX_Main-Regular.woff2"
        - "fonts/KaTeX_Math-Italic.woff2"

  search:
    type: flexsearch
    flexsearch:
      js: "js/vendor/flexsearch.bundle.min.js"
```

这里只有因为图片缩放默认关闭，才需要设置 `imageZoom.enable: true`。
对于 KaTeX，请确保发布你所选 CSS 文件引用的全部字体文件，而不仅仅是此示例中的两个。

如果要使用内部镜像，请设置 `base`；只有当文件名不同时，才需要额外设置 `js` / `css`：

```yaml {filename="hugo.yaml"}
params:
  imageZoom:
    base: "https://mirror.example.com/medium-zoom/dist"

  mermaid:
    base: "https://mirror.example.com/mermaid/dist"

  asciinema:
    base: "https://mirror.example.com/asciinema-player/dist/bundle"

  math:
    engine: katex
    katex:
      base: "https://mirror.example.com/katex/dist"

  search:
    flexsearch:
      base: "https://mirror.example.com/flexsearch/dist"
      # js: "flexsearch.bundle.min.js"
```

> [!NOTE]
> 如需自定义 MathJax 的加载来源，请在项目中覆盖 `layouts/_partials/scripts/mathjax.html`。

### 页面宽度

页面整体布局宽度可通过 `params.page.width` 配置：

```yaml {filename="hugo.yaml"}
params:
  page:
    # full (100%), wide (90rem), normal (1280px)
    width: wide
```

`params.page.width` 可用选项：`full`、`wide`、`normal`。

正文内容宽度默认固定为 `72rem`。

如需自定义内容宽度，请在自定义样式表中覆盖 CSS 变量：

```css {filename="assets/css/custom.css"}
:root {
  --hextra-max-content-width: 100%;
}
```

类似地，导航栏和页脚的宽度可以通过 `params.navbar.width` 和 `params.footer.width` 参数自定义。

### 页面上下文菜单

页面上下文菜单提供一个下拉按钮，允许用户将页面内容复制为 Markdown 或查看原始 Markdown 源码。此功能对于读者可能希望以 Markdown 格式共享或引用内容的文档站点非常有用。

#### 启用上下文菜单

要全局启用上下文菜单，请在配置文件中添加以下内容：

```yaml {filename="hugo.yaml"}
params:
  page:
    contextMenu:
      enable: true
```

您还需要为页面启用 `markdown` 输出格式：

```yaml {filename="hugo.yaml"}
outputs:
  page: [html, markdown]
  section: [html, rss, markdown]
```

#### 单页控制

要为特定页面启用或禁用上下文菜单，请在 front matter 中使用 `contextMenu` 参数：

```yaml {filename="content/docs/example.md"}
---
title: 示例页面
contextMenu: false
---
```

#### 自定义链接

您可以向上下文菜单下拉列表添加自定义链接。这对于与外部服务集成非常有用。链接支持以下占位符：

- `{url}` - 页面 URL（URL 编码）
- `{title}` - 页面标题（URL 编码）
- `{markdown_url}` - 原始 Markdown 内容的 URL（URL 编码）

```yaml {filename="hugo.yaml"}
params:
  page:
    contextMenu:
      enable: true
      links:
        - name: 在 ChatGPT 中打开
          icon: chatgpt
          url: "https://chatgpt.com/?hints=search&q=I%27m+looking+at+this+documentation%3A+{url}%0AHelp+me+understand+how+to+use+it."
```

每个链接可以包含：
- `name` - 链接的显示文本
- `icon` - 可选的图标名称（参见[图标]({{% relref "docs/guide/shortcodes/icon" %}})）
- `url` - 包含可选占位符的 URL

### FlexSearch 索引

默认启用由 [FlexSearch](https://github.com/nextapps-de/flexsearch) 提供的全文搜索。
要自定义搜索索引，在配置文件中设置 `params.search.flexsearch.index` 参数：

```yaml {filename="hugo.yaml"}
params:
  # 搜索
  search:
    enable: true
    type: flexsearch

    flexsearch:
      # 索引页面方式: content | summary | heading | title
      index: content
```

你也可以控制 FlexSearch runtime 的加载来源：

```yaml {filename="hugo.yaml"}
params:
  search:
    flexsearch:
      version: "0.8.143" # 默认 CDN 版本
      # base: "https://mirror.example.com/flexsearch/dist" # 可选的远程 base URL
      # js: "js/vendor/flexsearch.bundle.min.js" # 本地资源路径，或远程 base 下的自定义文件
```

`flexsearch.index` 的选项：

- `content` - 页面的完整内容（默认）
- `summary` - 页面摘要，详见 [Hugo 内容摘要](https://gohugo.io/content-management/summaries/)
- `heading` - 一级和二级标题
- `title` - 仅包含页面标题

要自定义搜索分词方式，在配置文件中设置 `params.search.flexsearch.tokenize` 参数：

```yaml {filename="hugo.yaml"}
params:
  search:
    # ...
    flexsearch:
      # full | forward | reverse | strict
      tokenize: forward
```

[`flexsearch.tokenize`](https://github.com/nextapps-de/flexsearch/#tokenizer-prefix-search) 的选项：

- `strict` - 索引完整单词
- `forward` - 正向逐步索引单词
- `reverse` - 双向逐步索引单词
- `full` - 索引所有可能的组合

要从 FlexSearch 搜索索引中排除页面，在页面的 front matter 中设置 `excludeSearch: true`：

```yaml {filename="content/docs/guide/configuration.md"}
---
title: 配置
excludeSearch: true
---
```

### Google 分析

要启用 [Google Analytics](https://marketingplatform.google.com/about/analytics/)，在 `hugo.yaml` 中设置 `services.googleAnalytics.ID` 标志：

```yaml {filename="hugo.yaml"}
services:
  googleAnalytics:
    ID: G-MEASUREMENT_ID
```

### Google 搜索索引

要[阻止 Google 搜索](https://developers.google.com/search/docs/crawling-indexing/block-indexing)索引页面，在页面的 frontmatter 中设置 `noindex` 为 true：

```yaml
title: 配置（存档版本）
params:
  noindex: true
```

要排除整个目录，在父级 `_index.md` 文件中使用 [`cascade`](https://gohugo.io/configuration/cascade/) 键。

> [!注意]
> 要阻止搜索引擎爬虫，可以制作 [`robots.txt` 模板](https://gohugo.io/templates/robots/)。
> 但是，`robots.txt` 指令不一定能阻止页面出现在 Google 搜索结果中。

### LLMS.txt 支持

要为网站启用 [llms.txt](https://llmstxt.org/) 输出格式，为[大型语言模型](https://en.wikipedia.org/wiki/Large_language_model)和 AI 代理提供结构化文本大纲，在站点的 `hugo.yaml` 中添加 `llms` 输出格式：

```diff {filename="hugo.yaml"}
outputs:
- home: [html]
+ home: [html, llms]
  page: [html]
  section: [html, rss]
```

这将在站点根目录生成一个 `llms.txt` 文件，包含：

- 站点标题和描述
- 所有章节和页面的层次结构列表
- 页面摘要和发布日期
- 所有内容的直接链接

您可以通过在 front matter 中设置 `llms: false` 来排除特定页面或章节：

```yaml
---
title: "内部笔记"
llms: false
---
```

llms.txt 文件根据内容结构自动生成，使 AI 工具和语言模型更容易获取上下文和参考。

### Open Graph

要在页面中添加 [Open Graph](https://ogp.me/) 元数据，在 frontmatter 的 params 中添加值。

由于一个页面可以有多个 `image` 和 `video` 标签，将它们的值放在数组中。
其他 Open Graph 属性只能有一个值。
例如，此页面有一个 `og:image` 标签（配置社交分享时的预览图片）和一个 `og:audio` 标签。

```yaml {filename="content/docs/guide/configuration.md"}
title: "配置"
params:
  images:
    - "img/config-image.jpg"
  audio: "config-talk.mp3"
```
