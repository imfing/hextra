---
title: Easy Image Cards
linkTitle: Easy Image Cards
---

## 简介

Easy Image Card 是一个专门用于展示图片的卡片组件，没有文字描述部分。点击图片时会自动复制该图片到剪贴板。

## 示例

{{< cards >}}
  {{< easy-image-card image="https://github.com/user-attachments/assets/71b7e3ec-1a8d-4582-b600-5425c6cc0407" alt="网络图片示例" >}}
  {{< easy-image-card image="/images/card-image-unprocessed.jpg" alt="本地静态图片" >}}
  {{< easy-image-card image="images/space.jpg" alt="处理过的图片" method="Resize" options="400x q80 webp" >}}
{{< /cards >}}

## 使用方法

```markdown
{{</* cards */>}}
  {{</* easy-image-card image="https://example.com/image.jpg" alt="图片描述" */>}}
  {{</* easy-image-card image="/images/local-image.jpg" alt="本地图片" */>}}
  {{</* easy-image-card image="images/asset-image.jpg" alt="资源图片" method="Resize" options="600x q80 webp" */>}}
{{</* /cards */>}}
```

## 参数说明

| 参数         | 描述                                                    |
|-------------|-------------------------------------------------------|
| `image`     | 图片 URL（支持远程链接、静态目录或资源目录中的图片）           |
| `alt`       | 图片的替代文本（默认为 "Image"）                          |
| `imageStyle`| 图片的自定义样式                                         |
| `method`    | Hugo 图片处理方法（Resize、Fit、Fill、Crop）              |
| `options`   | Hugo 图片处理选项（如 "800x webp q80"）                  |

## 功能特点

- **无文字描述**：纯图片展示，界面更简洁
- **点击复制**：点击图片自动复制到剪贴板
- **悬停效果**：鼠标悬停时显示复制提示和图片缩放效果
- **图片处理**：支持 Hugo 的图片处理功能
- **响应式设计**：自适应不同屏幕尺寸

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

