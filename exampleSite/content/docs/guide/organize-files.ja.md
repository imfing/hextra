---
title: ファイルの整理
weight: 1
prev: /docs/guide
---

## ディレクトリ構造

デフォルトでは、Hugo は `content` ディレクトリ内の Markdown ファイルを検索し、ディレクトリの構造がウェブサイトの最終的な出力構造を決定します。
このサイトを例に挙げます：

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

各 `_index.md` ファイルは、対応するセクションのインデックスページです。他の Markdown ファイルは通常のページです。

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

Hextra は、異なるコンテンツタイプに対して3つのレイアウトを提供します：

| レイアウト | ディレクトリ          | 特徴                                                                 |
| :-------- | :------------------- | :------------------------------------------------------------------- |
| `docs`    | `content/docs/`      | 構造化されたドキュメントに最適。このセクションと同じです。            |
| `blog`    | `content/blog/`      | ブログ投稿用。リスト表示と詳細記事ビューの両方があります。            |
| `default` | その他のディレクトリ  | サイドバーなしの単一ページ記事ビュー。                                |

セクションの動作を組み込みレイアウトと同じにするには、セクションの `_index.md` のフロントマターで希望するタイプを指定します。

```yaml {filename="content/my-docs/_index.md"}
---
title: My Docs
cascade:
  type: docs
---
```

上記の設定例により、`content/my-docs/` 内のコンテンツファイルはデフォルトでドキュメント（`docs` タイプ）として扱われます。

## サイドバーナビゲーション

サイドバーナビゲーションは、コンテンツのアルファベット順に基づいて自動的に生成されます。サイドバーの順序を手動で設定するには、Markdown ファイルのフロントマターで `weight` パラメータを使用します。

```yaml {filename="content/docs/guide/_index.md"}
---
title: Guide
weight: 2
---
```

{{< callout type="info" >}}
  サイドバーを深くしすぎないことをお勧めします。多くのコンテンツがある場合は、**複数のセクションに分割する**ことを検討してください。
{{< /callout >}}

## セクションナビゲーション

### セクションページネーションの順序

[`PAGE.PrevInSection`](https://gohugo.io/methods/page/previnsection/) や [`PAGE.NextInSection`](https://gohugo.io/methods/page/nextinsection/) でアクセスされるページの順序は、デフォルトで逆順になっています。

この逆順を無効にするには、ページのフロントマターで `reversePagination` カスタムパラメータを `false` に設定します。デフォルトでは `reversePagination` は `true` に設定されています。

#### 例

次のディレクトリ構造を考えます：

{{< filetree/container >}}
  {{< filetree/folder name="content" >}}
    {{< filetree/file name="_index.md" >}}
    {{< filetree/folder name="blog" state="open" >}}
      {{< filetree/file name="_index.md" >}}
      {{< filetree/folder name="my-blog-series" state="open" >}}
        {{< filetree/file name="_index.md" >}}
        {{< filetree/folder name="post-a" state="open" >}}
          {{< filetree/file name="index.md" >}}
        {{< /filetree/folder >}}
        {{< filetree/folder name="post-b" state="open" >}}
          {{< filetree/file name="index.md" >}}
        {{< /filetree/folder >}}
        {{< filetree/folder name="post-c" state="open" >}}
          {{< filetree/file name="index.md" >}}
        {{< /filetree/folder >}}
      {{< /filetree/folder >}}
    {{< /filetree/folder >}}
  {{< /filetree/folder >}}
{{< /filetree/container >}}

そして、投稿のフロントマターは次のようになっています：

```yaml {filename="content/blog/my-blog-series/post-a/index.md"}
---
title: Post A
weight: 1
---
```
```yaml {filename="content/blog/my-blog-series/post-b/index.md"}
---
title: Post B
weight: 2
---
```
```yaml {filename="content/blog/my-blog-series/post-c/index.md"}
---
title: Post C
weight: 3
---
```

読者が `post-b/index.md` の下部にいる場合、次のページは `post-a`、前のページは `post-c` と表示されます。これは `reversePagination` がデフォルトで `true` に設定されているためです。これは、投稿を最新から古い順に表示したい場合に適しています。しかし、複数のパートからなるブログシリーズの場合、通常は最初の投稿を読み、次に2番目、という順序で読んでほしいものです。そのため、逆順を無効にします。

このシリーズのすべてのブログ投稿で `reversePagination` をオフにするには、`my-blog-series/_index.md` に次のフロントマターを追加します：

```yaml {filename="content/blog/my-blog-series/_index.md"}
---
title: My Blog Series
cascade:
    params:
        reversePagination: false
---
```

ここでは [`cascade`](https://gohugo.io/content-management/front-matter/#cascade-1) を使用して、`my-blog-series` 内のすべての投稿に設定を伝播させ、すべての子孫で `reversePagination` が `false` に設定されるようにしています。これにより、読者が `post-b/index.md` にいる場合、次のページは `post-c`、前のページは `post-a` と表示されるようになります。

## パンくずリストナビゲーション

パンくずリストは、`/content` のディレクトリ構造に基づいて自動生成されます。

たとえば、[上記のディレクトリ構造](#directory-structure)を考えます。その構造に基づいて、`/docs/guide/organize-files/` のページ上部のパンくずリストは自動的に次のように表示されます：

```
Documentation > Guide > Organize Files
```

### パンくずリストのリンクタイトルのカスタマイズ

デフォルトでは、各パンくずリストのリンクはそのページの `title` パラメータに基づいて生成されます。これをカスタマイズするには、`linkTitle` を指定します。

たとえば、`Organize Files` の代わりにパンくずリストを `Foo Bar` にしたい場合：

```yaml {filename="content/docs/guide/organize-files.md"}
---
linkTitle: Foo Bar
title: Organize Files
---
```

これにより、次のパンくずリストが生成されます：
```
Documentation > Guide > Foo Bar
```

### パンくずリストの非表示

ページからパンくずリストを完全に非表示にするには、フロントマターで `breadcrumbs: false` を指定します：

```yaml {filename="content/docs/guide/organize-files.md"}
---
breadcrumbs: false
title: Organize Files
---
```

## コンテンツディレクトリの設定

デフォルトでは、Hugo はサイトを構築するためにルートの `content/` ディレクトリを使用します。
別のディレクトリ（例えば `docs/`）をコンテンツ用に使用する必要がある場合は、サイト設定 `hugo.yaml` で [`contentDir`](https://gohugo.io/getting-started/configuration/#contentdir) パラメータを設定することで可能です。

## 画像の追加

画像を追加する最も簡単な方法は、画像ファイルを Markdown ファイルと同じディレクトリに置くことです。
たとえば、`my-page.md` ファイルと同じディレクトリに `image.png` ファイルを追加します：

{{< filetree/container >}}
  {{< filetree/folder name="content" >}}
    {{< filetree/folder name="docs" >}}
        {{< filetree/file name="my-page.md" >}}
        {{< filetree/file name="image.png" >}}
    {{< /filetree/folder >}}
  {{< /filetree/folder >}}
{{< /filetree/container >}}

そして、次の Markdown 構文を使用してコンテンツに画像を追加できます：

```markdown {filename="content/docs/my-page.md"}
![](image.png)
```

また、Hugo の [ページバンドル][page-bundles] 機能を利用して、画像ファイルを Markdown ファイルと一緒に整理することもできます。そのためには、`my-page.md` ファイルを `my-page` ディレクトリに変換し、コンテンツを `index.md` というファイルに置き、画像ファイルを `my-page` ディレクトリ内に配置します：

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

あるいは、画像ファイルを `static` ディレクトリに置くこともできます。これにより、画像はすべてのページで利用可能になります：

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

画像パスはスラッシュ `/` で始まり、static ディレクトリからの相対パスであることに注意してください：

```markdown {filename="content/docs/my-page.md"}
![](/images/image.png)
```

[page-bundles]: https://gohugo.io/content-management/page-bundles/#leaf-bundles