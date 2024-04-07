---
title: شروع کنید
weight: 1
next: /docs/guide
prev: /docs
---

## شروع سریع از طریق Template

{{< icon "github" >}}&nbsp;[imfing/hextra-starter-template](https://github.com/imfing/hextra-starter-template)

با استفاده از template در بالای صفحه‌ای مخزن می‌توانید به سرعت شروع به کار کنید.

<img src="https://docs.github.com/assets/cb-77734/mw-1440/images/help/repository/use-this-template-button.webp" width="500">

ما یک [گردش کاری GitHub Actions](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site#publishing-with-a-custom-github-actions-workflow) ارائه کرده‌ایم که می‌تواند به ساخت و به‌کاراندازی خودکار سایت شما در گیت‌هاب Pages، برای میزبانی رایگان کمک کند. برای گزینه‌های بیشتر، [به‌کاراندازی سایت](../guide/deploy-site) را بررسی کنید.

[🌐 نسخه‌ي نمایشی ↖](https://imfing.github.io/hextra-starter-template/)

## شروع به عنوان پروژه جدید

دو راه اصلی برای اضافه کردن تم هگزترا به پروژه Hugo وجود دارد:

1. **ماژول‌های Hugo (توصیه می‌شود)**: ساده‌ترین و توصیه شده‌ترین. [ماژول‌های Hugo](https://gohugo.io/hugo-modules/) به شما امکان می‌دهند تم را مستقیما از منبع آنلاین آن وارد کنید. تم به صورت خودکار دانلود و توسط Hugo مدیریت می‌شود.
2. **ساب‌ماژول گیت**: در عوض، هگزترا را به عنوان یک [ساب‌ماژول گیت](https://git-scm.com/book/en/v2/Git-Tools-Submodules) اضافه کنید. تم توسط گیت دانلود شده و در پوشه `themes` پروژه شما ذخیره می‌شود.

### هگزترا را به عنوان ماژول Hugo راه‌اندازی کنید

#### پیش‌نیازها

قبل از شروع، باید این نرم‌افزارها را نصب کنید:

- [Hugo (extended version)](https://gohugo.io/installation/)
- [Git](https://git-scm.com/)
- [Go](https://go.dev/)

#### مراحل

{{% steps %}}

### راه‌انداختن یک سایت جدید Hugo

```shell
hugo new site my-site --format=yaml
```

### پیکربندی تم هگزترا از طریق ‌ماژول

```shell
# مقداردهی اولیه ماژول هیوگو
cd my-site
hugo mod init github.com/username/my-site

# افزودن تم هگزترا
hugo mod get github.com/imfing/hextra
```

با افزودن موارد زیر، `hugo.yaml` را برای استفاده از تم هگزترا پیکربندی کنید:

```yaml
module:
  imports:
    - path: github.com/imfing/hextra
```

### اولین صفحه‌های محتوای خود را ایجاد کنید

ایجاد صفحه محتوای جدید برای صفحه اصلی و صفحه مستندات:

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


{{% details title="چگونه تم را به‌روز کنیم؟" %}}

برای به‌روزرسانی همه ماژول‌های Hugo در پروژه خود به آخرین نسخه‌هایشان، دستور زیر را اجرا کنید:

```shell
hugo mod get -u
```

برای به‌روزرسانی هگزترا به [آخرین نسخه منتشر شده](https://github.com/imfing/hextra/releases)، دستور زیر را اجرا کنید:

```shell
hugo mod get -u github.com/imfing/hextra
```

برای جزئیات بیشتر به [ماژول‌های هیوگو](https://gohugo.io/hugo-modules/use-modules/#update-all-modules) مراجعه کنید.

{{% /details %}}

### هگزترا را به عنوان ساب‌ماژول Git راه‌اندازی کنید

#### پیش‌نیازها

قبل از شروع، باید این نرم‌افزارها را نصب کنید:

- [Hugo (extended version)](https://gohugo.io/installation/)
- [Git](https://git-scm.com/)

#### مراحل

{{% steps %}}

### راه‌انداختن یک سایت جدید Hugo

```shell
hugo new site my-site --format=yaml
```

### افزودن تم هگزترا به عنوان یک ساب‌ماژول Git

```shell
git submodule add https://github.com/imfing/hextra.git themes/hextra
```

با افزودن موارد زیر، `hugo.yaml` را برای استفاده از تم هگزترا پیکربندی کنید:

```yaml
theme: hextra
```

### اولین صفحه‌های محتوای خود را ایجاد کنید

ایجاد صفحه محتوای جدید برای صفحه اصلی و صفحه مستندات:

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


هنگام استفاده از [CI/CD](https://en.wikipedia.org/wiki/CI/CD) برای به‌کاراندازی وب‌سایت Hugo، از اجرای دستور زیر قبل از اجرای دستور `hugo` مطمئن شوید و ضروری است.

```shell
git submodule update --init
```

اجرا نشدن این دستور باعث می‌شود که پوشه تم با پرونده‌های تم هگزترا پر نشود و منجر به خرابی ساخت شود.


{{% details title="چگونه تم را به‌روز کنیم؟" %}}

برای به‌روزرسانی تمام ساب‌ماژول‌های در مخزن خود به آخرین commitها که موجود هست، دستور زیر را اجرا کنید:

```shell
git submodule update --remote
```

برای به‌روزرسانی هگزترا به آخرین commit، دستور زیر را اجرا کنید:

```shell
git submodule update --remote themes/hextra
```

برای جزئیات بیشتر به [ساب‌ماژول‌های Git](https://git-scm.com/book/en/v2/Git-Tools-Submodules) مراجعه کنید.

{{% /details %}}

## بعدی

برای شروع اضافه کردن مطالب بیشتر، بخش‌های زیر را کاوش کنید:

{{< cards >}}
  {{< card link="../guide/organize-files" title="سازماندهی پرونده‌ها" icon="document-duplicate" >}}
  {{< card link="../guide/configuration" title="پیکربندی" icon="adjustments" >}}
  {{< card link="../guide/markdown" title="مارک‌داون" icon="markdown" >}}
{{< /cards >}}
