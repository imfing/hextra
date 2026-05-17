---
title: 图标
next: /docs/guide/shortcodes/steps
---

要在行内使用此短代码，需在配置中启用行内短代码功能：

```yaml {filename="hugo.yaml"}
enableInlineShortcodes: true
```

可用图标列表可在 [`data/icons.yaml`](https://github.com/imfing/hextra/blob/main/data/icons.yaml) 中找到。

<!--more-->

## 示例

{{< icon "academic-cap" >}}
{{< icon "cake" >}}
{{< icon "gift" >}}
{{< icon "sparkles" >}}

## 使用方法

```
{{</* icon "github" */>}}
```

默认支持 [Heroicons](https://v1.heroicons.com/) v1 轮廓风格图标。

### 如何添加自定义图标

创建 `data/icons.yaml` 文件，按以下格式添加您的 SVG 图标：

```yaml {filename="data/icons.yaml"}
your-icon: <svg>您的图标 SVG 内容</svg>
```

随后即可通过短代码调用：

```
{{</* icon "your-icon" */>}}

{{</* card icon="your-icon" */>}}
```

提示：[Iconify Design](https://iconify.design/) 是寻找网站 SVG 图标的优质资源平台。

### 远程图标包

远程图标可以通过提供商前缀按需加载。Hextra 支持以下提供商：

| 提供商                                   | 示例                              | 图标                        |
| ---------------------------------------- | --------------------------------- | --------------------------- |
| [Lucide](https://lucide.dev/icons/)      | `{{</* icon "lucide:house" */>}}` | {{< icon "lucide:house" >}} |
| [Tabler Icons](https://tabler.io/icons)  | `{{</* icon "tabler:user" */>}}`  | {{< icon "tabler:user" >}}  |
| [Simple Icons](https://simpleicons.org/) | `{{</* icon "simple:hugo" */>}}`  | {{< icon "simple:hugo" >}}  |

远程图标会在构建时获取。默认提供商固定到主版本，并从以下 CDN URL 加载：

```yaml
lucide: "https://unpkg.com/lucide-static@1/icons/%s.svg"
tabler: "https://unpkg.com/@tabler/icons@3/icons/outline/%s.svg"
simple: "https://cdn.jsdelivr.net/npm/simple-icons@16/icons/%s.svg"
```

远程图标名称可用于 Hextra 中任何接受图标名称的位置，包括卡片、标签页、徽章、提示框和导航栏菜单项。

## 选项

| 范围         | 描述         |
| ------------ | ------------ |
| `name`       | 图标名称     |
| `attributes` | 图标的属性。 |
