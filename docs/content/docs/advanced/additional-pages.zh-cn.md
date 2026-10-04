---
title: "附加页面"
weight: 1
prev: /docs/advanced
aliases:
  - /docs/advanced/glossary/
---

Hextra 提供一些需要单独启用的附加页面：术语表、归档页、演讲与系列。

<!--more-->

## 术语表

{{< callout type="info" >}}
  有关 Hugo 内置术语表支持的更多信息，请参阅 [Hugo 术语表快速参考](https://gohugo.io/quick-reference/glossary/)。
{{< /callout >}}

### 数据源文件

术语定义集中存储在每种[支持语言](../multi-language/)的 `termbase.yaml` 数据文件中。

{{< filetree/container >}}
  {{< filetree/folder name="data" state="open" >}}
    {{< filetree/folder name="en" state="open" >}}
      {{< filetree/file name="termbase.yaml" >}}
    {{< /filetree/folder >}}
    {{< filetree/folder name="fr" state="open" >}}
      {{< filetree/file name="termbase.yaml" >}}
    {{< /filetree/folder >}}
    {{< filetree/folder name="ja" state="open" >}}
      {{< filetree/file name="termbase.yaml" >}}
    {{< /filetree/folder >}}
  {{< /filetree/folder >}}
{{< /filetree/container >}}

每个 YAML 数据文件包含一组术语条目。每个条目包括：

- `term`：术语或短语的完整名称。
- `definition`：对术语的简要解释或描述。
- `abbr`（可选）：术语常用的缩写或首字母缩写。

```yaml {filename="data/zh-cn/termbase.yaml"}
- term: seo
  abbr: SEO
  definition: "搜索引擎优化——提高网页在搜索引擎中的可见度"
- term: "静态网站生成器"
  definition: "将文本输入处理为静态网页的生成引擎"
```

### 术语页面

要渲染词汇表索引页面（列出所有已定义的术语及其说明和缩写），
必须为每种受支持的语言定义一个对应的语言专用词汇表内容文件。
请在文件名中使用语言代码后缀，例如：`content/glossary/_index.zh-cn.md`。

```markdown {filename="content/glossary/_index.zh-cn.md"}
---
title: 术语表
layout: glossary
---
```

示例词汇表页面可在 [术语表]({{% relref "/glossary" %}}) 查看。

## 归档页

`archives` 布局是一个通用的分组索引：它可以将任意页面集合渲染为按年份分组的时间线（或平面列表），并且默认归档页面自身所属的内容分区。它支撑内置的归档页面，也支撑下面介绍的[演讲](#演讲)和[系列](#系列)两种页面类型。

要创建指向其他分区的独立归档页面（例如列出博客文章的 `/archives` 页面），请在页面 front matter 中设置 `group.section`：

```yaml {filename="content/archives/_index.md"}
---
title: Archives
layout: archives
toc: false
group:
  section: blog
---
```

内置示例就是如此：页面位于 `content/archives/`，但归档的是 `blog` 分区。示例归档页面可在 [归档]({{% relref "/archives" %}}) 查看。

### 选项

- `group.section`: 要归档的分区。默认值是页面自身所在的分区，回退到 `params.archives.section`（默认 `blog`）。
- `group.dateFormat`: 列表项的日期显示格式。默认值是 `Jan 02`，回退到 `params.archives.dateFormat`。
- `group.groupBy`: `year`（默认）、`month`，或 `none` 以显示平面列表。术语页面（如系列）由于已按术语分组，默认值为 `none`。

空状态文案使用 i18n 键 `noResultsFound`。

## 演讲

内容分区（如 `talks`）可以像归档页面一样，列表为按年份分隔的索引。

1. 使用 `archives` 布局创建内容分区的索引页：
   ```yaml {filename="content/talks/_index.md"}
   ---
   title: Talks
   layout: archives
   toc: false
   ---
   ```
   该页面默认归档其自身所在的分区，因此 `/talks/` 会按年份分组显示所有演讲。无需其他配置。
2. （可选）将其添加到顶部菜单：
   ```yaml {filename="hugo.yaml"}
   menu:
     main:
       - identifier: talks
         name: Talks
         pageRef: /talks
   ```
3. （可选，多语言）添加使用相同 layout 的多语言索引页，例如 `content/talks/_index.ja.md`。

演讲归档的文件结构如下：

{{< filetree/container >}}
  {{< filetree/folder name="content" state="open" >}}
    {{< filetree/folder name="talks" state="open" >}}
      {{< filetree/file name="_index.md" >}}
      {{< filetree/folder name="open-source-communities" state="open" >}}
        {{< filetree/file name="index.md" >}}
        {{< filetree/file name="slides.pdf" >}}
      {{< /filetree/folder >}}
      {{< filetree/file name="css-architecture.md" >}}
      {{< filetree/folder name="hugo-theming" state="open" >}}
        {{< filetree/file name="index.md" >}}
        {{< filetree/file name="cover.png" >}}
      {{< /filetree/folder >}}
    {{< /filetree/folder >}}
  {{< /filetree/folder >}}
{{< /filetree/container >}}

每篇演讲可以是一个独立的 Markdown 文件（`css-architecture.md`），也可以是一个页面包目录：一个 `index.md` 与其图片和资源（如幻灯片或封面图）放在同一子目录（`open-source-communities/`、`hugo-theming/`）。只有 `_index.md` 带有 `layout: archives` front matter：

```yaml {filename="content/talks/hugo-theming/index.md"}
---
title: Theming Hugo Sites with Tailwind CSS
date: 2025-11-03
tags:
  - Hugo
  - Tailwind CSS
---
```

示例演讲归档可在 [演讲]({{% relref "/talks" %}}) 查看。

## 系列

系列将相关文章（通常是博客文章）按名称分组。系列是一个分类术语：所有带有相同 `series` 术语的文章会自动分组到 `/series/<名称>/` 页面。系列名称即为分组，因此该页面会将这些文章列在一起，不再做额外的分组。

1. 配置 `series` 分类：
   ```yaml {filename="hugo.yaml"}
   taxonomies:
     series: series
   ```
   设置 `taxonomies` 会替换 Hugo 的默认分类。要保留现有分类，请一并列出：
   ```yaml {filename="hugo.yaml"}
   taxonomies:
     tag: tags
     category: categories
     series: series
   ```
2. 在每篇属于该系列的文章 front matter 中添加术语：
   ```yaml {filename="content/blog/part-1/index.md"}
   ---
   title: "Demo Series Part 1"
   date: 2024-09-12
   series:
     - demo-series
   ---
   ```
   通过列出多个术语，一篇文章可以属于多个系列。`series` front matter 还会在文章页面生成 Open Graph 的 `og:see_also` 链接。
3. （可选）创建术语索引页以设置系列标题并启用 `archives` 布局：
   ```yaml {filename="content/series/demo-series/_index.md"}
   ---
   title: Demo Series
   layout: archives
   toc: false
   ---
   ```
   即使没有此页面，`/series/demo-series/` 仍会列出该系列的所有文章。

系列的文件结构如下：

{{< filetree/container >}}
  {{< filetree/folder name="content" state="open" >}}
    {{< filetree/folder name="blog" state="open" >}}
      {{< filetree/folder name="part-1" state="open" >}}
        {{< filetree/file name="index.md" >}}
        {{< filetree/file name="diagram.png" >}}
      {{< /filetree/folder >}}
      {{< filetree/file name="part-2.md" >}}
    {{< /filetree/folder >}}
    {{< filetree/folder name="series" state="open" >}}
      {{< filetree/folder name="demo-series" state="open" >}}
        {{< filetree/file name="_index.md" >}}
      {{< /filetree/folder >}}
    {{< /filetree/folder >}}
  {{< /filetree/folder >}}
{{< /filetree/container >}}

系列文章仍保留在它们正常的分区（此例中为 `blog`）中。`content/series/` 目录并不是文章的存放位置 — 它是 Hugo 的分类内容目录，仅用于自定义自动生成的 `/series/<名称>/` 术语页面（标题、`archives` 布局）。该目录是可选的：即使没有它，`/series/<名称>/` 也会生成并将系列文章列在系列名称下。

与演讲文章类似，系列文章可以是独立的 Markdown 文件，也可以是页面包目录（例如 `part-1/`），将文章与其图片和资源放在一起。

### 在菜单中添加系列下拉菜单

要在顶部导航中添加列出所有系列的下拉菜单，请添加一个 `type: series` 的菜单项：

```yaml {filename="hugo.yaml"}
menu:
  main:
    - identifier: series
      name: Series
      params:
        type: series
```

下拉菜单会自动列出每个系列术语。要自定义某个系列显示的标签，请在其术语索引页（`content/series/<名称>/_index.md`）中设置标题。

示例系列归档可在 [示例系列]({{% relref "/series/demo-series" %}}) 查看。
