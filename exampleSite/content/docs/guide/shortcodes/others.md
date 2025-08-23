---
title: Other Shortcodes
linkTitle: Others
next: /docs/guide/deploy-site
---

{{< callout type="warning" >}}
  Some of these are Hugo built-in shortcodes.
  These shortcodes are considered less stable and may be changed anytime.
{{< /callout >}}

## Badge

### Examples

{{< badge "default" >}}&nbsp;
{{< badge content="border" border=false >}}&nbsp;
{{< badge content="color" color="green" >}}&nbsp;
{{< badge content="link" link="https://github.com/imfing/hextra/releases" >}}&nbsp;
{{< badge content="icon" icon="sparkles" >}}&nbsp;

### Usage

#### Default

{{< badge "Badge" >}}&nbsp;

```
{{</* badge "Badge" */>}}
```

#### Colors

{{< badge content="Badge" >}}&nbsp;
{{< badge content="Badge" color="purple" >}}&nbsp;
{{< badge content="Badge" color="indigo" >}}&nbsp;
{{< badge content="Badge" color="blue" >}} &nbsp;
{{< badge content="Badge" color="green" >}} &nbsp;
{{< badge content="Badge" color="yellow" >}} &nbsp;
{{< badge content="Badge" color="amber" >}} &nbsp;
{{< badge content="Badge" color="orange" >}} &nbsp;
{{< badge content="Badge" color="red" >}}&nbsp;

```
{{</* badge content="Badge" */>}}
{{</* badge content="Badge" color="purple" */>}}
{{</* badge content="Badge" color="indigo" */>}}
{{</* badge content="Badge" color="blue" */>}}
{{</* badge content="Badge" color="green" */>}}
{{</* badge content="Badge" color="yellow" */>}}
{{</* badge content="Badge" color="amber" */>}}
{{</* badge content="Badge" color="orange" */>}}
{{</* badge content="Badge" color="red" */>}}
```

{{< badge content="Badge" border=false >}} &nbsp;
{{< badge content="Badge" color="purple" border=false >}} &nbsp;
{{< badge content="Badge" color="indigo" border=false >}} &nbsp;
{{< badge content="Badge" color="blue" border=false >}} &nbsp;
{{< badge content="Badge" color="green" border=false >}} &nbsp;
{{< badge content="Badge" color="yellow" border=false >}} &nbsp;
{{< badge content="Badge" color="amber" border=false >}} &nbsp;
{{< badge content="Badge" color="orange" border=false >}}&nbsp;
{{< badge content="Badge" color="red" border=false >}}&nbsp;

```
{{</* badge content="Badge" border=false */>}}
{{</* badge content="Badge" color="purple" border=false */>}}
{{</* badge content="Badge" color="indigo" border=false */>}}
{{</* badge content="Badge" color="blue" border=false */>}}
{{</* badge content="Badge" color="green" border=false */>}}
{{</* badge content="Badge" color="yellow" border=false */>}}
{{</* badge content="Badge" color="amber" border=false */>}}
{{</* badge content="Badge" color="orange" border=false */>}}
{{</* badge content="Badge" color="red" border=false */>}}
```

#### Variants

{{< badge content="Badge" icon="sparkles" >}}&nbsp;
{{< badge content="Releases" link="https://github.com/imfing/hextra/releases" icon="github" >}}&nbsp;

```
{{</* badge content="Badge" icon="sparkles" */>}}
{{</* badge content="Releases" link="https://github.com/imfing/hextra/releases" icon="github" */>}}
```

### Options

| Name      | Description                                                                                                              |
|-----------|--------------------------------------------------------------------------------------------------------------------------|
| `content` | The text of the badge.                                                                                                   |
| `link`    | The link of the badge.                                                                                                   |
| `icon`    | The icon of the badge.                                                                                                   |
| `color`   | The color of the badge. <br/> `gray` (default), `purple`, `indigo`, `blue`, `green`, `yellow`, `amber`, `orange`, `red`. |
| `class`   | The class of the badge.                                                                                                  |
| `border`  | Adds or removes the border (default: true).                                                                              |
 
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
