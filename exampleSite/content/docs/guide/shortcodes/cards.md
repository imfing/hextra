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
  {{< card link="/" title="Local Image" image="/images/astronaut.jpg" subtitle="This is a local image on the server, processed by Hugo." method="crop" options="1200x900 middle q80 webp" >}}
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
  {{</* card link="/" title="Local Image" image="/images/astronaut.jpg" subtitle="This is a local image on the server, processed by Hugo." method="crop" options="1200x900 middle q80 webp */>}}
  {{</* card link="/" title="Local Image" image="/images/card-image-unprocessed.jpg" subtitle="This is a local image on the server, *not* processed by Hugo." */>}}
{{</* /cards */>}}
```
Image cards support images in three ways: 

1. **Remote Image Sources** 
2. **Static Images**
3. **Processed Images**

To use a remote image, simply enter the full URL in the `image` parameter.

To use a static, non-processed image enter the *relative url* of the image, and store it in the `/static/` folder.

To process an image, enter the *relative url* of the image, and store it in the `assets` folder.

Hextra will automatically determine during build if the image needs to be processed or not, and then process it according to the `options` parameter. If no `options` are set, Hextra will use default options.

The default options are:
* Resize
* 800x
* Quality 80
* WebP Format

## Card Parameters

| Parameter  | Description                                              |
|----------- |--------------------------------------------------------- |
| `link`     | URL for the page the card links to.                      |
| `title`    | Large title heading for the card.                        |
| `subtitle` | Small subtitle heading for the card (supports markdown). |
| `image`    | Source for card image.                                   |
| `icon`     | Name of the icon for icon-cards.                         |
| `method`   | Image processing method for Hugo.                        |
| `options`  | Image processing options for Hugo                        |

For more on Hugo's built in image processing commands, methods, and options see their [Image Processing Documentation](https://gohugo.io/content-management/image-processing/).

***Please Note**: At this time the `.Filter` option is unavailable for image processing.*