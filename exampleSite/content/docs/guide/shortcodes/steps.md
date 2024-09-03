---
title: Steps
---

A built-in component to display a series of steps.

## Example

{{% steps %}}

### Step 1

This is the first step.

### Step 2

This is the second step.

### Step 3

This is the third step.

{{% /steps %}}


## Usage

{{< callout emoji="ℹ️" >}}
  Please note that this shortcode is intended **only for Markdown content**.
  If you put HTML content or other shortcodes as step content, it may not render as expected.
{{< /callout >}}

Put Markdown h3 header within `steps` shortcode.

```
{{%/* steps */%}}

### Step 1

This is the first step.

### Step 2

This is the second step.

{{%/* /steps */%}}
```
