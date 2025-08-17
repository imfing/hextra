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

## Examples

### Default

{{< callout emoji="🌐">}}
  A **callout** is a short piece of text intended to attract attention.
{{< /callout >}}

```markdown
{{</* callout emoji="🌐" */>}}
    A **callout** is a short piece of text intended to attract attention.
{{</* /callout */>}}
```

### Info

{{< callout type="info" >}}
  A **callout** is a short piece of text intended to attract attention.
{{< /callout >}}

```markdown
{{</* callout type="info" */>}}
  A **callout** is a short piece of text intended to attract attention.
{{</* /callout */>}}
```

### Warning

{{< callout type="warning" >}}
  A **callout** is a short piece of text intended to attract attention.
{{< /callout >}}

```markdown
{{</* callout type="warning" */>}}
  A **callout** is a short piece of text intended to attract attention.
{{</* /callout */>}}
```

### Error

{{< callout type="error" >}}
  A **callout** is a short piece of text intended to attract attention.
{{< /callout >}}

```markdown
{{</* callout type="error" */>}}
  A **callout** is a short piece of text intended to attract attention.
{{</* /callout */>}}
```

## Options

| Parameter | Description                                                          |
|-----------|----------------------------------------------------------------------|
| `type`    | The type of callout. (default, `info`, `warning`, `error`)           |
| `emoji`   | The emoji to show before the callout.                                |
| `icon`    | The emoji of the callout (related to type or can be a custom emoji). |
