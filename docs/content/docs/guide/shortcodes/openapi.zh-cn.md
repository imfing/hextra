---
title: "OpenAPI"
linktitle: "OpenAPI"
width: wide
sidebar:
  exclude: true
---

## 概述

`openapi` 短代码使用 [Swagger UI](https://swagger.io/tools/swagger-ui/) 将 [OpenAPI](https://www.openapis.org/) 描述渲染为交互式 API 参考文档。读者可以浏览操作、参数和数据结构，并直接在页面中发送请求。Swagger UI 会跟随站点的浅色和深色主题。

## 示例

{{< openapi "openapi/example.yaml" >}}

## 用法

将 JSON 或 YAML 格式的 OpenAPI 描述作为第一个参数或 `src` 参数传入。它可以是 `assets/` 目录中的文件、页面包资源、以 `/` 开头的路径所指向的 `static/` 目录中的文件，也可以是一个 URL：

```markdown
{{</* openapi "openapi/example.yaml" */>}}
{{</* openapi src="https://petstore3.swagger.io/api/v3/openapi.json" */>}}
```

本地文件会随站点一起发布，但描述通过 `$ref` 引用的文件不会被发布：请同样发布这些文件，例如将它们放在 `static/` 目录中。远程描述由浏览器直接获取，因此服务器必须允许跨域请求。

Swagger UI 需要较宽的空间：在页面的 front matter 中设置 `width: wide` 或 `width: full` 可以为它提供更多空间。此外，Swagger UI 使用固定的元素 ID，因此每个页面只应渲染一个描述。

## 选项

| 参数                       | 说明                                                        |
|----------------------------|-------------------------------------------------------------|
| `src`                      | OpenAPI 描述，也可以作为第一个参数传入。                    |
| `docExpansion`             | 操作的展开方式：`list`（默认）、`full` 或 `none`。          |
| `defaultModelsExpandDepth` | 数据结构部分的展开深度，`-1` 表示隐藏。默认为 `1`。         |
| `filter`                   | 显示按标签筛选操作的输入框。默认为 `false`。                |
| `tryItOutEnabled`          | 默认展开操作的“Try it out”部分。默认为 `false`。            |
| `tagsSorter`               | `alpha` 按字母顺序排列标签。默认保持描述中的顺序。          |
| `operationsSorter`         | `alpha` 或 `method` 对操作排序。默认保持描述中的顺序。      |

```markdown
{{</* openapi src="openapi/example.yaml" docExpansion="none" filter=true tagsSorter="alpha" */>}}
```

## Swagger UI 资源

Swagger UI 仅在使用该短代码的页面中加载。默认情况下，Hextra 会在构建时从 jsDelivr 获取它，并随站点一起发布。如需使用镜像或本地文件，请参阅[本地与镜像脚本资源]({{% relref "docs/guide/configuration#本地与镜像脚本资源" %}})。
