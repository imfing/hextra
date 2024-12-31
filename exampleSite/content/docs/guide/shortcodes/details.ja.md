---
title: 詳細
---

折りたたみ可能なコンテンツを表示するための組み込みコンポーネント。

<!--more-->

## 例

{{% details title="詳細" %}}

これは詳細のコンテンツです。

Markdownは**サポートされています**。

{{% /details %}}

{{% details title="クリックして表示" closed="true" %}}

これはデフォルトで非表示になります。

{{% /details %}}

## 使い方

````markdown
{{%/* details title="詳細" */%}}

これは詳細のコンテンツです。

Markdownは**サポートされています**。

{{%/* /details */%}}
````

````markdown
{{%/* details title="クリックして表示" closed="true" */%}}

これはデフォルトで非表示になります。

{{%/* /details */%}}
````