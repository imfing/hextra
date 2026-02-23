---
title: "附加页面"
weight: 1
prev: /docs/advanced
aliases:
  - /docs/advanced/glossary/
---

Hextra 提供一些需要单独启用的附加页面：术语表与归档页。

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

你可以为某个内容分区的文章创建按年份分组的归档时间线页面。

1. 创建归档页面：
   ```yaml {filename="content/archives/_index.md"}
   ---
   title: Archives
   layout: archives
   toc: false
   ---
   ```
2. （可选）将其添加到顶部菜单：
   ```yaml {filename="hugo.yaml"}
   menu:
     main:
       - identifier: archives
         name: Archives
         pageRef: /archives
   ```
3. （可选，多语言）添加使用相同 layout 的多语言归档首页，例如：
   - `content/archives/_index.fa.md`
   - `content/archives/_index.ja.md`
   - `content/archives/_index.zh-cn.md`
4. （可选）修改归档来源分区。默认值为 `blog`。
   ```yaml {filename="hugo.yaml"}
   params:
     archives:
       section: blog
   ```
5. （可选）修改归档条目的日期显示格式。默认值是 `Jan 02`。
   ```yaml {filename="hugo.yaml"}
   params:
     archives:
       dateFormat: "Jan 02"
   ```

空状态文案使用 i18n 键 `noResultsFound`。

示例归档页面可在 [归档]({{% relref "/archives" %}}) 查看。
