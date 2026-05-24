---
title: "Gallery"
linktitle: "Gallery"
sidebar:
  exclude: true
---

## Overview

The `gallery` shortcode displays a collection of images with an interactive [PhotoSwipe v5](https://photoswipe.com/) lightbox. Click any image to open a full-screen viewer with previous/next navigation, captions, and keyboard support.

## Basic Usage

Wrap one or more `{{</* gallery-item */>}}` shortcodes inside `{{</* gallery */>}}`. Local and remote images can be mixed in the same gallery:

```markdown
{{</* gallery */>}}
  {{</* gallery-item src="images/space.jpg" caption="Space" */>}}
  {{</* gallery-item src="https://picsum.photos/id/1015/1600/1200" thumb="https://picsum.photos/id/1015/800/600" width="1600" height="1200" caption="River valley" */>}}
  {{</* gallery-item src="https://picsum.photos/id/1018/1600/1200" thumb="https://picsum.photos/id/1018/800/600" width="1600" height="1200" caption="Mountain lake" */>}}
{{</* /gallery */>}}
```

{{< gallery >}}
  {{< gallery-item src="images/space.jpg" caption="Space" >}}
  {{< gallery-item src="https://picsum.photos/id/1015/1600/1200" thumb="https://picsum.photos/id/1015/800/600" width="1600" height="1200" caption="River valley" >}}
  {{< gallery-item src="https://picsum.photos/id/1018/1600/1200" thumb="https://picsum.photos/id/1018/800/600" width="1600" height="1200" caption="Mountain lake" >}}
{{< /gallery >}}

## Image Sources

Images can come from several locations. The shortcode resolves `src` in the following order:

1. **Page bundle resources**: files placed alongside `index.md` in a [leaf bundle](https://gohugo.io/content-management/page-bundles/).
2. **Global assets**: files inside your site's `assets/` directory.
3. **Static files**: files inside your site's `static/` directory (referenced with a leading `/`).
4. **Remote URLs**: any `src` that begins with `http://` or `https://`.

For local images, dimensions are detected automatically. For remote images, supply `width` and `height` so the lightbox can reserve space before the image loads:

```markdown
{{</* gallery-item
  src="https://picsum.photos/id/1043/1920/1280"
  width="1920"
  height="1280"
  caption="Photo from picsum.photos"
*/>}}
```

The optional `thumb` parameter points at a smaller image used in the in-page grid; PhotoSwipe still opens the full-resolution `src` when the user clicks.

## Layout Types

The `type` parameter selects the layout algorithm. The default is `grid`.

### Grid (default)

A uniform grid where every cell has the same size. Use `cols` to control how many columns appear:

```markdown
{{</* gallery type="grid" cols="3" */>}}
  {{</* gallery-item src="https://picsum.photos/id/1015/1200/1200" thumb="https://picsum.photos/id/1015/600/600" width="1200" height="1200" caption="River" */>}}
  {{</* gallery-item src="https://picsum.photos/id/1018/1200/1200" thumb="https://picsum.photos/id/1018/600/600" width="1200" height="1200" caption="Lake" */>}}
  {{</* gallery-item src="https://picsum.photos/id/1019/1200/1200" thumb="https://picsum.photos/id/1019/600/600" width="1200" height="1200" caption="Trail" */>}}
  {{</* gallery-item src="https://picsum.photos/id/1039/1200/1200" thumb="https://picsum.photos/id/1039/600/600" width="1200" height="1200" caption="Canyon" */>}}
  {{</* gallery-item src="https://picsum.photos/id/1043/1200/1200" thumb="https://picsum.photos/id/1043/600/600" width="1200" height="1200" caption="Waterfall" */>}}
  {{</* gallery-item src="https://picsum.photos/id/1059/1200/1200" thumb="https://picsum.photos/id/1059/600/600" width="1200" height="1200" caption="Forest" */>}}
{{</* /gallery */>}}
```

{{< gallery type="grid" cols="3" >}}
  {{< gallery-item src="https://picsum.photos/id/1015/1200/1200" thumb="https://picsum.photos/id/1015/600/600" width="1200" height="1200" caption="River" >}}
  {{< gallery-item src="https://picsum.photos/id/1018/1200/1200" thumb="https://picsum.photos/id/1018/600/600" width="1200" height="1200" caption="Lake" >}}
  {{< gallery-item src="https://picsum.photos/id/1019/1200/1200" thumb="https://picsum.photos/id/1019/600/600" width="1200" height="1200" caption="Trail" >}}
  {{< gallery-item src="https://picsum.photos/id/1039/1200/1200" thumb="https://picsum.photos/id/1039/600/600" width="1200" height="1200" caption="Canyon" >}}
  {{< gallery-item src="https://picsum.photos/id/1043/1200/1200" thumb="https://picsum.photos/id/1043/600/600" width="1200" height="1200" caption="Waterfall" >}}
  {{< gallery-item src="https://picsum.photos/id/1059/1200/1200" thumb="https://picsum.photos/id/1059/600/600" width="1200" height="1200" caption="Forest" >}}
{{< /gallery >}}

### Carousel

A horizontally scrollable strip of images with previous/next controls and arrow-key navigation:

```markdown
{{</* gallery type="carousel" */>}}
  {{</* gallery-item src="https://picsum.photos/id/1015/1600/1200" thumb="https://picsum.photos/id/1015/800/600" width="1600" height="1200" caption="River" */>}}
  {{</* gallery-item src="https://picsum.photos/id/1018/1600/1200" thumb="https://picsum.photos/id/1018/800/600" width="1600" height="1200" caption="Lake" */>}}
  {{</* gallery-item src="https://picsum.photos/id/1019/1600/1200" thumb="https://picsum.photos/id/1019/800/600" width="1600" height="1200" caption="Trail" */>}}
  {{</* gallery-item src="https://picsum.photos/id/1039/1600/1200" thumb="https://picsum.photos/id/1039/800/600" width="1600" height="1200" caption="Canyon" */>}}
  {{</* gallery-item src="https://picsum.photos/id/1043/1600/1200" thumb="https://picsum.photos/id/1043/800/600" width="1600" height="1200" caption="Waterfall" */>}}
  {{</* gallery-item src="https://picsum.photos/id/1059/1600/1200" thumb="https://picsum.photos/id/1059/800/600" width="1600" height="1200" caption="Forest" */>}}
{{</* /gallery */>}}
```

{{< gallery type="carousel" >}}
  {{< gallery-item src="https://picsum.photos/id/1015/1600/1200" thumb="https://picsum.photos/id/1015/800/600" width="1600" height="1200" caption="River" >}}
  {{< gallery-item src="https://picsum.photos/id/1018/1600/1200" thumb="https://picsum.photos/id/1018/800/600" width="1600" height="1200" caption="Lake" >}}
  {{< gallery-item src="https://picsum.photos/id/1019/1600/1200" thumb="https://picsum.photos/id/1019/800/600" width="1600" height="1200" caption="Trail" >}}
  {{< gallery-item src="https://picsum.photos/id/1039/1600/1200" thumb="https://picsum.photos/id/1039/800/600" width="1600" height="1200" caption="Canyon" >}}
  {{< gallery-item src="https://picsum.photos/id/1043/1600/1200" thumb="https://picsum.photos/id/1043/800/600" width="1600" height="1200" caption="Waterfall" >}}
  {{< gallery-item src="https://picsum.photos/id/1059/1600/1200" thumb="https://picsum.photos/id/1059/800/600" width="1600" height="1200" caption="Forest" >}}
{{< /gallery >}}

### Mosaic

A CSS grid layout where individual items can span multiple columns or rows using the `span` parameter on `gallery-item`. Valid `span` values are `wide` (2 columns), `tall` (2 rows), and `large` (2 columns and 2 rows):

```markdown
{{</* gallery type="mosaic" */>}}
  {{</* gallery-item src="https://picsum.photos/id/1015/1600/900" thumb="https://picsum.photos/id/1015/1200/600" width="1600" height="900" caption="River" span="wide" */>}}
  {{</* gallery-item src="https://picsum.photos/id/1018/800/1200" thumb="https://picsum.photos/id/1018/400/600" width="800" height="1200" caption="Lake" span="tall" */>}}
  {{</* gallery-item src="https://picsum.photos/id/1019/800/600" thumb="https://picsum.photos/id/1019/400/300" width="800" height="600" caption="Trail" */>}}
  {{</* gallery-item src="https://picsum.photos/id/1039/800/600" thumb="https://picsum.photos/id/1039/400/300" width="800" height="600" caption="Canyon" */>}}
  {{</* gallery-item src="https://picsum.photos/id/1043/1600/900" thumb="https://picsum.photos/id/1043/1200/600" width="1600" height="900" caption="Waterfall" span="wide" */>}}
{{</* /gallery */>}}
```

{{< gallery type="mosaic" >}}
  {{< gallery-item src="https://picsum.photos/id/1015/1600/900" thumb="https://picsum.photos/id/1015/1200/600" width="1600" height="900" caption="River" span="wide" >}}
  {{< gallery-item src="https://picsum.photos/id/1018/800/1200" thumb="https://picsum.photos/id/1018/400/600" width="800" height="1200" caption="Lake" span="tall" >}}
  {{< gallery-item src="https://picsum.photos/id/1019/800/600" thumb="https://picsum.photos/id/1019/400/300" width="800" height="600" caption="Trail" >}}
  {{< gallery-item src="https://picsum.photos/id/1039/800/600" thumb="https://picsum.photos/id/1039/400/300" width="800" height="600" caption="Canyon" >}}
  {{< gallery-item src="https://picsum.photos/id/1043/1600/900" thumb="https://picsum.photos/id/1043/1200/600" width="1600" height="900" caption="Waterfall" span="wide" >}}
{{< /gallery >}}

### Masonry

A responsive masonry layout. Columns are determined automatically based on the viewport width, so the `cols` parameter is ignored for this type. Items keep their natural aspect ratio:

```markdown
{{</* gallery type="masonry" */>}}
  {{</* gallery-item src="https://picsum.photos/id/1015/1200/800"  thumb="https://picsum.photos/id/1015/600/400"  width="1200" height="800"  caption="River" */>}}
  {{</* gallery-item src="https://picsum.photos/id/1018/800/1200"  thumb="https://picsum.photos/id/1018/400/600"  width="800"  height="1200" caption="Lake" */>}}
  {{</* gallery-item src="https://picsum.photos/id/1019/1200/900"  thumb="https://picsum.photos/id/1019/600/450"  width="1200" height="900"  caption="Trail" */>}}
  {{</* gallery-item src="https://picsum.photos/id/1039/1000/1000" thumb="https://picsum.photos/id/1039/500/500"  width="1000" height="1000" caption="Canyon" */>}}
  {{</* gallery-item src="https://picsum.photos/id/1043/1200/800"  thumb="https://picsum.photos/id/1043/600/400"  width="1200" height="800"  caption="Waterfall" */>}}
  {{</* gallery-item src="https://picsum.photos/id/1059/800/1200"  thumb="https://picsum.photos/id/1059/400/600"  width="800"  height="1200" caption="Forest" */>}}
{{</* /gallery */>}}
```

{{< gallery type="masonry" >}}
  {{< gallery-item src="https://picsum.photos/id/1015/1200/800" thumb="https://picsum.photos/id/1015/600/400" width="1200" height="800" caption="River" >}}
  {{< gallery-item src="https://picsum.photos/id/1018/800/1200" thumb="https://picsum.photos/id/1018/400/600" width="800" height="1200" caption="Lake" >}}
  {{< gallery-item src="https://picsum.photos/id/1019/1200/900" thumb="https://picsum.photos/id/1019/600/450" width="1200" height="900" caption="Trail" >}}
  {{< gallery-item src="https://picsum.photos/id/1039/1000/1000" thumb="https://picsum.photos/id/1039/500/500" width="1000" height="1000" caption="Canyon" >}}
  {{< gallery-item src="https://picsum.photos/id/1043/1200/800" thumb="https://picsum.photos/id/1043/600/400" width="1200" height="800" caption="Waterfall" >}}
  {{< gallery-item src="https://picsum.photos/id/1059/800/1200" thumb="https://picsum.photos/id/1059/400/600" width="800" height="1200" caption="Forest" >}}
{{< /gallery >}}

## Linking Instead of Lightbox

Set `link` on a `gallery-item` to navigate to a URL on click instead of opening the lightbox:

```markdown
{{</* gallery */>}}
  {{</* gallery-item src="https://picsum.photos/id/1015/800/600" width="800" height="600" caption="Picsum on the web" link="https://picsum.photos/" */>}}
  {{</* gallery-item src="https://picsum.photos/id/1018/800/600" width="800" height="600" caption="Lightbox" */>}}
{{</* /gallery */>}}
```

## Configuration

By default, PhotoSwipe is loaded from the jsDelivr CDN. To use a self-hosted or mirrored copy, add a `gallery` block to `params` in your site configuration. See the [Configuration]({{< ref "/docs/guide/configuration" >}}#local-and-mirrored-script-assets) page for details.

## Parameters

### `gallery`

| Parameter | Type   | Default  | Description                                             |
| --------- | ------ | -------- | ------------------------------------------------------- |
| `type`    | string | `grid`   | Layout type: `grid`, `mosaic`, `masonry`, or `carousel` |
| `cols`    | number | `3`      | Number of columns (not used by `masonry`)               |
| `gap`     | string | `0.5rem` | CSS gap between items                                   |

### `gallery-item`

| Parameter | Type   | Default | Description                                                                                                     |
| --------- | ------ | ------- | --------------------------------------------------------------------------------------------------------------- |
| `src`     | string | -       | Image source (required). Accepts a page resource path, a global asset path, a static-file path, or a remote URL |
| `alt`     | string | caption | Alt text for the image                                                                                          |
| `caption` | string | -       | Caption shown beneath the image and inside the lightbox                                                         |
| `link`    | string | -       | If set, clicking navigates to this URL instead of opening the lightbox                                          |
| `width`   | number | auto    | Image width in pixels. Required for remote URLs where dimensions cannot be auto-detected                        |
| `height`  | number | auto    | Image height in pixels. Required for remote URLs where dimensions cannot be auto-detected                       |
| `thumb`   | string | derived | Smaller preview image shown in the grid. Defaults to a resized version of `src` for local images                |
| `span`    | string | -       | Mosaic span hint: `wide` (2 columns), `tall` (2 rows), or `large` (2x2). Only applies when `type="mosaic"`      |
