---
title: 图标
---

要内联使用此短代码，需要在配置中启用内联短代码：

```yaml {filename="hugo.yaml"}
enableInlineShortcodes: true
```

可用图标列表可以在以下位置找到 [`data/icons.yaml`](https://github.com/imfing/hextra/blob/main/data/icons.yaml).

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

[Heroicons](https://v1.heroicons.com/) v1 轮廓图标开箱即用

### 如何添加自己的图标

创建 `data/icons.yaml` 文件，然后按以下格式添加您自己的 SVG 图标：

```yaml {filename="data/icons.yaml"}
your-icon: <svg>your icon svg content</svg>
```

然后可以在短代码中使用它，如下所示：

```
{{</* icon "your-icon" */>}}

{{</* card icon="your-icon" */>}}
```

提示：[Iconify Design](https://iconify.design/) 是为您的网站查找 SVG 图标的好地方
