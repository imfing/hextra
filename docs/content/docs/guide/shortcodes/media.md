---
title: "Media Player Component"
linktitle: "Media Player"
sidebar:
  exclude: true
---

## Overview

The media shortcode allows you to embed media using the [Plyr](https://plyr.io/) player in your Hugo site. It supports HTML5 video, HTML5 audio, YouTube, and Vimeo with a polished, accessible player interface.

## Basic Usage

### Local Files

Place your media files in the `static/` directory:

```
your-site/
├── static/
│   └── media/
│       ├── demo.mp4
│       └── podcast.mp3
└── content/
    └── my-page.md
```

Video:

```markdown
{{< media src="media/demo.mp4" >}}
```

Audio:

```markdown
{{< media src="media/podcast.mp3" type="audio" >}}
```

### YouTube

Embed a YouTube video using its video ID:

```markdown
{{< media src="bTqVqk7FSmY" provider="youtube" >}}
```

### Vimeo

Embed a Vimeo video using its video ID:

```markdown
{{< media src="76979871" provider="vimeo" >}}
```

## Advanced Usage

Here's an example with all available parameters:

```markdown
{{< media
  src="media/demo.mp4"
  poster="media/poster.jpg"
  autoplay="true"
  muted="true"
  loop="true"
>}}
```

## Parameters

| Parameter  | Type    | Default   | Description                                                   |
| ---------- | ------- | --------- | ------------------------------------------------------------- |
| `src`      | string  | -         | The source URL, path, or embed ID (required)                  |
| `provider` | string  | `""`      | The media provider: `"youtube"`, `"vimeo"`, or omit for HTML5 |
| `type`     | string  | `"video"` | The media type: `"video"` or `"audio"`                        |
| `autoplay` | boolean | `false`   | Start playing automatically                                   |
| `muted`    | boolean | `false`   | Mute the media                                                |
| `loop`     | boolean | `false`   | Loop the media                                                |
| `poster`   | string  | `""`      | The poster image URL (HTML5 video only)                       |

## Configuration

By default, Plyr assets are loaded from the official CDN. You can customize the asset source in your site configuration:

```yaml
params:
  plyr:
    base: "https://cdn.jsdelivr.net/npm/plyr@latest/dist"  # Custom CDN base URL
    css: "plyr.css"                    # Custom CSS file path
    js: "plyr.polyfilled.js"           # Custom JS file path
```

To use local assets, set `js` and/or `css` without `base`:

```yaml
params:
  plyr:
    css: "css/plyr.css"          # Path relative to assets/
    js: "js/plyr.polyfilled.js"  # Path relative to assets/
```
