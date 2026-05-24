---
title: "图片库"
linktitle: "图片库"
sidebar:
  exclude: true
---

## 概述

`gallery` 短代码用于展示一组图片，并提供交互式的 [PhotoSwipe v5](https://photoswipe.com/) 灯箱。点击任意图片即可打开全屏查看器，支持上一张/下一张导航、标题以及键盘操作。

## 基本用法

将一个或多个 `{{</* gallery-item */>}}` 短代码包裹在 `{{</* gallery */>}}` 中。同一个图库内可以混合使用本地图片和远程图片：

```markdown
{{</* gallery */>}}
  {{</* gallery-item src="images/space.jpg" caption="太空" */>}}
  {{</* gallery-item src="https://picsum.photos/id/1015/1600/1200" thumb="https://picsum.photos/id/1015/800/600" width="1600" height="1200" caption="河谷" */>}}
  {{</* gallery-item src="https://picsum.photos/id/1018/1600/1200" thumb="https://picsum.photos/id/1018/800/600" width="1600" height="1200" caption="高山湖泊" */>}}
{{</* /gallery */>}}
```

{{< gallery >}}
  {{< gallery-item src="images/space.jpg" caption="太空" >}}
  {{< gallery-item src="https://picsum.photos/id/1015/1600/1200" thumb="https://picsum.photos/id/1015/800/600" width="1600" height="1200" caption="河谷" >}}
  {{< gallery-item src="https://picsum.photos/id/1018/1600/1200" thumb="https://picsum.photos/id/1018/800/600" width="1600" height="1200" caption="高山湖泊" >}}
{{< /gallery >}}

## 图片来源

图片可以来自多个位置。短代码按以下顺序解析 `src`：

1. **页面捆绑（Page bundle）资源**：位于 [叶子捆绑](https://gohugo.io/content-management/page-bundles/) 中 `index.md` 旁边的文件。
2. **全局资源**：站点 `assets/` 目录下的文件。
3. **静态文件**：站点 `static/` 目录下的文件（使用以 `/` 开头的路径引用）。
4. **远程 URL**：任何以 `http://` 或 `https://` 开头的 `src`。

对于本地图片，会自动检测图片尺寸。对于远程图片，请提供 `width` 与 `height`，以便灯箱在图片加载前预留空间：

```markdown
{{</* gallery-item
  src="https://picsum.photos/id/1043/1920/1280"
  width="1920"
  height="1280"
  caption="来自 picsum.photos 的照片"
*/>}}
```

可选的 `thumb` 参数指向用于页面内网格的较小缩略图；用户点击时，PhotoSwipe 仍会打开完整分辨率的 `src`。

## 布局类型

`type` 参数用于选择布局算法。默认为 `grid`。

### Grid（默认）

一个均匀的网格，每个单元尺寸相同。使用 `cols` 控制显示的列数：

```markdown
{{</* gallery type="grid" cols="3" */>}}
  {{</* gallery-item src="https://picsum.photos/id/1015/1200/1200" thumb="https://picsum.photos/id/1015/600/600" width="1200" height="1200" caption="河流" */>}}
  {{</* gallery-item src="https://picsum.photos/id/1018/1200/1200" thumb="https://picsum.photos/id/1018/600/600" width="1200" height="1200" caption="湖泊" */>}}
  {{</* gallery-item src="https://picsum.photos/id/1019/1200/1200" thumb="https://picsum.photos/id/1019/600/600" width="1200" height="1200" caption="小径" */>}}
  {{</* gallery-item src="https://picsum.photos/id/1039/1200/1200" thumb="https://picsum.photos/id/1039/600/600" width="1200" height="1200" caption="峡谷" */>}}
  {{</* gallery-item src="https://picsum.photos/id/1043/1200/1200" thumb="https://picsum.photos/id/1043/600/600" width="1200" height="1200" caption="瀑布" */>}}
  {{</* gallery-item src="https://picsum.photos/id/1059/1200/1200" thumb="https://picsum.photos/id/1059/600/600" width="1200" height="1200" caption="森林" */>}}
{{</* /gallery */>}}
```

{{< gallery type="grid" cols="3" >}}
  {{< gallery-item src="https://picsum.photos/id/1015/1200/1200" thumb="https://picsum.photos/id/1015/600/600" width="1200" height="1200" caption="河流" >}}
  {{< gallery-item src="https://picsum.photos/id/1018/1200/1200" thumb="https://picsum.photos/id/1018/600/600" width="1200" height="1200" caption="湖泊" >}}
  {{< gallery-item src="https://picsum.photos/id/1019/1200/1200" thumb="https://picsum.photos/id/1019/600/600" width="1200" height="1200" caption="小径" >}}
  {{< gallery-item src="https://picsum.photos/id/1039/1200/1200" thumb="https://picsum.photos/id/1039/600/600" width="1200" height="1200" caption="峡谷" >}}
  {{< gallery-item src="https://picsum.photos/id/1043/1200/1200" thumb="https://picsum.photos/id/1043/600/600" width="1200" height="1200" caption="瀑布" >}}
  {{< gallery-item src="https://picsum.photos/id/1059/1200/1200" thumb="https://picsum.photos/id/1059/600/600" width="1200" height="1200" caption="森林" >}}
{{< /gallery >}}

### Carousel

水平滚动的图片条，提供上一张/下一张按钮以及方向键导航：

```markdown
{{</* gallery type="carousel" */>}}
  {{</* gallery-item src="https://picsum.photos/id/1015/1600/1200" thumb="https://picsum.photos/id/1015/800/600" width="1600" height="1200" caption="河流" */>}}
  {{</* gallery-item src="https://picsum.photos/id/1018/1600/1200" thumb="https://picsum.photos/id/1018/800/600" width="1600" height="1200" caption="湖泊" */>}}
  {{</* gallery-item src="https://picsum.photos/id/1019/1600/1200" thumb="https://picsum.photos/id/1019/800/600" width="1600" height="1200" caption="小径" */>}}
  {{</* gallery-item src="https://picsum.photos/id/1039/1600/1200" thumb="https://picsum.photos/id/1039/800/600" width="1600" height="1200" caption="峡谷" */>}}
  {{</* gallery-item src="https://picsum.photos/id/1043/1600/1200" thumb="https://picsum.photos/id/1043/800/600" width="1600" height="1200" caption="瀑布" */>}}
  {{</* gallery-item src="https://picsum.photos/id/1059/1600/1200" thumb="https://picsum.photos/id/1059/800/600" width="1600" height="1200" caption="森林" */>}}
{{</* /gallery */>}}
```

{{< gallery type="carousel" >}}
  {{< gallery-item src="https://picsum.photos/id/1015/1600/1200" thumb="https://picsum.photos/id/1015/800/600" width="1600" height="1200" caption="河流" >}}
  {{< gallery-item src="https://picsum.photos/id/1018/1600/1200" thumb="https://picsum.photos/id/1018/800/600" width="1600" height="1200" caption="湖泊" >}}
  {{< gallery-item src="https://picsum.photos/id/1019/1600/1200" thumb="https://picsum.photos/id/1019/800/600" width="1600" height="1200" caption="小径" >}}
  {{< gallery-item src="https://picsum.photos/id/1039/1600/1200" thumb="https://picsum.photos/id/1039/800/600" width="1600" height="1200" caption="峡谷" >}}
  {{< gallery-item src="https://picsum.photos/id/1043/1600/1200" thumb="https://picsum.photos/id/1043/800/600" width="1600" height="1200" caption="瀑布" >}}
  {{< gallery-item src="https://picsum.photos/id/1059/1600/1200" thumb="https://picsum.photos/id/1059/800/600" width="1600" height="1200" caption="森林" >}}
{{< /gallery >}}

### Mosaic

一种 CSS 网格布局，可通过 `gallery-item` 上的 `span` 参数让单个图片跨越多列或多行。`span` 的有效取值为 `wide`（2 列）、`tall`（2 行）和 `large`（2 列 2 行）：

```markdown
{{</* gallery type="mosaic" */>}}
  {{</* gallery-item src="https://picsum.photos/id/1015/1600/900" thumb="https://picsum.photos/id/1015/1200/600" width="1600" height="900" caption="河流" span="wide" */>}}
  {{</* gallery-item src="https://picsum.photos/id/1018/800/1200" thumb="https://picsum.photos/id/1018/400/600" width="800" height="1200" caption="湖泊" span="tall" */>}}
  {{</* gallery-item src="https://picsum.photos/id/1019/800/600" thumb="https://picsum.photos/id/1019/400/300" width="800" height="600" caption="小径" */>}}
  {{</* gallery-item src="https://picsum.photos/id/1039/800/600" thumb="https://picsum.photos/id/1039/400/300" width="800" height="600" caption="峡谷" */>}}
  {{</* gallery-item src="https://picsum.photos/id/1043/1600/900" thumb="https://picsum.photos/id/1043/1200/600" width="1600" height="900" caption="瀑布" span="wide" */>}}
{{</* /gallery */>}}
```

{{< gallery type="mosaic" >}}
  {{< gallery-item src="https://picsum.photos/id/1015/1600/900" thumb="https://picsum.photos/id/1015/1200/600" width="1600" height="900" caption="河流" span="wide" >}}
  {{< gallery-item src="https://picsum.photos/id/1018/800/1200" thumb="https://picsum.photos/id/1018/400/600" width="800" height="1200" caption="湖泊" span="tall" >}}
  {{< gallery-item src="https://picsum.photos/id/1019/800/600" thumb="https://picsum.photos/id/1019/400/300" width="800" height="600" caption="小径" >}}
  {{< gallery-item src="https://picsum.photos/id/1039/800/600" thumb="https://picsum.photos/id/1039/400/300" width="800" height="600" caption="峡谷" >}}
  {{< gallery-item src="https://picsum.photos/id/1043/1600/900" thumb="https://picsum.photos/id/1043/1200/600" width="1600" height="900" caption="瀑布" span="wide" >}}
{{< /gallery >}}

### Masonry

响应式瀑布流布局。列数会根据视口宽度自动确定，因此此类型会忽略 `cols` 参数。各图片保持其自然宽高比：

```markdown
{{</* gallery type="masonry" */>}}
  {{</* gallery-item src="https://picsum.photos/id/1015/1200/800"  thumb="https://picsum.photos/id/1015/600/400"  width="1200" height="800"  caption="河流" */>}}
  {{</* gallery-item src="https://picsum.photos/id/1018/800/1200"  thumb="https://picsum.photos/id/1018/400/600"  width="800"  height="1200" caption="湖泊" */>}}
  {{</* gallery-item src="https://picsum.photos/id/1019/1200/900"  thumb="https://picsum.photos/id/1019/600/450"  width="1200" height="900"  caption="小径" */>}}
  {{</* gallery-item src="https://picsum.photos/id/1039/1000/1000" thumb="https://picsum.photos/id/1039/500/500"  width="1000" height="1000" caption="峡谷" */>}}
  {{</* gallery-item src="https://picsum.photos/id/1043/1200/800"  thumb="https://picsum.photos/id/1043/600/400"  width="1200" height="800"  caption="瀑布" */>}}
  {{</* gallery-item src="https://picsum.photos/id/1059/800/1200"  thumb="https://picsum.photos/id/1059/400/600"  width="800"  height="1200" caption="森林" */>}}
{{</* /gallery */>}}
```

{{< gallery type="masonry" >}}
  {{< gallery-item src="https://picsum.photos/id/1015/1200/800" thumb="https://picsum.photos/id/1015/600/400" width="1200" height="800" caption="河流" >}}
  {{< gallery-item src="https://picsum.photos/id/1018/800/1200" thumb="https://picsum.photos/id/1018/400/600" width="800" height="1200" caption="湖泊" >}}
  {{< gallery-item src="https://picsum.photos/id/1019/1200/900" thumb="https://picsum.photos/id/1019/600/450" width="1200" height="900" caption="小径" >}}
  {{< gallery-item src="https://picsum.photos/id/1039/1000/1000" thumb="https://picsum.photos/id/1039/500/500" width="1000" height="1000" caption="峡谷" >}}
  {{< gallery-item src="https://picsum.photos/id/1043/1200/800" thumb="https://picsum.photos/id/1043/600/400" width="1200" height="800" caption="瀑布" >}}
  {{< gallery-item src="https://picsum.photos/id/1059/800/1200" thumb="https://picsum.photos/id/1059/400/600" width="800" height="1200" caption="森林" >}}
{{< /gallery >}}

## 使用链接替代灯箱

在 `gallery-item` 上设置 `link`，点击时即会跳转到对应 URL，而不会打开灯箱：

```markdown
{{</* gallery */>}}
  {{</* gallery-item src="https://picsum.photos/id/1015/800/600" width="800" height="600" caption="访问 Picsum" link="https://picsum.photos/" */>}}
  {{</* gallery-item src="https://picsum.photos/id/1018/800/600" width="800" height="600" caption="灯箱" */>}}
{{</* /gallery */>}}
```

## 配置

默认情况下，PhotoSwipe 从 jsDelivr CDN 加载。如需使用自托管或镜像副本，请在站点配置的 `params` 下添加 `gallery` 配置块。详细信息请参见 [配置]({{< ref "/docs/guide/configuration" >}}#local-and-mirrored-script-assets) 页面。

## 参数

### `gallery`

| 参数   | 类型   | 默认值   | 说明                                                |
| ------ | ------ | -------- | --------------------------------------------------- |
| `type` | string | `grid`   | 布局类型：`grid`、`mosaic`、`masonry` 或 `carousel` |
| `cols` | number | `3`      | 列数（`masonry` 不使用此参数）                      |
| `gap`  | string | `0.5rem` | 图片之间的 CSS 间距                                 |

### `gallery-item`

| 参数      | 类型   | 默认值  | 说明                                                                                          |
| --------- | ------ | ------- | --------------------------------------------------------------------------------------------- |
| `src`     | string | -       | 图片源（必填）。支持页面资源路径、全局资源路径、静态文件路径或远程 URL                        |
| `alt`     | string | caption | 图片的替代文本                                                                                |
| `caption` | string | -       | 显示在图片下方以及灯箱中的标题                                                                |
| `link`    | string | -       | 设置后，点击时跳转到该 URL，而不会打开灯箱                                                    |
| `width`   | number | 自动    | 图片宽度（像素）。对于无法自动检测尺寸的远程 URL 是必填项                                     |
| `height`  | number | 自动    | 图片高度（像素）。对于无法自动检测尺寸的远程 URL 是必填项                                     |
| `thumb`   | string | 派生    | 在网格中显示的较小预览图。对于本地图片，默认使用 `src` 缩放后的版本                           |
| `span`    | string | -       | Mosaic 跨度提示：`wide`（2 列）、`tall`（2 行）或 `large`（2x2）。仅在 `type="mosaic"` 时生效 |
