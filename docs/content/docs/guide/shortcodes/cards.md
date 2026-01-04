---
title: Cards Component
linkTitle: Cards
---

## Example

{{< cards >}}
{{< card link="../callout" title="Callout" icon="warning" >}}
{{< card link="../callout" title="Card with tag" icon="tag" tag="custom tag">}}
{{< card link="/" title="No Icon" >}}
{{< /cards >}}

{{< cards >}}
{{< card link="/" title="Image Card" image="https://github.com/user-attachments/assets/71b7e3ec-1a8d-4582-b600-5425c6cc0407" subtitle="Internet Image" >}}
{{< card link="/" title="Local Image" image="/images/card-image-unprocessed.jpg" subtitle="Raw image under static directory." >}}
{{< card link="/" title="Local Image" image="images/space.jpg" subtitle="Image under assets directory, processed by Hugo." method="Resize" options="600x q80 webp" >}}
{{< /cards >}}

## Usage

```
{{</* cards */>}}
  {{</* card link="../callout" title="Callout" icon="warning" */>}}
  {{</* card link="../callout" title="Card with tag" icon="tag" tag= "A custom tag" */>}}
  {{</* card link="/" title="No Icon" */>}}
{{</* /cards */>}}
```

```
{{</* cards */>}}
  {{</* card link="/" title="Image Card" image="https://source.unsplash.com/featured/800x600?landscape" subtitle="Unsplash Landscape" */>}}
  {{</* card link="/" title="Local Image" image="/images/card-image-unprocessed.jpg" subtitle="Raw image under static directory." */>}}
  {{</* card link="/" title="Local Image" image="images/space.jpg" subtitle="Image under assets directory, processed by Hugo." method="Resize" options="600x q80 webp" */>}}
  {{</* card link="/" title="Custom Alt Text" image="images/space.jpg" alt="A beautiful view of space with stars and galaxies" subtitle="Image with custom alt text for accessibility." */>}}
{{</* /cards */>}}
```

## Card Parameters

| Parameter  | Description                                                                |
| ---------- | -------------------------------------------------------------------------- |
| `link`     | URL (internal or external).                                                |
| `title`    | Title heading for the card.                                                |
| `subtitle` | Subtitle heading (supports Markdown).                                      |
| `icon`     | Name of the icon. See [icons]({{% relRef "icon" %}}) for more information. |

## Image Card

Additionally, the card supports adding image and processing through these parameters:

| Parameter    | Description                                                         |
| ------------ | ------------------------------------------------------------------- |
| `image`      | Specifies the image URL for the card.                               |
| `alt`        | Alternative text for the image (defaults to title if not provided). |
| `method`     | Sets Hugo's image processing method.                                |
| `options`    | Configures Hugo's image processing options.                         |
| `imageStyle` | Used to fill the style attribute of the image tag.                  |

Card supports three kinds of images:

1. Remote image: the full URL in the `image` parameter.
2. Static image: use the relative path in Hugo's `static/` directory.
3. Processed image: use the relative path in Hugo's `assets/` directory.

Hextra auto-detects if image processing is needed during build and applies the `options` parameter or default settings (Resize, 800x, Quality 80, WebP Format).
It currently supports these `method`: `Resize`, `Fit`, `Fill` and `Crop`.

For more on Hugo's built in image processing commands, methods, and options see their [Image Processing Documentation](https://gohugo.io/content-management/image-processing/).

## Tags

Card supports adding tags which could be useful to show extra status information.

| Parameter   | Description                                                                            |
| ----------- | -------------------------------------------------------------------------------------- |
| `tag`       | Text in tag.                                                                           |
| `tagColor`  | Color of the tag. See [badges]({{% relRef "others/#badges" %}}) for more information.  |
| `tagIcon`   | Icon of the tag. See [badges]({{% relRef "others/#badges" %}}) for more information.   |
| `tagBorder` | Border of the tag. See [badges]({{% relRef "others/#badges" %}}) for more information. |

{{< cards >}}
{{< card link="../callout" title="Card with default tag" tag="tag text" >}}
{{< card link="../callout" title="Card with red tag" tag="tag text" tagColor="red" >}}
{{< card link="../callout" title="Card with blue tag" tag="tag text" tagColor="blue" >}}
{{< card link="../callout" title="Card with yellow tag" tag="tag text" tagColor="yellow" tagIcon="sparkles" tagBorder=false >}}
{{< card link="/" title="Image Card" image="/images/card-image-unprocessed.jpg" subtitle="Image" tag="tag text" tagColor="green" >}}
{{< card link="/" title="Image Card" image="images/space.jpg" subtitle="Image" tag="tag text" tagColor="purple" tagIcon="sparkles" tagBorder=false >}}
{{< /cards >}}

```
{{</* cards */>}}
  {{</* card link="../callout" title="Card with default tag color" tag="tag text" */>}}
  {{</* card link="../callout" title="Card with red tag" tag="tag text" tagColor="red" */>}}
  {{</* card link="../callout" title="Card with blue tag" tag="tag text" tagColor="blue" */>}}
  {{</* card link="../callout" title="Card with yellow tag" tag="tag text" tagColor="yellow" tagIcon="sparkles" tagBorder=false */>}}
  {{</* card link="/" title="Image Card" image="/images/card-image-unprocessed.jpg" subtitle="Image" tag="tag text" tagColor="green" */>}}
  {{</* card link="/" title="Image Card" image="images/space.jpg" subtitle="Image" tag="tag text" tagColor="purple" tagIcon="sparkles" tagBorder=false */>}}
{{</* /cards */>}}
```

## Columns

You can specify the maximum number of columns for cards to span by passing the `cols` parameter to the `cards` shortcode. Note that columns will still be collapsed on smaller screens.

{{< cards cols="1" >}}
{{< card link="/" title="Top Card" >}}
{{< card link="/" title="Bottom Card" >}}
{{< /cards >}}

{{< cards cols="2" >}}
{{< card link="/" title="Left Card" >}}
{{< card link="/" title="Right Card" >}}
{{< /cards >}}

```
{{</* cards cols="1" */>}}
  {{</* card link="/" title="Top Card" */>}}
  {{</* card link="/" title="Bottom Card" */>}}
{{</* /cards */>}}

{{</* cards cols="2" */>}}
  {{</* card link="/" title="Left Card" */>}}
  {{</* card link="/" title="Right Card" */>}}
{{</* /cards */>}}
```
