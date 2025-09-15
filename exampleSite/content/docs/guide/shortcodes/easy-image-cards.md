---
title: Easy Image Cards
linkTitle: Easy Image Cards
---

## 简介

Easy Image Card 是一个专门用于展示图片的卡片组件，没有文字描述部分。点击图片时会自动复制该图片到剪贴板。

## 示例

### 自适应尺寸模式 (推荐)

使用 `easy-image-cards` 容器，每张图片会根据其原始比例显示，不会被强制统一高度：

{{< easy-image-cards >}}
  {{< easy-image-card image="https://github.com/user-attachments/assets/71b7e3ec-1a8d-4582-b600-5425c6cc0407" alt="网络图片示例" fit="contain" >}}
  {{< easy-image-card image="/images/card-image-unprocessed.jpg" alt="本地静态图片" fit="contain" >}}
  {{< easy-image-card image="/images/不可以不可以不可以不可以.jpg" fit="contain" >}}
  {{< easy-image-card image="/images/我不行了.jpg" alt="我不行了" fit="contain" >}}
{{< /easy-image-cards >}}

### 尺寸对比示例

**小尺寸 (100-150px)**：
{{< easy-image-cards size="small" >}}
  {{< easy-image-card image="/images/我不行了.jpg" alt="小尺寸示例" fit="contain" >}}
  {{< easy-image-card image="/images/不可以不可以不可以不可以.jpg" alt="小尺寸示例2" fit="contain" >}}
  {{< easy-image-card image="/images/[表情]俺不中了.jpg" alt="小尺寸示例" fit="contain" >}}
  {{< easy-image-card image="/images/莎莎宝宝要去睡觉啦~~.jpg" alt="小尺寸示例2" fit="contain" >}}
{{< /easy-image-cards >}}

**中等尺寸 (120-200px, 默认)**：
{{< easy-image-cards size="medium" >}}
  {{< easy-image-card image="/images/我不行了.jpg" alt="中等尺寸示例" fit="contain" >}}
  {{< easy-image-card image="/images/不可以不可以不可以不可以.jpg" alt="中等尺寸示例2" fit="contain" >}}
{{< /easy-image-cards >}}

### 统一高度模式 (传统 Grid 布局)

使用 `cards` 容器，所有卡片会被强制为相同高度：

{{< cards >}}
  {{< easy-image-card image="/images/我不行了.jpg" alt="contain 模式" fit="contain" >}}
  {{< easy-image-card image="/images/不可以不可以不可以不可以.jpg" alt="cover 模式" fit="cover" >}}
  {{< easy-image-card image="/images/不可以不可以不可以不可以.jpg" alt="fill 模式" fit="fill" >}}
{{< /cards >}}

## 使用方法

### 自适应尺寸布局 (推荐)

```markdown
{{</* easy-image-cards */>}}
  {{</* easy-image-card image="https://example.com/image.jpg" alt="图片描述" fit="contain" */>}}
  {{</* easy-image-card image="/images/local-image.jpg" alt="本地图片" fit="contain" */>}}
  {{</* easy-image-card image="images/asset-image.jpg" alt="资源图片" method="Resize" options="600x q80 webp" */>}}
{{</* /easy-image-cards */>}}
```

### 不同尺寸选项

```markdown
<!-- 小尺寸 (100-150px) -->
{{</* easy-image-cards size="small" */>}}
  {{</* easy-image-card image="/images/example.jpg" alt="小尺寸图片" */>}}
{{</* /easy-image-cards */>}}

<!-- 中等尺寸 (120-200px, 默认) -->
{{</* easy-image-cards size="medium" */>}}
  {{</* easy-image-card image="/images/example.jpg" alt="中等尺寸图片" */>}}
{{</* /easy-image-cards */>}}

<!-- 大尺寸 (200-300px) -->
{{</* easy-image-cards size="large" */>}}
  {{</* easy-image-card image="/images/example.jpg" alt="大尺寸图片" */>}}
{{</* /easy-image-cards */>}}
```

### 统一高度布局

```markdown
{{</* cards */>}}
  {{</* easy-image-card image="https://example.com/image.jpg" alt="图片描述" fit="cover" */>}}
  {{</* easy-image-card image="/images/local-image.jpg" alt="本地图片" fit="cover" */>}}
  {{</* easy-image-card image="images/asset-image.jpg" alt="资源图片" method="Resize" options="600x q80 webp" fit="cover" */>}}
{{</* /cards */>}}
```

## 参数说明

### easy-image-card 参数

| 参数         | 描述                                                    |
|-------------|-------------------------------------------------------|
| `image`     | 图片 URL（支持远程链接、静态目录或资源目录中的图片）           |
| `alt`       | 图片的替代文本（默认为 "Image"）                          |
| `fit`       | 图片适应模式（默认为 "contain"）                          |
| `imageStyle`| 图片的自定义样式                                         |
| `method`    | Hugo 图片处理方法（Resize、Fit、Fill、Crop）              |
| `options`   | Hugo 图片处理选项（如 "800x webp q80"）                  |

### easy-image-cards 容器参数

| 参数    | 描述                                                        |
|--------|-------------------------------------------------------------|
| `size` | 卡片尺寸：`small` (100-150px)、`medium` (120-200px, 默认)、`large` (200-300px) |
| `cols` | 列数提示（影响最小宽度计算，默认为 3）                          |

## 图片适应模式 (fit 参数)

| 模式        | 描述                                                     |
|------------|----------------------------------------------------------|
| `contain`  | **保持原始比例**，图片完整显示在容器内（默认，推荐）         |
| `cover`    | 填充整个容器，可能会裁切图片以保持比例                      |
| `fill`     | 拉伸图片以完全填充容器，可能会改变图片比例                  |
| `none`     | 保持图片原始尺寸，不进行缩放                              |
| `scale-down`| 类似 contain，但不会放大图片                             |

## 容器类型对比

| 容器类型 | 适用场景 | 布局特点 | 尺寸控制 | 推荐用途 |
|---------|---------|---------|----------|---------|
| `easy-image-cards` | **自适应尺寸** | 每张图片保持原始比例，高度不统一 | 支持 small/medium/large | 图片画廊、作品展示 |
| `cards` | **统一高度** | 所有卡片强制相同高度 | 固定网格布局 | 需要整齐排列的场景 |

## 功能特点

- **无文字描述**：纯图片展示，界面更简洁
- **点击复制**：点击图片自动复制到剪贴板
- **悬停效果**：鼠标悬停时显示复制提示和图片缩放效果
- **图片处理**：支持 Hugo 的图片处理功能
- **响应式设计**：自适应不同屏幕尺寸
- **灵活布局**：提供自适应和统一高度两种布局选择

## 图片类型支持

1. **远程图片**：在 `image` 参数中使用完整的 URL
2. **静态图片**：使用 Hugo `static/` 目录中的相对路径
3. **处理图片**：使用 Hugo `assets/` 目录中的相对路径，支持自动处理

## 浏览器兼容性

该组件使用现代浏览器的 Clipboard API，支持：
- Chrome 66+
- Firefox 63+
- Safari 13.1+
- Edge 79+

对于不支持图片复制的浏览器，会自动降级为复制图片链接。

