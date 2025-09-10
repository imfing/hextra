---
title: "Jupyter Notebook コンポーネント"
linktitle: "Jupyter Notebook"
math: true
sidebar:
  exclude: true
---

{{< callout type="warning" >}}Jupyter Notebook をショートコード経由で組み込む実験的機能です。すべてのセルタイプがサポートされているわけではありません。{{< /callout >}}

[Jupyter Notebook](https://jupyter.org/) は [Project Jupyter](https://jupyter.org/) の言語非依存な HTML ノートブックアプリケーションです。ライブコード、数式、可視化、説明文を含むドキュメントを作成・共有できます。

<!--more-->

## 使用方法

### ローカルノートブックの使用

Jupyter Notebook ショートコードを使用するには、プロジェクト内に Jupyter Notebook ファイルが必要です。[画像を追加する](../../organize-files#add-images)方法と同様に、Jupyter Notebook を `assets` フォルダに追加できます。

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

`jupyter` ショートコードを使用してページに Jupyter Notebook を組み込みます:

```markdown {filename="content/docs/my-page.md"}
---
title: マイページ
math: true
---

{{%/* jupyter "notebook.ipynb" */%}}
```

あるいは、Hugo の [ページバンドル][page-bundles] 機能を利用して、Jupyter Notebook を Markdown ファイルと一緒に整理することもできます。

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
title: マイページ
math: true
---

{{%/* jupyter "notebook.ipynb" */%}}
```

### リモートノートブックの使用

ノートブックファイルの URL を指定することで、リモートノートブックも使用できます。例えば、[What is the Jupyter Notebook](https://github.com/jupyter/notebook/blob/main/docs/source/examples/Notebook/What%20is%20the%20Jupyter%20Notebook.ipynb) ノートブックをページに組み込むには、以下のショートコードを使用します:

```
{{%/* jupyter "https://raw.githubusercontent.com/jupyter/notebook/main/docs/source/examples/Notebook/What%20is%20the%20Jupyter%20Notebook.ipynb" */%}}
```

## ノートブックの例

{{< callout type="info" >}}以下は、プロジェクトの assets フォルダに含まれるノートブックファイルの例です。{{< /callout >}}

{{% jupyter "example.ipynb" %}}

[page-bundles]: https://gohugo.io/content-management/page-bundles/#leaf-bundles