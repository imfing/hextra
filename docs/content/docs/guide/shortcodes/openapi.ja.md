---
title: "OpenAPI"
linktitle: "OpenAPI"
width: wide
sidebar:
  exclude: true
---

## 概要

`openapi` ショートコードは、[OpenAPI](https://www.openapis.org/) の定義を [Swagger UI](https://swagger.io/tools/swagger-ui/) によるインタラクティブな API リファレンスとして表示します。読者はオペレーション、パラメータ、スキーマを閲覧し、ページからリクエストを試すことができます。Swagger UI はサイトのライトテーマとダークテーマに追従します。

## 例

{{< openapi "openapi/example.yaml" >}}

## 使い方

JSON または YAML 形式の OpenAPI 定義を、最初のパラメータまたは `src` として渡します。`assets/` ディレクトリ内のファイル、ページバンドルのリソース、`/` で始まるパスによる `static/` ディレクトリ内のファイル、または URL を指定できます：

```markdown
{{</* openapi "openapi/example.yaml" */>}}
{{</* openapi src="https://petstore3.swagger.io/api/v3/openapi.json" */>}}
```

ローカルファイルはサイトと一緒に公開されますが、定義が `$ref` で参照するファイルは公開されません。これらのファイルも、たとえば `static/` ディレクトリに置いて公開してください。リモートの定義はブラウザが直接取得するため、サーバーがクロスオリジンリクエストを許可している必要があります。

Swagger UI は横幅を必要とします。ページのフロントマターで `width: wide` または `width: full` を設定すると、より広い表示領域を確保できます。また、Swagger UI は固定の要素 ID を使用するため、1 ページにつき 1 つの定義のみを表示してください。

## オプション

| パラメータ                 | 説明                                                                         |
|----------------------------|------------------------------------------------------------------------------|
| `src`                      | OpenAPI 定義。最初のパラメータとして渡すこともできます。                     |
| `docExpansion`             | オペレーションの展開方法：`list`（デフォルト）、`full`、`none`。             |
| `defaultModelsExpandDepth` | スキーマセクションの展開の深さ。`-1` で非表示になります。デフォルトは `1`。  |
| `filter`                   | タグでオペレーションを絞り込むフィールドを表示します。デフォルトは `false`。 |
| `tryItOutEnabled`          | オペレーションの「Try it out」セクションを最初から開きます。デフォルトは `false`。 |
| `tagsSorter`               | `alpha` でタグをアルファベット順に並べます。デフォルトは定義の順序です。     |
| `operationsSorter`         | `alpha` または `method` でオペレーションを並べます。デフォルトは定義の順序です。 |

```markdown
{{</* openapi src="openapi/example.yaml" docExpansion="none" filter=true tagsSorter="alpha" */>}}
```

## Swagger UI アセット

Swagger UI はショートコードを使用するページでのみ読み込まれます。デフォルトでは、Hextra はビルド時に jsDelivr から取得し、サイトと一緒に公開します。ミラーやローカルファイルを使用する場合は、[ローカルおよびミラー済みスクリプトアセット]({{% relref "docs/guide/configuration#ローカルおよびミラー済みスクリプトアセット" %}})を参照してください。
