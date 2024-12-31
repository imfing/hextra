---
title: ファイルの整理
weight: 1
prev: /docs/guide
---

## ディレクトリ構造

デフォルトでは、Hugoは`content`ディレクトリ内のMarkdownファイルを検索し、ディレクトリの構造がウェブサイトの最終的な出力構造を決定します。
このサイトを例に取ります：

<!--more-->

{{< filetree/container >}}
  {{< filetree/folder name="content" >}}
    {{< filetree/file name="_index.md" >}}
    {{< filetree/folder name="docs" state="open" >}}
      {{< filetree/file name="_index.md" >}}
      {{< filetree/file name="getting-started.md" >}}
      {{< filetree/folder name="guide" state="open" >}}
        {{< filetree/file name="_index.md" >}}
        {{< filetree/file name="organize-files.md" >}}
      {{< /filetree/folder >}}
    {{< /filetree/folder >}}
    {{< filetree/folder name="blog" state="open" >}}
      {{< filetree/file name="_index.md" >}}
      {{< filetree/file name="post-1.md" >}}
    {{< /filetree/folder >}}
  {{< /filetree/folder >}}
{{< /filetree/container >}}

各`_index.md`ファイルは、対応するセクションのインデックスページです。他のMarkdownファイルは通常のページです。

```
content
├── _index.md // <- /
├── docs
│   ├── _index.md // <- /docs/
│   ├── getting-started.md // <- /docs/getting-started/
│   └── guide
│       ├── _index.md // <- /docs/guide/
│       └── organize-files.md // <- /docs/guide/organize-files/
└── blog
    ├── _index.md // <- /blog/
    └── post-1.md // <- /blog/post-1/
```

## レイアウト

Hextraは、異なるコンテンツタイプに対して3つのレイアウトを提供します：

| レイアウト | ディレクトリ             | 特徴                                                         |
| :-------- | :-------------------- | :--------------------------------------------------------------- |
| `docs`    | `content/docs/`       | 構造化されたドキュメントに最適で、このセクションと同じです。        |
| `blog`    | `content/blog/`       | ブログ投稿用で、リスト表示と詳細記事表示の両方があります。 |
| `default` | その他のディレクトリ | サイドバーなしの単一ページ記事表示です。                        |

セクションの動作をビルトインレイアウトと同じにするには、セクションの`_index.md`のフロントマターで希望するタイプを指定します。

```yaml {filename="content/my-docs/_index.md"}
---
title: My Docs
cascade:
  type: docs
---
```

上記の設定例により、`content/my-docs/`内のコンテンツファイルはデフォルトでドキュメント（`docs`タイプ）として扱われます。

## サイドバーナビゲーション

サイドバーナビゲーションは、コンテンツの整理に基づいて自動的に生成されます。サイドバーの順序を手動で設定するには、Markdownファイルのフロントマターで`weight`パラメータを使用します。

```yaml {filename="content/docs/guide/_index.md"}
---
title: Guide
weight: 2
---
```

{{< callout emoji="ℹ️">}}
  サイドバーがあまり深くならないようにすることをお勧めします。多くのコンテンツがある場合は、**複数のセクションに分割する**ことを検討してください。
{{< /callout >}}

## パンくずナビゲーション

パンくずは、`/content`のディレクトリ構造に基づいて自動生成されます。

例えば、[上記のファイル構造](#directory-structure)を考えます。その構造に基づいて、`/docs/guide/organize-files/`ページの上部にパンくずが自動的に表示されます：

```
Documentation > Guide > Organize Files
```

### パンくずリンクのタイトルをカスタマイズ

デフォルトでは、各パンくずリンクはそのページの`title`パラメータに基づいて生成されます。これをカスタマイズするには、`linkTitle`を指定します。

例えば、`Organize Files`の代わりに`Foo Bar`と表示したい場合：

```yaml {filename="content/docs/guide/organize-files.md"}
---
linkTitle: Foo Bar
title: Organize Files
---
```

これにより、以下のパンくずが生成されます：
```
Documentation > Guide > Foo Bar
```

### パンくずを非表示にする

ページのフロントマターで`breadcrumbs: false`を指定することで、パンくずを完全に非表示にできます：

```yaml {filename="content/docs/guide/organize-files.md"}
---
breadcrumbs: false
title: Organize Files
---
```

## コンテンツディレクトリの設定

デフォルトでは、Hugoはサイトを構築するためにルートの`content/`ディレクトリを使用します。
例えば`docs/`など、異なるディレクトリをコンテンツに使用する必要がある場合は、サイト設定`hugo.yaml`で[`contentDir`](https://gohugo.io/getting-started/configuration/#contentdir)パラメータを設定することで行えます。

## 画像の追加

画像を追加する最も簡単な方法は、画像ファイルをMarkdownファイルと同じディレクトリに置くことです。
例えば、`my-page.md`ファイルと同じディレクトリに`image.png`ファイルを追加します：

{{< filetree/container >}}
  {{< filetree/folder name="content" >}}
    {{< filetree/folder name="docs" >}}
        {{< filetree/file name="my-page.md" >}}
        {{< filetree/file name="image.png" >}}
    {{< /filetree/folder >}}
  {{< /filetree/folder >}}
{{< /filetree/container >}}

その後、以下のMarkdown構文を使用してコンテンツに画像を追加できます：

```markdown {filename="content/docs/my-page.md"}
![](image.png)
```

また、Hugoの[ページバンドル][page-bundles]機能を利用して、画像ファイルをMarkdownファイルと一緒に整理することもできます。そのためには、`my-page.md`ファイルを`my-page`ディレクトリに変換し、コンテンツを`index.md`というファイルに置き、画像ファイルを`my-page`ディレクトリ内に置きます：

{{< filetree/container >}}
  {{< filetree/folder name="content" >}}
    {{< filetree/folder name="docs" >}}
        {{< filetree/folder name="my-page" >}}
            {{< filetree/file name="index.md" >}}
            {{< filetree/file name="image.png" >}}
        {{< /filetree/folder >}}
    {{< /filetree/folder >}}
  {{< /filetree/folder >}}
{{< /filetree/container >}}

```markdown {filename="content/docs/my-page/index.md"}
![](image.png)
```

または、画像ファイルを`static`ディレクトリに置くこともできます。これにより、すべてのページで画像が利用可能になります：

{{< filetree/container >}}
  {{< filetree/folder name="static" >}}
    {{< filetree/folder name="images" >}}
        {{< filetree/file name="image.png" >}}
    {{< /filetree/folder >}}
  {{< /filetree/folder >}}
  {{< filetree/folder name="content" >}}
    {{< filetree/folder name="docs" >}}
        {{< filetree/file name="my-page.md" >}}
    {{< /filetree/folder >}}
  {{< /filetree/folder >}}
{{< /filetree/container >}}

画像パスはスラッシュ`/`で始まり、`static`ディレクトリからの相対パスであることに注意してください：

```markdown {filename="content/docs/my-page.md"}
![](/images/image.png)
```

[page-bundles]: https://gohugo.io/content-management/page-bundles/#leaf-bundles