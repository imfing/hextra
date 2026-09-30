---
title: "OpenAPI"
linktitle: "OpenAPI"
width: wide
sidebar:
  exclude: true
---

## Overview

The `openapi` shortcode renders an [OpenAPI](https://www.openapis.org/) description as an interactive API reference with [Swagger UI](https://swagger.io/tools/swagger-ui/). Readers can browse operations, parameters, and schemas, and try requests from the page. Swagger UI follows the light and dark themes of the site.

## Example

{{< openapi "openapi/example.yaml" >}}

## Usage

Pass the OpenAPI description, in JSON or YAML, as the first parameter or as `src`. It can be a file in the `assets/` directory, a page bundle resource, a file in the `static/` directory with a path starting with `/`, or a URL:

```markdown
{{</* openapi "openapi/example.yaml" */>}}
{{</* openapi src="https://petstore3.swagger.io/api/v3/openapi.json" */>}}
```

Local files are published with the site, but not the files that a description references with `$ref`: publish those too, for example in the `static/` directory. The browser fetches remote descriptions directly, so the server must allow cross-origin requests.

Swagger UI is wide: set `width: wide` or `width: full` in the front matter of the page to give it more room. It also uses fixed element IDs, so render a single description per page.

## Options

| Parameter                  | Description                                                                         |
|----------------------------|-------------------------------------------------------------------------------------|
| `src`                      | The OpenAPI description. Can also be passed as the first parameter.                 |
| `docExpansion`             | How operations are expanded: `list` (default), `full`, or `none`.                   |
| `defaultModelsExpandDepth` | Expansion depth of the schemas section. `-1` hides it. Defaults to `1`.             |
| `filter`                   | Show a field to filter operations by tag. Defaults to `false`.                      |
| `tryItOutEnabled`          | Open the "Try it out" section of operations by default. Defaults to `false`.        |
| `tagsSorter`               | `alpha` sorts tags alphabetically. Defaults to the order of the description.        |
| `operationsSorter`         | `alpha` or `method` sorts operations. Defaults to the order of the description.     |

```markdown
{{</* openapi src="openapi/example.yaml" docExpansion="none" filter=true tagsSorter="alpha" */>}}
```

## Swagger UI Assets

Swagger UI is only loaded on pages that use the shortcode. By default, Hextra fetches it from jsDelivr at build time and publishes it with the site. To use a mirror or local files, see [Local and Mirrored Script Assets]({{% relref "docs/guide/configuration#local-and-mirrored-script-assets" %}}).
