---
title: 详情
---

用于显示可折叠内容的内置组件。

<!--more-->

## 示例

{{% details title="Details" %}}

这是细节的内容

Markdown is **supported**.

{{% /details %}}

{{% details title="Click me to reveal" closed="true" %}}

默认情况下这将被隐藏

{{% /details %}}

## Usage

````markdown
{{%/* details title="Details" */%}}

这是细节的内容

**支持** Markdown

{{%/* /details */%}}
````

````markdown
{{%/* details title="Click me to reveal" closed="true" */%}}

默认情况下这将被隐藏

{{%/* /details */%}}
````
