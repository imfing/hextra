---
title: Term
next: /docs/guide/deploy-site
---

A built-in component to display a terminology definition.

Glossary definition is maintained in a structured YAML [data file](/docs/advanced/additional-pages),
with one file defined per supported language.

## Example

* {{< term "static site generator" >}}
* {{< term "SEO" >}}

## Usage

```
{{</* term "SEO" */>}}
```

If a term is not found in the glossary, it is returned as-is.


## Options

| Name         | Description                 |
|--------------|-----------------------------|
| `entry`      | Glossary term               |
