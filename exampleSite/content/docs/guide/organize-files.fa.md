---
title: سازماندهی پرونده‌ها
weight: 1
prev: /docs/guide
---

## ساختار دایرکتوری

به طور پیش‌فرض، Hugo پرونده‌های مارک‌داون را در فهرست `content` جستجو می‌کند و ساختار فهرست، ساختار خروجی نهایی وب‌سایت شما را تعیین می‌کند. همین سایت را به عنوان مثال در نظر بگیرید:

<!--more-->

{{< filetree/container >}}
  {{< filetree/folder name="content" >}}
    {{< filetree/file name="_index.md" >}}
    {{< filetree/folder name="docs" state="open" >}}
      {{< filetree/file name="_index.md" >}}
      {{< filetree/file name="getting-started.md" >}}
      {{< filetree/folder name="guide" state="open" >}}
        {{< filetree/file name="_index.md" >}}
        {{< filetree/file name="organize-files.md" >}}
      {{< /filetree/folder >}}
    {{< /filetree/folder >}}
    {{< filetree/folder name="blog" state="open" >}}
      {{< filetree/file name="_index.md" >}}
      {{< filetree/file name="post-1.md" >}}
    {{< /filetree/folder >}}
  {{< /filetree/folder >}}
{{< /filetree/container >}}

هر یک از پرونده‌های `_index.md` صفحه اصلی هر بخش  هستند که برای هر بخش مجزا است. سایر پرونده‌های مارک‌داون صفحه‌های معمولی دیگه‌ای هستند.

```
content
├── _index.md // <- /
├── docs
│   ├── _index.md // <- /docs/
│   ├── getting-started.md // <- /docs/getting-started/
│   └── guide
│       ├── _index.md // <- /docs/guide/
│       └── organize-files.md // <- /docs/guide/organize-files/
└── blog
    ├── _index.md // <- /blog/
    └── post-1.md // <- /blog/post-1/
```

## طرح‌بندی‌ها

هگزترا سه طرح‌بندی برای انواع مختلف محتوا ارائه می‌کند:

| طرح‌بندی    | دایرکتوری             | ویژگی‌ها                                                         |
| :-------- | :-------------------- | :--------------------------------------------------------------- |
| `docs`    | `content/docs/`       | ایده‌آل برای مستندات ساختار یافته، مانند این بخش.        |
| `blog`    | `content/blog/`       | برای نوشته‌های وبلاگ، با هر فهرست‌بندی و هم نمایش جزئیات مقاله. |
| `default` | همه دایرکتوری‌های دیگر | مشاهده مقاله تک صفحه‌ای بدون نوار کناری.                       |

برای سفارشی کردن یک بخش برای منعکس کردن رفتار یک طرح داخلی، نوع طرح‌بندی مورد نظر را در قسمت بالایی قسمت _index.md` مشخص کنید.

```yaml {filename="content/my-docs/_index.md"}
---
title: مستندات من
cascade:
  type: docs
---
```

پیکربندی مثال بالا تضمین می‌کند که پرونده‌های محتوای در داخل `content/my-docs/` به‌طور پیش‌فرض به عنوان مستندات (نوع `docs`) مورد استفاده قرار می‌گیرند.

## ناوبری نوار کناری

ناوبری نوار کناری به طور خودکار براساس حروف الفبا ایجاد می‌شود. برای پیکربندی دستی ترتیب نوار کناری، می‌توانید از پارامتر `weight` در قسمت بالایی پرونده‌های مارک‌داون استفاده کنید.

```yaml {filename="content/docs/guide/_index.md"}
---
title: راهنما
weight: 2
---
```

{{< callout emoji="ℹ️">}}
  توصیه می‌کنیم نوار کناری خیلی عمیق نباشد. اگر محتوای زیادی دارید، آنها را **به چند بخش تقسیم کنید**.
{{< /callout >}}

## پیکربندی دایرکتوری محتوا

به طور پیش‌فرض، دایرکتوری ریشه `content/` توسط Hugo برای ساخت سایت استفاده می‌شود.
 اگر نیاز به استفاده از دایرکتوری متفاوتی برای محتوا دارید، برای مثال `docs/`، این کار را می‌توانید با تنظیم پارامتر [`contentDir`](https://gohugo.io/getting-started/configuration/#contentdir) در پیکربندی سایت `hugo.yaml` انجام دهید.

## افزودن تصاویر

برای افزودن تصاویر، ساده‌ترین راه این است که پرونده‌های عکس‌ها را در همان دایرکتوری پرونده مارک‌داون قرار دهید.
برای مثال، یک پرونده عکس `image.png` را در کنار پرونده `my-page.md` اضافه کنید:

{{< filetree/container >}}
  {{< filetree/folder name="content" >}}
    {{< filetree/folder name="docs" >}}
        {{< filetree/file name="my-page.md" >}}
        {{< filetree/file name="image.png" >}}
    {{< /filetree/folder >}}
  {{< /filetree/folder >}}
{{< /filetree/container >}}

سپس، می‌توانید از سینتکس مارک‌داون زیر برای افزودن عکس به محتوا استفاده کنید:

```markdown {filename="content/docs/my-page.md"}
![](image.png)
```

همچنین می‌توانید از ویژگی [بسته‌های صفحه][page-bundles] Hugo برای سازماندهی پرونده‌های عکس‌ها همراه با پرونده مارک‌داون استفاده کنید. برای رسیدن به این هدف، پرونده `my-page.md` را به یک دایرکتوری `my-page` تبدیل کنید و محتوا را در پرونده‌ای به نام `index.md` قرار دهید و پرونده‌های عکس‌ها را در دایرکتوری `my-page` قرار دهید:

{{< filetree/container >}}
  {{< filetree/folder name="content" >}}
    {{< filetree/folder name="docs" >}}
        {{< filetree/folder name="my-page" >}}
            {{< filetree/file name="index.md" >}}
            {{< filetree/file name="image.png" >}}
        {{< /filetree/folder >}}
    {{< /filetree/folder >}}
  {{< /filetree/folder >}}
{{< /filetree/container >}}

```markdown {filename="content/docs/my-page/index.md"}
![](image.png)
```

همچنین می‌توانید پرونده‌های عکس‌ها را در دایرکتوری `static` قرار دهید که عکس‌ها را برای همه صفحات در دسترس قرار می‌دهد:

{{< filetree/container >}}
  {{< filetree/folder name="static" >}}
    {{< filetree/folder name="images" >}}
        {{< filetree/file name="image.png" >}}
    {{< /filetree/folder >}}
  {{< /filetree/folder >}}
  {{< filetree/folder name="content" >}}
    {{< filetree/folder name="docs" >}}
        {{< filetree/file name="my-page.md" >}}
    {{< /filetree/folder >}}
  {{< /filetree/folder >}}
{{< /filetree/container >}}

توجه داشته باشید که مسیر عکس با یک اسلش `/` شروع می‌شود و نسبت به دایرکتوری استاتیک است:

```markdown {filename="content/docs/my-page.md"}
![](/images/image.png)
```

[page-bundles]: https://gohugo.io/content-management/page-bundles/#leaf-bundles
