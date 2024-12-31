---
title: 提示框组件
linkTitle: 提示框
aliases:
- 提示框
prev: /docs/guide/shortcodes
---

一个内置组件，用于向读者展示重要信息。

<!--more-->

> [!NOTE]
> 自 [v0.9.0](https://github.com/imfing/hextra/releases/tag/v0.9.0) 起支持 [GitHub 风格的提醒](../../markdown#alerts)。
> 它利用 Markdown 语法来渲染提示框，确保内容具有更好的可移植性和可读性。

## 示例

{{< callout emoji="👾">}}
  **提示框** 是一段简短的文本，旨在吸引注意力。
{{< /callout >}}

{{< callout type="info" >}}
  **提示框** 是一段简短的文本，旨在吸引注意力。
{{< /callout >}}

{{< callout type="warning" >}}
  **提示框** 是一段简短的文本，旨在吸引注意力。
{{< /callout >}}

{{< callout type="error" >}}
  **提示框** 是一段简短的文本，旨在吸引注意力。
{{< /callout >}}

## 用法

### 默认

{{< callout emoji="🌐">}}
  Hugo 可用于创建各种类型的网站，包括博客、作品集、文档站点等。
{{< /callout >}}

```markdown
{{</* callout emoji="🌐" */>}}
  Hugo 可用于创建各种类型的网站，包括博客、作品集、文档站点等。
{{</* /callout */>}}
```

### 信息

{{< callout type="info" >}}
  请访问 GitHub 查看最新版本。
{{< /callout >}}

```markdown
{{</* callout type="info" */>}}
  请访问 GitHub 查看最新版本。
{{</* /callout */>}}
```

### 警告

{{< callout type="warning" >}}
  此 API 将在下一个版本中弃用。
{{< /callout >}}

```markdown
{{</* callout type="warning" */>}}
  **提示框** 是一段简短的文本，旨在吸引注意力。
{{</* /callout */>}}
```

### 错误

{{< callout type="error" >}}
  出错了，系统即将崩溃。
{{< /callout >}}

```markdown
{{</* callout type="error" */>}}
  出错了，系统即将崩溃。
{{</* /callout */>}}
```