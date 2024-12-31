---
title: 卡片组件
linkTitle: 卡片
---

## 示例

{{< cards >}}
  {{< card link="../callout" title="提示框" icon="warning" >}}
  {{< card link="../callout" title="带标签的卡片" icon="tag" tag="自定义标签">}}
  {{< card link="/" title="无图标" >}}
{{< /cards >}}

{{< cards >}}
  {{< card link="/" title="图片卡片" image="https://github.com/user-attachments/assets/71b7e3ec-1a8d-4582-b600-5425c6cc0407" subtitle="网络图片" >}}
  {{< card link="/" title="本地图片" image="/images/card-image-unprocessed.jpg" subtitle="静态目录下的原始图片。" >}}
  {{< card link="/" title="本地图片" image="images/space.jpg" subtitle="资源目录下的图片，由 Hugo 处理。" method="Resize" options="600x q80 webp" >}}
{{< /cards >}}

## 用法

```
{{</* cards */>}}
  {{</* card link="../callout" title="提示框" icon="warning" */>}}
  {{</* card link="../callout" title="带标签的卡片" icon="tag" tag= "自定义标签" */>}}
  {{</* card link="/" title="无图标" */>}}
{{</* /cards */>}}
```

```
{{</* cards */>}}
  {{</* card link="/" title="图片卡片" image="https://source.unsplash.com/featured/800x600?landscape" subtitle="Unsplash 风景" */>}}
  {{</* card link="/" title="本地图片" image="/images/card-image-unprocessed.jpg" subtitle="静态目录下的原始图片。" */>}}
  {{</* card link="/" title="本地图片" image="images/space.jpg" subtitle="资源目录下的图片，由 Hugo 处理。" method="Resize" options="600x q80 webp" */>}}
{{</* /cards */>}}
```

## 卡片参数

| 参数       | 描述                                                     |
|----------- |-----------------------------------------------------------------|
| `link`     | URL（内部或外部）。                                     |
| `title`    | 卡片的标题。                                             |
| `subtitle` | 卡片的副标题（支持 Markdown）。                           |
| `icon`     | 图标的名称。                                             |
| `tag`      | 标签中的文本。                                           |
| `tagColor` | 标签的颜色：`gray`（默认）、`yellow`、`red` 和 `blue`。 |
  
## 图片卡片

此外，卡片支持通过以下参数添加图片并进行处理：

| 参数      | 描述                                 |
|-----------|--------------------------------------|
| `image`   | 指定卡片的图片 URL。                 |
| `method`  | 设置 Hugo 的图片处理方法。           |
| `options` | 配置 Hugo 的图片处理选项。           |

卡片支持三种类型的图片：

1. 远程图片：`image` 参数中的完整 URL。
2. 静态图片：使用 Hugo `static/` 目录中的相对路径。
3. 处理后的图片：使用 Hugo `assets/` 目录中的相对路径。

Hextra 在构建时自动检测是否需要图片处理，并应用 `options` 参数或默认设置（Resize，800x，质量 80，WebP 格式）。
目前支持以下 `method`：`Resize`、`Fit`、`Fill` 和 `Crop`。

有关 Hugo 内置图片处理命令、方法和选项的更多信息，请参阅其[图片处理文档](https://gohugo.io/content-management/image-processing/)。

## 标签

卡片支持添加标签，这对于显示额外的状态信息非常有用。

{{< cards >}}
  {{< card link="../callout" title="带默认标签的卡片" tag="标签文本" >}}
  {{< card link="../callout" title="带错误标签的卡片" tag="标签文本" tagType="error" >}}
  {{< card link="../callout" title="带信息标签的卡片" tag="标签文本" tagType="info" >}}
  {{< card link="../callout" title="带警告标签的卡片" tag="标签文本" tagType="warning" >}}
  {{< card link="/" title="图片卡片" image="https://github.com/user-attachments/assets/71b7e3ec-1a8d-4582-b600-5425c6cc0407" subtitle="网络图片" tag="标签文本" tagType="error" >}}
{{< /cards >}}

```
{{</* cards */>}}
  {{</* card link="../callout" title="带默认标签颜色的卡片" tag="标签文本" */>}}
  {{</* card link="../callout" title="带红色标签的卡片" tag="标签文本" tagType="error" */>}}
  {{</* card link="../callout" title="带蓝色标签的卡片" tag="标签文本" tagType="info" */>}}
  {{</* card link="../callout" title="带黄色标签的卡片" tag="标签文本" tagType="warning" */>}}
{{</* /cards */>}}
```

## 列数

您可以通过将 `cols` 参数传递给 `cards` 短代码来指定卡片的最大列数。请注意，在较小的屏幕上，列仍会折叠。

{{< cards cols="1" >}}
  {{< card link="/" title="顶部卡片" >}}
  {{< card link="/" title="底部卡片" >}}
{{< /cards >}}

{{< cards cols="2" >}}
  {{< card link="/" title="左侧卡片" >}}
  {{< card link="/" title="右侧卡片" >}}
{{< /cards >}}

```
{{</* cards cols="1" */>}}
  {{</* card link="/" title="顶部卡片" */>}}
  {{</* card link="/" title="底部卡片" */>}}
{{</* /cards */>}}

{{</* cards cols="2" */>}}
  {{</* card link="/" title="左侧卡片" */>}}
  {{</* card link="/" title="右侧卡片" */>}}
{{</* /cards */>}}
```