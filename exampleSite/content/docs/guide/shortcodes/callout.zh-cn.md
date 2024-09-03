---
title: 标注
aliases:
- callouts
prev: /docs/guide/shortcodes
---

向读者显示重要信息的内置组件。

<!--more-->

## Example

{{< callout emoji="👾">}}
  **标注**是一段旨在吸引注意力的短文本
{{< /callout >}}

{{< callout type="info" >}}
  **标注**是一段旨在吸引注意力的短文本。
{{< /callout >}}

{{< callout type="warning" >}}
  **标注**是一段旨在吸引注意力的短文本。
{{< /callout >}}

{{< callout type="error" >}}
  **标注**是一段旨在吸引注意力的短文本。
{{< /callout >}}

## Usage

### Default

{{< callout emoji="🌐">}}
  Hugo 可用于创建各种网站，包括博客、作品集、文档网站等
{{< /callout >}}

```markdown
{{</* callout emoji="🌐" */>}}
  Hugo 可用于创建各种网站，包括博客、作品集、文档网站等
{{</* /callout */>}}
```

### Info

{{< callout type="info" >}}
  请访问 GitHub 查看最新版本
{{< /callout >}}

```markdown
{{</* callout type="info" */>}}
  请访问 GitHub 查看最新版本
{{</* /callout */>}}
```

### Warning

{{< callout type="warning" >}}
  该 API 将在下一版本中弃用
{{< /callout >}}

```markdown
{{</* callout type="warning" */>}}
  **标注**是一段旨在吸引注意力的简短文字
{{</* /callout */>}}
```

### Error

{{< callout type="error" >}}
  出问题了，要爆炸了
{{< /callout >}}

```markdown
{{</* callout type="error" */>}}
  出问题了，要爆炸了
{{</* /callout */>}}
```
