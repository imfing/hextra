---
title: "Jupyter Notebook 组件"
linktitle: "Jupyter Notebook"
math: true
sidebar:
  exclude: true
---

{{< callout >}}实验性功能：通过短代码嵌入 Jupyter Notebook。请注意，并非所有单元格类型都受支持。{{< /callout >}}

[Jupyter Notebook](https://jupyter.org/) 是 [Project Jupyter](https://jupyter.org/) 的一个语言无关的 HTML 笔记本应用程序。它允许你创建和共享包含实时代码、方程、可视化和叙述性文本的文档。

<!--more-->

## 使用方法

### 使用本地笔记本

要使用 Jupyter Notebook 短代码，你需要在项目中有一个 Jupyter Notebook 文件。类似于如何[添加图片](../../organize-files#add-images)到项目中，你可以将 Jupyter Notebooks 添加到 `assets` 文件夹。

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

使用 `jupyter` 短代码将 Jupyter Notebook 包含在页面中：

```markdown {filename="content/docs/my-page.md"}
---
title: 我的页面
math: true
---

{{%/* jupyter "notebook.ipynb" */%}}
```

或者，你可以利用 Hugo 的[页面包][page-bundles]功能将 Jupyter Notebooks 与 Markdown 文件一起组织。

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
title: 我的页面
math: true
---

{{%/* jupyter "notebook.ipynb" */%}}
```

### 使用远程笔记本

你也可以通过提供笔记本文件的 URL 来使用远程笔记本。例如，要在页面中包含 [What is the Jupyter Notebook](https://github.com/jupyter/notebook/blob/main/docs/source/examples/Notebook/What%20is%20the%20Jupyter%20Notebook.ipynb) 笔记本，你可以使用以下短代码：

```
{{%/* jupyter "https://raw.githubusercontent.com/jupyter/notebook/main/docs/source/examples/Notebook/What%20is%20the%20Jupyter%20Notebook.ipynb" */%}}
```

## 示例笔记本

{{< callout type="info" >}}以下是包含在项目 assets 文件夹中的笔记本文件示例。{{< /callout >}}

{{% jupyter "example.ipynb" %}}

[page-bundles]: https://gohugo.io/content-management/page-bundles/#leaf-bundles