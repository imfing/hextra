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

### デフォルト

{{< callout emoji="🌐">}}
  **コールアウト** は注目を集めることを目的とした短いテキストです。
{{< /callout >}}

```markdown
{{</* callout emoji="🌐" */>}}
    **コールアウト** は注目を集めることを目的とした短いテキストです。
{{</* /callout */>}}
```

### 情報

{{< callout type="info" >}}
  **コールアウト** は注目を集めることを目的とした短いテキストです。
{{< /callout >}}

```markdown
{{</* callout type="info" */>}}
  **コールアウト** は注目を集めることを目的とした短いテキストです。
{{</* /callout */>}}
```

### 警告

{{< callout type="warning" >}}
  **コールアウト** は注目を集めることを目的とした短いテキストです。
{{< /callout >}}

```markdown
{{</* callout type="warning" */>}}
  **コールアウト** は注目を集めることを目的とした短いテキストです。
{{</* /callout */>}}
```

### エラー

{{< callout type="error" >}}
  **コールアウト** は注目を集めることを目的とした短いテキストです。
{{< /callout >}}

```markdown
{{</* callout type="error" */>}}
  **コールアウト** は注目を集めることを目的とした短いテキストです。
{{</* /callout */>}}
```

## オプション

| パラメータ   | 説明                                          |
|---------|---------------------------------------------|
| `type`  | コールアウトのタイプ。(デフォルト、`info`、`warning`、`error`) |
| `emoji` | コールアウトの前に表示される絵文字。                          |
| `icon`  | コールアウトの絵文字 (タイプに関連、またはカスタム絵文字にすることもできます)。   |
