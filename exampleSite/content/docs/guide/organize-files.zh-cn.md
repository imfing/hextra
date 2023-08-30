---
title: 目录结构
weight: 1
prev: /docs/guide
---

## 目录结构

默认情况下，Hugo 在 `context` 目录中搜索 Markdown 文件，目录的结构决定了网站的最终输出结构。
以示例网站为例：

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

每个 `_index.md` 文件都是相应部分的索引页，其他 Markdown 文件则是常规页面。

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

## 侧边栏导航

侧边栏导航是根据内容组织的字母顺序自动生成的。要手动配置侧边栏顺序，可以在 Markdown 文件的 `frontmatter ` 中使用 `weight` 配置。

```yaml {filename="content/docs/guide/_index.md"}
---
title: Guide
weight: 2
---
```

{{< callout emoji="ℹ️">}}
  建议侧边栏不要太深。如果内容太多，请考虑 **将它们分成多个部分**。
{{< /callout >}}

## 配置内容目录

如果需要为的内容使用不同的目录，可以在站点配置文件中设置 [`contentDir`](https://gohugo.io/getting-started/configuration/#contentdir) 来实现。
