---
title: タブ
next: /docs/guide/deploy-site
---

## 例

{{< tabs >}}

  {{< tab name="macOS" >}}**macOS**: Apple が提供するデスクトップオペレーティングシステム。{{< /tab >}}
  {{< tab name="Linux" >}}**Linux**: オープンソースのオペレーティングシステム。{{< /tab >}}
  {{< tab name="Windows" >}}**Windows**: Microsoft が提供するデスクトップオペレーティングシステム。{{< /tab >}}

{{< /tabs >}}

## 使用方法

### デフォルト

```
{{</* tabs */>}}

  {{</* tab name="JSON" */>}}**JSON**: JavaScript Object Notation (JSON) は、JavaScript オブジェクト構文に基づいた構造化データを表現する標準のテキストベースフォーマットです。{{</* /tab */>}}
  {{</* tab name="YAML" */>}}**YAML**: YAML は人間が読みやすいデータシリアライゼーション言語です。{{</* /tab */>}}
  {{</* tab name="TOML" */>}}**TOML**: TOML は、明確なセマンティクスにより読みやすい最小限の設定ファイルフォーマットを目指しています。{{</* /tab */>}}

{{</* /tabs */>}}
```

### 選択インデックスの指定

`selected` プロパティを使用して選択するタブを指定します。

```
{{</* tabs */>}}

  {{</* tab name="JSON" */>}}**JSON**: JavaScript Object Notation (JSON) は、JavaScript オブジェクト構文に基づいた構造化データを表現する標準のテキストベースフォーマットです。{{</* /tab */>}}
  {{</* tab name="YAML" selected=true */>}}**YAML**: YAML は人間が読みやすいデータシリアライゼーション言語です。{{</* /tab */>}}
  {{</* tab name="TOML" */>}}**TOML**: TOML は、明確なセマンティクスにより読みやすい最小限の設定ファイルフォーマットを目指しています。{{</* /tab */>}}

{{</* /tabs */>}}
```

`YAML` タブがデフォルトで選択されます。

{{< tabs >}}

{{< tab name="JSON" >}}**JSON**: JavaScript Object Notation (JSON) は、JavaScript オブジェクト構文に基づいた構造化データを表現する標準のテキストベースフォーマットです。{{< /tab >}}
{{< tab name="YAML" selected=true >}}**YAML**: YAML は人間が読みやすいデータシリアライゼーション言語です。{{< /tab >}}
{{< tab name="TOML" >}}**TOML**: TOML は、明確なセマンティクスにより読みやすい最小限の設定ファイルフォーマットを目指しています。{{< /tab >}}

{{< /tabs >}}


### アイコンを追加する

各タブに `icon` を指定すると、ラベルの前にアイコンを表示できます。
利用可能なアイコンの一覧は [Icon ショートコード](../icon) ページを参照してください。

```
{{</* tabs */>}}

  {{</* tab name="Photos" icon="photograph" */>}}写真ライブラリを管理・整理します。{{</* /tab */>}}
  {{</* tab name="Music" icon="music-note" */>}}お気に入りの曲を閲覧・再生します。{{</* /tab */>}}
  {{</* tab name="Videos" icon="film" */>}}動画コンテンツを視聴・ストリーミングします。{{</* /tab */>}}

{{</* /tabs */>}}
```

{{< tabs >}}

{{< tab name="Photos" icon="photograph" >}}写真ライブラリを管理・整理します。{{< /tab >}}
{{< tab name="Music" icon="music-note" >}}お気に入りの曲を閲覧・再生します。{{< /tab >}}
{{< tab name="Videos" icon="film" >}}動画コンテンツを視聴・ストリーミングします。{{< /tab >}}

{{< /tabs >}}


### Markdown の使用

コードブロックを含む Markdown 構文もサポートされています:

````
{{</* tabs */>}}

  {{</* tab name="JSON" */>}}
  ```json
  { "hello": "world" }
  ```
  {{</* /tab */>}}

  ... 他のタブも同様に追加

{{</* /tabs */>}}
````

{{< tabs >}}

  {{< tab name="JSON" >}}
  ```json
  { "hello": "world" }
  ```
  {{< /tab >}}

  {{< tab name="YAML" >}}
  ```yaml
  hello: world
  ```
  {{< /tab >}}

  {{< tab name="TOML" >}}
  ```toml
  hello = "world"
  ```
  {{< /tab >}}

{{< /tabs >}}


### タブの同期

同じ `name` リストを持つタブは同期できます。有効にすると、タブを選択すると同じ `name` を持つ他のタブも更新され、ページ間で選択が記憶されます。

`hugo.yaml` の `page` セクションでグローバルに有効にします:

```yaml {filename="hugo.yaml"}
params:
  page:
    tabs:
      sync: true
```

これを有効にすると、以下の 2 つのタブブロックは常に同じ選択項目を表示します:

```markdown
{{</* tabs */>}}

  {{</* tab name="A" */>}}A の内容{{</* /tab */>}}
  {{</* tab name="B" */>}}B の内容{{</* /tab */>}}

{{</* /tabs */>}}

{{</* tabs */>}}

  {{</* tab name="A" */>}}2 番目の A の内容{{</* /tab */>}}
  {{</* tab name="B" */>}}2 番目の B の内容{{</* /tab */>}}

{{</* /tabs */>}}
```
