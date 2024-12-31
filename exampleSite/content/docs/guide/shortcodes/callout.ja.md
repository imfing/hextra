---
title: コールアウトコンポーネント
linkTitle: コールアウト
aliases:
- callouts
prev: /docs/guide/shortcodes
---

読者に重要な情報を示すための組み込みコンポーネントです。

<!--more-->

> [!NOTE]
> [GitHubスタイルのアラート](../../markdown#alerts)は[v0.9.0](https://github.com/imfing/hextra/releases/tag/v0.9.0)以降でサポートされています。
> これはMarkdown構文を活用してコールアウトをレンダリングし、コンテンツの移植性と可読性を向上させます。

## 例

{{< callout emoji="👾">}}
  **コールアウト**は、注意を引くための短いテキストです。
{{< /callout >}}

{{< callout type="info" >}}
  **コールアウト**は、注意を引くための短いテキストです。
{{< /callout >}}

{{< callout type="warning" >}}
  **コールアウト**は、注意を引くための短いテキストです。
{{< /callout >}}

{{< callout type="error" >}}
  **コールアウト**は、注意を引くための短いテキストです。
{{< /callout >}}

## 使用方法

### デフォルト

{{< callout emoji="🌐">}}
  Hugoは、ブログ、ポートフォリオ、ドキュメントサイトなど、さまざまなウェブサイトを作成するために使用できます。
{{< /callout >}}

```markdown
{{</* callout emoji="🌐" */>}}
  Hugoは、ブログ、ポートフォリオ、ドキュメントサイトなど、さまざまなウェブサイトを作成するために使用できます。
{{</* /callout */>}}
```

### 情報

{{< callout type="info" >}}
  最新のリリースを確認するには、GitHubをご覧ください。
{{< /callout >}}

```markdown
{{</* callout type="info" */>}}
  最新のリリースを確認するには、GitHubをご覧ください。
{{</* /callout */>}}
```

### 警告

{{< callout type="warning" >}}
  このAPIは次のバージョンで非推奨になります。
{{< /callout >}}

```markdown
{{</* callout type="warning" */>}}
  **コールアウト**は、注意を引くための短いテキストです。
{{</* /callout */>}}
```

### エラー

{{< callout type="error" >}}
  何か問題が発生し、爆発しそうです。
{{< /callout >}}

```markdown
{{</* callout type="error" */>}}
  何か問題が発生し、爆発しそうです。
{{</* /callout */>}}
```