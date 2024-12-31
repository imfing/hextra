---
title: 组织文件
weight: 1
prev: /docs/guide
---

## 目录结构

默认情况下，Hugo 会在 `content` 目录中查找 Markdown 文件，目录的结构决定了网站最终的输出结构。
以本网站为例：

<!--more-->

{{< filetree/container >}}
  {{< filetree/folder name="content" >}}
    {{< filetree/file name="_index.md" >}}
    {{< filetree/folder name="docs" state="open" >}}
      {{< filetree/file name="_index.md" >}}
      {{< filetree/file name="getting-started.md" >}}
      {{< filetree/folder name="guide" state="open" >}}
        {{< filetree/file name="_index.md" >}}
        {{< filetree/file name="organize-files.md" >}}
      {{< /filetree/folder >}}
    {{< /filetree/folder >}}
    {{< filetree/folder name="blog" state="open" >}}
      {{< filetree/file name="_index.md" >}}
      {{< filetree/file name="post-1.md" >}}
    {{< /filetree/folder >}}
  {{< /filetree/folder >}}
{{< /filetree/container >}}

每个 `_index.md` 文件都是对应部分的索引页面。其他 Markdown 文件则是常规页面。

```
content
├── _index.md // <- /
├── docs
│   ├── _index.md // <- /docs/
│   ├── getting-started.md // <- /docs/getting-started/
│   └── guide
│       ├── _index.md // <- /docs/guide/
│       └── organize-files.md // <- /docs/guide/organize-files/
└── blog
    ├── _index.md // <- /blog/
    └── post-1.md // <- /blog/post-1/
```

## 布局

Hextra 为不同类型的内容提供了三种布局：

| 布局      | 目录               | 特性                                                         |
| :-------- | :------------------ | :----------------------------------------------------------- |
| `docs`    | `content/docs/`     | 适合结构化文档，与本部分相同。                               |
| `blog`    | `content/blog/`     | 用于博客文章，包含列表和详细文章视图。                       |
| `default` | 其他所有目录        | 单页文章视图，无侧边栏。                                     |

要将某个部分自定义为与内置布局相同的行为，可以在该部分的 `_index.md` 的前言中指定所需的类型。

```yaml {filename="content/my-docs/_index.md"}
---
title: 我的文档
cascade:
  type: docs
---
```

上述示例配置确保 `content/my-docs/` 中的内容文件默认会被视为文档（`docs` 类型）。

## 侧边栏导航

侧边栏导航会根据内容组织按字母顺序自动生成。要手动配置侧边栏顺序，可以在 Markdown 文件的前言中使用 `weight` 参数。

```yaml {filename="content/docs/guide/_index.md"}
---
title: 指南
weight: 2
---
```

{{< callout emoji="ℹ️">}}
  建议不要让侧边栏过深。如果你有很多内容，考虑**将它们分成多个部分**。
{{< /callout >}}

## 面包屑导航

面包屑导航会根据 `/content` 的目录结构自动生成。

例如，考虑上面[展示的目录结构](#directory-structure)。根据该结构，页面 `/docs/guide/organize-files/` 顶部的面包屑导航会自动显示如下：

```
文档 > 指南 > 组织文件
```

### 自定义面包屑链接标题

默认情况下，每个面包屑链接是根据页面的 `title` 参数生成的。你可以通过指定 `linkTitle` 来自定义。

例如，如果我们希望面包屑显示为 `Foo Bar` 而不是 `Organize Files`：

```yaml {filename="content/docs/guide/organize-files.md"}
---
linkTitle: Foo Bar
title: 组织文件
---
```

现在会生成以下面包屑：
```
文档 > 指南 > Foo Bar
```

### 隐藏面包屑

你可以通过在页面的前言中指定 `breadcrumbs: false` 来完全隐藏面包屑：

```yaml {filename="content/docs/guide/organize-files.md"}
---
breadcrumbs: false
title: 组织文件
---
```

## 配置内容目录

默认情况下，Hugo 使用根目录 `content/` 来构建网站。
如果你需要使用不同的目录来存放内容，例如 `docs/`，可以通过在站点配置文件 `hugo.yaml` 中设置 [`contentDir`](https://gohugo.io/getting-started/configuration/#contentdir) 参数来实现。

## 添加图片

添加图片的最简单方法是将图片文件放在与 Markdown 文件相同的目录中。
例如，将图片文件 `image.png` 与 `my-page.md` 文件放在一起：

{{< filetree/container >}}
  {{< filetree/folder name="content" >}}
    {{< filetree/folder name="docs" >}}
        {{< filetree/file name="my-page.md" >}}
        {{< filetree/file name="image.png" >}}
    {{< /filetree/folder >}}
  {{< /filetree/folder >}}
{{< /filetree/container >}}

然后，我们可以使用以下 Markdown 语法将图片添加到内容中：

```markdown {filename="content/docs/my-page.md"}
![](image.png)
```

我们还可以利用 Hugo 的 [页面包][page-bundles] 功能将图片文件与 Markdown 文件一起组织。为此，将 `my-page.md` 文件转换为目录 `my-page`，并将内容放入名为 `index.md` 的文件中，然后将图片文件放入 `my-page` 目录中：

{{< filetree/container >}}
  {{< filetree/folder name="content" >}}
    {{< filetree/folder name="docs" >}}
        {{< filetree/folder name="my-page" >}}
            {{< filetree/file name="index.md" >}}
            {{< filetree/file name="image.png" >}}
        {{< /filetree/folder >}}
    {{< /filetree/folder >}}
  {{< /filetree/folder >}}
{{< /filetree/container >}}

```markdown {filename="content/docs/my-page/index.md"}
![](image.png)
```

或者，我们也可以将图片文件放在 `static` 目录中，这样所有页面都可以访问这些图片：

{{< filetree/container >}}
  {{< filetree/folder name="static" >}}
    {{< filetree/folder name="images" >}}
        {{< filetree/file name="image.png" >}}
    {{< /filetree/folder >}}
  {{< /filetree/folder >}}
  {{< filetree/folder name="content" >}}
    {{< filetree/folder name="docs" >}}
        {{< filetree/file name="my-page.md" >}}
    {{< /filetree/folder >}}
  {{< /filetree/folder >}}
{{< /filetree/container >}}

注意，图片路径以斜杠 `/` 开头，并且相对于静态目录：

```markdown {filename="content/docs/my-page.md"}
![](/images/image.png)
```

[page-bundles]: https://gohugo.io/content-management/page-bundles/#leaf-bundles