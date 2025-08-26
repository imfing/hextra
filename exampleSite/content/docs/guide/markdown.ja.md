---
title: Markdown
weight: 2
---

Hugo はテキストの書式設定やリスト作成などに [Markdown](https://en.wikipedia.org/wiki/Markdown) 構文をサポートしています。このページでは、最も一般的な Markdown 構文の例を紹介します。

<!--more-->

## Markdown の例

### テキストのスタイリング

| スタイル       | 構文                     | 例                                     | 出力                                  |
| :------------ | :----------------------- | :------------------------------------ | :------------------------------------ |
| 太字           | `**太字テキスト**`       | `**太字テキスト**`                    | **太字テキスト**                      |
| 斜体           | `*斜体テキスト*`         | `*斜体テキスト*`                      | _斜体テキスト_                        |
| 打ち消し線     | `~~打ち消し線テキスト~~` | `~~打ち消し線テキスト~~`              | ~~打ち消し線テキスト~~                |
| 下付き文字     | `<sub></sub>`            | `これは<sub>下付き文字</sub>です`     | これは<sub>下付き文字</sub>です       |
| 上付き文字     | `<sup></sup>`            | `これは<sup>上付き文字</sup>です`     | これは<sup>上付き文字</sup>です       |

### ブロッククォート

引用元付きのブロッククォート

> メモリを共有することで通信するのではなく、通信することでメモリを共有しなさい。<br>
> — <cite>Rob Pike[^1]</cite>

[^1]: 上記の引用は、2015年11月18日のGopherfestでのRob Pikeの[講演](https://www.youtube.com/watch?v=PAAkCSZUG1c)から抜粋したものです。

```markdown {filename=Markdown}
> メモリを共有することで通信するのではなく、通信することでメモリを共有しなさい。<br>
> — <cite>Rob Pike[^1]</cite>

[^1]: 上記の引用は、2015年11月18日のGopherfestでのRob Pikeの[講演](https://www.youtube.com/watch?v=PAAkCSZUG1c)から抜粋したものです。
```

### アラート

{{< new-feature version="v0.9.0" >}}

アラートは、重要な情報を強調するために使用できるブロッククォート構文を基にしたMarkdown拡張機能です。
[GitHubスタイルのアラート](https://docs.github.com/ja/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax#alerts)がサポートされています。
最新バージョンのHextraと[Hugo v0.146.0](https://github.com/gohugoio/hugo/releases/tag/v0.146.0)以降を使用していることを確認してください。

> [!NOTE]
> コンテンツをざっと見る際にもユーザーが知っておくべき有用な情報。

> [!TIP]
> 物事をより良く、または簡単に行うための役立つアドバイス。

> [!IMPORTANT]
> ユーザーが目標を達成するために知っておく必要がある重要な情報。

> [!WARNING]
> 問題を回避するためにユーザーがすぐに対処する必要がある緊急情報。

> [!CAUTION]
> 特定のアクションによるリスクやネガティブな結果についての警告。

```markdown {filename=Markdown}
> [!NOTE]
> コンテンツをざっと見る際にもユーザーが知っておくべき有用な情報。

> [!TIP]
> 物事をより良く、または簡単に行うための役立つアドバイス。

> [!IMPORTANT]
> ユーザーが目標を達成するために知っておく必要がある重要な情報。

> [!WARNING]
> 問題を回避するためにユーザーがすぐに対処する必要がある緊急情報。

> [!CAUTION]
> 特定のアクションによるリスクやネガティブな結果についての警告。
```

### テーブル

テーブルはコアMarkdown仕様の一部ではありませんが、Hugoはデフォルトでサポートしています。

| 名前  | 年齢 |
| :---- | :-- |
| Bob   | 27  |
| Alice | 23  |

```markdown {filename=Markdown}
| 名前  | 年齢 |
| :---- | :-- |
| Bob   | 27  |
| Alice | 23  |
```

#### テーブル内のインラインMarkdown

| 斜体       | 太字       | コード     |
| :-------- | :-------- | :-------- |
| _斜体_     | **太字**   | `コード`   |

```markdown {filename=Markdown}
| 斜体       | 太字       | コード     |
| :-------- | :-------- | :-------- |
| _斜体_     | **太字**   | `コード`   |
```

### コードブロック

{{< cards >}}
  {{< card link="../../guide/syntax-highlighting" title="シンタックスハイライト" icon="sparkles" >}}
{{< /cards >}}

### リスト

#### 順序付きリスト

1. 最初の項目
2. 2番目の項目
3. 3番目の項目

```markdown {filename=Markdown}
1. 最初の項目
2. 2番目の項目
3. 3番目の項目
```

#### 順序なしリスト

* リスト項目
* 別の項目
* さらに別の項目

```markdown {filename=Markdown}
* リスト項目
* 別の項目
* さらに別の項目
```

#### ネストされたリスト

- 果物
  - りんご
  - オレンジ
  - バナナ
- 乳製品
  - 牛乳
  - チーズ

```markdown {filename=Markdown}
- 果物
  - りんご
  - オレンジ
  - バナナ
- 乳製品
  - 牛乳
  - チーズ
```

#### タスクリスト

- [x] ドキュメント作成
- [ ] コードレビュー
- [ ] 変更のデプロイ

```markdown {filename=Markdown}
- [x] ドキュメント作成
- [ ] コードレビュー
- [ ] 変更のデプロイ
```

### 画像

![風景](https://picsum.photos/800/600)

```markdown {filename=Markdown}
![風景](https://picsum.photos/800/600)
```

キャプション付き:

![風景](https://picsum.photos/800/600 "Lorem Picsum")

```markdown {filename=Markdown}
![風景](https://picsum.photos/800/600 "Lorem Picsum")
```

より高度な機能が必要な場合は、Hugoの組み込み[Figureショートコード](https://gohugo.io/shortcodes/figure/)を使用してください。

## 設定

HugoはMarkdown解析に[Goldmark](https://github.com/yuin/goldmark)を使用しています。
Markdownのレンダリング設定は`hugo.yaml`の`markup.goldmark`で行えます。
以下はHextraのデフォルト設定です:

```yaml {filename="hugo.yaml"}
markup:
  goldmark:
    renderer:
      unsafe: true
  highlight:
    noClasses: false
```

その他の設定オプションについては、Hugoドキュメントの[マークアップ設定](https://gohugo.io/getting-started/configuration-markup/)を参照してください。

## 学習リソース

- [Markdownガイド](https://www.markdownguide.org/)
- [Markdownチートシート](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)
- [Markdownチュートリアル](https://www.markdowntutorial.com/)
- [Markdownリファレンス](https://commonmark.org/help/)