---
title: 图片表格布局示例
weight: 100
---

# 图片表格布局 (Image Grid)

`image-grid` shortcode 允许您创建灵活的图片表格布局，支持自定义行数和列数，每行可以有不同的列数，并且在各个设备上保持响应式布局。

## 基本用法

```markdown
{{</* image-grid */>}}
image1.jpg, image2.jpg, image3.jpg
image4.jpg, image5.jpg
image6.jpg
{{</* /image-grid */>}}
```

## 参数说明

| 参数 | 默认值 | 描述 |
|------|--------|------|
| `gap` | `4` | 图片之间的间距，支持的值：`0`, `1`, `2`, `3`, `4`, `5`, `6`, `8`, `10`, `12` |

## 图片标题支持

每个图片都可以添加可选的标题，使用 `|` 分隔符：

```markdown
{{</* image-grid */>}}
image1.jpg|这是第一张图片, image2.jpg|第二张图片的描述
image3.jpg, image4.jpg|只有这张有标题
{{</* /image-grid */>}}
```

- 标题支持 Markdown 格式
- 如果不需要标题，直接使用图片路径即可
- 标题会显示在图片下方，居中对齐

## 使用示例

### 基本网格布局

{{< image-grid >}}
https://via.placeholder.com/300x200/0066cc/ffffff?text=Image1, https://via.placeholder.com/300x200/cc6600/ffffff?text=Image2, https://via.placeholder.com/300x200/00cc66/ffffff?text=Image3
https://via.placeholder.com/300x200/cc0066/ffffff?text=Image4, https://via.placeholder.com/300x200/6600cc/ffffff?text=Image5
{{< /image-grid >}}

### 自定义间距

{{< image-grid gap="2" >}}
https://via.placeholder.com/400x225/ff6b6b/ffffff?text=Wide1, https://via.placeholder.com/400x225/4ecdc4/ffffff?text=Wide2
https://via.placeholder.com/400x225/45b7d1/ffffff?text=Wide3
{{< /image-grid >}}

### 不同尺寸的图片

{{< image-grid >}}
https://via.placeholder.com/300x300/f9ca24/ffffff?text=Square, https://via.placeholder.com/400x200/f0932b/ffffff?text=Wide, https://via.placeholder.com/200x400/eb4d4b/ffffff?text=Tall
{{< /image-grid >}}

### 带标题的图片网格

{{< image-grid >}}
https://via.placeholder.com/400x300/3498db/ffffff?text=Ocean|**蔚蓝海洋** - 宁静的海水, https://via.placeholder.com/400x300/2ecc71/ffffff?text=Forest|*绿色森林* - 生机勃勃
https://via.placeholder.com/400x300/e74c3c/ffffff?text=Mountain|高耸的山峰, https://via.placeholder.com/400x300/f39c12/ffffff?text=Desert|金色沙漠
https://via.placeholder.com/600x300/9b59b6/ffffff?text=Sky|广阔天空 - 无边无际的蓝天白云
{{< /image-grid >}}

### 混合使用（部分图片有标题）

{{< image-grid gap="3" >}}
https://via.placeholder.com/350x250/1abc9c/ffffff?text=Image1|带标题的图片, https://via.placeholder.com/350x250/34495e/ffffff?text=Image2, https://via.placeholder.com/350x250/e67e22/ffffff?text=Image3|另一个标题
{{< /image-grid >}}

## 响应式特性

- **桌面端**: 保持设定的行列布局
- **平板端**: 自动调整为每行最多2列
- **移动端**: 自动调整为单列布局
- **图片比例**: 在所有设备上保持不变
- **悬停效果**: 图片会有轻微的缩放动画

## 支持的图片格式

- 本地图片资源 (从 `static/` 或页面资源)
- 远程图片 URL
- SVG 图片
- WebP 格式 (自动优化)

## 注意事项

1. 每行的图片路径用逗号分隔
2. 不同行用换行符分隔
3. 图片标题使用 `|` 分隔符：`图片路径|标题文本`
4. 标题支持 Markdown 语法（如 **粗体**、*斜体* 等）
5. 标题是可选的，不需要标题时直接使用图片路径
6. 本地图片会自动优化为 WebP 格式
7. 支持 Hugo 的图片处理功能
