---
title: コメントシステム
linkTitle: コメント
---

Hextra はサイトにコメントシステムを追加する機能をサポートしています。
現在 [giscus](https://giscus.app/) が利用可能です。

<!--more-->

## giscus

[giscus](https://giscus.app/) は [GitHub Discussions](https://docs.github.com/ja/discussions) を利用したコメントシステムです。無料でオープンソースです。

giscus を有効にするには、サイト設定ファイルに以下を追加してください:

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

giscus の設定は [giscus.app](https://giscus.app/) ウェブサイトから構築できます。詳細もそちらで確認できます。

特定のページでコメントを有効/無効にするには、ページのフロントマターで設定します:

```yaml {filename="content/docs/about.md"}
---
title: このサイトについて
comments: true
---
```