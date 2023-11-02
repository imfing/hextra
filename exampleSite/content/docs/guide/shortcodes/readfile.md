---
title: Readfile
---

Readfiles are useful for content templating. I allows you to re-use a file's content in another file.

## Example

{{< readfile file="readfile-example.md" >}}

## Usage

Put your Markdown templates in `/static/templates/`.

Print the content in another file with the following shortcode:

```
{{</* readfile file="your-file.md" */>}}
```
