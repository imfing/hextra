---
title: コールアウトコンポーネント
linkTitle: コールアウト
aliases:
- callouts
prev: /docs/guide/shortcodes
---

読者に重要な情報を表示するための組み込みコンポーネントです。

<!--more-->

> [!NOTE]
> [GitHubスタイルのアラート](../../markdown#alerts)は[v0.9.0](https://github.com/imfing/hextra/releases/tag/v0.9.0)以降でサポートされています。
> これはMarkdown構文を活用してコールアウトをレンダリングするため、コンテンツの移植性と可読性が向上します。

## 例

{{< callout emoji="👾">}}
  **コールアウト**とは、注意を引くための短いテキストです。
{{< /callout >}}

{{< callout type="info" >}}
  **コールアウト**とは、注意を引くための短いテキストです。
{{< /callout >}}

{{< callout type="warning" >}}
  **コールアウト**とは、注意を引くための短いテキストです。
{{< /callout >}}

{{< callout type="error" >}}
  **コールアウト**とは、注意を引くための短いテキストです。
{{< /callout >}}

## 使用方法

### デフォルト

{{< callout emoji="🌐">}}
  Hugoはブログ、ポートフォリオ、ドキュメントサイトなど、様々な種類のウェブサイト作成に使用できます。
{{< /callout >}}

```markdown
{{</* callout emoji="🌐" */>}}
  Hugoはブログ、ポートフォリオ、ドキュメントサイトなど、様々な種類のウェブサイト作成に使用できます。
{{</* /callout */>}}
```

### 情報

{{< callout type="info" >}}
  最新リリースについてはGitHubをご覧ください。
{{< /callout >}}

```markdown
{{</* callout type="info" */>}}
  最新リリースについてはGitHubをご覧ください。
{{</* /callout */>}}
```

### 警告

{{< callout type="warning" >}}
  このAPIは次のバージョンで非推奨になります。
{{< /callout >}}

```markdown
{{</* callout type="warning" */>}}
  このAPIは次のバージョンで非推奨になります。
{{</* /callout */>}}
```

### エラー

{{< callout type="error" >}}
  問題が発生しました。まもなく爆発します。
{{< /callout >}}

```markdown
{{</* callout type="error" */>}}
  問題が発生しました。まもなく爆発します。
{{</* /callout */>}}
```