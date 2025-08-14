---
title: タブ
next: /docs/guide/deploy-site
---

## 例

{{< tabs items="macOS,Linux,Windows" >}}

  {{< tab >}}**macOS**: Apple が提供するデスクトップオペレーティングシステム。{{< /tab >}}
  {{< tab >}}**Linux**: オープンソースのオペレーティングシステム。{{< /tab >}}
  {{< tab >}}**Windows**: Microsoft が提供するデスクトップオペレーティングシステム。{{< /tab >}}

{{< /tabs >}}

## 使用方法

### デフォルト

```
{{</* tabs items="JSON,YAML,TOML" */>}}

  {{</* tab */>}}**JSON**: JavaScript Object Notation (JSON) は、JavaScript オブジェクト構文に基づいた構造化データを表現する標準のテキストベースフォーマットです。{{</* /tab */>}}
  {{</* tab */>}}**YAML**: YAML は人間が読みやすいデータシリアライゼーション言語です。{{</* /tab */>}}
  {{</* tab */>}}**TOML**: TOML は、明確なセマンティクスにより読みやすい最小限の設定ファイルフォーマットを目指しています。{{</* /tab */>}}

{{</* /tabs */>}}
```

### 選択インデックスの指定

`defaultIndex` プロパティを使用して選択するタブを指定します。インデックスは 0 から始まります。

```
{{</* tabs items="JSON,YAML,TOML" defaultIndex="1" */>}}

  {{</* tab */>}}**JSON**: JavaScript Object Notation (JSON) は、JavaScript オブジェクト構文に基づいた構造化データを表現する標準のテキストベースフォーマットです。{{</* /tab */>}}
  {{</* tab */>}}**YAML**: YAML は人間が読みやすいデータシリアライゼーション言語です。{{</* /tab */>}}
  {{</* tab */>}}**TOML**: TOML は、明確なセマンティクスにより読みやすい最小限の設定ファイルフォーマットを目指しています。{{</* /tab */>}}

{{</* /tabs */>}}
```

`YAML` タブがデフォルトで選択されます。

{{< tabs items="JSON,YAML,TOML" defaultIndex="1" >}}

{{< tab >}}**JSON**: JavaScript Object Notation (JSON) は、JavaScript オブジェクト構文に基づいた構造化データを表現する標準のテキストベースフォーマットです。{{< /tab >}}
{{< tab >}}**YAML**: YAML は人間が読みやすいデータシリアライゼーション言語です。{{< /tab >}}
{{< tab >}}**TOML**: TOML は、明確なセマンティクスにより読みやすい最小限の設定ファイルフォーマットを目指しています。{{< /tab >}}

{{< /tabs >}}


### Markdown の使用

コードブロックを含む Markdown 構文もサポートされています:

````
{{</* tabs items="JSON,YAML,TOML" */>}}

  {{</* tab */>}}
  ```json
  { "hello": "world" }
  ```
  {{</* /tab */>}}

  ... 他のタブも同様に追加

{{</* /tabs */>}}
````

{{< tabs items="JSON,YAML,TOML" >}}

  {{< tab >}}
  ```json
  { "hello": "world" }
  ```
  {{< /tab >}}

  {{< tab >}}
  ```yaml
  hello: world
  ```
  {{< /tab >}}

  {{< tab >}}
  ```toml
  hello = "world"
  ```
  {{< /tab >}}

{{< /tabs >}}


### タブの同期

同じ `items` リストを持つタブは同期できます。有効にすると、タブを選択すると同じ `items` を持つ他のタブも更新され、ページ間で選択が記憶されます。

`hugo.yaml` の `page` セクションでグローバルに有効にします:

```yaml {filename="hugo.yaml"}
params:
  page:
    tabs:
      sync: true
```

これを有効にすると、以下の 2 つのタブブロックは常に同じ選択項目を表示します:

```markdown
{{</* tabs items="A,B" */>}}

  {{</* tab */>}}A の内容{{</* /tab */>}}
  {{</* tab */>}}B の内容{{</* /tab */>}}

{{</* /tabs */>}}

{{</* tabs items="A,B" */>}}

  {{</* tab */>}}2 番目の A の内容{{</* /tab */>}}
  {{</* tab */>}}2 番目の B の内容{{</* /tab */>}}

{{</* /tabs */>}}
```