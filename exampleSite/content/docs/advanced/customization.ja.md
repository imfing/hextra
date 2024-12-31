---
title: Hextraのカスタマイズ
linkTitle: カスタマイズ
---

Hextraは、`hugo.yaml`設定ファイル内でいくつかのデフォルトのカスタマイズオプションを提供し、テーマを設定できます。
このページでは、利用可能なオプションと、テーマをさらにカスタマイズする方法について説明します。

<!--more-->

## カスタムCSS

カスタムCSSを追加するには、サイト内に`assets/css/custom.css`ファイルを作成する必要があります。Hextraはこのファイルを自動的に読み込みます。

### フォントファミリー

コンテンツのフォントファミリーは、以下のようにカスタマイズできます：

```css {filename="assets/css/custom.css"}
.content {
  font-family: "Times New Roman", Times, serif;
}
```

### インラインコード要素

`other text`と混在するテキストの色は、以下のようにカスタマイズできます：

```css {filename="assets/css/custom.css"}
.content code:not(.code-block code) {
  color: #c97c2e;
}
```

### プライマリカラー

テーマのプライマリカラーは、`--primary-hue`、`--primary-saturation`、`--primary-lightness`変数を設定することでカスタマイズできます：

```css {filename="assets/css/custom.css"}
:root {
  --primary-hue: 100deg;
  --primary-saturation: 90%;
  --primary-lightness: 50%;
}
```

### テーマのさらなるカスタマイズ

テーマは、公開されているCSSクラスを介してデフォルトのスタイルをオーバーライドすることでさらにカスタマイズできます。フッター要素をカスタマイズする例：

```css {filename="assets/css/custom.css"}
.hextra-footer {
  /* フッター要素に適用されるスタイル */
}

.hextra-footer:is(html[class~="dark"] *) {
  /* ダークモードでのフッター要素に適用されるスタイル */
}
```

以下のクラスを使用して、テーマのさまざまな部分をカスタマイズできます。

#### 一般

- `hextra-scrollbar` - スクロールバー要素
- `content` - ページコンテンツコンテナ

#### ショートコード

##### バッジ

- `hextra-badge` - バッジ要素

##### カード

- `hextra-card` - カード要素
- `hextra-card-image` - カード画像要素
- `hextra-card-icon` - カードアイコン要素
- `hextra-card-subtitle` - カードサブタイトル要素

##### カードグリッド

- `hextra-cards` - カードグリッドコンテナ

##### Jupyter Notebook

- `hextra-jupyter-code-cell` - Jupyterコードセルコンテナ
- `hextra-jupyter-code-cell-outputs-container` - Jupyterコードセル出力コンテナ
- `hextra-jupyter-code-cell-outputs` - Jupyterコードセル出力div要素

##### PDF

- `hextra-pdf` - PDFコンテナ要素

##### ステップ

- `steps` - ステップコンテナ

##### タブ

- `hextra-tabs-panel` - タブパネルコンテナ
- `hextra-tabs-toggle` - タブトグルボタン

##### ファイルツリー

- `hextra-filetree` - ファイルツリーコンテナ

##### フォルダ

- `hextra-filetree-folder` - ファイルツリーフォルダコンテナ

#### ナビゲーションバー

- `nav-container` - ナビゲーションバーコンテナ
- `nav-container-blur` - ナビゲーションバーコンテナのぼかし要素
- `hamburger-menu` - ハンバーガーメニューボタン

#### フッター

- `hextra-footer` - フッター要素
- `hextra-custom-footer` - カスタムフッターセクションコンテナ

#### 検索

- `search-wrapper` - 検索ラッパーコンテナ
- `search-input` - 検索入力要素
- `search-results` - 検索結果リストコンテナ

#### 目次

- `hextra-toc` - 目次コンテナ

#### サイドバー

- `mobile-menu-overlay` - モバイルメニューのオーバーレイ要素
- `sidebar-container` - サイドバーコンテナ
- `sidebar-active-item` - サイドバーのアクティブアイテム

#### 言語スイッチャー

- `language-switcher` - 言語スイッチャーボタン
- `language-options` - 言語オプションコンテナ

#### テーマトグル

- `theme-toggle` - テーマトグルボタン

#### コードコピーボタン

- `hextra-code-copy-btn-container` - コードコピーボタンコンテナ
- `hextra-code-copy-btn` - コードコピーボタン

#### コードブロック

- `hextra-code-block` - コードブロックコンテナ

#### フィーチャーカード

- `hextra-feature-card` - フィーチャーカードリンク要素

#### フィーチャーグリッド

- `hextra-feature-grid` - フィーチャーグリッドコンテナ

#### パンくずリスト

パンくずリスト用の特定のクラスはありません。

### シンタックスハイライト

利用可能なシンタックスハイライトテーマのリストは、[Chroma Styles Gallery](https://xyproto.github.io/splash/docs/all.html)で確認できます。スタイルシートは以下のコマンドで生成できます：

```shell
hugo gen chromastyles --style=github
```

デフォルトのシンタックスハイライトテーマをオーバーライドするには、生成されたスタイルをカスタムCSSファイルに追加します。

## カスタムスクリプト

すべてのページのheadの最後にカスタムスクリプトを追加するには、以下のファイルを追加します：

```
layouts/partials/custom/head-end.html
```

## フッターのカスタムセクション

フッターに追加のセクションを追加するには、サイト内に`layouts/partials/custom/footer.html`ファイルを作成します。

```html {filename="layouts/partials/custom/footer.html"}
<!-- ここにフッター要素を追加 -->
```

追加されたセクションは、フッターの著作権セクションの前に追加されます。
[HTML](https://developer.mozilla.org/ja/docs/Web/HTML)と[Hugoテンプレート構文](https://gohugo.io/templates/)を使用して、独自のコンテンツを追加できます。

フッターセクションで利用可能なHugo変数は、`.switchesVisible`と`.copyrightVisible`です。

## カスタムレイアウト

テーマのレイアウトは、サイトの`layouts`ディレクトリ内に同じ名前のファイルを作成することでオーバーライドできます。
例えば、ドキュメント用の`single.html`レイアウトをオーバーライドするには、サイト内に`layouts/docs/single.html`ファイルを作成します。

詳細については、[Hugoテンプレート][hugo-template-docs]を参照してください。

## さらなるカスタマイズ

探しているものが見つかりませんでしたか？[ディスカッションを開く](https://github.com/imfing/hextra/discussions)か、テーマに貢献してください！

[hugo-template-docs]: https://gohugo.io/templates/