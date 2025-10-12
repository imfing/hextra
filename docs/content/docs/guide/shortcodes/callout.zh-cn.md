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

{{< callout >}}
**标注** 是一小段旨在吸引注意力的文字。
{{< /callout >}}

{{< callout type="info" >}}
**标注** 是一小段旨在吸引注意力的文字。
{{< /callout >}}

{{< callout type="warning" >}}
**标注** 是一小段旨在吸引注意力的文字。
{{< /callout >}}

{{< callout type="error" >}}
**标注** 是一小段旨在吸引注意力的文字。
{{< /callout >}}

{{< callout type="important" >}}
**标注** 是一小段旨在吸引注意力的文字。
{{< /callout >}}

### 默认

{{< callout >}}
**标注** 是一小段旨在吸引注意力的文字。
{{< /callout >}}

```markdown
{{</* callout */>}}
  **标注** 是一小段旨在吸引注意力的文字。
{{</* /callout */>}}
```

### Info

{{< callout type="info" >}}
**标注** 是一小段旨在吸引注意力的文字。
{{< /callout >}}

```markdown
{{</* callout type="info" */>}}
  **标注** 是一小段旨在吸引注意力的文字。
{{</* /callout */>}}
```

### Warning

{{< callout type="warning" >}}
**标注** 是一小段旨在吸引注意力的文字。
{{< /callout >}}

```markdown
{{</* callout type="warning" */>}}
  **标注** 是一小段旨在吸引注意力的文字。
{{</* /callout */>}}
```

### Error

{{< callout type="error" >}}
**标注** 是一小段旨在吸引注意力的文字。
{{< /callout >}}

```markdown
{{</* callout type="error" */>}}
  **标注** 是一小段旨在吸引注意力的文字。
{{</* /callout */>}}
```

### Important

{{< callout type="important" >}}
**标注** 是一小段旨在吸引注意力的文字。
{{< /callout >}}

```markdown
{{</* callout type="important" */>}} 
  **标注** 是一小段旨在吸引注意力的文字。
{{</* /callout */>}}
```

### 自定义图标

{{< callout icon="sparkles" >}}
**标注** 是一小段旨在吸引注意力的文字。
{{< /callout >}}

```markdown
{{</* callout icon="sparkles" */>}}
  **标注** 是一小段旨在吸引注意力的文字。
{{</* /callout */>}}
```

{{< callout type="important" icon="sparkles" >}}
**标注** 是一小段旨在吸引注意力的文字。
{{< /callout >}}

```markdown
{{</* callout type="important" icon="sparkles" */>}}
  **标注** 是一小段旨在吸引注意力的文字。
{{</* /callout */>}}
```

### 表情符号

{{< callout emoji="🌐" >}}
**标注** 是一小段旨在吸引注意力的文字。
{{< /callout >}}

```markdown
{{</* callout emoji="🌐" */>}}
  **标注** 是一小段旨在吸引注意力的文字。
{{</* /callout */>}}
```

{{< callout type="info" emoji="ℹ️" >}}
**标注** 是一小段旨在吸引注意力的文字。
{{< /callout >}}

```markdown
{{</* callout type="info" emoji="ℹ️" */>}}
  **标注** 是一小段旨在吸引注意力的文字。
{{</* /callout */>}}
```

## 选项

| 范围      | 描述                         |
|---------|----------------------------|
| `type`  | 标注的类型。（默认、“信息”、“警告”、“错误”）  |
| `emoji` | 标注前显示的表情符号。                |
| `icon`  | 标注的表情符号（与类型相关或可以是自定义表情符号）。 |
