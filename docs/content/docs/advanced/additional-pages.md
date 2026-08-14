---
title: "Additional Pages"
weight: 1
prev: /docs/advanced
aliases:
  - /docs/advanced/glossary/
---

Hextra includes additional pages that you can enable explicitly: glossary, archives, talks, and series.

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

The `archives` layout is a general grouped index: it renders any set of pages as a year-grouped timeline (or as a flat list), and by default it archives the section the page belongs to. It powers the built-in archives page as well as the [Talks](#talks) and [Series](#series) page types described below.

To create a standalone archive page that points at a different section (for example an `/archives` page listing blog posts), set `group.section` in the page front matter:

```yaml {filename="content/archives/_index.md"}
---
title: Archives
layout: archives
toc: false
group:
  section: blog
---
```

This is how the built-in example works: the page lives in `content/archives/` but archives the `blog` section. An example archive page is available at [Archives]({{% relref "/archives" %}}).

### Options

- `group.section`: the section to archive. The default is the page's own section, falling back to `params.archives.section` (default `blog`).
- `group.dateFormat`: date format for list items. The default is `Jan 02`, falling back to `params.archives.dateFormat`.
- `group.groupBy`: `year` (default), `month`, or `none` for a flat list. Term pages (such as a series) default to `none`, since they are already grouped by the term.

The empty-state message uses the `noResultsFound` i18n key.

## Talks

A content section such as `talks` can be listed as a year-separated index, just like the archives page.

1. Create the section's index page with the `archives` layout:
   ```yaml {filename="content/talks/_index.md"}
   ---
   title: Talks
   layout: archives
   toc: false
   ---
   ```
   The page archives its own section by default, so `/talks/` renders all talks grouped by year. No further configuration is needed.
2. (Optional) Add it to the top menu:
   ```yaml {filename="hugo.yaml"}
   menu:
     main:
       - identifier: talks
         name: Talks
         pageRef: /talks
   ```
3. (Optional, multilingual) Add translated index pages with the same layout, for example `content/talks/_index.ja.md`.

The file structure for a talks archive looks like this:

{{< filetree/container >}}
  {{< filetree/folder name="content" state="open" >}}
    {{< filetree/folder name="talks" state="open" >}}
      {{< filetree/file name="_index.md" >}}
      {{< filetree/folder name="open-source-communities" state="open" >}}
        {{< filetree/file name="index.md" >}}
        {{< filetree/file name="slides.pdf" >}}
      {{< /filetree/folder >}}
      {{< filetree/file name="css-architecture.md" >}}
      {{< filetree/folder name="hugo-theming" state="open" >}}
        {{< filetree/file name="index.md" >}}
        {{< filetree/file name="cover.png" >}}
      {{< /filetree/folder >}}
    {{< /filetree/folder >}}
  {{< /filetree/folder >}}
{{< /filetree/container >}}

Each talk post can be either a single Markdown file (`css-architecture.md`) or a page bundle directory: an `index.md` with its images and assets (such as slide decks or cover images) grouped in the same subdirectory (`open-source-communities/`, `hugo-theming/`). Only `_index.md` carries the `layout: archives` front matter:

```yaml {filename="content/talks/hugo-theming/index.md"}
---
title: Theming Hugo Sites with Tailwind CSS
date: 2025-11-03
tags:
  - Hugo
  - Tailwind CSS
---
```

An example talks archive is available at [Talks]({{% relref "/talks" %}}).

## Series

A series groups related posts (usually blog posts) under a name. It is a taxonomy term: all posts sharing the same `series` term are grouped on an automatically generated `/series/<name>/` page. The series name is the group, so the page lists its posts together without extra grouping.

1. Configure the `series` taxonomy:
   ```yaml {filename="hugo.yaml"}
   taxonomies:
     series: series
   ```
   Setting `taxonomies` replaces Hugo's default ones. To keep existing taxonomies, list them as well:
   ```yaml {filename="hugo.yaml"}
   taxonomies:
     tag: tags
     category: categories
     series: series
   ```
2. Tag each post that belongs to the series in its front matter:
   ```yaml {filename="content/blog/part-1/index.md"}
   ---
   title: "Demo Series Part 1"
   date: 2024-09-12
   series:
     - demo-series
   ---
   ```
   A post can belong to more than one series by listing several terms. The `series` front matter also drives the Open Graph `og:see_also` links on the post page.
3. (Optional) Create a term index page to set the series title and enable the `archives` layout:
   ```yaml {filename="content/series/demo-series/_index.md"}
   ---
   title: Demo Series
   layout: archives
   toc: false
   ---
   ```
   Without this page, `/series/demo-series/` still lists all posts in the series.

The file structure for a series looks like this:

{{< filetree/container >}}
  {{< filetree/folder name="content" state="open" >}}
    {{< filetree/folder name="blog" state="open" >}}
      {{< filetree/folder name="part-1" state="open" >}}
        {{< filetree/file name="index.md" >}}
        {{< filetree/file name="diagram.png" >}}
      {{< /filetree/folder >}}
      {{< filetree/file name="part-2.md" >}}
    {{< /filetree/folder >}}
    {{< filetree/folder name="series" state="open" >}}
      {{< filetree/folder name="demo-series" state="open" >}}
        {{< filetree/file name="_index.md" >}}
      {{< /filetree/folder >}}
    {{< /filetree/folder >}}
  {{< /filetree/folder >}}
{{< /filetree/container >}}

The series posts stay in their normal section (`blog` in this example). The `content/series/` directory is not a second home for posts — it is Hugo's taxonomy content directory, used only to customize the automatically generated `/series/<name>/` term page (title, `archives` layout). It is optional: without it, `/series/<name>/` is still generated and lists the series posts under the series name.

Like talk posts, a series post can be a single Markdown file or a page bundle directory (for example `part-1/`) that groups the post with its images and assets.

### Add a Series Dropdown to the Menu

To add a dropdown that lists all series in the top navigation, add a menu item with `type: series`:

```yaml {filename="hugo.yaml"}
menu:
  main:
    - identifier: series
      name: Series
      params:
        type: series
```

The dropdown lists every series term automatically. To customize the label shown for a series, set its title on the term index page (`content/series/<name>/_index.md`).

An example series archive is available at [Demo Series]({{% relref "/series/demo-series" %}}).
