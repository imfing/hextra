---
title: 提示框组件
linkTitle: 提示框
aliases:
- callouts
prev: /docs/guide/shortcodes
---

一个内置组件，用于向读者展示重要信息。

<!--more-->

> [!NOTE]
> 自 [v0.9.0](https://github.com/imfing/hextra/releases/tag/v0.9.0) 起支持 [GitHub风格提示框](../../markdown#alerts)。
> 它利用Markdown语法渲染提示框，确保内容具有更好的可移植性和可读性。

## 示例

{{< callout emoji="👾">}}
  **提示框**是一段旨在吸引注意力的简短文本。
{{< /callout >}}

{{< callout type="info" >}}
  **提示框**是一段旨在吸引注意力的简短文本。
{{< /callout >}}

{{< callout type="warning" >}}
  **提示框**是一段旨在吸引注意力的简短文本。
{{< /callout >}}

{{< callout type="error" >}}
  **提示框**是一段旨在吸引注意力的简短文本。
{{< /callout >}}

## 使用方法

### 默认样式

{{< callout emoji="🌐">}}
  Hugo可用于创建各种类型的网站，包括博客、作品集、文档站点等。
{{< /callout >}}

```markdown
{{</* callout emoji="🌐" */>}}
  Hugo可用于创建各种类型的网站，包括博客、作品集、文档站点等。
{{</* /callout */>}}
```

### 信息提示

{{< callout type="info" >}}
  请访问GitHub查看最新发布版本。
{{< /callout >}}

```markdown
{{</* callout type="info" */>}}
  请访问GitHub查看最新发布版本。
{{</* /callout */>}}
```

### 警告提示

{{< callout type="warning" >}}
  此API将在下一版本中弃用。
{{< /callout >}}

```markdown
{{</* callout type="warning" */>}}
  此API将在下一版本中弃用。
{{</* /callout */>}}
```

### 错误提示

{{< callout type="error" >}}
  出现错误，系统即将崩溃。
{{< /callout >}}

```markdown
{{</* callout type="error" */>}}
  出现错误，系统即将崩溃。
{{</* /callout */>}}
```