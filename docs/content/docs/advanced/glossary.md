---
title: "Glossary"
weight: 1
prev: /docs/advanced
---

Hextra supports building a site-wide terminology glossary.

<!--more-->

{{< callout type="info" >}}
  For more information about Hugo's built-in glossary support, see the [Hugo Glossary Quick Reference](https://gohugo.io/quick-reference/glossary/).
{{< /callout >}}

## Source Data File

Term definitions are centrally stored in a `termbase.yaml` data file for each [supported language](../multi-language/).

{{< filetree/container >}}
  {{< filetree/folder name="data" state="open" >}}
    {{< filetree/folder name="en" state="open" >}}
      {{< filetree/file name="termbase.yaml" >}}
    {{< /filetree/folder >}}
    {{< filetree/folder name="fr" state="open" >}}
      {{< filetree/file name="termbase.yaml" >}}
    {{< /filetree/folder >}}
    {{< filetree/folder name="ja" state="open" >}}
      {{< filetree/file name="termbase.yaml" >}}
    {{< /filetree/folder >}}
  {{< /filetree/folder >}}
{{< /filetree/container >}}

Each YAML data file contains a list of glossary entries. Every entry includes:

* `term`: The full name of the concept or phrase.
* `definition`: A brief explanation or description of the term.
* `abbr` (optional): A commonly used abbreviation or acronym for the term.

```yaml {filename="data/en/termbase.yaml"}
- term: seo
  abbr: SEO
  definition: "Search engine optimization – improving the visibility of a web page in search engines"
- term: static site generator
  definition: "Software engines processing text input to generate static web pages"
```

## Glossary Page

An example glossary page is available at [Glossary]({{% relref "/glossary" %}}), displaying all
defined terms with their descriptions and abbreviations.
