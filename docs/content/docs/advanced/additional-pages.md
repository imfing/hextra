---
title: "Additional Pages"
weight: 1
prev: /docs/advanced
aliases:
  - /docs/advanced/glossary/
---

Hextra includes additional pages that you can enable explicitly: glossary and archives.

<!--more-->

## Glossary

{{< callout type="info" >}}
  For more information about Hugo's built-in glossary support, see the [Hugo Glossary Quick Reference](https://gohugo.io/quick-reference/glossary/).
{{< /callout >}}

### Source Data File

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

- `term`: The full name of the concept or phrase.
- `definition`: A brief explanation or description of the term.
- `abbr` (optional): A commonly used abbreviation or acronym for the term.

```yaml {filename="data/en/termbase.yaml"}
- term: seo
  abbr: SEO
  definition: "Search engine optimization – improving the visibility of a web page in search engines"
- term: static site generator
  definition: "Software engines processing text input to generate static web pages"
```

### Glossary Page

To render the glossary index page (listing all defined terms along with their descriptions and abbreviations),
a language-specific glossary content file must be defined for each supported language. Use the language code suffix
in the filename, for example `content/glossary/_index.en.md`.

```markdown {filename="content/glossary/_index.en.md"}
---
title: Glossary
layout: glossary
---
```

An example glossary page is available at [Glossary]({{% relref "/glossary" %}}).

## Archives

You can create an archive timeline page (grouped by year) for posts in a section.

1. Create the archive page:
   ```yaml {filename="content/archives/_index.md"}
   ---
   title: Archives
   layout: archives
   toc: false
   ---
   ```
2. (Optional) Add it to the top menu:
   ```yaml {filename="hugo.yaml"}
   menu:
     main:
       - identifier: archives
         name: Archives
         pageRef: /archives
   ```
3. (Optional, multilingual) Add translated archive index pages with the same layout, for example:
   - `content/archives/_index.fa.md`
   - `content/archives/_index.ja.md`
   - `content/archives/_index.zh-cn.md`
4. (Optional) Change the content section used for archives. The default is `blog`.
   ```yaml {filename="hugo.yaml"}
   params:
     archives:
       section: blog
   ```
5. (Optional) Change the archive item date format. The default is `Jan 02`.
   ```yaml {filename="hugo.yaml"}
   params:
     archives:
       dateFormat: "Jan 02"
   ```

The empty-state message uses the `noResultsFound` i18n key.

An example archive page is available at [Archives]({{% relref "/archives" %}}).
