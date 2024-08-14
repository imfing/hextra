---
title: 配置文件
weight: 2
---

Hugo 从 Hugo 网站根目录下的 `hugo.yaml` 读取配置。
在配置文件中，您可以配置站点的所有选项。
你可以在 `exampleSite/hugo.yaml` 中找到此站点的配置文件作为开始。

<!--more-->

## 导航栏

### 菜单

右上角的菜单在配置文件的 `menu.main` 中配置：

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

有几种不同类型的菜单项：

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

这些菜单项可以通过设置 `weight` 进行排序。

## 侧边栏

### 主侧边栏

主侧边栏是自动从 `content` 目录结构生成的。
有关更多详细信息，转至 [目录结构](/docs/guide/organize-files)。

### 额外链接

侧边栏的额外链接在配置文件的 `menu.sidebar` 部分中配置：

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

## 右侧边栏

### 目录

目录是根据内容文件中的标题自动生成的，可以在 `front matter` 设置 `toc：false` 来禁用它。

```yaml {filename="content/docs/guide/configuration.md"}
---
title: Configuration
toc: false
---
```

### 编辑此页链接

要配置编辑此页链接，我们可以在配置文件中设置 `params.editURL.base`：
```yaml {filename="hugo.yaml"}
params:
  editURL:
    base: "https://github.com/your-username/your-repo/edit/main"
```

将为每个页面自动生成编辑链接。
如需为特定页面设置编辑链接，可以在页面的 `front matter` 中设置 `editURL`：

```yaml {filename="content/docs/guide/configuration.md"}
---
title: Configuration
editURL: "https://example.com/edit/this/page"
---
```
## Footer

### 版权声明

如需修改网站页脚中显示的版权文本，您需要创建一个名为“i18n/en.yaml”的文件。
在此文件中，填写新的版权文本，像这样：

```yaml {filename="i18n/en.yaml"}
copyright: "© 2024 YOUR TEXT HERE"
```
你可以在 GitHub 存储库中找到示例 [`i18n/en.yaml`](https://github.com/imfing/hextra/blob/main/i18n/en.yaml) 文件。另外，你可以在版权文本中使用 Markdown 格式。

## 其他

### Favicon

如需自定义 [favicon](https://en.wikipedia.org/wiki/Favicon)，请将图标文件放在 `static` 文件夹下以覆盖 [主题中的默认 favicon](https://github.com/imfing/hextra/tree/main/static)：

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

在您的项目中包含 `favicon.ico` 和 `favicon.svg` 文件，以确保网站的网站图标正确显示。

虽然 `favicon.ico` 通常适用于较旧的浏览器，但 `favicon.svg` 受到现代浏览器的支持，所以更现代的做法是添加 `favicon-dark.svg` 以便在黑暗模式下提供较好的体验体验。

请随意使用 [favicon.io](https://favicon.io/) 或 [favycon](https://github.com/ruisaraiva19/favycon) 等工具来生成这些图标。

### 颜色主题配置

使用`theme`设置来配置默认主题模式和切换按钮，允许访问者在浅色或深色模式之间切换。

```yaml {filename="hugo.yaml"}
params:
  theme:
    # light | dark | system
    default: system
    displayToggle: true
```

`theme.default` 的可选项：

- `light` - 仅使用浅色模式
- `dark` - 仅使用神色模式
- `system` - 跟随系统

`theme.displayToggle` 控制显示用于更改主题的切换按钮。
当设置为“true”时，访问者可以在浅色或深色模式之间切换，覆盖默认设置。

### 页宽

页面的宽度可以通过配置文件中的`params.page.width`参数来调整：

```yaml {filename="hugo.yaml"}
params:
  page:
    # full (100%), wide (90rem), normal (1280px)
    width: wide
```

有三个可选项：`full`, `wide`, and `normal`. 默认的页宽模式是 `normal`.

同样的，导航栏和 `footer` 的宽度也可通过 `params.navbar.width` 和 `params.footer.width` 调整。

### 搜索

默认情况下启用由 [FlexSearch](https://github.com/nextapps-de/flexsearch) 提供全文搜索。
要自定义搜索索引，请在配置文件中设置 `params.search.flexsearch.index` ：

```yaml {filename="hugo.yaml"}
params:
  # Search
  search:
    enable: true
    type: flexsearch

    flexsearch:
      # index page by: content | summary | heading | title
      index: content
```
`flexsearch.index` 的可选项：

- `content` - 全内容搜索
- `summary` - 概述 [Hugo Content Summaries](https://gohugo.io/content-management/summaries/)
- `heading` - 一级和二级标题
- `title` - 仅搜索标题

要自定义检索分词，请在配置文件中设置`params.search.flexsearch.tokenize`：

```hugo.yaml
params:
    # ...
    flexsearch:
      # full | forward | reverse | strict 
      tokenize: forward
```

[`flexsearch.tokenize`](https://github.com/nextapps-de/flexsearch/#tokenizer-prefix-search)的可选项:

- `strict` - 严格单词匹配
- `forward` - 单词前缀匹配
- `reverse` - 单词前后缀匹配
- `full` - 单词子串匹配。

> 在默认的分词逻辑下，中文一句话就是一个“单词”

要从搜索索引中排除页面，更改 front matter 中的 `excludeSearch: true`:

```yaml {filename="content/docs/guide/configuration.md"}
---
title: Configuration
excludeSearch: true
---
```

### Google Analytics

要启用 [Google Analytics](https://marketingplatform.google.com/about/analytics/)，设置 `services.googleAnalytics.ID`:

```yaml {filename="hugo.yaml"}
services:
  googleAnalytics:
    ID: G-MEASUREMENT_ID
```
