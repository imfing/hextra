---
title: سازماندهی فایل‌ها
weight: 1
prev: /docs/guide
---

## ساختار دایرکتوری

به‌طور پیش‌فرض، Hugo فایل‌های Markdown را در دایرکتوری `content` جستجو می‌کند و ساختار این دایرکتوری تعیین‌کننده ساختار نهایی خروجی وبسایت شماست.
این سایت را به عنوان مثال در نظر بگیرید:

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

هر یک از فایل‌های `_index.md` صفحه اصلی مربوط به بخش خود هستند. سایر فایل‌های Markdown صفحات معمولی هستند.

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

Hextra سه طرح‌بندی برای انواع مختلف محتوا ارائه می‌دهد:

| طرح‌بندی   | دایرکتوری          | ویژگی‌ها                                                      |
| :-------- | :----------------- | :----------------------------------------------------------- |
| `docs`    | `content/docs/`    | مناسب برای مستندات ساختاریافته، مشابه این بخش.               |
| `blog`    | `content/blog/`    | برای پست‌های وبلاگ، با نمایش لیست و مقاله‌های تفصیلی.         |
| `default` | سایر دایرکتوری‌ها  | نمایش تک‌صفحه‌ای مقاله بدون نوار کناری.                      |

برای سفارشی‌سازی یک بخش به منظور تقلید رفتار یک طرح‌بندی داخلی، نوع مورد نظر را در front matter فایل `_index.md` بخش مشخص کنید.

```yaml {filename="content/my-docs/_index.md"}
---
title: مستندات من
cascade:
  type: docs
---
```

مثال پیکربندی بالا تضمین می‌کند که فایل‌های محتوا در `content/my-docs/` به‌طور پیش‌فرض به عنوان مستندات (نوع `docs`) در نظر گرفته می‌شوند.

## ناوبری نوار کناری

ناوبری نوار کناری به‌طور خودکار بر اساس سازماندهی محتوا به ترتیب الفبایی ایجاد می‌شود. برای پیکربندی دستی ترتیب نوار کناری، می‌توانیم از پارامتر `weight` در front matter فایل‌های Markdown استفاده کنیم.

```yaml {filename="content/docs/guide/_index.md"}
---
title: راهنما
weight: 2
---
```

{{< callout type="info" >}}
  توصیه می‌شود نوار کناری را خیلی عمیق نگه ندارید. اگر محتوای زیادی دارید، **آن‌ها را به چند بخش تقسیم کنید**.
{{< /callout >}}

## ناوبری بخش

### ترتیب صفحه‌بندی بخش

ترتیب صفحات، که از طریق [`PAGE.PrevInSection`](https://gohugo.io/methods/page/previnsection/) و [`PAGE.NextInSection`](https://gohugo.io/methods/page/nextinsection/) در یک [مجموعه صفحه](https://gohugo.io/quick-reference/glossary/#page-collection) قابل دسترسی هستند، به‌طور پیش‌فرض معکوس شده است.

برای غیرفعال کردن این ترتیب معکوس، می‌توانید پارامتر سفارشی `reversePagination` را در front matter صفحه به `false` تنظیم کنید. به‌طور پیش‌فرض `reversePagination` روی `true` تنظیم شده است.

#### مثال

با توجه به ساختار دایرکتوری زیر:

{{< filetree/container >}}
  {{< filetree/folder name="content" >}}
    {{< filetree/file name="_index.md" >}}
    {{< filetree/folder name="blog" state="open" >}}
      {{< filetree/file name="_index.md" >}}
      {{< filetree/folder name="my-blog-series" state="open" >}}
        {{< filetree/file name="_index.md" >}}
        {{< filetree/folder name="post-a" state="open" >}}
          {{< filetree/file name="index.md" >}}
        {{< /filetree/folder >}}
        {{< filetree/folder name="post-b" state="open" >}}
          {{< filetree/file name="index.md" >}}
        {{< /filetree/folder >}}
        {{< filetree/folder name="post-c" state="open" >}}
          {{< filetree/file name="index.md" >}}
        {{< /filetree/folder >}}
      {{< /filetree/folder >}}
    {{< /filetree/folder >}}
  {{< /filetree/folder >}}
{{< /filetree/container >}}

و front matter زیر در پست‌ها:

```yaml {filename="content/blog/my-blog-series/post-a/index.md"}
---
title: پست A
weight: 1
---
```
```yaml {filename="content/blog/my-blog-series/post-b/index.md"}
---
title: پست B
weight: 2
---
```
```yaml {filename="content/blog/my-blog-series/post-c/index.md"}
---
title: پست C
weight: 3
---
```

اگر خواننده در انتهای `post-b/index.md` باشد، می‌بیند که صفحه بعدی `post-a` و صفحه قبلی `post-c` است. این به دلیل تنظیم `reversePagination` روی `true` به‌طور پیش‌فرض است. این زمانی مناسب است که بخواهیم پست‌ها به ترتیب زمانی از جدیدترین به قدیمی‌ترین نمایش داده شوند. اما در مورد یک سری وبلاگ که چندین بخش دارد، معمولاً می‌خواهیم افراد ابتدا پست اول را بخوانند، سپس به پست دوم و غیره بروند. بنابراین می‌خواهیم ترتیب معکوس را غیرفعال کنیم.

می‌توانیم `reversePagination` را در هر پست وبلاگ در این سری با اضافه کردن front matter زیر به `my-blog-series/_index.md` خاموش کنیم:

```yaml {filename="content/blog/my-blog-series/_index.md"}
---
title: سری وبلاگ من
cascade:
    params:
        reversePagination: false
---
```

در اینجا از [`cascade`](https://gohugo.io/content-management/front-matter/#cascade-1) استفاده می‌کنیم تا این تنظیم به تمام پست‌های `my-blog-series` منتقل شود و `reversePagination` برای تمام فرزندان روی `false` تنظیم شود. این اکنون تضمین می‌کند که وقتی خواننده در `post-b/index.md` است، صفحه بعدی `post-c` و صفحه قبلی `post-a` خواهد بود.

## ناوبری مسیر راهنما

مسیرهای راهنما به‌طور خودکار بر اساس ساختار دایرکتوری `/content` ایجاد می‌شوند.

به عنوان مثال، ساختار فایل [نمایش داده شده در بالا](#directory-structure) را در نظر بگیرید. با توجه به آن ساختار، مسیرهای راهنمای بالای صفحه در `/docs/guide/organize-files/` به‌صورت خودکار به این شکل نمایش داده می‌شوند:

```
مستندات > راهنما > سازماندهی فایل‌ها
```

### سفارشی‌سازی عنوان لینک‌های مسیر راهنما

به‌طور پیش‌فرض، هر لینک مسیر راهنما بر اساس پارامتر `title` آن صفحه ایجاد می‌شود. می‌توانید این را با مشخص کردن `linkTitle` سفارشی کنید.

به عنوان مثال، اگر به جای `Organize Files` می‌خواستیم مسیر راهنما `Foo Bar` باشد:

```yaml {filename="content/docs/guide/organize-files.md"}
---
linkTitle: Foo Bar
title: سازماندهی فایل‌ها
---
```

این اکنون مسیرهای راهنمای زیر را ایجاد می‌کند:
```
مستندات > راهنما > Foo Bar
```

### مخفی کردن مسیرهای راهنما

می‌توانید مسیرهای راهنما را به‌طور کامل از یک صفحه با مشخص کردن `breadcrumbs: false` در front matter آن مخفی کنید:

```yaml {filename="content/docs/guide/organize-files.md"}
---
breadcrumbs: false
title: سازماندهی فایل‌ها
---
```

## پیکربندی دایرکتوری محتوا

به‌طور پیش‌فرض، دایرکتوری ریشه `content/` توسط Hugo برای ساخت سایت استفاده می‌شود.
اگر نیاز به استفاده از دایرکتوری دیگری برای محتوا دارید، مثلاً `docs/`، این کار را می‌توان با تنظیم پارامتر [`contentDir`](https://gohugo.io/getting-started/configuration/#contentdir) در پیکربندی سایت `hugo.yaml` انجام داد.

## اضافه کردن تصاویر

برای اضافه کردن تصاویر، ساده‌ترین راه این است که فایل‌های تصویر را در همان دایرکتوری فایل Markdown قرار دهید.
به عنوان مثال، یک فایل تصویر `image.png` را در کنار فایل `my-page.md` اضافه کنید:

{{< filetree/container >}}
  {{< filetree/folder name="content" >}}
    {{< filetree/folder name="docs" >}}
        {{< filetree/file name="my-page.md" >}}
        {{< filetree/file name="image.png" >}}
    {{< /filetree/folder >}}
  {{< /filetree/folder >}}
{{< /filetree/container >}}

سپس می‌توانیم از سینتکس Markdown زیر برای اضافه کردن تصویر به محتوا استفاده کنیم:

```markdown {filename="content/docs/my-page.md"}
![](image.png)
```

همچنین می‌توانیم از ویژگی [page bundles][page-bundles] Hugo استفاده کنیم تا فایل‌های تصویر را همراه با فایل Markdown سازماندهی کنیم. برای این کار، فایل `my-page.md` را به یک دایرکتوری `my-page` تبدیل کنید و محتوا را در یک فایل به نام `index.md` قرار دهید و فایل‌های تصویر را داخل دایرکتوری `my-page` قرار دهید:

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

به‌عنوان جایگزین، می‌توانیم فایل‌های تصویر را در دایرکتوری `static` قرار دهیم، که تصاویر را برای تمام صفحات قابل دسترس می‌کند:

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

توجه کنید که مسیر تصویر با یک اسلش `/` شروع می‌شود و نسبت به دایرکتوری static است:

```markdown {filename="content/docs/my-page.md"}
![](/images/image.png)
```

[page-bundles]: https://gohugo.io/content-management/page-bundles/#leaf-bundles