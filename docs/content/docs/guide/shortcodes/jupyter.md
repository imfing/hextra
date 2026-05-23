---
title: "Jupyter Notebook Component"
linktitle: "Jupyter Notebook"
math: true
sidebar:
  exclude: true
---

[Jupyter Notebook](https://jupyter.org/) is a language-agnostic HTML notebook application for [Project Jupyter](https://jupyter.org/). It allows you to create and share documents that contain live code, equations, visualizations, and narrative text.

<!--more-->

## How to use

### Using a local notebook

To use the Jupyter Notebook shortcode, you need to have a Jupyter Notebook file in your project. Similar to how you would [add images](../../organize-files#add-images) to the project, you can add Jupyter Notebooks to the `assets` folder.

{{< filetree/container >}}
  {{< filetree/folder name="assets" >}}
    {{< filetree/file name="notebook.ipynb" >}}
  {{< /filetree/folder >}}
  {{< filetree/folder name="content" >}}
    {{< filetree/folder name="docs" >}}
        {{< filetree/file name="my-page.md" >}}
    {{< /filetree/folder >}}
  {{< /filetree/folder >}}
{{< /filetree/container >}}

Include the Jupyter Notebook in the page using the `jupyter` shortcode:

```markdown {filename="content/docs/my-page.md"}
---
title: My Page
math: true
---

{{</* jupyter "notebook.ipynb" */>}}
```

Alternatively, you can utilize the [page bundles][page-bundles] feature of Hugo to organize the Jupyter Notebooks together with the Markdown file.

{{< filetree/container >}}
  {{< filetree/folder name="content" >}}
    {{< filetree/folder name="docs" >}}
        {{< filetree/folder name="my-page" >}}
            {{< filetree/file name="index.md" >}}
            {{< filetree/file name="notebook.ipynb" >}}
        {{< /filetree/folder >}}
    {{< /filetree/folder >}}
  {{< /filetree/folder >}}
{{< /filetree/container >}}

```markdown {filename="content/docs/my-page/index.md"}
---
title: My Page
math: true
---

{{</* jupyter "notebook.ipynb" */>}}
```

### Using a remote notebook

You can also use a remote notebook by providing the URL to the notebook file. For example, to include [What is the Jupyter Notebook](https://github.com/jupyter/notebook/blob/main/docs/source/examples/Notebook/What%20is%20the%20Jupyter%20Notebook.ipynb) notebook in the page, you can use the following shortcode:

```
{{</* jupyter "https://raw.githubusercontent.com/jupyter/notebook/main/docs/source/examples/Notebook/What%20is%20the%20Jupyter%20Notebook.ipynb" */>}}
```

### Showing In/Out prompts

You can display Jupyter-style `In [N]:`/`Out[N]:` execution count prompts by using named parameters with `prompts=true`:

```
{{</* jupyter src="notebook.ipynb" prompts=true */>}}
```

> Note: when using `prompts` or other named parameters, the notebook path must use the `src` parameter instead of a positional argument.

## Example Notebook

{{< callout type="info" >}}The following is an example of a notebook file that is included in the project assets folder.{{< /callout >}}

{{< jupyter src="example.ipynb" prompts=true >}}

## Supported Output Types

{{< callout type="info" >}}The following notebook demonstrates all supported output types including error tracebacks, stderr streams, SVG, Markdown, LaTeX, JSON, raw cells, attachments, output metadata, and cell visibility metadata.{{< /callout >}}

{{< jupyter "example-outputs.ipynb" >}}

[page-bundles]: https://gohugo.io/content-management/page-bundles/#leaf-bundles
