---
title: コメントシステム
linkTitle: コメント
---

Hextraは、サイトにコメントシステムを追加することをサポートしています。
現在、[giscus](https://giscus.app/)がサポートされています。

<!--more-->

## giscus

[giscus](https://giscus.app/)は、[GitHub Discussions](https://docs.github.com/ja/discussions)を利用したコメントシステムです。無料でオープンソースです。

giscusを有効にするには、サイトの設定ファイルに以下を追加する必要があります：

```yaml {filename="hugo.yaml"}
params:
  comments:
    enable: false
    type: giscus

    giscus:
      repo: <リポジトリ>
      repoId: <リポジトリID>
      category: <カテゴリ>
      categoryId: <カテゴリID>
```

giscusの設定は、[giscus.app](https://giscus.app/)のウェブサイトから構築できます。詳細もそこで確認できます。

特定のページでコメントを有効または無効にするには、ページのフロントマターに以下を追加します：

```yaml {filename="content/docs/about.md"}
---
title: について
comments: true
---
```