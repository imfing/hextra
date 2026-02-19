---
title: 設定
weight: 2
tags:
  - 設定
---

Hugo はサイトのルートにある `hugo.yaml` から設定を読み込みます。
この設定ファイルであなたのサイトのあらゆる側面を設定できます。
利用可能な設定項目とベストプラクティスを網羅的に理解するには、GitHub 上のこのサイトの設定ファイル [`docs/hugo.yaml`](https://github.com/imfing/hextra/blob/main/docs/hugo.yaml) を参照してください。

<!--more-->

## ナビゲーション

### メニュー

右上のメニューは設定ファイルの `menu.main` セクションで定義されます：

```yaml {filename="hugo.yaml"}
menu:
  main:
    - name: ドキュメント
      pageRef: /docs
      weight: 1
    - name: ブログ
      pageRef: /blog
      weight: 2
    - name: このサイトについて
      pageRef: /about
      weight: 3
    - name: 検索
      weight: 4
      params:
        type: search
    - name: GitHub
      weight: 5
      url: "https://github.com/imfing/hextra"
      params:
        icon: github
```

メニュー項目にはいくつかの種類があります：

1. `pageRef` でサイト内のページにリンク
   ```yaml
   - name: ドキュメント
     pageRef: /docs
   ```
2. `url` で外部URLにリンク
   ```yaml
   - name: GitHub
     url: "https://github.com"
   ```
3. `type: search` で検索バー
   ```yaml
   - name: 検索
     params:
       type: search
   ```
4. アイコン
   ```yaml
   - name: GitHub
     params:
       icon: github
   ```
5. テーマ切り替え
   ```yaml
    - name: Theme Toggle
      params:
        type: theme-toggle
        label: true # optional, default is false
   ```
6. 言語スイッチャー
   ```yaml
    - name: 言語スイッチャー
      params:
        type: language-switch
        label: true # optional, default is false
        icon: "globe-alt" # optional, default is "translate"
   ```

これらのメニュー項目は `weight` パラメータを設定することで並べ替えられます。

### ネストされたメニュー

子メニュー項目を定義することでドロップダウンメニューを作成できます。親メニュー項目をクリックすると子メニューが表示されます。

```yaml {filename="hugo.yaml"}
menu:
  main:
    - identifier: sdk
      name: SDK
    - identifier: python
      name: Python ↗
      url: https://python.org
      parent: sdk
    - identifier: go
      name: Go
      url: https://go.dev
      parent: sdk
```

子メニュー項目は親の `identifier` 値を `parent` パラメータで指定する必要があります。

### ロゴとタイトル

デフォルトのロゴを変更するには、`hugo.yaml` を編集し、`static` ディレクトリ下のロゴファイルへのパスを追加します。
オプションで、ロゴをクリックした際のリンク先や、ロゴの幅と高さ（ピクセル単位）を設定できます。

```yaml {filename="hugo.yaml"}
params:
  navbar:
    displayTitle: true
    displayLogo: true
    logo:
      path: images/logo.svg
      dark: images/logo-dark.svg
      link: /
      width: 40
      height: 20
```

### ページネーション

ドキュメントページやブログ記事の下部にある前へ/次へナビゲーションを無効にするには：

```yaml {filename="hugo.yaml"}
params:
  page:
    displayPagination: false  # ドキュメントページ用
  blog:
    article:
      displayPagination: false  # ブログ記事用
```

## サイドバー

### メインサイドバー

メインサイドバーはコンテンツディレクトリの構造から自動生成されます。
詳細は [ファイルの整理](/docs/guide/organize-files) ページを参照してください。

単一ページを左サイドバーから除外するには、ページのフロントマターで `sidebar.exclude` パラメータを設定します：

```yaml {filename="content/docs/guide/configuration.md"}
---
title: 設定
sidebar:
  exclude: true
---
```

### 追加リンク

サイドバーの追加リンクは設定ファイルの `menu.sidebar` セクションで定義されます：

```yaml {filename="hugo.yaml"}
menu:
  sidebar:
    - name: その他
      params:
        type: separator
      weight: 1
    - name: "このサイトについて"
      pageRef: "/about"
      weight: 2
    - name: "Hugo ドキュメント ↗"
      url: "https://gohugo.io/documentation/"
      weight: 3
```

## 右サイドバー

### 目次

目次はコンテンツファイルの見出しから自動生成されます。ページのフロントマターで `toc: false` を設定することで無効化できます。

```yaml {filename="content/docs/guide/configuration.md"}
---
title: 設定
toc: false
---
```

### ページ編集リンク

ページ編集リンクを設定するには、設定ファイルで `params.editURL.base` パラメータを設定します：

```yaml {filename="hugo.yaml"}
params:
  editURL:
    enable: true
    base: "https://github.com/your-username/your-repo/edit/main"
```

編集リンクは提供されたURLをルートディレクトリとして各ページに対して自動生成されます。
特定のページに対して編集リンクを設定したい場合は、ページのフロントマターで `editURL` パラメータを設定できます：

```yaml {filename="content/docs/guide/configuration.md"}
---
title: 設定
editURL: "https://example.com/edit/this/page"
---
```

## フッター

### 著作権表示

ウェブサイトのフッターに表示される著作権テキストを変更するには、`i18n/en.yaml` という名前のファイルを作成する必要があります。
このファイルで、以下のように新しい著作権テキストを指定します：

```yaml {filename="i18n/en.yaml"}
copyright: "© 2024 ここにあなたのテキスト"
```

参考までに、GitHub リポジトリに [`i18n/en.yaml`](https://github.com/imfing/hextra/blob/main/i18n/en.yaml) ファイルの例があります。また、著作権テキストには Markdown 形式を使用することもできます。

## その他

### ファビコン

サイトの [ファビコン](https://ja.wikipedia.org/wiki/Favicon) をカスタマイズするには、[テーマのデフォルトファビコン](https://github.com/imfing/hextra/tree/main/static) を上書きするために `static` フォルダの下にアイコンファイルを配置します：

{{< filetree/container >}}
  {{< filetree/folder name="static" >}}
    {{< filetree/file name="android-chrome-192x192.png" >}}
    {{< filetree/file name="android-chrome-512x512.png" >}}
    {{< filetree/file name="apple-touch-icon.png" >}}
    {{< filetree/file name="favicon-16x16.png" >}}
    {{< filetree/file name="favicon-32x32.png" >}}
    {{< filetree/file name="favicon-dark.svg" >}}
    {{< filetree/file name="favicon.ico" >}}
    {{< filetree/file name="favicon.svg" >}}
    {{< filetree/file name="site.webmanifest" >}}
  {{< /filetree/folder >}}
{{< /filetree/container >}}

#### 基本設定

最低限、`static` フォルダに `favicon.svg` を含めてください。これがサイトのデフォルトファビコンとして使用されます。

SVG 内で CSS メディアクエリを使用することで、システムのテーマ設定に応答する適応型 SVG ファビコンを作成できます。このアプローチは [適応型ファビコンの構築](https://web.dev/articles/building/an-adaptive-favicon) で説明されています。

#### ダークモード対応

強化されたダークモードサポートのために、`favicon.svg` と一緒に `favicon-dark.svg` を `static` フォルダに追加してください。両方のファイルが存在する場合、Hextra は自動的に：

- ライトモードまたはテーマ設定が検出されない場合に `favicon.svg` を使用
- ユーザーのシステムがダークモードに設定されている場合に `favicon-dark.svg` に切り替え
- 自動切り替えのためにシステムの `prefers-color-scheme` 設定を尊重

ダークモードファビコンの切り替えは Firefox を含むすべての最新ブラウザで動作し、サイトのテーマにマッチしたシームレスな体験を提供します。

#### 追加フォーマット

`favicon.ico` は一般的に古いブラウザ向けですが、最新のブラウザはスケーラビリティとファイルサイズの小ささが好まれる SVG ファビコンをサポートしています。
必要に応じて [favicon.io](https://favicon.io/) や [favycon](https://github.com/ruisaraiva19/favycon) などのツールを使用して追加のファビコンフォーマットを生成できます。

### テーマ設定

`theme` 設定を使用してデフォルトのテーマモードとトグルボタンを設定し、訪問者がライトモードとダークモードを切り替えられるようにします。

```yaml {filename="hugo.yaml"}
params:
  theme:
    # light | dark | system
    default: system
    displayToggle: true
```

`theme.default` のオプション：

- `light` - 常にライトモードを使用
- `dark` - 常にダークモードを使用
- `system` - オペレーティングシステムの設定と同期（デフォルト）

`theme.displayToggle` パラメータはテーマを変更するためのトグルボタンを表示します。
`true` に設定すると、訪問者はデフォルト設定を上書きしてライトモードとダークモードを切り替えられます。

### ページ最終更新日

ページの最終更新日を表示するには、`params.displayUpdatedDate` フラグを有効にします。Git コミット日付をソースとして使用するには、`enableGitInfo` フラグも有効にします。

日付形式をカスタマイズするには、`params.dateFormat` パラメータを設定します。そのレイアウトは Hugo の [`time.Format`](https://gohugo.io/functions/time/format/) に準拠します。

さらに、`params.displayUpdatedAuthor` フラグを有効にすると、最終更新の作者を表示できます。これには `enableGitInfo: true` の設定が必要です。

```yaml {filename="hugo.yaml"}
# Git コミットを解析
enableGitInfo: true

params:
  # 最終更新日を表示
  displayUpdatedDate: true
  dateFormat: "2006年1月2日"
  # 最終更新の作者を表示
  displayUpdatedAuthor: true
```

### タグ

ページタグを表示するには、設定ファイルで以下のフラグを設定します：

```yaml {filename="hugo.yaml"}
params:
  blog:
    list:
      displayTags: true
  toc:
    displayTags: true
```

### 画像ズーム

画像ズームはデフォルトで無効です。有効にすると、Markdown 画像をクリックするとズームビューが開きます。

```yaml {filename="hugo.yaml"}
params:
  imageZoom:
    enable: true
```

特定のページでズームを無効にするには、ページのフロントマターに以下を追加します：

```yaml {filename="content/docs/guide/configuration.md"}
---
imageZoom: false
---
```

Medium Zoom アセットを固定するか、ローカルアセットから読み込む場合：

```yaml {filename="hugo.yaml"}
params:
  imageZoom:
    enable: true
    base: "https://cdn.jsdelivr.net/npm/medium-zoom@1.1.0/dist"
    # js: "js/medium-zoom.min.js" # オプション、base またはローカルアセットからの相対パス
```

### ページ幅

レイアウト全体の幅は `params.page.width` で設定できます：

```yaml {filename="hugo.yaml"}
params:
  page:
    # full (100%), wide (90rem), normal (1280px)
    width: wide
```

`params.page.width` の選択肢は `full`、`wide`、`normal` です。

本文コンテンツ幅はデフォルトで `72rem` に固定されています。

コンテンツ幅を変更したい場合は、カスタムスタイルシートで CSS 変数を上書きしてください：

```css {filename="assets/css/custom.css"}
:root {
  --hextra-max-content-width: 100%;
}
```

同様に、ナビゲーションバーとフッターの幅は `params.navbar.width` と `params.footer.width` パラメータでカスタマイズできます。

### ページコンテキストメニュー

ページコンテキストメニューは、ページの内容を Markdown としてコピーしたり、生の Markdown ソースを表示したりできるドロップダウンボタンを提供します。この機能は、読者が Markdown 形式でコンテンツを共有または参照したいドキュメントサイトに便利です。

#### コンテキストメニューの有効化

コンテキストメニューをグローバルに有効にするには、設定ファイルに以下を追加します：

```yaml {filename="hugo.yaml"}
params:
  page:
    contextMenu:
      enable: true
```

また、ページの `markdown` 出力形式を有効にする必要があります：

```yaml {filename="hugo.yaml"}
outputs:
  page: [html, markdown]
  section: [html, rss, markdown]
```

#### ページごとの制御

特定のページでコンテキストメニューを有効または無効にするには、フロントマターで `contextMenu` パラメータを使用します：

```yaml {filename="content/docs/example.md"}
---
title: サンプルページ
contextMenu: false
---
```

#### カスタムリンク

コンテキストメニューのドロップダウンにカスタムリンクを追加できます。これは外部サービスとの統合に便利です。リンクは以下のプレースホルダーをサポートしています：

- `{url}` - ページの URL（URL エンコード済み）
- `{title}` - ページのタイトル（URL エンコード済み）
- `{markdown_url}` - 生の Markdown コンテンツの URL（URL エンコード済み）

```yaml {filename="hugo.yaml"}
params:
  page:
    contextMenu:
      enable: true
      links:
        - name: ChatGPT で開く
          icon: chatgpt
          url: "https://chatgpt.com/?hints=search&q=I%27m+looking+at+this+documentation%3A+{url}%0AHelp+me+understand+how+to+use+it."
```

各リンクには以下を設定できます：
- `name` - リンクの表示テキスト
- `icon` - オプションのアイコン名（[アイコン]({{% relref "docs/guide/shortcodes/icon" %}})を参照）
- `url` - オプションのプレースホルダーを含む URL

### FlexSearch インデックス

[FlexSearch](https://github.com/nextapps-de/flexsearch) を利用した全文検索はデフォルトで有効です。
検索インデックスをカスタマイズするには、設定ファイルで `params.search.flexsearch.index` パラメータを設定します：

```yaml {filename="hugo.yaml"}
params:
  # 検索
  search:
    enable: true
    type: flexsearch

    flexsearch:
      # インデックス対象: content | summary | heading | title
      index: content
```

`flexsearch.index` のオプション：

- `content` - ページの全文（デフォルト）
- `summary` - ページの要約、詳細は [Hugo コンテンツ要約](https://gohugo.io/content-management/summaries/) を参照
- `heading` - レベル1とレベル2の見出し
- `title` - ページタイトルのみを含める

検索トークン化をカスタマイズするには、設定ファイルで `params.search.flexsearch.tokenize` パラメータを設定します：

```yaml {filename="hugo.yaml"}
params:
  search:
    # ...
    flexsearch:
      # full | forward | reverse | strict
      tokenize: forward
```

[`flexsearch.tokenize`](https://github.com/nextapps-de/flexsearch/#tokenizer-prefix-search) のオプション：

- `strict` - 単語全体をインデックス
- `forward` - 前方方向に単語を増分的にインデックス
- `reverse` - 両方向に単語を増分的にインデックス
- `full` - すべての可能な組み合わせをインデックス

FlexSearch 検索インデックスからページを除外するには、ページのフロントマターで `excludeSearch: true` を設定します：

```yaml {filename="content/docs/guide/configuration.md"}
---
title: 設定
excludeSearch: true
---
```

### Google アナリティクス

[Google アナリティクス](https://marketingplatform.google.com/about/analytics/) を有効にするには、`hugo.yaml` で `services.googleAnalytics.ID` フラグを設定します：

```yaml {filename="hugo.yaml"}
services:
  googleAnalytics:
    ID: G-MEASUREMENT_ID
```

### Google 検索インデックス

ページを [Google 検索のインデックスからブロック](https://developers.google.com/search/docs/crawling-indexing/block-indexing) するには、ページのフロントマターで `noindex` を true に設定します：

```yaml
title: 設定（アーカイブ版）
params:
  noindex: true
```

ディレクトリ全体を除外するには、親の `_index.md` ファイルで [`cascade`](https://gohugo.io/configuration/cascade/) キーを使用します。

> [!NOTE]
> 検索クローラーをブロックするには、[`robots.txt` テンプレート](https://gohugo.io/templates/robots/) を作成できます。
> ただし、`robots.txt` の指示は必ずしも Google 検索結果からページを除外するわけではありません。

### LLMS.txt サポート

サイトの [大規模言語モデル](https://ja.wikipedia.org/wiki/大規模言語モデル) や AI エージェント向けの構造化テキストアウトラインを提供する [llms.txt](https://llmstxt.org/) 出力形式を有効にするには、サイトの `hugo.yaml` に `llms` 出力形式を追加します：

```diff {filename="hugo.yaml"}
outputs:
- home: [html]
+ home: [html, llms]
  page: [html]
  section: [html, rss]
```

これにより、サイトのルートに `llms.txt` ファイルが生成され、以下が含まれます：

- サイトタイトルと説明
- すべてのセクションとページの階層リスト
- ページの要約と公開日
- すべてのコンテンツへの直接リンク

フロントマターで `llms: false` を設定することで、特定のページやセクションを除外できます：

```yaml
---
title: "内部メモ"
llms: false
---
```

llms.txt ファイルはコンテンツ構造から自動生成され、AI ツールや言語モデルがコンテキストや参照のためにあなたのサイトにアクセスしやすくします。

### Open Graph

ページに [Open Graph](https://ogp.me/) メタデータを追加するには、フロントマターの params に値を追加します。

ページは複数の `image` と `video` タグを持つことができるため、それらの値は配列に配置します。
他の Open Graph プロパティは単一の値のみを持つことができます。
例えば、このページには `og:image` タグ（ソーシャルシェアでプレビューする画像を設定）と `og:audio` タグがあります。

```yaml {filename="content/docs/guide/configuration.md"}
title: "設定"
params:
  images:
    - "img/config-image.jpg"
  audio: "config-talk.mp3"
```
