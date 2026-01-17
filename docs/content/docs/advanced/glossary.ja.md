---
title: "用語集"
weight: 1
prev: /docs/advanced
---

Hextra は、サイト全体で使用する用語集の構築をサポートしています。

<!--more-->

{{< callout type="info" >}}
  Hugo の用語集サポートの詳細については、[Hugo 用語集クイックリファレンス](https://gohugo.io/quick-reference/glossary/)をご覧ください。
{{< /callout >}}

## データソースファイル

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

* `term`：概念やフレーズの正式名称。
* `definition`：用語の簡潔な説明。
* `abbr`（任意）：一般的に使用される略語や頭字語。

```yaml {filename="data/ja/termbase.yaml"}
- term: seo
  abbr: SEO
  definition: "検索エンジン最適化 — ウェブページの検索エンジンでの可視性を向上させる手法"
- term: "静的サイトジェネレーター"
  definition: "テキスト入力を処理して静的なウェブページを生成するソフトウェアエンジン"
```

## 用語ページ

用語集のサンプルページは [用語集]({{% relref "/glossary" %}}) で確認できます。すべての定義済み用語とその説明・略語が表示されます。
