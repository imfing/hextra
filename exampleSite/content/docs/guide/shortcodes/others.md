---
title: Other Shortcodes
linkTitle: Others
sidebar:
  exclude: true
---

{{< callout emoji="ℹ️" >}}
  Some of these are Hugo built-in shortcodes.
  These shortcodes are considered less stable and may be changed anytime.
{{< /callout >}}

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
