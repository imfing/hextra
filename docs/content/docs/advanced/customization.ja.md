---
title: Hextraのカスタマイズ
linkTitle: カスタマイズ
---

Hextraは、`hugo.yaml`設定ファイル内でテーマを設定するためのデフォルトのカスタマイズオプションを提供しています。
このページでは、利用可能なオプションとテーマをさらにカスタマイズする方法について説明します。

<!--more-->

## カスタムCSS

カスタムCSSを追加するには、サイト内に`assets/css/custom.css`ファイルを作成します。Hextraはこのファイルを自動的に読み込みます。

### フォントファミリー

コンテンツのフォントファミリーは以下のようにカスタマイズできます:

```css {filename="assets/css/custom.css"}
.content {
  font-family: "Times New Roman", Times, serif;
}
```

### インラインコード要素

`他のテキスト`と混在するテキストの色は以下のようにカスタマイズできます:

```css {filename="assets/css/custom.css"}
.content code:not(.code-block code) {
  color: #c97c2e;
}
```

### プライマリカラー

テーマのプライマリカラーは、`--primary-hue`、`--primary-saturation`、`--primary-lightness`変数を設定することでカスタマイズできます:

```css {filename="assets/css/custom.css"}
:root {
  --primary-hue: 100deg;
  --primary-saturation: 90%;
  --primary-lightness: 50%;
}
```

### コンポーネントレイアウト変数

Hextraは、ページ、ナビゲーションバー、フッターの幅をカスタマイズするためのCSS変数を提供しています:

```css {filename="assets/css/custom.css"}
:root {
  /* ページ幅 - hugo.yamlのparams.page.widthでも設定可能 */
  --hextra-max-page-width: 80rem; /* デフォルト: 80rem (標準), 90rem (ワイド), 100% (フル) */

  /* ナビゲーションバー幅 - hugo.yamlのparams.navbar.widthでも設定可能 */
  --hextra-max-navbar-width: 90rem; /* 独立したナビゲーションバー幅 */

  /* フッター幅 - hugo.yamlのparams.footer.widthでも設定可能 */
  --hextra-max-footer-width: 80rem; /* 独立したフッター幅 */
}
```

### Tailwindテーマ変数

Tailwind CSS v4をベースにしたHextra v0.10.0以降では、`@layer theme`ブロック内でCSS変数をオーバーライドすることでテーマをカスタマイズできます。

これにより、個々のクラスを変更することなく、グローバルな外観をカスタマイズできます。

```css {filename="assets/css/custom.css"}
@layer theme {
  :root {
    --hx-default-mono-font-family: "JetBrains Mono", monospace;
  }
}
```

詳細については、[Tailwindテーマ変数のドキュメント](https://tailwindcss.com/docs/theme#default-theme-variable-reference)を参照してください。

### さらなるテーマカスタマイズ

テーマは、公開されているCSSクラスをオーバーライドすることでさらにカスタマイズできます。フッター要素をカスタマイズする例:

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

- `hextra-steps` - ステップコンテナ

##### タブ

- `hextra-tabs-panel` - タブパネルコンテナ
- `hextra-tabs-toggle` - タブトグルボタン

##### ファイルツリー

- `hextra-filetree` - ファイルツリーコンテナ

##### フォルダ

- `hextra-filetree-folder` - ファイルツリーフォルダコンテナ

#### ナビゲーションバー

- `hextra-nav-container` - ナビゲーションバーコンテナ
- `hextra-nav-container-blur` - ブラー効果付きナビゲーションバーコンテナ
- `hextra-hamburger-menu` - ハンバーガーメニューボタン

#### フッター

- `hextra-footer` - フッター要素
- `hextra-custom-footer` - カスタムフッターセクションコンテナ

#### 検索

- `hextra-search-wrapper` - 検索ラッパーコンテナ
- `hextra-search-input` - 検索入力要素
- `hextra-search-results` - 検索結果リストコンテナ

検索UI内で使用されるオプションのネストされたクラス:

- `hextra-search-title` - 結果タイトル要素
- `hextra-search-active` - アクティブな結果アンカー
- `hextra-search-no-result` - 空の状態要素
- `hextra-search-prefix` - グループ化された結果のパンくずリスト/プレフィックスラベル
- `hextra-search-excerpt` - 結果スニペットテキスト
- `hextra-search-match` - ハイライトされたクエリスパン

#### 目次

- `hextra-toc` - 目次コンテナ

#### サイドバー

- `hextra-sidebar-container` - サイドバーコンテナ
- `hextra-sidebar-active-item` - サイドバーのアクティブアイテム

#### 言語スイッチャー

- `hextra-language-switcher` - 言語スイッチャーボタン
- `hextra-language-options` - 言語オプションコンテナ

#### テーマトグル

- `hextra-theme-toggle` - テーマトグルボタン

#### コードコピーボタン

- `hextra-code-copy-btn-container` - コードコピーボタンコンテナ
- `hextra-code-copy-btn` - コードコピーボタン
- `hextra-copy-icon` - コピーアイコン要素
- `hextra-success-icon` - 成功アイコン要素

#### コードブロック

- `hextra-code-block` - コードブロックコンテナ
- `hextra-code-filename` - コードブロックのファイル名要素

#### フィーチャーカード

- `hextra-feature-card` - フィーチャーカードリンク要素

#### フィーチャーグリッド

- `hextra-feature-grid` - フィーチャーグリッドコンテナ

### シンタックスハイライト

利用可能なシンタックスハイライトテーマの一覧は、[Chroma Styles Gallery](https://xyproto.github.io/splash/docs/all.html)で確認できます。スタイルシートは以下のコマンドで生成できます:

```shell
hugo gen chromastyles --style=github
```

デフォルトのシンタックスハイライトテーマをオーバーライドするには、生成されたスタイルをカスタムCSSファイルに追加します。

## カスタムスクリプト

すべてのページのheadの終わりにカスタムスクリプトを追加するには、以下のファイルを作成します:

```
layouts/_partials/custom/head-end.html
```

## フッターへのカスタムセクション追加

フッターに追加セクションを追加するには、サイト内に`layouts/_partials/custom/footer.html`ファイルを作成します。

```html {filename="layouts/_partials/custom/footer.html"}
<!-- ここにフッター要素を追加 -->
```

追加されたセクションは、フッターの著作権セクションの前に追加されます。
[HTML](https://developer.mozilla.org/ja/docs/Web/HTML)と[Hugoテンプレート構文](https://gohugo.io/templates/)を使用して独自のコンテンツを追加できます。

フッターセクションで利用可能なHugo変数: `.switchesVisible`と`.displayCopyright`。

## カスタムレイアウト

テーマのレイアウトは、サイトの`layouts`ディレクトリに同じ名前のファイルを作成することでオーバーライドできます。
例えば、ドキュメントの`single.html`レイアウトをオーバーライドするには、サイト内に`layouts/docs/single.html`ファイルを作成します。

詳細については、[Hugoテンプレート][hugo-template-docs]を参照してください。

## さらなるカスタマイズ

探しているものが見つかりませんでしたか？[ディスカッションを開く](https://github.com/imfing/hextra/discussions)か、テーマへの貢献をお願いします！

[hugo-template-docs]: https://gohugo.io/templates/