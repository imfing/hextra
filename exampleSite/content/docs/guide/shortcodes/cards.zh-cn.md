---
title: 卡片
linkTitle: Cards
---

## 示例

{{< cards >}}
  {{< card link="../callout" title="Callout" icon="warning" >}}
  {{< card link="/" title="No Icon" >}}
{{< /cards >}}

{{< cards >}}
  {{< card link="/" title="Image Card" image="https://source.unsplash.com/featured/800x600?landscape" subtitle="Unsplash Landscape" >}}
  {{< card link="/" title="Local Image" image="/images/card-image-unprocessed.jpg" subtitle="Raw image under static directory." >}}
  {{< card link="/" title="Local Image" image="images/space.jpg" subtitle="Image under assets directory, processed by Hugo." method="Resize" options="600x q80 webp" >}}
{{< /cards >}}

## 使用

```
{{</* cards */>}}
  {{</* card link="../callout" title="Callout" icon="warning" */>}}
  {{</* card link="/" title="No Icon" */>}}
{{</* /cards */>}}
```

```
{{</* cards */>}}
  {{</* card link="/" title="Image Card" image="https://source.unsplash.com/featured/800x600?landscape" subtitle="Unsplash Landscape" */>}}
  {{</* card link="/" title="Local Image" image="/images/card-image-unprocessed.jpg" subtitle="Raw image under static directory." */>}}
  {{</* card link="/" title="Local Image" image="images/space.jpg" subtitle="Image under assets directory, processed by Hugo." method="Resize" options="600x q80 webp" */>}}
{{</* /cards */>}}
```

## 卡片参数

| Parameter  | Description                           |
|----------- |---------------------------------------|
| `link`     | URL（内部或外部）          |
| `title`    | 卡片的标题           |
| `subtitle` | 字幕标题（支持 Markdown） |
| `icon`     | 图标的名称                    |

## Image Card

此外，该卡还支持通过以下参数添加图像和处理：

| Parameter  | Description                                 |
|----------- |---------------------------------------------|
| `image`    | 指定卡片的图像 URL.       |
| `method`   | 设置 Hugo 的图像处理方法。       |
| `options`  | 配置 Hugo 的图像处理选项。|

卡片支持三种图像：

1. 远程图片：完整网址应放置在 image 参数中
2. 静态图片：使用 Hugo 的 static/ 目录中的相对路径
3. 处理过的图片：使用 Hugo 的 assets/ 目录中的相对路径

Hextra 在构建过程中会自动检测图片是否需要处理，并根据需要应用 options 参数或默认设置（缩放，800x，质量 80，WebP 格式）。

它目前支持以下处理方法：Resize（缩放）、Fit（适应）、Fill（填充）和 Crop（裁剪）。

有关 Hugo 内置图像处理命令、方法和选项的更多信息，请参阅他们的 [Image Processing Documentation](https://gohugo.io/content-management/image-processing/).
