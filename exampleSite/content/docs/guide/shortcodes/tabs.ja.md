---
title: タブ
next: /docs/guide/deploy-site
---

## 例

{{< tabs items="JSON,YAML,TOML" >}}

{{< tab >}}**JSON**: JavaScript Object Notation (JSON) は、JavaScript オブジェクト構文に基づいた構造化データを表現するための標準的なテキストベースのフォーマットです。{{< /tab >}}
{{< tab >}}**YAML**: YAML は人間が読みやすいデータシリアライゼーション言語です。{{< /tab >}}
{{< tab >}}**TOML**: TOML は、明らかなセマンティクスにより読みやすい最小限の設定ファイルフォーマットを目指しています。{{< /tab >}}

{{< /tabs >}}

## 使用方法

### デフォルト

```
{{</* tabs items="JSON,YAML,TOML" */>}}

  {{</* tab */>}}**JSON**: JavaScript Object Notation (JSON) は、JavaScript オブジェクト構文に基づいた構造化データを表現するための標準的なテキストベースのフォーマットです。{{</* /tab */>}}
  {{</* tab */>}}**YAML**: YAML は人間が読みやすいデータシリアライゼーション言語です。{{</* /tab */>}}
  {{</* tab */>}}**TOML**: TOML は、明らかなセマンティクスにより読みやすい最小限の設定ファイルフォーマットを目指しています。{{</* /tab */>}}

{{</* /tabs */>}}
```

### 選択されたインデックスを指定

`defaultIndex` プロパティを使用して、選択されるタブを指定します。インデックスは 0 から始まります。

```
{{</* tabs items="JSON,YAML,TOML" defaultIndex="1" */>}}

  {{</* tab */>}}**JSON**: JavaScript Object Notation (JSON) は、JavaScript オブジェクト構文に基づいた構造化データを表現するための標準的なテキストベースのフォーマットです。{{</* /tab */>}}
  {{</* tab */>}}**YAML**: YAML は人間が読みやすいデータシリアライゼーション言語です。{{</* /tab */>}}
  {{</* tab */>}}**TOML**: TOML は、明らかなセマンティクスにより読みやすい最小限の設定ファイルフォーマットを目指しています。{{</* /tab */>}}

{{</* /tabs */>}}
```

`YAML` タブがデフォルトで選択されます。

{{< tabs items="JSON,YAML,TOML" defaultIndex="1" >}}

{{< tab >}}**JSON**: JavaScript Object Notation (JSON) は、JavaScript オブジェクト構文に基づいた構造化データを表現するための標準的なテキストベースのフォーマットです。{{< /tab >}}
{{< tab >}}**YAML**: YAML は人間が読みやすいデータシリアライゼーション言語です。{{< /tab >}}
{{< tab >}}**TOML**: TOML は、明らかなセマンティクスにより読みやすい最小限の設定ファイルフォーマットを目指しています。{{< /tab >}}

{{< /tabs >}}


### Markdown を使用

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