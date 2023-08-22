---
title: Icon
---

To use this shortcode inline, inline shortcode needs to be enabled in the config:

```yaml {filename="hugo.yaml"}
enableInlineShortcodes: true
```

The list of available icons can be found in `data/icons.yaml`.

## Example

{{< icon "academic-cap" >}}
{{< icon "cake" >}}
{{< icon "gift" >}}
{{< icon "sparkles" >}}

## Usage

```
{{</* icon "github" */>}}
```

[Heroicons](https://v1.heroicons.com/) v1 outline icons are available out of the box.

You can also add your own icons by adding them to `data/icon.yaml`:

```yaml {filename="data/icon.yaml"}
your-icon: <svg>your icon svg content</svg>
```

which can then be used like this:

```
{{</* icon "your-icon" */>}}
```
