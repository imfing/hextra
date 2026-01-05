---
title: 详情
---

一个内置组件，用于显示可折叠的内容。

<!--more-->

## 示例

{{< details title="详情" >}}

这是详情的内容。

支持 **Markdown** 格式。

{{< /details >}}

{{< details title="点击我展开" closed="true" >}}

默认情况下，这部分内容会被隐藏。

{{< /details >}}

## 使用方法

````markdown
{{</* details title="详情" */>}}

这是详情的内容。

支持 **Markdown** 格式。

{{</* /details */>}}
````

````markdown
{{</* details title="点击我展开" closed="true" */>}}

默认情况下，这部分内容会被隐藏。

{{</* /details */>}}
````