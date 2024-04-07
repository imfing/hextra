---
title: سیستم نظردهی
linkTitle: نظردهی
---

هگزترا از افزودن سیستم نظردهی به سایت شما پشتیبانی می‌کند.
 در حال حاضر [giscus](https://giscus.app/) پشتیبانی می‌شود.

<!--more-->

## giscus

[giscus](https://giscus.app/) یک سیستم نظردهی است که توسط [GitHub Discussions](https://docs.github.com/en/discussions) طراحی شده است. رایگان و متن باز است.

برای فعال کردن giscus، باید موارد زیر را به پرونده پیکربندی سایت اضافه کنید:

```yaml {filename="hugo.yaml"}
params:
  comments:
    enable: false
    type: giscus

    giscus:
      repo: <repository>
      repoId: <repository ID>
      category: <category>
      categoryId: <category ID>
```

تنظیمات giscus را می توانید از وب‌سایت [giscus.app](https://giscus.app/) ساخت. جزئیات بیشتر را نیز می‌توانید در آنجا ببینید.

دیدگاه‌ها را می‌توانید برای یک صفحه خاص در بالای همان صفحه فعال یا غیرفعال کرد:

```yaml {filename="content/docs/about.md"}
---
title: درباره ما
comments: true
---
```
