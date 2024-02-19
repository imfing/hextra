---
title: "چند زبانه"
weight: 1
prev: /docs/advanced
---

هگزترا از ایجاد سایت با چندین زبان با استفاده از [حالت چند زبانه](https://gohugo.io/content-management/multilingual/) Hugo پشتیبانی می‌کند.

<!--more-->

## فعال‌سازی چند زبانه

برای اینکه سایت ما چند زبانه شود، باید زبان‌های پشتیبانی شده را به Hugo بگوییم. باید به پرونده پیکربندی سایت اضافه کنیم:

```yaml {filename="hugo.yaml"}
defaultContentLanguage: en
languages:
  en:
    languageName: English
    weight: 1
  fa:
    languageName: فارسی
    weight: 2
  ja:
    languageName: 日本語
    weight: 3
```

## مدیریت ترجمه‌ها بر اساس نام پرونده

Hugo از مدیریت ترجمه با نام پرونده پشتیبانی می‌کند. به عنوان مثال، اگر یک پرونده `content/docs/_index.md` به زبان انگلیسی داشته باشیم، می توانیم یک پرونده `content/docs/_index.fa.md` برای ترجمه فارسی ایجاد کنیم.

{{< filetree/container >}}
  {{< filetree/folder name="content" >}}
    {{< filetree/folder name="docs" state="open" >}}
      {{< filetree/file name="_index.md" >}}
      {{< filetree/file name="_index.fa.md" >}}
      {{< filetree/file name="_index.ja.md" >}}
    {{< /filetree/folder >}}
  {{< /filetree/folder >}}
{{< /filetree/container >}}

توجه: Hugo همچنین از ت[ترجمه توسط دایرکتوری محتوا](https://gohugo.io/content-management/multilingual/#translation-by-content-directory) پشتیبانی می‌کند.

## ترجمه آیتم‌های منو

برای ترجمه آیتم‌های منو در نوار پیمایش، باید فیلد `identifier` را تنظیم کنیم:

```yaml {filename="hugo.yaml"}
menu:
  main:
    - identifier: documentation
      name: Documentation
      pageRef: /docs
      weight: 1
    - identifier: blog
      name: Blog
      pageRef: /blog
      weight: 2
```

و آنها را در پرونده i18n مربوطه ترجمه کنید:

```yaml {filename="i18n/fa.yaml"}
documentation: مستندات
blog: وبلاگ
```

## ترجمه رشته‌ها

برای ترجمه رشته‌ها در مکان‌های دیگر، باید ترجمه را به پرونده i18n مربوطه اضافه کنیم:

```yaml {filename="i18n/fa.yaml"}
readMore: ادامه مطلب
```

فهرستی از رشته‌های استفاده شده در تم را می‌توان در پرونده `i18n/en.yaml` پیدا کرد.

## بیشتر بخوانید

- [حالت چند زبانه هیوگو](https://gohugo.io/content-management/multilingual/)
- [هیوگو چند زبانه قسمت ۱: ترجمه محتوا](https://www.regisphilibert.com/blog/2018/08/hugo-multilingual-part-1-managing-content-translation/)
- [هیوگو چند زبانه قسمت ۲: بومی‌سازی رشته‌ها](https://www.regisphilibert.com/blog/2018/08/hugo-multilingual-part-2-i18n-string-localization/)
