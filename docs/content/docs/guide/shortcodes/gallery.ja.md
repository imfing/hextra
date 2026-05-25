---
title: "画像ギャラリー"
linktitle: "画像ギャラリー"
sidebar:
  exclude: true
---

## 概要

`gallery` ショートコードは、インタラクティブな [PhotoSwipe v5](https://photoswipe.com/) ライトボックスを伴って画像コレクションを表示します。任意の画像をクリックすると、前/次のナビゲーション、キャプション、キーボード操作に対応したフルスクリーンビューアーが開きます。

## 基本的な使い方

1 つ以上の `{{</* gallery-item */>}}` ショートコードを `{{</* gallery */>}}` で囲みます。同じギャラリー内でローカル画像とリモート画像を混在させることができます。

```markdown
{{</* gallery */>}}
  {{</* gallery-item src="images/space.jpg" caption="宇宙" */>}}
  {{</* gallery-item src="https://picsum.photos/id/1015/1600/1200" thumb="https://picsum.photos/id/1015/800/600" width="1600" height="1200" caption="渓谷" */>}}
  {{</* gallery-item src="https://picsum.photos/id/1018/1600/1200" thumb="https://picsum.photos/id/1018/800/600" width="1600" height="1200" caption="山の湖" */>}}
{{</* /gallery */>}}
```

{{< gallery >}}
  {{< gallery-item src="images/space.jpg" caption="宇宙" >}}
  {{< gallery-item src="https://picsum.photos/id/1015/1600/1200" thumb="https://picsum.photos/id/1015/800/600" width="1600" height="1200" caption="渓谷" >}}
  {{< gallery-item src="https://picsum.photos/id/1018/1600/1200" thumb="https://picsum.photos/id/1018/800/600" width="1600" height="1200" caption="山の湖" >}}
{{< /gallery >}}

## 画像のソース

画像は複数の場所から取得できます。ショートコードは以下の順序で `src` を解決します。

1. **ページバンドルリソース**: [リーフバンドル](https://gohugo.io/content-management/page-bundles/) 内で `index.md` と並べて配置されたファイル。
2. **グローバルアセット**: サイトの `assets/` ディレクトリ内のファイル。
3. **静的ファイル**: サイトの `static/` ディレクトリ内のファイル（先頭に `/` を付けて参照します）。
4. **リモート URL**: `http://` または `https://` で始まる任意の `src`。

ローカル画像の場合、サイズは自動的に検出されます。リモート画像の場合は、画像の読み込み前にライトボックスが領域を確保できるよう、`width` と `height` を指定してください。

```markdown
{{</* gallery-item
  src="https://picsum.photos/id/1043/1920/1280"
  width="1920"
  height="1280"
  caption="picsum.photos の写真"
*/>}}
```

オプションの `thumb` パラメータは、ページ内のグリッドで使用される小さな画像を指定します。ユーザーがクリックすると、PhotoSwipe は引き続きフル解像度の `src` を開きます。

## レイアウトタイプ

`type` パラメータでレイアウトアルゴリズムを選択します。デフォルトは `grid` です。

### Grid（デフォルト）

すべてのセルが同じサイズの均一なグリッドです。`cols` で表示する列数を制御します。

```markdown
{{</* gallery type="grid" cols="3" */>}}
  {{</* gallery-item src="https://picsum.photos/id/1015/1200/1200" thumb="https://picsum.photos/id/1015/600/600" width="1200" height="1200" caption="川" */>}}
  {{</* gallery-item src="https://picsum.photos/id/1018/1200/1200" thumb="https://picsum.photos/id/1018/600/600" width="1200" height="1200" caption="湖" */>}}
  {{</* gallery-item src="https://picsum.photos/id/1019/1200/1200" thumb="https://picsum.photos/id/1019/600/600" width="1200" height="1200" caption="小道" */>}}
  {{</* gallery-item src="https://picsum.photos/id/1039/1200/1200" thumb="https://picsum.photos/id/1039/600/600" width="1200" height="1200" caption="峡谷" */>}}
  {{</* gallery-item src="https://picsum.photos/id/1043/1200/1200" thumb="https://picsum.photos/id/1043/600/600" width="1200" height="1200" caption="滝" */>}}
  {{</* gallery-item src="https://picsum.photos/id/1059/1200/1200" thumb="https://picsum.photos/id/1059/600/600" width="1200" height="1200" caption="森" */>}}
{{</* /gallery */>}}
```

{{< gallery type="grid" cols="3" >}}
  {{< gallery-item src="https://picsum.photos/id/1015/1200/1200" thumb="https://picsum.photos/id/1015/600/600" width="1200" height="1200" caption="川" >}}
  {{< gallery-item src="https://picsum.photos/id/1018/1200/1200" thumb="https://picsum.photos/id/1018/600/600" width="1200" height="1200" caption="湖" >}}
  {{< gallery-item src="https://picsum.photos/id/1019/1200/1200" thumb="https://picsum.photos/id/1019/600/600" width="1200" height="1200" caption="小道" >}}
  {{< gallery-item src="https://picsum.photos/id/1039/1200/1200" thumb="https://picsum.photos/id/1039/600/600" width="1200" height="1200" caption="峡谷" >}}
  {{< gallery-item src="https://picsum.photos/id/1043/1200/1200" thumb="https://picsum.photos/id/1043/600/600" width="1200" height="1200" caption="滝" >}}
  {{< gallery-item src="https://picsum.photos/id/1059/1200/1200" thumb="https://picsum.photos/id/1059/600/600" width="1200" height="1200" caption="森" >}}
{{< /gallery >}}

### Carousel

前/次のコントロールと矢印キーナビゲーションを備えた、横方向にスクロール可能な画像の列です。

```markdown
{{</* gallery type="carousel" */>}}
  {{</* gallery-item src="https://picsum.photos/id/1015/1600/1200" thumb="https://picsum.photos/id/1015/800/600" width="1600" height="1200" caption="川" */>}}
  {{</* gallery-item src="https://picsum.photos/id/1018/1600/1200" thumb="https://picsum.photos/id/1018/800/600" width="1600" height="1200" caption="湖" */>}}
  {{</* gallery-item src="https://picsum.photos/id/1019/1600/1200" thumb="https://picsum.photos/id/1019/800/600" width="1600" height="1200" caption="小道" */>}}
  {{</* gallery-item src="https://picsum.photos/id/1039/1600/1200" thumb="https://picsum.photos/id/1039/800/600" width="1600" height="1200" caption="峡谷" */>}}
  {{</* gallery-item src="https://picsum.photos/id/1043/1600/1200" thumb="https://picsum.photos/id/1043/800/600" width="1600" height="1200" caption="滝" */>}}
  {{</* gallery-item src="https://picsum.photos/id/1059/1600/1200" thumb="https://picsum.photos/id/1059/800/600" width="1600" height="1200" caption="森" */>}}
{{</* /gallery */>}}
```

{{< gallery type="carousel" >}}
  {{< gallery-item src="https://picsum.photos/id/1015/1600/1200" thumb="https://picsum.photos/id/1015/800/600" width="1600" height="1200" caption="川" >}}
  {{< gallery-item src="https://picsum.photos/id/1018/1600/1200" thumb="https://picsum.photos/id/1018/800/600" width="1600" height="1200" caption="湖" >}}
  {{< gallery-item src="https://picsum.photos/id/1019/1600/1200" thumb="https://picsum.photos/id/1019/800/600" width="1600" height="1200" caption="小道" >}}
  {{< gallery-item src="https://picsum.photos/id/1039/1600/1200" thumb="https://picsum.photos/id/1039/800/600" width="1600" height="1200" caption="峡谷" >}}
  {{< gallery-item src="https://picsum.photos/id/1043/1600/1200" thumb="https://picsum.photos/id/1043/800/600" width="1600" height="1200" caption="滝" >}}
  {{< gallery-item src="https://picsum.photos/id/1059/1600/1200" thumb="https://picsum.photos/id/1059/800/600" width="1600" height="1200" caption="森" >}}
{{< /gallery >}}

### Mosaic

`gallery-item` の `span` パラメータを使用して、個々のアイテムが複数の列や行にまたがることができる CSS グリッドレイアウトです。`span` の有効な値は `wide`（2 列）、`tall`（2 行）、`large`（2 列 2 行）です。

```markdown
{{</* gallery type="mosaic" */>}}
  {{</* gallery-item src="https://picsum.photos/id/1015/1600/900" thumb="https://picsum.photos/id/1015/1200/600" width="1600" height="900" caption="川" span="wide" */>}}
  {{</* gallery-item src="https://picsum.photos/id/1018/800/1200" thumb="https://picsum.photos/id/1018/400/600" width="800" height="1200" caption="湖" span="tall" */>}}
  {{</* gallery-item src="https://picsum.photos/id/1019/800/600" thumb="https://picsum.photos/id/1019/400/300" width="800" height="600" caption="小道" */>}}
  {{</* gallery-item src="https://picsum.photos/id/1039/800/600" thumb="https://picsum.photos/id/1039/400/300" width="800" height="600" caption="峡谷" */>}}
  {{</* gallery-item src="https://picsum.photos/id/1043/1600/900" thumb="https://picsum.photos/id/1043/1200/600" width="1600" height="900" caption="滝" span="wide" */>}}
{{</* /gallery */>}}
```

{{< gallery type="mosaic" >}}
  {{< gallery-item src="https://picsum.photos/id/1015/1600/900" thumb="https://picsum.photos/id/1015/1200/600" width="1600" height="900" caption="川" span="wide" >}}
  {{< gallery-item src="https://picsum.photos/id/1018/800/1200" thumb="https://picsum.photos/id/1018/400/600" width="800" height="1200" caption="湖" span="tall" >}}
  {{< gallery-item src="https://picsum.photos/id/1019/800/600" thumb="https://picsum.photos/id/1019/400/300" width="800" height="600" caption="小道" >}}
  {{< gallery-item src="https://picsum.photos/id/1039/800/600" thumb="https://picsum.photos/id/1039/400/300" width="800" height="600" caption="峡谷" >}}
  {{< gallery-item src="https://picsum.photos/id/1043/1600/900" thumb="https://picsum.photos/id/1043/1200/600" width="1600" height="900" caption="滝" span="wide" >}}
{{< /gallery >}}

### Masonry

レスポンシブなメイソンリーレイアウトです。列数はビューポートの幅に応じて自動的に決まるため、このタイプでは `cols` パラメータは無視されます。各アイテムは自然なアスペクト比を保ちます。

```markdown
{{</* gallery type="masonry" */>}}
  {{</* gallery-item src="https://picsum.photos/id/1015/1200/800"  thumb="https://picsum.photos/id/1015/600/400"  width="1200" height="800"  caption="川" */>}}
  {{</* gallery-item src="https://picsum.photos/id/1018/800/1200"  thumb="https://picsum.photos/id/1018/400/600"  width="800"  height="1200" caption="湖" */>}}
  {{</* gallery-item src="https://picsum.photos/id/1019/1200/900"  thumb="https://picsum.photos/id/1019/600/450"  width="1200" height="900"  caption="小道" */>}}
  {{</* gallery-item src="https://picsum.photos/id/1039/1000/1000" thumb="https://picsum.photos/id/1039/500/500"  width="1000" height="1000" caption="峡谷" */>}}
  {{</* gallery-item src="https://picsum.photos/id/1043/1200/800"  thumb="https://picsum.photos/id/1043/600/400"  width="1200" height="800"  caption="滝" */>}}
  {{</* gallery-item src="https://picsum.photos/id/1059/800/1200"  thumb="https://picsum.photos/id/1059/400/600"  width="800"  height="1200" caption="森" */>}}
{{</* /gallery */>}}
```

{{< gallery type="masonry" >}}
  {{< gallery-item src="https://picsum.photos/id/1015/1200/800" thumb="https://picsum.photos/id/1015/600/400" width="1200" height="800" caption="川" >}}
  {{< gallery-item src="https://picsum.photos/id/1018/800/1200" thumb="https://picsum.photos/id/1018/400/600" width="800" height="1200" caption="湖" >}}
  {{< gallery-item src="https://picsum.photos/id/1019/1200/900" thumb="https://picsum.photos/id/1019/600/450" width="1200" height="900" caption="小道" >}}
  {{< gallery-item src="https://picsum.photos/id/1039/1000/1000" thumb="https://picsum.photos/id/1039/500/500" width="1000" height="1000" caption="峡谷" >}}
  {{< gallery-item src="https://picsum.photos/id/1043/1200/800" thumb="https://picsum.photos/id/1043/600/400" width="1200" height="800" caption="滝" >}}
  {{< gallery-item src="https://picsum.photos/id/1059/800/1200" thumb="https://picsum.photos/id/1059/400/600" width="800" height="1200" caption="森" >}}
{{< /gallery >}}

## ライトボックスの代わりにリンクを使う

`gallery-item` に `link` を設定すると、クリック時にライトボックスを開く代わりにその URL に遷移します。

```markdown
{{</* gallery */>}}
  {{</* gallery-item src="https://picsum.photos/id/1015/800/600" width="800" height="600" caption="Picsum を見る" link="https://picsum.photos/" */>}}
  {{</* gallery-item src="https://picsum.photos/id/1018/800/600" width="800" height="600" caption="ライトボックス" */>}}
{{</* /gallery */>}}
```

## 設定

デフォルトでは、PhotoSwipe は jsDelivr CDN から読み込まれます。セルフホスト版やミラー版を使うには、サイト設定の `params` に `gallery` ブロックを追加してください。詳細は [設定]({{< ref "/docs/guide/configuration" >}}#local-and-mirrored-script-assets) ページを参照してください。

## パラメータ

### `gallery`

| パラメータ | 型     | デフォルト | 説明                                                             |
| ---------- | ------ | ---------- | ---------------------------------------------------------------- |
| `type`     | string | `grid`     | レイアウトタイプ: `grid`、`mosaic`、`masonry`、または `carousel` |
| `cols`     | number | `3`        | 列数（`masonry` では使用されません）                             |
| `gap`      | string | `0.5rem`   | アイテム間の CSS gap                                             |

### `gallery-item`

| パラメータ | 型     | デフォルト | 説明                                                                                                          |
| ---------- | ------ | ---------- | ------------------------------------------------------------------------------------------------------------- |
| `src`      | string | -          | 画像ソース（必須）。ページリソースパス、グローバルアセットパス、静的ファイルパス、リモート URL を受け付けます |
| `alt`      | string | caption    | 画像の代替テキスト                                                                                            |
| `caption`  | string | -          | 画像の下とライトボックス内に表示されるキャプション                                                            |
| `link`     | string | -          | 設定すると、クリック時にライトボックスを開く代わりにその URL へ遷移します                                     |
| `width`    | number | 自動       | 画像の幅（ピクセル）。サイズが自動検出できないリモート URL では必須                                           |
| `height`   | number | 自動       | 画像の高さ（ピクセル）。サイズが自動検出できないリモート URL では必須                                         |
| `thumb`    | string | 自動派生   | グリッドに表示される小さなプレビュー画像。ローカル画像ではデフォルトで `src` のリサイズ版が使用されます       |
| `span`     | string | -          | Mosaic 用の span 指定: `wide`（2 列）、`tall`（2 行）、または `large`（2x2）。`type="mosaic"` のときのみ適用  |
