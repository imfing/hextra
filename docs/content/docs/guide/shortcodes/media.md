---
title: "Media Player Component"
linktitle: "Media Player"
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
{{</* media src="media/demo.mp4" */>}}
```

Audio:

```markdown
{{</* media src="media/podcast.mp3" type="audio" */>}}
```

### YouTube

Embed a YouTube video using its video ID:

```markdown
{{</* media src="dQw4w9WgXcQ" provider="youtube" */>}}
```

Result:

{{< media src="dQw4w9WgXcQ" provider="youtube" >}}

### Vimeo

Embed a Vimeo video using its video ID:

```markdown
{{</* media src="76979871" provider="vimeo" */>}}
```

## Advanced Usage

Here's an example with all available parameters:

```markdown
{{</* media
  src="media/demo.mp4"
  autoplay="true"
  controls="true"
  crossorigin="anonymous"
  loop="true"
  muted="true"
  playsinline="true"
  preload="auto"
*/>}}
```

## Parameters

| Parameter     | Type    | Default    | Description                                                   |
| ------------- | ------- | ---------- | ------------------------------------------------------------- |
| `src`         | string  | -          | The source URL, path, or embed ID (required)                  |
| `autoplay`    | boolean | `false`    | Start playing automatically                                   |
| `controls`    | boolean | `true`     | Show player controls                                          |
| `crossorigin` | string  | `""`       | The CORS setting: `"anonymous"` or `"use-credentials"`        |
| `loop`        | boolean | `false`    | Loop the media                                                |
| `muted`       | boolean | `false`    | Mute the media                                                |
| `playsinline` | boolean | `true`     | Play inline on mobile instead of fullscreen                   |
| `preload`     | string  | `"auto"`   | The preload behavior: `"none"`, `"metadata"`, or `"auto"`     |
| `provider`    | string  | `""`       | The media provider: `"youtube"`, `"vimeo"`, or omit for HTML5 |
| `type`        | string  | `"video"`  | The media type: `"video"` or `"audio"`                        |

## Configuration

By default, Plyr assets are loaded from the official CDN. You can customize the asset source in your site configuration:

```yaml
params:
  plyr:
    base: "https://cdn.jsdelivr.net/npm/plyr@latest/dist"  # Custom CDN base URL
    css: "plyr.css"                                        # Custom CSS file path
    js: "plyr.polyfilled.js"                               # Custom JS file path
```

To use local assets, set `js` and/or `css` without `base`:

```yaml
params:
  plyr:
    css: "css/plyr.css"          # Path relative to assets/
    js: "js/plyr.polyfilled.js"  # Path relative to assets/
```
