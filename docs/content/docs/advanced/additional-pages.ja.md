---
title: "追加ページ"
weight: 1
prev: /docs/advanced
aliases:
  - /docs/advanced/glossary/
---

Hextra には明示的に有効化する追加ページがあります。用語集とアーカイブです。

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

投稿を年ごとにまとめたアーカイブタイムラインページを作成できます。

1. アーカイブページを作成します：
   ```yaml {filename="content/archives/_index.md"}
   ---
   title: Archives
   layout: archives
   toc: false
   ---
   ```
2. （任意）トップメニューに追加します：
   ```yaml {filename="hugo.yaml"}
   menu:
     main:
       - identifier: archives
         name: Archives
         pageRef: /archives
   ```
3. （任意・多言語）同じ layout を使った翻訳版アーカイブページを追加します。例：
   - `content/archives/_index.fa.md`
   - `content/archives/_index.ja.md`
   - `content/archives/_index.zh-cn.md`
4. （任意）アーカイブ対象のセクションを変更します。デフォルトは `blog` です。
   ```yaml {filename="hugo.yaml"}
   params:
     archives:
       section: blog
   ```
5. （任意）アーカイブ項目の日付表示形式を変更します。デフォルトは `Jan 02` です。
   ```yaml {filename="hugo.yaml"}
   params:
     archives:
       dateFormat: "Jan 02"
   ```

空状態メッセージは i18n キー `noResultsFound` を使用します。

アーカイブのサンプルページは [アーカイブ]({{% relref "/archives" %}}) で確認できます。
