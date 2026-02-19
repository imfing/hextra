---
title: "صفحات اضافی"
weight: 1
prev: /docs/advanced
aliases:
  - /docs/advanced/glossary/
---

Hextra چند صفحهٔ اضافی دارد که باید به‌صورت جداگانه فعال شوند: واژه‌نامه و آرشیو.

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

می‌توانید برای نوشته‌های یک بخش، یک صفحه آرشیو زمانی (گروه‌بندی‌شده بر اساس سال) بسازید.

1. صفحه آرشیو را ایجاد کنید:
   ```yaml {filename="content/archives/_index.md"}
   ---
   title: Archives
   layout: archives
   toc: false
   ---
   ```
2. (اختیاری) آن را به منوی بالا اضافه کنید:
   ```yaml {filename="hugo.yaml"}
   menu:
     main:
       - identifier: archives
         name: Archives
         pageRef: /archives
   ```
3. (اختیاری، چندزبانه) فایل‌های آرشیو ترجمه‌شده با همان layout اضافه کنید، برای مثال:
   - `content/archives/_index.fa.md`
   - `content/archives/_index.ja.md`
   - `content/archives/_index.zh-cn.md`
4. (اختیاری) بخش مورد استفاده برای آرشیو را تغییر دهید. مقدار پیش‌فرض `blog` است.
   ```yaml {filename="hugo.yaml"}
   params:
     archives:
       section: blog
   ```
5. (اختیاری) قالب نمایش تاریخ آیتم‌های آرشیو را تغییر دهید. مقدار پیش‌فرض `Jan 02` است.
   ```yaml {filename="hugo.yaml"}
   params:
     archives:
       dateFormat: "Jan 02"
   ```

پیام حالت خالی از کلید ترجمه `noResultsFound` استفاده می‌کند.

یک صفحهٔ نمونه از آرشیو در [آرشیو]({{% relref "/archives" %}}) در دسترس است.
