---
title: 設定
weight: 2
---

Hugoは、Hugoサイトのルートにある`hugo.yaml`から設定を読み取ります。
この設定ファイルでは、サイトのすべての側面を設定できます。
利用可能な設定とベストプラクティスの包括的な理解を得るために、GitHub上のこのサイトの設定ファイル[`exampleSite/hugo.yaml`](https://github.com/imfing/hextra/blob/main/exampleSite/hugo.yaml)をチェックしてください。

<!--more-->

## ナビゲーション

### メニュー

右上のメニューは、設定ファイルの`menu.main`セクションで定義されます：

```yaml {filename="hugo.yaml"}
menu:
  main:
    - name: ドキュメント
      pageRef: /docs
      weight: 1
    - name: ブログ
      pageRef: /blog
      weight: 2
    - name: について
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

メニュー項目にはさまざまなタイプがあります：

1. `pageRef`を使用してサイト内のページにリンク
    ```yaml
    - name: ドキュメント
      pageRef: /docs
    ```
2. `url`を使用して外部URLにリンク
    ```yaml
    - name: GitHub
      url: "https://github.com"
    ```
3. `type: search`を使用して検索バーを表示
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

これらのメニュー項目は、`weight`パラメータを設定して並べ替えることができます。

### ロゴとタイトル

デフォルトのロゴを変更するには、`hugo.yaml`を編集し、`static`ディレクトリ下のロゴファイルへのパスを追加します。
オプションで、ロゴをクリックしたときにユーザーがリダイレクトされるリンクや、ロゴの幅と高さをピクセル単位で設定できます。

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

## サイドバー

### メインサイドバー

メインサイドバーは、コンテンツディレクトリの構造から自動的に生成されます。
詳細については、[ファイルの整理](/docs/guide/organize-files)ページを参照してください。

左サイドバーから単一のページを除外するには、ページのフロントマターで`sidebar.exclude`パラメータを設定します：

```yaml {filename="content/docs/guide/configuration.md"}
---
title: 設定
sidebar:
  exclude: true
---
```

### 追加リンク

サイドバーの追加リンクは、設定ファイルの`menu.sidebar`セクションで定義されます：

```yaml {filename="hugo.yaml"}
menu:
  sidebar:
    - name: その他
      params:
        type: separator
      weight: 1
    - name: "について"
      pageRef: "/about"
      weight: 2
    - name: "Hugo Docs ↗"
      url: "https://gohugo.io/documentation/"
      weight: 3
```

## 右サイドバー

### 目次

目次は、コンテンツファイルの見出しから自動的に生成されます。ページのフロントマターで`toc: false`を設定することで無効にできます。

```yaml {filename="content/docs/guide/configuration.md"}
---
title: 設定
toc: false
---
```

### ページ編集リンク

ページ編集リンクを設定するには、設定ファイルで`params.editURL.base`パラメータを設定します：

```yaml {filename="hugo.yaml"}
params:
  editURL:
    enable: true
    base: "https://github.com/your-username/your-repo/edit/main"
```

提供されたURLをルートディレクトリとして、各ページの編集リンクが自動的に生成されます。
特定のページの編集リンクを設定したい場合は、ページのフロントマターで`editURL`パラメータを設定します：

```yaml {filename="content/docs/guide/configuration.md"}
---
title: 設定
editURL: "https://example.com/edit/this/page"
---
```

## フッター

### 著作権

ウェブサイトのフッターに表示される著作権テキストを変更するには、`i18n/en.yaml`という名前のファイルを作成します。
このファイルに、以下のように新しい著作権テキストを指定します：

```yaml {filename="i18n/en.yaml"}
copyright: "© 2024 YOUR TEXT HERE"
```

参考として、GitHubリポジトリに[`i18n/en.yaml`](https://github.com/imfing/hextra/blob/main/i18n/en.yaml)ファイルの例があります。また、著作権テキストにMarkdown形式を使用することもできます。

## その他

### ファビコン

サイトの[ファビコン](https://ja.wikipedia.org/wiki/Favicon)をカスタマイズするには、`static`フォルダ下にアイコンファイルを配置して、[テーマのデフォルトのファビコン](https://github.com/imfing/hextra/tree/main/static)を上書きします：

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

プロジェクトに`favicon.ico`、`favicon.svg`、`favicon-dark.svg`ファイルを含めて、サイトのファビコンが正しく表示されるようにします。

`favicon.ico`は一般的に古いブラウザ用ですが、`favicon.svg`と`favicon-dark.svg`は現代のブラウザでサポートされています。
[favicon.io](https://favicon.io/)や[favycon](https://github.com/ruisaraiva19/favycon)などのツールを使用して、このようなアイコンを生成できます。

### テーマ設定

`theme`設定を使用して、デフォルトのテーマモードとトグルボタンを設定し、訪問者がライトモードとダークモードを切り替えられるようにします。

```yaml {filename="hugo.yaml"}
params:
  theme:
    # light | dark | system
    default: system
    displayToggle: true
```

`theme.default`のオプション：

- `light` - 常にライトモードを使用
- `dark` - 常にダークモードを使用
- `system` - オペレーティングシステムの設定と同期（デフォルト）

`theme.displayToggle`パラメータを使用して、テーマを変更するためのトグルボタンを表示できます。
`true`に設定すると、訪問者はデフォルト設定を上書きしてライトモードとダークモードを切り替えることができます。

### ページ幅

ページの幅は、設定ファイルの`params.page.width`パラメータでカスタマイズできます：

```yaml {filename="hugo.yaml"}
params:
  page:
    # full (100%), wide (90rem), normal (1280px)
    width: wide
```

利用可能なオプションは`full`、`wide`、`normal`です。デフォルトでは、ページ幅は`normal`に設定されています。

同様に、ナビゲーションバーとフッターの幅は、`params.navbar.width`と`params.footer.width`パラメータでカスタマイズできます。

### 検索インデックス

[FlexSearch](https://github.com/nextapps-de/flexsearch)による全文検索はデフォルトで有効です。
検索インデックスをカスタマイズするには、設定ファイルで`params.search.flexsearch.index`パラメータを設定します：

```yaml {filename="hugo.yaml"}
params:
  # 検索
  search:
    enable: true
    type: flexsearch

    flexsearch:
      # ページをインデックスする方法: content | summary | heading | title
      index: content
```

`flexsearch.index`のオプション：

- `content` - ページの全内容（デフォルト）
- `summary` - ページの要約、詳細は[Hugoコンテンツ要約](https://gohugo.io/content-management/summaries/)を参照
- `heading` - レベル1とレベル2の見出し
- `title` - ページタイトルのみを含める

検索トークン化をカスタマイズするには、設定ファイルで`params.search.flexsearch.tokenize`パラメータを設定します：

```yaml {filename="hugo.yaml"}
params:
    # ...
    flexsearch:
      # full | forward | reverse | strict 
      tokenize: forward
```

[`flexsearch.tokenize`](https://github.com/nextapps-de/flexsearch/#tokenizer-prefix-search)のオプション：

- `strict` - 単語全体をインデックス
- `forward` - 前方方向に単語を増分的にインデックス
- `reverse` - 両方向に単語を増分的にインデックス
- `full` - すべての可能な組み合わせをインデックス

検索インデックスからページを除外するには、ページのフロントマターで`excludeSearch: true`を設定します：

```yaml {filename="content/docs/guide/configuration.md"}
---
title: 設定
excludeSearch: true
---
```

### Googleアナリティクス

[Googleアナリティクス](https://marketingplatform.google.com/about/analytics/)を有効にするには、`hugo.yaml`で`services.googleAnalytics.ID`フラグを設定します：

```yaml {filename="hugo.yaml"}
services:
  googleAnalytics:
    ID: G-MEASUREMENT_ID
```