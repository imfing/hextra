---
title: "کامپوننت Jupyter Notebook"
linktitle: "Jupyter Notebook"
math: true
sidebar:
  exclude: true
---

{{< callout type="warning" >}}ویژگی آزمایشی برای گنجاندن Jupyter Notebookها از طریق یک شورتکد. توجه داشته باشید که همه انواع سلول‌ها پشتیبانی نمی‌شوند.{{< /callout >}}

[Jupyter Notebook](https://jupyter.org/) یک برنامه نوت‌بوک HTML مستقل از زبان برای [پروژه Jupyter](https://jupyter.org/) است. این برنامه به شما امکان می‌دهد اسنادی ایجاد و به اشتراک بگذارید که شامل کد زنده، معادلات، تصاویر و متن روایی هستند.

<!--more-->

## نحوه استفاده

### استفاده از یک نوت‌بوک محلی

برای استفاده از شورتکد Jupyter Notebook، باید یک فایل Jupyter Notebook در پروژه خود داشته باشید. مشابه روشی که برای [افزودن تصاویر](../../organize-files#add-images) به پروژه استفاده می‌کنید، می‌توانید Jupyter Notebookها را به پوشه `assets` اضافه کنید.

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

نوت‌بوک Jupyter را در صفحه با استفاده از شورتکد `jupyter` قرار دهید:

```markdown {filename="content/docs/my-page.md"}
---
title: صفحه من
math: true
---

{{%/* jupyter "notebook.ipynb" */%}}
```

به‌عنوان جایگزین، می‌توانید از ویژگی [بسته‌های صفحه][page-bundles] هوگو استفاده کنید تا Jupyter Notebookها را همراه با فایل Markdown سازماندهی کنید.

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
title: صفحه من
math: true
---

{{%/* jupyter "notebook.ipynb" */%}}
```

### استفاده از یک نوت‌بوک راه‌دور

همچنین می‌توانید از یک نوت‌بوک راه‌دور با ارائه URL به فایل نوت‌بوک استفاده کنید. به‌عنوان مثال، برای گنجاندن نوت‌بوک [Jupyter Notebook چیست](https://github.com/jupyter/notebook/blob/main/docs/source/examples/Notebook/What%20is%20the%20Jupyter%20Notebook.ipynb) در صفحه، می‌توانید از شورتکد زیر استفاده کنید:

```
{{%/* jupyter "https://raw.githubusercontent.com/jupyter/notebook/main/docs/source/examples/Notebook/What%20is%20the%20Jupyter%20Notebook.ipynb" */%}}
```

## نمونه نوت‌بوک

{{< callout type="info" >}}مثال زیر یک نمونه از فایل نوت‌بوک است که در پوشه assets پروژه گنجانده شده است.{{< /callout >}}

{{% jupyter "example.ipynb" %}}

[page-bundles]: https://gohugo.io/content-management/page-bundles/#leaf-bundles