---
title: "چند زبانه"
weight: 1
prev: /docs/advanced
---

Hextra از ایجاد سایت با چندین زبان با استفاده از [حالت چندزبانه](https://gohugo.io/content-management/multilingual/) هوگو پشتیبانی می‌کند.

<!--more-->

## فعال‌سازی چندزبانه

برای چندزبانه کردن سایت، باید به هوگو زبان‌های پشتیبانی شده را اطلاع دهیم. باید به فایل پیکربندی سایت اضافه کنیم:

```yaml {filename="hugo.yaml"}
defaultContentLanguage: en
languages:
  en:
    languageName: English
    weight: 1
  fr:
    languageName: Français
    weight: 2
  ja:
    languageName: 日本語
    weight: 3
```

## مدیریت ترجمه‌ها بر اساس نام فایل

هوگو از مدیریت ترجمه‌ها بر اساس نام فایل پشتیبانی می‌کند. به عنوان مثال، اگر فایلی به نام `content/docs/_index.md` به زبان انگلیسی داریم، می‌توانیم فایل `content/docs/_index.fr.md` را برای ترجمه فرانسوی ایجاد کنیم.

{{< filetree/container >}}
  {{< filetree/folder name="content" >}}
    {{< filetree/folder name="docs" state="open" >}}
      {{< filetree/file name="_index.md" >}}
      {{< filetree/file name="_index.fr.md" >}}
      {{< filetree/file name="_index.ja.md" >}}
    {{< /filetree/folder >}}
  {{< /filetree/folder >}}
{{< /filetree/container >}}

توجه: هوگو از [ترجمه بر اساس دایرکتوری محتوا](https://gohugo.io/content-management/multilingual/#translation-by-content-directory) نیز پشتیبانی می‌کند.

## ترجمه آیتم‌های منو

برای ترجمه آیتم‌های منو در نوار ناوبری، باید فیلد `identifier` را تنظیم کنیم:

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

و آن‌ها را در فایل i18n مربوطه ترجمه کنیم:

```yaml {filename="i18n/fr.yaml"}
documentation: Documentation
blog: Blog
```

## ترجمه رشته‌ها

برای ترجمه رشته‌ها در سایر قسمت‌ها، باید ترجمه را به فایل i18n مربوطه اضافه کنیم:

```yaml {filename="i18n/fr.yaml"}
readMore: Lire la suite
```

لیستی از رشته‌های استفاده شده در قالب را می‌توان در فایل `i18n/en.yaml` یافت.

## مطالعه بیشتر

- [حالت چندزبانه هوگو](https://gohugo.io/content-management/multilingual/)
- [چندزبانه هوگو بخش 1: ترجمه محتوا](https://www.regisphilibert.com/blog/2018/08/hugo-multilingual-part-1-managing-content-translation/)
- [چندزبانه هوگو بخش 2: بومی‌سازی رشته‌ها](https://www.regisphilibert.com/blog/2018/08/hugo-multilingual-part-2-i18n-string-localization/)