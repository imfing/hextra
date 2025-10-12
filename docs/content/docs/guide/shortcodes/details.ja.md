---
title: 詳細
---

折りたたみ可能なコンテンツを表示するための組み込みコンポーネントです。

<!--more-->

## 例

{{< details title="詳細" >}}

これは詳細のコンテンツです。

Markdown は **サポートされています**。

{{< /details >}}

{{< details title="クリックして表示" closed="true" >}}

これはデフォルトで非表示になります。

{{< /details >}}

## 使用方法

````markdown
{{</* details title="詳細" */>}}

これは詳細のコンテンツです。

Markdown は **サポートされています**。

{{</* /details */>}}
````

````markdown
{{</* details title="クリックして表示" closed="true" */>}}

これはデフォルトで非表示になります。

{{</* /details */>}}
````