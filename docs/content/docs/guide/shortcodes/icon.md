---
title: Icon
next: /docs/guide/shortcodes/steps
---

To use this shortcode inline, inline shortcode needs to be enabled in the config:

```yaml {filename="hugo.yaml"}
enableInlineShortcodes: true
```

Built-in icons are listed in [`data/icons.yaml`](https://github.com/imfing/hextra/blob/main/data/icons.yaml).

<!--more-->

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

### How to add your own icons

Create `data/icons.yaml` file, then add your own SVG icons in the following format:

```yaml {filename="data/icons.yaml"}
your-icon: <svg>your icon svg content</svg>
```

It then can be used in the shortcode like this:

```
{{</* icon "your-icon" */>}}

{{</* card icon="your-icon" */>}}
```

Tip: [Iconify Design](https://iconify.design/) is a great place to find SVG icons for your site.

### Remote icon packs

Remote icons can be loaded on demand by using a provider prefix. Hextra supports these providers:

| Provider                                 | Example                           | Icon                        |
| ---------------------------------------- | --------------------------------- | --------------------------- |
| [Lucide](https://lucide.dev/icons/)      | `{{</* icon "lucide:house" */>}}` | {{< icon "lucide:house" >}} |
| [Tabler Icons](https://tabler.io/icons)  | `{{</* icon "tabler:user" */>}}`  | {{< icon "tabler:user" >}}  |
| [Simple Icons](https://simpleicons.org/) | `{{</* icon "simple:hugo" */>}}`  | {{< icon "simple:hugo" >}}  |

Remote icons are fetched at build time. The default providers are pinned to major package versions and loaded from these CDN URLs:

```yaml
lucide: "https://unpkg.com/lucide-static@1/icons/%s.svg"
tabler: "https://unpkg.com/@tabler/icons@3/icons/outline/%s.svg"
simple: "https://cdn.jsdelivr.net/npm/simple-icons@16/icons/%s.svg"
```

Remote icon names work anywhere Hextra accepts an icon name, including cards, tabs, badges, callouts, and navbar menu items.

## Options

| Name         | Description                 |
| ------------ | --------------------------- |
| `name`       | Icon name                   |
| `attributes` | The attributes of the icon. |
