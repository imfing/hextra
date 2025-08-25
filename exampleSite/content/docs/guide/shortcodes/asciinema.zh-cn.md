---
title: "Asciinema Player 组件"
linktitle: "Asciinema Player"
sidebar:
  exclude: true
---

asciinema shortcode 允许你在 Hugo 站点中嵌入使用 [asciinema](https://asciinema.org/) 创建的终端录制。它提供了一个功能丰富的终端播放器，具有播放控制、速度调整和主题自定义等功能。

## 基本用法

asciinema shortcode 支持本地 `.cast` 文件和远程 URL。以下是使用本地文件的不同方法：

### 本地文件

**方法 1：Assets 目录（推荐）**
将你的 cast 文件放在 Hugo 站点的 `assets/` 目录中：

```
your-site/
├── assets/
│   └── demo.cast
└── content/
    └── my-page.md
```

在你的 markdown 文件中：
```markdown
{{</* asciinema file="demo.cast" */>}}
```

**方法 2：Static 目录**
将你的 cast 文件放在 `static/` 目录中：

```
your-site/
├── static/
│   └── demo.cast
└── content/
    └── my-page.md
```

在你的 markdown 文件中：
```markdown
{{</* asciinema file="demo.cast" */>}}
```

**方法 3：页面包**
对于页面包，将 cast 文件与你的 markdown 文件放在一起：

```
your-site/
└── content/
    └── my-page/
        ├── index.md
        └── demo.cast
```

在你的 markdown 文件中：
```markdown
{{</* asciinema file="demo.cast" */>}}
```

{{< asciinema file="casts/demo.cast" >}}

### 远程文件

你也可以使用来自任何远程 URL 的 cast 文件：

```markdown
{{</* asciinema file="https://asciinema.org/a/85R4jTtjKVRIYXTcKCNq0vzYH.cast" */>}}
{{</* asciinema file="https://example.com/demo.cast" */>}}
```

{{< asciinema file="https://asciinema.org/a/85R4jTtjKVRIYXTcKCNq0vzYH.cast" >}}

### 文件查找机制

shortcode 会按以下顺序自动查找你的 cast 文件：
1. **页面包资源**（如果使用页面包）
2. **全局 assets 目录**（`assets/`）
3. **Static 目录**（`static/`）
4. **远程 URL**（如果路径以 `http://` 或 `https://` 开头）

如果找不到文件，Hugo 会显示有用的错误信息，告诉你应该将文件放在哪里。

## 高级演示

这是一个展示所有可用参数的高级示例：

```markdown
{{</* asciinema 
  file="demo.cast"
  theme="dracula"
  speed="2"
  autoplay="true"
  loop="true"
  markers="1.5:Installation,3.2:Configuration,5.8:Testing"
*/>}}
```

{{< asciinema 
  file="casts/demo.cast"
  theme="dracula"
  speed="2"
  autoplay="true"
  loop="true"
  markers="1.5:Installation,3.2:Configuration,5.8:Testing"
>}}

## 参数

| 参数 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `file` | string | - | .cast 文件路径（必需）。支持本地文件、绝对路径和远程 URL |
| `theme` | string | `"asciinema"` | 播放器主题 |
| `speed` | number | `1` | 播放速度倍数 |
| `autoplay` | boolean | `false` | 自动开始播放 |
| `loop` | boolean | `false` | 循环播放 |
| `poster` | string | `""` | 播放开始前显示的海报（预览帧）。支持 NPT 表示法（如 "npt:1:23"） |
| `markers` | string | `""` | 逗号分隔的时间标记。格式："时间:标签" 或仅 "时间"（如 "1.5:Installation,3.2:Configuration,5.8"） |
