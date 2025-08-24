---
title: "Asciinema Player"
---

## Overview

The asciinema shortcode allows you to embed terminal recordings created with [asciinema](https://asciinema.org/) in your Hugo site. It provides a rich terminal player with features like playback controls, speed adjustment, and theme customization.

## Basic Usage

You can use local `.cast` files or remote URLs. For local files, place them in the `static/casts/` directory:

```markdown
{{</* asciinema file="demo.cast" */>}}
```

{{< asciinema file="demo.cast" >}}

### Remote Files

You can also use remote cast files from any URL:

```markdown
{{</* asciinema file="https://asciinema.org/a/85R4jTtjKVRIYXTcKCNq0vzYH.cast" */>}}
{{</* asciinema file="https://example.com/demo.cast" */>}}
```

{{< asciinema file="https://asciinema.org/a/85R4jTtjKVRIYXTcKCNq0vzYH.cast" >}}

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
  file="demo.cast"
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

