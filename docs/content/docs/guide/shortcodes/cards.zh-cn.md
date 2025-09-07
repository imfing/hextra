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
  {{< card link="/" title="本地图片" image="images/space.jpg" subtitle="资源目录下的图片，经过Hugo处理。" method="Resize" options="600x q80 webp" >}}
{{< /cards >}}

## 使用方法

```
{{</* cards */>}}
  {{</* card link="../callout" title="提示框" icon="warning" */>}}
  {{</* card link="../callout" title="带标签的卡片" icon="tag" tag= "自定义标签" */>}}
  {{</* card link="/" title="无图标" */>}}
{{</* /cards */>}}
```

```
{{</* cards */>}}
  {{</* card link="/" title="图片卡片" image="https://source.unsplash.com/featured/800x600?landscape" subtitle="Unsplash风景图" */>}}
  {{</* card link="/" title="本地图片" image="/images/card-image-unprocessed.jpg" subtitle="静态目录下的原始图片。" */>}}
  {{</* card link="/" title="本地图片" image="images/space.jpg" subtitle="资源目录下的图片，经过Hugo处理。" method="Resize" options="600x q80 webp" */>}}
{{</* /cards */>}}
```

## 卡片参数

| 参数         | 描述                                      |
|------------|-----------------------------------------|
| `link`     | 链接地址（内部或外部）。                            |
| `title`    | 卡片的标题。                                  |
| `subtitle` | 卡片的副标题（支持Markdown）。                     |
| `icon`     | 图标名称。                                   |
| `tag`      | 标签文本。                                   |
| `tagType`  | 标签类型：默认（灰色）、`info`、`warning` 和 `error`。 |
  
## 图片卡片

此外，卡片还支持通过以下参数添加图片并进行处理：

| 参数           | 描述                |
|--------------|-------------------|
| `image`      | 指定卡片的图片URL。       |
| `method`     | 设置Hugo的图片处理方法。    |
| `options`    | 配置Hugo的图片处理选项。    |
| `imageStyle` | 用于填充图片标签的style属性。 |

卡片支持三种类型的图片：

1. 远程图片：在`image`参数中填写完整的URL。
2. 静态图片：使用Hugo的`static/`目录下的相对路径。
3. 处理后的图片：使用Hugo的`assets/`目录下的相对路径。

Hextra在构建时会自动检测是否需要图片处理，并应用`options`参数或默认设置（Resize，800x，质量80，WebP格式）。
目前支持的`method`有：`Resize`、`Fit`、`Fill`和`Crop`。

有关Hugo内置图片处理命令、方法和选项的更多信息，请参阅其[图片处理文档](https://gohugo.io/content-management/image-processing/)。

## 标签

卡片支持添加标签，可用于显示额外的状态信息。

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

可以通过向`cards`短代码传递`cols`参数来指定卡片的最大列数。请注意，在小屏幕上列数仍会折叠。

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