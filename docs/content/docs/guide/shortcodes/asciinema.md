---
title: "Asciinema Player Component"
linktitle: "Asciinema Player"
sidebar:
  exclude: true
---

## Overview

The asciinema shortcode allows you to embed terminal recordings created with [asciinema](https://asciinema.org/) in your Hugo site. It provides a rich terminal player with features like playback controls, speed adjustment, and theme customization.

## Basic Usage

The asciinema shortcode supports both local `.cast` files and remote URLs. Here are the different ways to use local files:

### Local Files

**Method 1: Assets directory (recommended)**
Place your cast files in the `assets/` directory of your Hugo site:

```
your-site/
├── assets/
│   └── demo.cast
└── content/
    └── my-page.md
```

In your markdown file:
```markdown
{{</* asciinema file="demo.cast" */>}}
```

**Method 2: Static directory**
Place your cast files in the `static/` directory:

```
your-site/
├── static/
│   └── demo.cast
└── content/
    └── my-page.md
```

In your markdown file:
```markdown
{{</* asciinema file="demo.cast" */>}}
```

**Method 3: Page bundle**
For page bundles, place cast files alongside your markdown file:

```
your-site/
└── content/
    └── my-page/
        ├── index.md
        └── demo.cast
```

In your markdown file:
```markdown
{{</* asciinema file="demo.cast" */>}}
```

{{< asciinema file="casts/demo.cast" >}}

### Remote Files

You can also use cast files from any remote URL:

```markdown
{{</* asciinema file="https://asciinema.org/a/85R4jTtjKVRIYXTcKCNq0vzYH.cast" */>}}
{{</* asciinema file="https://example.com/demo.cast" */>}}
```

{{< asciinema file="https://asciinema.org/a/85R4jTtjKVRIYXTcKCNq0vzYH.cast" >}}

### How File Lookup Works

The shortcode automatically finds your cast files by looking in this order:
1. **Page bundle resources** (if using page bundles)
2. **Global assets directory** (`assets/`)
3. **Static directory** (`static/`)
4. **Remote URLs** (if the path starts with `http://` or `https://`)

If a file is not found, Hugo will show a helpful error message telling you where to place the file.

## Advanced Demo

Here's a more advanced example showcasing all available parameters:

```markdown
{{</* asciinema 
  file="demo.cast"
  theme="dracula"
  speed="2"
  autoplay="true"
  loop="true"
  markers="1.5:Installation,3.2:Configuration,5.8:Testing"
*/>}}
```

{{< asciinema 
  file="casts/demo.cast"
  theme="dracula"
  speed="2"
  autoplay="true"
  loop="true"
  markers="1.5:Installation,3.2:Configuration,5.8:Testing"
>}}

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `file` | string | - | Path to the .cast file (required). Supports local files, absolute paths, and remote URLs |
| `theme` | string | `"asciinema"` | Player theme |
| `speed` | number | `1` | Playback speed multiplier |
| `autoplay` | boolean | `false` | Start playing automatically |
| `loop` | boolean | `false` | Loop the recording |
| `poster` | string | `""` | Poster (a preview frame) to display until the playback is started. Supports NPT notation (e.g., "npt:1:23") |
| `markers` | string | `""` | Comma-separated time markers. Format: "time:label" or just "time" (e.g., "1.5:Installation,3.2:Configuration,5.8") |

