---
title: 图标
---

要在行内使用此短代码，需要在配置中启用行内短代码：

```yaml {filename="hugo.yaml"}
enableInlineShortcodes: true
```

可用图标的列表可以在 [`data/icons.yaml`](https://github.com/imfing/hextra/blob/main/data/icons.yaml) 中找到。

<!--more-->

## 示例

{{< icon "academic-cap" >}}
{{< icon "cake" >}}
{{< icon "gift" >}}
{{< icon "sparkles" >}}

## 用法

```
{{</* icon "github" */>}}
```

[Heroicons](https://v1.heroicons.com/) v1 的轮廓图标默认可用。

### 如何添加自定义图标

创建 `data/icons.yaml` 文件，然后按照以下格式添加自定义的 SVG 图标：

```yaml {filename="data/icons.yaml"}
your-icon: <svg>your icon svg content</svg>
```

然后可以在短代码中这样使用：

```
{{</* icon "your-icon" */>}}

{{</* card icon="your-icon" */>}}
```

提示：[Iconify Design](https://iconify.design/) 是寻找网站 SVG 图标的好地方。