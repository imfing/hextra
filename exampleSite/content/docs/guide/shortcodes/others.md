---
title: Other Shortcodes
linkTitle: Others
sidebar:
  exclude: true
next: /docs/guide/deploy-site
---

{{< callout type="warning" >}}
  Some of these are Hugo built-in shortcodes.
  These shortcodes are considered less stable and may be changed anytime.
{{< /callout >}}

## Badge

### Examples

{{< badge "default" >}}&nbsp;
{{< badge content="tip" type="tip" >}} &nbsp;
{{< badge content="info" type="info" >}} &nbsp;
{{< badge content="warning" type="warning" >}} &nbsp;
{{< badge content="error" type="error" >}}&nbsp;
{{< badge content="important" type="important" >}}&nbsp;
{{< badge content="icon" icon="sparkles" >}}&nbsp;
{{< badge content="link" link="https://github.com/imfing/hextra/releases" >}}&nbsp;

{{< badge content="default" border=false >}} &nbsp;
{{< badge content="tip" type="tip" border=false >}} &nbsp;
{{< badge content="info" type="info" border=false >}} &nbsp;
{{< badge content="warning" type="warning" border=false >}} &nbsp;
{{< badge content="error" type="error" border=false >}}&nbsp;
{{< badge content="important" type="important" border=false >}}&nbsp;
{{< badge content="icon" icon="sparkles" border=false >}}&nbsp;
{{< badge content="link" link="https://github.com/imfing/hextra/releases" border=false >}}&nbsp;

### Usage

#### Default

{{< badge "Badge" >}}&nbsp;

```
{{</* badge "Badge" */>}}
```

#### Variants

{{< badge content="Badge" type="tip" >}} &nbsp;
{{< badge content="Badge" type="info" >}} &nbsp;
{{< badge content="Badge" type="warning" >}} &nbsp;
{{< badge content="Badge" type="error" >}} &nbsp;
{{< badge content="Badge" type="important" >}}&nbsp;
{{< badge content="Badge" border=false >}}&nbsp;

```
{{</* badge content="Badge" type="tip" */>}}
{{</* badge content="Badge" type="info" */>}}
{{</* badge content="Badge" type="warning" */>}}
{{</* badge content="Badge" type="error" */>}}
{{</* badge content="Badge" type="important" */>}}
{{</* badge content="Badge" border=false */>}}
```

#### Link and Icon

{{< badge content="Releases" link="https://github.com/imfing/hextra/releases" icon="github" >}}&nbsp;

```
{{</* badge content="Releases" link="https://github.com/imfing/hextra/releases" icon="github" */>}}
```

### Options

| Name      | Description                                                  |
|-----------|--------------------------------------------------------------|
| `content` | The text of the badge.                                       |
| `link`    | The link of the badge.                                       |
| `icon`    | The icon of the badge.                                       |
| `type`    | The type of the badge. (default, `info`, `warning`, `error`) |
| `class`   | The class of the badge.                                      |
| `border`  | Adds or removes the border (default: true).                  |

## YouTube

Embed a YouTube video.

```
{{</* youtube VIDEO_ID */>}}
```

Result:

{{< youtube id=dQw4w9WgXcQ loading=lazy >}}

For more information, see [Hugo's YouTube Shortcode](https://gohugo.io/content-management/shortcodes/#youtube).

## PDF

With PDF shortcode, you can embed a PDF file in your content.

```
{{</* pdf "https://example.com/sample.pdf" */>}}
```

You can also place the PDF file in your project directory and use the relative path.

```
{{</* pdf "path/to/file.pdf" */>}}
```

Example:

{{< pdf "https://upload.wikimedia.org/wikipedia/commons/1/13/Example.pdf" >}}
