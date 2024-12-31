---
title: カードコンポーネント
linkTitle: カード
---

## 例

{{< cards >}}
  {{< card link="../callout" title="コールアウト" icon="warning" >}}
  {{< card link="../callout" title="タグ付きカード" icon="tag" tag="カスタムタグ">}}
  {{< card link="/" title="アイコンなし" >}}
{{< /cards >}}

{{< cards >}}
  {{< card link="/" title="画像カード" image="https://github.com/user-attachments/assets/71b7e3ec-1a8d-4582-b600-5425c6cc0407" subtitle="インターネット画像" >}}
  {{< card link="/" title="ローカル画像" image="/images/card-image-unprocessed.jpg" subtitle="staticディレクトリ下の未加工画像。" >}}
  {{< card link="/" title="ローカル画像" image="images/space.jpg" subtitle="assetsディレクトリ下の画像、Hugoで処理済み。" method="Resize" options="600x q80 webp" >}}
{{< /cards >}}

## 使用方法

```
{{</* cards */>}}
  {{</* card link="../callout" title="コールアウト" icon="warning" */>}}
  {{</* card link="../callout" title="タグ付きカード" icon="tag" tag= "カスタムタグ" */>}}
  {{</* card link="/" title="アイコンなし" */>}}
{{</* /cards */>}}
```

```
{{</* cards */>}}
  {{</* card link="/" title="画像カード" image="https://source.unsplash.com/featured/800x600?landscape" subtitle="Unsplashの風景画像" */>}}
  {{</* card link="/" title="ローカル画像" image="/images/card-image-unprocessed.jpg" subtitle="staticディレクトリ下の未加工画像。" */>}}
  {{</* card link="/" title="ローカル画像" image="images/space.jpg" subtitle="assetsディレクトリ下の画像、Hugoで処理済み。" method="Resize" options="600x q80 webp" */>}}
{{</* /cards */>}}
```

## カードパラメータ

| パラメータ  | 説明                                                     |
|----------- |-----------------------------------------------------------------|
| `link`     | URL（内部または外部）。                                     |
| `title`    | カードのタイトル見出し。                                     |
| `subtitle` | サブタイトル見出し（Markdown対応）。                           |
| `icon`     | アイコンの名前。                                               |
| `tag`      | タグ内のテキスト。                                                    |
| `tagColor` | タグの色: `gray`（デフォルト）、`yellow`、`red`、`blue`。 |
  
## 画像カード

さらに、カードは画像の追加と以下のパラメータを通じた処理をサポートします:

| パラメータ  | 説明                                 |
|----------- |---------------------------------------------|
| `image`    | カードの画像URLを指定します。       |
| `method`   | Hugoの画像処理メソッドを設定します。        |
| `options`  | Hugoの画像処理オプションを設定します。 |

カードは3種類の画像をサポートします:

1. リモート画像: `image`パラメータに完全なURLを指定。
2. 静的画像: Hugoの`static/`ディレクトリ内の相対パスを使用。
3. 処理済み画像: Hugoの`assets/`ディレクトリ内の相対パスを使用。

Hextraはビルド時に画像処理が必要かどうかを自動検出し、`options`パラメータまたはデフォルト設定（Resize、800x、品質80、WebPフォーマット）を適用します。
現在サポートされている`method`は`Resize`、`Fit`、`Fill`、`Crop`です。

Hugoの組み込み画像処理コマンド、メソッド、オプションの詳細については、[画像処理ドキュメント](https://gohugo.io/content-management/image-processing/)を参照してください。

## タグ

カードはタグの追加をサポートしており、追加のステータス情報を表示するのに役立ちます。

{{< cards >}}
  {{< card link="../callout" title="デフォルトタグ付きカード" tag="タグテキスト" >}}
  {{< card link="../callout" title="エラータグ付きカード" tag="タグテキスト" tagType="error" >}}
  {{< card link="../callout" title="情報タグ付きカード" tag="タグテキスト" tagType="info" >}}
  {{< card link="../callout" title="警告タグ付きカード" tag="タグテキスト" tagType="warning" >}}
  {{< card link="/" title="画像カード" image="https://github.com/user-attachments/assets/71b7e3ec-1a8d-4582-b600-5425c6cc0407" subtitle="インターネット画像" tag="タグテキスト" tagType="error" >}}
{{< /cards >}}

```
{{</* cards */>}}
  {{</* card link="../callout" title="デフォルトタグ色付きカード" tag="タグテキスト" */>}}
  {{</* card link="../callout" title="デフォルト赤タグ付きカード" tag="タグテキスト" tagType="error" */>}}
  {{</* card link="../callout" title="青タグ付きカード" tag="タグテキスト" tagType="info" */>}}
  {{</* card link="../callout" title="黄色タグ付きカード" tag="タグテキスト" tagType="warning" */>}}
{{</* /cards */>}}
```

## 列

`cards`ショートコードに`cols`パラメータを渡すことで、カードが広がる最大列数を指定できます。ただし、小さい画面では列は折りたたまれます。

{{< cards cols="1" >}}
  {{< card link="/" title="上部カード" >}}
  {{< card link="/" title="下部カード" >}}
{{< /cards >}}

{{< cards cols="2" >}}
  {{< card link="/" title="左カード" >}}
  {{< card link="/" title="右カード" >}}
{{< /cards >}}

```
{{</* cards cols="1" */>}}
  {{</* card link="/" title="上部カード" */>}}
  {{</* card link="/" title="下部カード" */>}}
{{</* /cards */>}}

{{</* cards cols="2" */>}}
  {{</* card link="/" title="左カード" */>}}
  {{</* card link="/" title="右カード" */>}}
{{</* /cards */>}}
```