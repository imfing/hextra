---
title: شروع به کار
weight: 1
tags:
  - مستندات
  - راهنما
next: /docs/guide
prev: /docs
---

## شروع سریع با قالب

{{< icon "github" >}}&nbsp;[imfing/hextra-starter-template](https://github.com/imfing/hextra-starter-template)

می‌توانید با استفاده از مخزن قالب فوق به سرعت شروع به کار کنید.

<img src="https://docs.github.com/assets/cb-77734/mw-1440/images/help/repository/use-this-template-button.webp" width="500">

ما یک [گردش کار GitHub Actions](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site#publishing-with-a-custom-github-actions-workflow) ارائه کرده‌ایم که می‌تواند به صورت خودکار سایت شما را ساخته و در GitHub Pages مستقر کند و به صورت رایگان میزبانی کند.
برای گزینه‌های بیشتر، [استقرار سایت](../guide/deploy-site) را بررسی کنید.

[🌐 نسخه نمایشی ↗](https://imfing.github.io/hextra-starter-template/)

## شروع به عنوان پروژه جدید

دو روش اصلی برای افزودن تم Hextra به پروژه Hugo شما وجود دارد:

1. **ماژول‌های Hugo (توصیه شده)**: ساده‌ترین و توصیه‌شده‌ترین روش. [ماژول‌های Hugo](https://gohugo.io/hugo-modules/) به شما امکان می‌دهند تم را مستقیماً از منبع آنلاین آن دریافت کنید. تم به صورت خودکار دانلود شده و توسط Hugo مدیریت می‌شود.

2. **زیرماژول Git**: به عنوان جایگزین، Hextra را به عنوان یک [زیرماژول Git](https://git-scm.com/book/en/v2/Git-Tools-Submodules) اضافه کنید. تم توسط Git دانلود شده و در پوشه `themes` پروژه شما ذخیره می‌شود.

### راه‌اندازی Hextra به عنوان ماژول Hugo

#### پیش‌نیازها

قبل از شروع، باید نرم‌افزارهای زیر را نصب کرده باشید:

- [Hugo (نسخه extended)](https://gohugo.io/installation/)
- [Git](https://git-scm.com/)
- [Go](https://go.dev/)

#### مراحل

{{% steps %}}

### راه‌اندازی یک سایت جدید Hugo

```shell
hugo new site my-site --format=yaml
```

### پیکربندی تم Hextra از طریق ماژول

```shell
# راه‌اندازی ماژول Hugo
cd my-site
hugo mod init github.com/username/my-site

# افزودن تم Hextra
hugo mod get github.com/imfing/hextra
```

فایل `hugo.yaml` را برای استفاده از تم Hextra با افزودن موارد زیر پیکربندی کنید:

```yaml
module:
  imports:
    - path: github.com/imfing/hextra
```

### ایجاد اولین صفحات محتوای شما

صفحه محتوای جدید برای صفحه اصلی و صفحه مستندات ایجاد کنید:

```shell
hugo new content/_index.md
hugo new content/docs/_index.md
```

### پیش‌نمایش سایت به صورت محلی

```shell
hugo server --buildDrafts --disableFastRender
```

تبریک می‌گوییم، پیش‌نمایش سایت جدید شما در `http://localhost:1313/` در دسترس است.

{{% /steps %}}


{{% details title="چگونه تم را به‌روزرسانی کنیم؟" %}}

برای به‌روزرسانی تمام ماژول‌های Hugo در پروژه خود به آخرین نسخه‌ها، دستور زیر را اجرا کنید:

```shell
hugo mod get -u
```

برای به‌روزرسانی Hextra به [آخرین نسخه منتشر شده](https://github.com/imfing/hextra/releases)، دستور زیر را اجرا کنید:

```shell
hugo mod get -u github.com/imfing/hextra
```

برای جزئیات بیشتر، [ماژول‌های Hugo](https://gohugo.io/hugo-modules/use-modules/#update-all-modules) را ببینید.

{{% /details %}}

### راه‌اندازی Hextra به عنوان زیرماژول Git

#### پیش‌نیازها

قبل از شروع، باید نرم‌افزارهای زیر را نصب کرده باشید:

- [Hugo (نسخه extended)](https://gohugo.io/installation/)
- [Git](https://git-scm.com/)

#### مراحل

{{% steps %}}

### راه‌اندازی یک سایت جدید Hugo

```shell
hugo new site my-site --format=yaml
```

### افزودن تم Hextra به عنوان زیرماژول Git

به دایرکتوری سایت بروید و یک مخزن Git جدید راه‌اندازی کنید:

```shell
cd my-site
git init
```

سپس، تم Hextra را به عنوان زیرماژول Git اضافه کنید:

```shell
git submodule add https://github.com/imfing/hextra.git themes/hextra
```

فایل `hugo.yaml` را برای استفاده از تم Hextra با افزودن موارد زیر پیکربندی کنید:

```yaml
theme: hextra
```

### ایجاد اولین صفحات محتوای شما

صفحه محتوای جدید برای صفحه اصلی و صفحه مستندات ایجاد کنید:

```shell
hugo new content/_index.md
hugo new content/docs/_index.md
```

### پیش‌نمایش سایت به صورت محلی

```shell
hugo server --buildDrafts --disableFastRender
```

پیش‌نمایش سایت جدید شما در `http://localhost:1313/` در دسترس است.

{{% /steps %}}


هنگام استفاده از [CI/CD](https://en.wikipedia.org/wiki/CI/CD) برای استقرار سایت Hugo، ضروری است که قبل از اجرای دستور `hugo`، دستور زیر اجرا شود.

```shell
git submodule update --init
```

عدم اجرای این دستور منجر به پر نشدن پوشه تم با فایل‌های تم Hextra شده و باعث شکست ساخت می‌شود.


{{% details title="چگونه تم را به‌روزرسانی کنیم؟" %}}

برای به‌روزرسانی تمام زیرماژول‌های مخزن شما به آخرین کامیت‌ها، دستور زیر را اجرا کنید:

```shell
git submodule update --remote
```

برای به‌روزرسانی Hextra به آخرین کامیت، دستور زیر را اجرا کنید:

```shell
git submodule update --remote themes/hextra
```

برای جزئیات بیشتر، [زیرماژول‌های Git](https://git-scm.com/book/en/v2/Git-Tools-Submodules) را ببینید.

{{% /details %}}

## بعدی

برای شروع افزودن محتوای بیشتر، بخش‌های زیر را بررسی کنید:

{{< cards >}}
  {{< card link="../guide/organize-files" title="سازماندهی فایل‌ها" icon="document-duplicate" >}}
  {{< card link="../guide/configuration" title="پیکربندی" icon="adjustments" >}}
  {{< card link="../guide/markdown" title="Markdown" icon="markdown" >}}
{{< /cards >}}