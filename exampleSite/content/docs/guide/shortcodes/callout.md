---
title: Callout Component
linkTitle: Callout
aliases:
- callouts
prev: /docs/guide/shortcodes
---

A built-in component to show important information to the reader.

<!--more-->

> [!NOTE]
> [GitHub-style alerts](../../markdown#alerts) are supported since [v0.9.0](https://github.com/imfing/hextra/releases/tag/v0.9.0).
> It leverages Markdown syntax to render the callout which ensures better portability and readability of the content.

## Example

{{< callout emoji="👾">}}
  A **callout** is a short piece of text intended to attract attention.
{{< /callout >}}

{{< callout type="info" >}}
  A **callout** is a short piece of text intended to attract attention.
{{< /callout >}}

{{< callout type="warning" >}}
  A **callout** is a short piece of text intended to attract attention.
{{< /callout >}}

{{< callout type="error" >}}
  A **callout** is a short piece of text intended to attract attention.
{{< /callout >}}

## Usage

### Default

{{< callout emoji="🌐">}}
  Hugo can be used to create a wide variety of websites, including blogs, portfolios, documentation sites, and more.
{{< /callout >}}

```markdown
{{</* callout emoji="🌐" */>}}
  Hugo can be used to create a wide variety of websites, including blogs, portfolios, documentation sites, and more.
{{</* /callout */>}}
```

### Info

{{< callout type="info" >}}
  Please visit GitHub to see the latest releases.
{{< /callout >}}

```markdown
{{</* callout type="info" */>}}
  Please visit GitHub to see the latest releases.
{{</* /callout */>}}
```

### Warning

{{< callout type="warning" >}}
  This API will be deprecated in the next version.
{{< /callout >}}

```markdown
{{</* callout type="warning" */>}}
  A **callout** is a short piece of text intended to attract attention.
{{</* /callout */>}}
```

### Error

{{< callout type="error" >}}
  Something went wrong and it's going to explode.
{{< /callout >}}

```markdown
{{</* callout type="error" */>}}
  Something went wrong and it's going to explode.
{{</* /callout */>}}
```
