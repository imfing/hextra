---
title: "追加ページ"
weight: 1
prev: /docs/advanced
aliases:
  - /docs/advanced/glossary/
---

Hextra には明示的に有効化する追加ページがあります。用語集、アーカイブ、トーク、シリーズです。

<!--more-->

## 用語集

{{< callout type="info" >}}
  Hugo の用語集サポートの詳細については、[Hugo 用語集クイックリファレンス](https://gohugo.io/quick-reference/glossary/)をご覧ください。
{{< /callout >}}

### データソースファイル

用語の定義は、各[対応言語](../multi-language/)ごとに `termbase.yaml` データファイルに一元管理されています。

{{< filetree/container >}}
  {{< filetree/folder name="data" state="open" >}}
    {{< filetree/folder name="en" state="open" >}}
      {{< filetree/file name="termbase.yaml" >}}
    {{< /filetree/folder >}}
    {{< filetree/folder name="fr" state="open" >}}
      {{< filetree/file name="termbase.yaml" >}}
    {{< /filetree/folder >}}
    {{< filetree/folder name="ja" state="open" >}}
      {{< filetree/file name="termbase.yaml" >}}
    {{< /filetree/folder >}}
  {{< /filetree/folder >}}
{{< /filetree/container >}}

各 YAML データファイルには、用語の一覧が含まれています。各エントリには以下が含まれます：

- `term`：概念やフレーズの正式名称。
- `definition`：用語の簡潔な説明。
- `abbr`（任意）：一般的に使用される略語や頭字語。

```yaml {filename="data/ja/termbase.yaml"}
- term: seo
  abbr: SEO
  definition: "検索エンジン最適化 — ウェブページの検索エンジンでの可視性を向上させる手法"
- term: "静的サイトジェネレーター"
  definition: "テキスト入力を処理して静的なウェブページを生成するソフトウェアエンジン"
```

### 用語ページ

定義済みの用語、その説明、および略語を一覧表示するグロッサリーのインデックスページをレンダリングするには、
サポートされている各言語ごとに、言語固有のグロッサリー用コンテンツファイルを定義する必要があります。
ファイル名には言語コードのサフィックスを使用してください。例: `content/glossary/_index.ja.md`。

```markdown {filename="content/glossary/_index.ja.md"}
---
title: 用語集
layout: glossary
---
```

グロッサリーのサンプルページは [用語集]({{% relref "/glossary" %}}) で確認できます。

## アーカイブ

`archives` レイアウトは汎用のグループ化インデックスです。任意のページ集合を年ごとにグループ化したタイムライン（またはフラットリスト）として表示し、デフォルトではページが属するセクションをアーカイブします。組み込みのアーカイブページのほか、後述の[トーク](#トーク)や[シリーズ](#シリーズ)などのページ種別を実現します。

別のセクションを指す独立したアーカイブページを作成するには（たとえばブログ投稿を一覧する `/archives` ページ）、ページの front matter で `group.section` を設定します：

```yaml {filename="content/archives/_index.md"}
---
title: Archives
layout: archives
toc: false
group:
  section: blog
---
```

これが組み込みのサンプルの仕組みです。ページは `content/archives/` にありますが、`blog` セクションをアーカイブします。アーカイブのサンプルページは [アーカイブ]({{% relref "/archives" %}}) で確認できます。

### オプション

- `group.section`: アーカイブ対象のセクション。デフォルトはページ自身のセクションで、`params.archives.section`（デフォルト `blog`）にフォールバックします。
- `group.dateFormat`: リスト項目の日付表示形式。デフォルトは `Jan 02` で、`params.archives.dateFormat` にフォールバックします。
- `group.groupBy`: `year`（デフォルト）、`month`、またはフラットリストの `none`。タームページ（シリーズなど）はすでにタームでグループ化されているため、デフォルトは `none` です。

空状態メッセージは i18n キー `noResultsFound` を使用します。

## トーク

`talks` のようなコンテンツセクションを、アーカイブページと同じ年ごとのインデックスとして一覧できます。

1. セクションのインデックスページを `archives` レイアウトで作成します：
   ```yaml {filename="content/talks/_index.md"}
   ---
   title: Talks
   layout: archives
   toc: false
   ---
   ```
   このページはデフォルトで自分のセクションをアーカイブするため、`/talks/` にはすべてのトークが年ごとにグループ化されて表示されます。追加の設定は不要です。
2. （任意）トップメニューに追加します：
   ```yaml {filename="hugo.yaml"}
   menu:
     main:
       - identifier: talks
         name: Talks
         pageRef: /talks
   ```
3. （任意・多言語）同じ layout を使った翻訳版インデックスページを追加します。例：`content/talks/_index.ja.md`。

トークアーカイブのファイル構成は次のようになります：

{{< filetree/container >}}
  {{< filetree/folder name="content" state="open" >}}
    {{< filetree/folder name="talks" state="open" >}}
      {{< filetree/file name="_index.md" >}}
      {{< filetree/folder name="open-source-communities" state="open" >}}
        {{< filetree/file name="index.md" >}}
        {{< filetree/file name="slides.pdf" >}}
      {{< /filetree/folder >}}
      {{< filetree/file name="css-architecture.md" >}}
      {{< filetree/folder name="hugo-theming" state="open" >}}
        {{< filetree/file name="index.md" >}}
        {{< filetree/file name="cover.png" >}}
      {{< /filetree/folder >}}
    {{< /filetree/folder >}}
  {{< /filetree/folder >}}
{{< /filetree/container >}}

各トーク投稿は、単一の Markdown ファイル（`css-architecture.md`）またはページバンドルディレクトリにできます。ページバンドルでは、`index.md` をその画像やアセット（スライドやカバー画像など）と同じサブディレクトリ（`open-source-communities/`、`hugo-theming/`）にまとめます。`layout: archives` の front matter を持つのは `_index.md` だけです：

```yaml {filename="content/talks/hugo-theming/index.md"}
---
title: Theming Hugo Sites with Tailwind CSS
date: 2025-11-03
tags:
  - Hugo
  - Tailwind CSS
---
```

トークアーカイブのサンプルページは [トーク]({{% relref "/talks" %}}) で確認できます。

## シリーズ

シリーズは、関連する投稿（通常はブログ投稿）を名前でグループ化するものです。シリーズはタクソノミー用語であり、同じ `series` 用語を持つすべての投稿は、自動生成される `/series/<名前>/` ページにグループ化されます。シリーズ名がグループなので、ページには投稿が追加のグループ化なしにまとめて一覧表示されます。

1. `series` タクソノミーを設定します：
   ```yaml {filename="hugo.yaml"}
   taxonomies:
     series: series
   ```
   `taxonomies` を設定すると Hugo のデフォルトが置き換わります。既存のタクソノミーを維持するには、それらも列挙します：
   ```yaml {filename="hugo.yaml"}
   taxonomies:
     tag: tags
     category: categories
     series: series
   ```
2. シリーズに属する各投稿の front matter に用語を付けます：
   ```yaml {filename="content/blog/part-1/index.md"}
   ---
   title: "Demo Series Part 1"
   date: 2024-09-12
   series:
     - demo-series
   ---
   ```
   複数の用語を並べることで、投稿を複数のシリーズに含めることができます。`series` front matter は投稿ページの Open Graph `og:see_also` リンクも生成します。
3. （任意）シリーズのタイトルを設定し `archives` レイアウトを有効にするタームインデックスページを作成します：
   ```yaml {filename="content/series/demo-series/_index.md"}
   ---
   title: Demo Series
   layout: archives
   toc: false
   ---
   ```
   このページがなくても、`/series/demo-series/` にはシリーズのすべての投稿が一覧表示されます。

シリーズのファイル構成は次のようになります：

{{< filetree/container >}}
  {{< filetree/folder name="content" state="open" >}}
    {{< filetree/folder name="blog" state="open" >}}
      {{< filetree/folder name="part-1" state="open" >}}
        {{< filetree/file name="index.md" >}}
        {{< filetree/file name="diagram.png" >}}
      {{< /filetree/folder >}}
      {{< filetree/file name="part-2.md" >}}
    {{< /filetree/folder >}}
    {{< filetree/folder name="series" state="open" >}}
      {{< filetree/folder name="demo-series" state="open" >}}
        {{< filetree/file name="_index.md" >}}
      {{< /filetree/folder >}}
    {{< /filetree/folder >}}
  {{< /filetree/folder >}}
{{< /filetree/container >}}

シリーズ投稿は通常のセクション（この例では `blog`）に置いたままにします。`content/series/` ディレクトリは投稿の置き場所ではありません。Hugo のタクソノミーコンテンツディレクトリであり、自動生成される `/series/<名前>/` タームページをカスタマイズするためだけに使います（タイトル、`archives` レイアウト）。このディレクトリは任意です。なくても `/series/<名前>/` は生成され、シリーズ投稿がシリーズ名の下に一覧表示されます。

トーク投稿と同様に、シリーズ投稿も単一の Markdown ファイルまたはページバンドルディレクトリ（例：`part-1/`）にできます。ページバンドルでは投稿を画像やアセットと一緒にまとめられます。

### メニューにシリーズのドロップダウンを追加する

トップナビゲーションにすべてのシリーズを一覧するドロップダウンを追加するには、`type: series` のメニュー項目を追加します：

```yaml {filename="hugo.yaml"}
menu:
  main:
    - identifier: series
      name: Series
      params:
        type: series
```

ドロップダウンにはすべてのシリーズ用語が自動的に表示されます。シリーズに表示するラベルを変更するには、タームインデックスページ（`content/series/<名前>/_index.md`）でタイトルを設定します。

シリーズアーカイブのサンプルページは [デモシリーズ]({{% relref "/series/demo-series" %}}) で確認できます。
