---
title: Blog as entrypoint
linkTitle: Blog
---

This is a little tutorial how to use the starting page as a blog.

<!--more-->

## Directory Structure

{{< filetree/container >}}
  {{< filetree/folder name="content" >}}
    {{< filetree/file name="_index.md" >}}
    {{< filetree/file name="post-1.md" >}}
    {{< filetree/file name="post-2.md" >}}
    {{< filetree/file name="about.md" >}}
    {{< filetree/folder name="docs" state="open" >}}
      {{< filetree/file name="_index.md" >}}
      {{< filetree/file name="getting-started.md" >}}
    {{< /filetree/folder >}}
  {{< /filetree/folder >}}
{{< /filetree/container >}}

## Make the entrypoint use the blog template

```yaml {filename="content/_index.md"}
---
title: My Docs
cascade:
  type: blog
---
```

But now the starting page will list all entries, including `/about`.

## Ignore pages

```yaml {filename="content/about.md"}
---
title: My Docs
hideOnBlog: true
---
```

Now the page is still available at `/about` but is not listed as post on the starting page.

You can hide areas, too.

```yaml {filename="content/docs/_index.md"}
---
title: My Docs
cascade:
  hideOnBlog: true
---
```
