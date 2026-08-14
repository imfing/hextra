---
title: "صفحات اضافی"
weight: 1
prev: /docs/advanced
aliases:
  - /docs/advanced/glossary/
---

Hextra چند صفحهٔ اضافی دارد که باید به‌صورت جداگانه فعال شوند: واژه‌نامه، آرشیو، گفتگوها و مجموعه.

<!--more-->

## واژه‌نامه

{{< callout type="info" >}}
  برای اطلاعات بیشتر دربارهٔ پشتیبانی واژه‌نامهٔ داخلی Hugo، به [مرجع سریع واژه‌نامهٔ Hugo](https://gohugo.io/quick-reference/glossary/) مراجعه کنید.
{{< /callout >}}

### فایل دادهٔ منبع

تعاریف اصطلاحات به‌صورت متمرکز در فایل دادهٔ `termbase.yaml` برای هر [زبان پشتیبانی‌شده](../multi-language/) ذخیره می‌شوند.

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

هر فایل YAML شامل فهرستی از اصطلاحات واژه‌نامه است. هر ورودی شامل موارد زیر است:

- `term`: نام کامل مفهوم یا عبارت.
- `definition`: توضیح یا شرح مختصر اصطلاح.
- `abbr` (اختیاری): مخفف یا سرواژهٔ رایج اصطلاح.

```yaml {filename="data/fa/termbase.yaml"}
- term: seo
  abbr: SEO
  definition: "بهینه‌سازی موتور جستجو – افزایش دیده‌شدن یک صفحهٔ وب در نتایج موتورهای جستجو"
- term: "سازندهٔ سایت ایستا"
  definition: "موتورهایی که ورودی متنی را پردازش کرده و صفحات وب ایستا تولید می‌کنند"
```

### صفحهٔ واژه‌نامه

برای رندر شدن صفحهٔ نمایهٔ واژه‌نامه (که شامل فهرست تمام اصطلاحات تعریف‌شده به‌همراه توضیحات و مخفف‌های آن‌هاست)،
باید برای هر زبان پشتیبانی‌شده یک فایل محتوای واژه‌نامهٔ مخصوص همان زبان تعریف شود.
در نام فایل از پسوند کد زبان استفاده کنید؛ برای مثال: `content/glossary/_index.fa.md`.

```markdown {filename="content/glossary/_index.fa.md"}
---
title: واژه‌نامه
layout: glossary
---
```

یک صفحهٔ نمونه از واژه‌نامه در [واژه‌نامه]({{% relref "/glossary" %}}) در دسترس است.

## آرشیو

چیدمان `archives` یک فهرست گروه‌بندی‌شدهٔ عمومی است: هر مجموعه‌ای از صفحه‌ها را به‌صورت یک خط زمانی گروه‌بندی‌شده بر اساس سال (یا فهرست ساده) نمایش می‌دهد و به‌صورت پیش‌فرض، بخشی که صفحه به آن تعلق دارد را آرشیو می‌کند. این چیدمان علاوه بر صفحه آرشیو داخلی، انواع صفحهٔ [گفتگوها](#گفتگوها) و [مجموعه](#مجموعه) را که در ادامه توضیح داده شده‌اند، امکان‌پذیر می‌کند.

برای ساخت یک صفحه آرشیو مستقل که به بخش دیگری اشاره می‌کند (مثلاً صفحه `/archives` برای فهرست نوشته‌های وبلاگ)، `group.section` را در front matter صفحه تنظیم کنید:

```yaml {filename="content/archives/_index.md"}
---
title: Archives
layout: archives
toc: false
group:
  section: blog
---
```

ساختار نمونهٔ داخلی همین است: صفحه در `content/archives/` قرار دارد اما بخش `blog` را آرشیو می‌کند. یک صفحهٔ نمونه از آرشیو در [آرشیو]({{% relref "/archives" %}}) در دسترس است.

### گزینه‌ها

- `group.section`: بخش مورد نظر برای آرشیو. مقدار پیش‌فرض، بخش خود صفحه است و به `params.archives.section` (پیش‌فرض `blog`) برمی‌گردد.
- `group.dateFormat`: قالب نمایش تاریخ آیتم‌های فهرست. مقدار پیش‌فرض `Jan 02` است و به `params.archives.dateFormat` برمی‌گردد.
- `group.groupBy`: `year` (پیش‌فرض)، `month`، یا `none` برای فهرست ساده. صفحه‌های ترم (مانند مجموعه) از آنجا که با ترم گروه‌بندی شده‌اند، به‌صورت پیش‌فرض `none` هستند.

پیام حالت خالی از کلید ترجمه `noResultsFound` استفاده می‌کند.

## گفتگوها

یک بخش محتوایی مانند `talks` را می‌توان مانند صفحه آرشیو به‌صورت فهرست جدا بر اساس سال نمایش داد.

1. صفحهٔ فهرست بخش را با چیدمان `archives` ایجاد کنید:
   ```yaml {filename="content/talks/_index.md"}
   ---
   title: Talks
   layout: archives
   toc: false
   ---
   ```
   این صفحه به‌صورت پیش‌فرض بخش خودش را آرشیو می‌کند، بنابراین `/talks/` همهٔ گفتگوها را گروه‌بندی‌شده بر اساس سال نمایش می‌دهد. هیچ پیکربندی دیگری لازم نیست.
2. (اختیاری) آن را به منوی بالا اضافه کنید:
   ```yaml {filename="hugo.yaml"}
   menu:
     main:
       - identifier: talks
         name: Talks
         pageRef: /talks
   ```
3. (اختیاری، چندزبانه) صفحه‌های فهرست ترجمه‌شده با همان layout اضافه کنید، برای مثال `content/talks/_index.ja.md`.

ساختار فایل برای آرشیو گفتگوها به این شکل است:

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

هر گفتگو می‌تواند یک فایل Markdown ساده (`css-architecture.md`) یا یک پوشهٔ page bundle باشد: یک `index.md` به‌همراه تصاویر و دارایی‌هایش (مانند اسلایدها یا تصویر کاور) در همان زیرپوشه (`open-source-communities/`، `hugo-theming/`) گروه‌بندی می‌شود. فقط `_index.md` دارای front matter چیدمان `archives` است:

```yaml {filename="content/talks/hugo-theming/index.md"}
---
title: Theming Hugo Sites with Tailwind CSS
date: 2025-11-03
tags:
  - Hugo
  - Tailwind CSS
---
```

یک صفحهٔ نمونه از آرشیو گفتگوها در [گفتگوها]({{% relref "/talks" %}}) در دسترس است.

## مجموعه

مجموعه (series) نوشته‌های مرتبط (معمولاً نوشته‌های وبلاگ) را زیر یک نام گروه‌بندی می‌کند. مجموعه یک برچسب تاکسونومی است: همهٔ نوشته‌های دارای برچسب `series` یکسان در صفحهٔ خودکار `/series/<نام>/` گروه‌بندی می‌شوند. نام مجموعه همان گروه است، بنابراین صفحه نوشته‌ها را بدون گروه‌بندی اضافه در کنار هم فهرست می‌کند.

1. تاکسونومی `series` را پیکربندی کنید:
   ```yaml {filename="hugo.yaml"}
   taxonomies:
     series: series
   ```
   تنظیم `taxonomies` تاکسونومی‌های پیش‌فرض هوگو را جایگزین می‌کند. برای حفظ تاکسونومی‌های موجود، آن‌ها را نیز فهرست کنید:
   ```yaml {filename="hugo.yaml"}
   taxonomies:
     tag: tags
     category: categories
     series: series
   ```
2. در front matter هر نوشته‌ای که به مجموعه تعلق دارد، برچسب را اضافه کنید:
   ```yaml {filename="content/blog/part-1/index.md"}
   ---
   title: "Demo Series Part 1"
   date: 2024-09-12
   series:
     - demo-series
   ---
   ```
   با فهرست کردن چند برچسب، یک نوشته می‌تواند به بیش از یک مجموعه تعلق داشته باشد. front matter `series` همچنین پیوندهای Open Graph `og:see_also` را در صفحه نوشته تولید می‌کند.
3. (اختیاری) یک صفحه فهرست ترم بسازید تا عنوان مجموعه را تنظیم کنید و چیدمان `archives` را فعال کنید:
   ```yaml {filename="content/series/demo-series/_index.md"}
   ---
   title: Demo Series
   layout: archives
   toc: false
   ---
   ```
   بدون این صفحه، `/series/demo-series/` همچنان همهٔ نوشته‌های مجموعه را فهرست می‌کند.

ساختار فایل برای یک مجموعه به این شکل است:

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

نوشته‌های مجموعه در بخش عادی خود (در این مثال `blog`) باقی می‌مانند. دایرکتوری `content/series/` محل قرارگیری نوشته‌ها نیست — دایرکتوری محتوای تاکسونومی هوگو است و فقط برای سفارشی‌کردن صفحهٔ ترم خودکار `/series/<نام>/` استفاده می‌شود (عنوان، چیدمان `archives`). این دایرکتوری اختیاری است: بدون آن نیز `/series/<نام>/` تولید می‌شود و نوشته‌های مجموعه را زیر نام مجموعه فهرست می‌کند.

مانند نوشته‌های گفتگو، یک نوشتهٔ مجموعه نیز می‌تواند یک فایل Markdown ساده یا یک پوشهٔ page bundle (مثلاً `part-1/`) باشد که نوشته را به‌همراه تصاویر و دارایی‌هایش گروه‌بندی می‌کند.

### افزودن منوی کشویی مجموعه به منو

برای افزودن یک منوی کشویی که همهٔ مجموعه‌ها را در ناوبری بالا فهرست می‌کند، یک آیتم منو با `type: series` اضافه کنید:

```yaml {filename="hugo.yaml"}
menu:
  main:
    - identifier: series
      name: Series
      params:
        type: series
```

منوی کشویی به‌صورت خودکار همهٔ برچسب‌های مجموعه را فهرست می‌کند. برای سفارشی‌کردن برچسب نمایشی یک مجموعه، عنوان را در صفحهٔ فهرست ترم (`content/series/<نام>/_index.md`) تنظیم کنید.

یک صفحهٔ نمونه از آرشیو مجموعه در [مجموعهٔ نمایشی]({{% relref "/series/demo-series" %}}) در دسترس است.
