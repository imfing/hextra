---
title: Cards Component
linkTitle: Cards
---

## Example

{{< cards >}}
  {{< card link="../callout" title="Callout" icon="warning" >}}
  {{< card link="/" title="No Icon" >}}
{{< /cards >}}

{{< cards >}}
  {{< card link="/" title="Image Card" image="https://source.unsplash.com/featured/800x600?landscape" subtitle="Unsplash Landscape" >}}
  {{< card link="/" title="Local Image" image="/images/space.jpg" subtitle="This is a local image on the server, processed by Hugo." method="Resize" options="600x q80 webp" >}}
  {{< card link="/" title="Local Image" image="/images/card-image-unprocessed.jpg" subtitle="This is a local image on the server, *not* processed by Hugo." >}}
{{< /cards >}}


## Usage

```
{{</* cards */>}}
  {{</* card link="../callout" title="Callout" icon="warning" */>}}
  {{</* card link="/" title="No Icon" */>}}
{{</* /cards */>}}
```

```
{{</* cards */>}}
  {{</* card link="/" title="Image Card" image="https://source.unsplash.com/featured/800x600?landscape" subtitle="Unsplash Landscape" */>}}
  {{</* card link="/" title="Local Image" image="/images/astronaut.jpg" subtitle="This is a local image on the server, processed by Hugo." method="Resize" options="600x q80 webp" */>}}
  {{</* card link="/" title="Local Image" image="/images/card-image-unprocessed.jpg" subtitle="This is a local image on the server, *not* processed by Hugo." */>}}
{{</* /cards */>}}
```

## Card Parameters

| Parameter  | Description                                              |
|----------- |--------------------------------------------------------- |
| `link`     | URL for the page the card links to.                      |
| `title`    | Large title heading for the card.                        |
| `subtitle` | Small subtitle heading for the card (supports Markdown). |
| `image`    | Source for card image.                                   |
| `icon`     | Name of the icon for the card.                           |
| `method`   | Image processing method for Hugo.                        |
| `options`  | Image processing options for Hugo.                       |

Image cards support images in three ways: 

1. Remote image: the full URL in the `image` parameter.
2. Static image: use the relative path in Hugo's `static/` directory.
3. Processed image: use the relative path in Hugo's `assets/` directory.

Hextra auto-detects if image processing is needed during build and applies the `options` parameter or default settings (Resize, 800x, Quality 80, WebP Format).
It currently supports these `method`: `Resize`, `Fit`, `Fill` and `Crop`.

For more on Hugo's built in image processing commands, methods, and options see their [Image Processing Documentation](https://gohugo.io/content-management/image-processing/).
