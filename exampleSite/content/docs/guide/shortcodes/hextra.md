---
title: Hextra Shortcodes
linkTitle: Hextra
sidebar:
  exclude: true
next: /docs/guide/deploy-site
---

The main usage of these shortcodes are within the layout `hextra-home`.

## `hextra/feature-card`

A shortcode for displaying a feature card.

### Usage

```
{{</* hextra/feature-card title="Title" subtitle="Subtitle" */>}}
```

### Options

| Parameter    | Description               |
|--------------|---------------------------|
| `title`      | The title of the card.    |
| `subtitle`   | The subtitle of the card. |
| `class`      | The class of the card.    |
| `image`      | The image of the card.    |
| `imageClass` | The class of the image.   |
| `style`      | The style of the card.    |
| `icon`       | The icon of the card.     |
| `link`       | The link of the card.     |

## `hextra/feature-grid`

A shortcode for displaying a feature grid.

### Usage

```
{{</* hextra/feature-grid cols="3" */>}}
  {{</* hextra/feature-card title="One" */>}}
  {{</* hextra/feature-card title="Two" */>}}
  {{</* hextra/feature-card title="Three" */>}}
{{</* /hextra/feature-grid */>}}
```

### Options

| Parameter | Description            |
|-----------|------------------------|
| `cols`    | The number of columns. |
| `style`   | The style of the grid. |

## `hextra/hero-badge`

A shortcode for rendering a badge with a link.

### Usage

```
{{</* hextra/hero-badge */>}}
  <div class="hx:w-2 hx:h-2 hx:rounded-full hx:bg-primary-400"></div>
  <span>Free, open source</span>
  {{</* icon name="arrow-circle-right" attributes="height=14" */>}}
{{</* /hextra/hero-badge */>}}
```

### Options

| Parameter | Description             |
|-----------|-------------------------|
| `link`    | The link of the badge.  |
| `class`   | The class of the badge. |
| `style`   | The style of the badge. |

## `hextra/hero-button`

A shortcode for rendering a button with a link.

### Usage

```
{{</* hextra/hero-button text="Get Started" link="/docs" */>}}
```

### Options

| Parameter | Description              |
|-----------|--------------------------|
| `link`    | The link of the button.  |
| `text`    | The text of the button.  |
| `style`   | The style of the button. |

## `hextra/hero-container`

A simple hero container with an image on the left side.

### Usage

```
{{</* hextra/hero-container image="images/logo.svg"  imageTitle="title" */>}}
    Content
{{</* /hextra/hero-container */>}}
```

### Options

| Parameter     | Description                                                |
|---------------|------------------------------------------------------------|
| `class`       | The class of the container.                                |
| `cols`        | The number of columns (default: `2`).                      |
| `image`       | The image of the container.                                |
| `imageCard`   | Whether to display the image as a card (default: `false`). |
| `imageClass`  | The class of the image.                                    |
| `imageLink`   | The link of the image.                                     |
| `imageStyle`  | The style of the image.                                    |
| `imageTitle`  | The title of the image.                                    |
| `imageWidth`  | The width of the image (default: `350`).                   |
| `imageHeight` | The height of the image (default: `350`).                  |
| `style`       | The style of the container.                                |

## `hextra/hero-headline`

A shortcode for displaying a hero headline.

### Usage

```
{{</* hextra/hero-headline */>}}
  Build modern websites&nbsp;<br class="hx:sm:block hx:hidden" />with Markdown and Hugo
{{</* /hextra/hero-headline */>}}
```

### Options

| Parameter | Description                |
|-----------|----------------------------|
| `style`   | The style of the headline. |

## `hextra/hero-section`

A simple hero section with a heading and optional style.

### Usage

```
{{</* hextra/hero-section heading="h3" */>}}Title{{</* /hextra/hero-section */>}}>
```

### Options

| Parameter | Description                        |
|-----------|------------------------------------|
| `heading` | The heading level (default: `h2`). |
| `style`   | The style of the heading.          |
| `content` | The content of the heading.        |

## `hextra/hero-subtitle`

A shortcode for displaying a hero subtitle.

### Usage

```
{{</* hextra/hero-subtitle */>}}
  Fast, batteries-included Hugo theme&nbsp;<br class="hx:sm:block hx:hidden" />for creating beautiful static websites
{{</* /hextra/hero-subtitle */>}}
```

### Options

| Parameter | Description                |
|-----------|----------------------------|
| `style`   | The style of the subtitle. |
