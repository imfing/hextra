---
title: Experimental Cards Component
linkTitle: Experimental
sidebar:
  exclude: true
---

## Example

{{< experimental/cards >}}
  {{< experimental/card link="../callout" >}}
    {{< experimental/card/title title="Callout" icon="warning" >}}
    {{< youtube id=dQw4w9WgXcQ loading=lazy >}}
  {{< /experimental/card >}}
  {{< experimental/card link="../callout" >}}
    {{< experimental/card/title title="Card with tag" icon="tag" tag="custom tag" >}}
  {{< /experimental/card >}}
  {{< experimental/card link="/" >}}
    {{< experimental/card/title "No Icon" >}}
  {{< /experimental/card >}}
  {{< experimental/card >}}
    {{< experimental/card/title "Without link" >}}
  {{< /experimental/card >}}
  {{< experimental/card >}}
    {{< experimental/card/title "With Buttons" >}}
    {{< experimental/card/buttons >}}
        {{< experimental/card/button label="Button 1" link="#tags" >}}
        {{< experimental/card/button label="Button 2" icon="globe-alt" link="#image-card" >}}
        {{< experimental/card/button icon="sparkles" >}}
    {{< /experimental/card/buttons >}}
  {{< /experimental/card >}}
  {{< experimental/card >}}
    {{< youtube id=dQw4w9WgXcQ loading=lazy >}}
    {{< experimental/card/title title="With subtitle" subtitle="Subtitle" >}}
    {{< experimental/card/buttons >}}
        {{< experimental/card/button label="Button 1" link="#tags" >}}
        {{< experimental/card/button label="Button 2" icon="globe-alt" link="#image-card" >}}
        {{< experimental/card/button icon="sparkles" >}}
    {{< /experimental/card/buttons >}}
  {{< /experimental/card >}}
{{< /experimental/cards >}}

{{< experimental/cards >}}
  {{< experimental/card link="/" >}}
    {{< experimental/card/title title="Image Card" subtitle="Internet Image" >}}
    {{< experimental/card/image src="https://github.com/user-attachments/assets/71b7e3ec-1a8d-4582-b600-5425c6cc0407" alt="Internet Image" >}}
  {{< /experimental/card >}}
  {{< experimental/card link="/" >}}
    {{< experimental/card/image src="/images/card-image-unprocessed.jpg" >}}
    {{< experimental/card/title title="Local Image" subtitle="Raw image under static directory." >}}
  {{< /experimental/card >}}
  {{< experimental/card >}}
  {{< experimental/card/image src="images/space.jpg" method="Resize" options="600x q80 webp" >}}
  {{< experimental/card/title subtitle="Without title" >}}
    {{< experimental/card/buttons >}}
      {{< experimental/card/button icon="github" >}}
      {{< experimental/card/button icon="globe-alt" >}}
      {{< experimental/card/button icon="sparkles" >}}
      {{< experimental/card/button icon="at-symbol" >}}
      {{< experimental/card/button icon="bell" >}}
      {{< experimental/card/button icon="beaker" >}}
    {{< /experimental/card/buttons >}}
  {{< /experimental/card >}}
  {{< experimental/card >}}
    {{< experimental/card/image src="images/space.jpg" method="Resize" options="600x q80 webp" >}}
    {{< experimental/card/title title="Without subtitle" >}}
    {{< experimental/card/buttons >}}
      {{< experimental/card/button icon="github" >}}
      {{< experimental/card/button icon="globe-alt" >}}
      {{< experimental/card/button icon="sparkles" >}}
      {{< experimental/card/button icon="at-symbol" >}}
      {{< experimental/card/button icon="bell" >}}
      {{< experimental/card/button icon="beaker" >}}
    {{< /experimental/card/buttons >}}
  {{< /experimental/card >}}
  {{< experimental/card >}}
    {{< experimental/card/image alt="Local Image" src="images/space.jpg"  method="Resize" options="600x q80 webp" >}}
    {{< experimental/card/title title="Local Image" subtitle="Without link" >}}
    {{< experimental/card/buttons >}}
        {{< experimental/card/button icon="github" >}}
        {{< experimental/card/button icon="globe-alt" >}}
        {{< experimental/card/button icon="sparkles" >}}
        {{< experimental/card/button icon="at-symbol" >}}
        {{< experimental/card/button icon="bell" >}}
        {{< experimental/card/button icon="beaker" >}}
    {{< /experimental/card/buttons >}}
  {{< /experimental/card >}}
{{< /experimental/cards >}}

## Usage

```
TODO
```

```
TODO
```

## Card Parameters

| Parameter   | Description                                                                            |
|-------------|----------------------------------------------------------------------------------------|
| `link`      | URL (internal or external).                                                            |
| `title`     | Title heading for the card.                                                            |
| `subtitle`  | Subtitle heading (supports Markdown).                                                  |
| `icon`      | Name of the icon. See [icons]({{% relRef "icon" %}}) for more information.             |

## Image Card

Additionally, the card supports adding image and processing through these parameters:

| Parameter    | Description                                        |
|--------------|----------------------------------------------------|
| `image`      | Specifies the image URL for the card.              |
| `method`     | Sets Hugo's image processing method.               |
| `options`    | Configures Hugo's image processing options.        |
| `imageStyle` | Used to fill the style attribute of the image tag. |

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
|-------------|----------------------------------------------------------------------------------------|
| `tag`       | Text in tag.                                                                           |
| `tagColor`  | Color of the tag. See [badges]({{% relRef "others/#badges" %}}) for more information.  |
| `tagIcon`   | Icon of the tag. See [badges]({{% relRef "others/#badges" %}}) for more information.   |
| `tagBorder` | Border of the tag. See [badges]({{% relRef "others/#badges" %}}) for more information. |

{{< experimental/cards >}}
  {{< experimental/card link="../callout" >}}
    {{< experimental/card/title "Card with default tag" >}}
    {{< experimental/card/badge content="tag text" >}}
  {{< /experimental/card >}}
  {{< experimental/card link="../callout">}}
    {{< experimental/card/title "Card with red tag" >}}
    {{< experimental/card/badge content="tag text" color="red" >}}
  {{< /experimental/card >}}
  {{< experimental/card link="../callout" >}}
    {{< experimental/card/title "Card with blue tag" >}}
    {{< experimental/card/badge content="tag text" color="blue" >}}
  {{< /experimental/card >}}
  {{< experimental/card link="../callout" >}}
    {{< experimental/card/title "Card with yellow tag" >}}
    {{< experimental/card/badge content="tag text" color="yellow" icon="sparkles" border=false >}}
  {{< /experimental/card >}}
  {{< experimental/card link="/" >}}
    {{< experimental/card/image src="/images/card-image-unprocessed.jpg" >}}
    {{< experimental/card/title title="Image Card" subtitle="Image" >}}
    {{< experimental/card/badge content="tag text" color="green" >}}
  {{< /experimental/card >}}
  {{< experimental/card link="/" >}}
    {{< experimental/card/image src="images/space.jpg" >}}
    {{< experimental/card/title title="Image Card" subtitle="Image" >}}
    {{< experimental/card/badge content="tag text" color="purple" icon="sparkles" border=false  >}}
  {{< /experimental/card >}}
{{< /experimental/cards >}}

```
TODO
```

## Columns

You can specify the maximum number of columns for cards to span by passing the `cols` parameter to the `cards` shortcode. Note that columns will still be collapsed on smaller screens.

{{< experimental/cards cols="1" >}}
  {{< experimental/card link="/" >}}
    {{< experimental/card/title "Top Card" >}}
  {{< /experimental/card >}}
  {{< experimental/card link="/" >}}
    {{< experimental/card/title title="Bottom Card" >}}
  {{< /experimental/card >}}
{{< /experimental/cards >}}

{{< experimental/cards cols="2" >}}
  {{< experimental/card link="/" >}}
    {{< experimental/card/title title="Left Card" >}}
  {{< /experimental/card >}}
  {{< experimental/card link="/" >}}
    {{< experimental/card/title title="Right Card" >}}
  {{< /experimental/card >}}
{{< /experimental/cards >}}

```
TODO
```

