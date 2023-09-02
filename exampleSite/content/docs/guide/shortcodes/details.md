---
title: Details
---

A built-in component to display a collapsible content.

<!--more-->

## Example

{{% details title="Details" %}}

This is the content of the details.

Markdown is **supported**.

{{% /details %}}

{{% details title="Details Closed" closed="true" %}}

This will be closed by default.

{{% /details %}}

## Usage

````
{{%/* details title="Details" */%}}

This is the content of the details.

Markdown is **supported**.

{{%/* /details */%}}
````

````
{{%/* details title="Details Closed" closed="true" */%}}

This will be closed by default.

{{%/* /details */%}}
````
