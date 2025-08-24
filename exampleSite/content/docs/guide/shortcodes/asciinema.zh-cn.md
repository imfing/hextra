---
title: "Asciinema 播放器"
---

asciinema shortcode 允许你在 Hugo 站点中嵌入使用 [asciinema](https://asciinema.org/) 创建的终端录制。它提供了一个功能丰富的终端播放器，具有播放控制、速度调整和主题自定义等功能。

## 基本用法

将你的 `.cast` 文件放在 `static/casts/` 目录中，然后使用 shortcode：

```markdown
{{</* asciinema file="demo.cast" */>}}
```

{{< asciinema file="demo.cast" >}}

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
  file="demo.cast"
  theme="dracula"
  speed="2"
  autoplay="true"
  loop="true"
  markers="1.5:Installation,3.2:Configuration,5.8:Testing"
>}}

## 参数

| 参数 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `file` | string | - | .cast 文件路径（必需） |
| `theme` | string | `"asciinema"` | 播放器主题 |
| `speed` | number | `1` | 播放速度倍数 |
| `autoplay` | boolean | `false` | 自动开始播放 |
| `loop` | boolean | `false` | 循环播放 |
| `poster` | string | `""` | 播放开始前显示的海报（预览帧）。支持 NPT 表示法（如 "npt:1:23"） |
| `markers` | string | `""` | 逗号分隔的时间标记。格式："时间:标签" 或仅 "时间"（如 "1.5:Installation,3.2:Configuration,5.8"） |
