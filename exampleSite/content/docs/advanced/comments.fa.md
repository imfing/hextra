---
title: سیستم نظرات
linkTitle: نظرات
---

Hextra از افزودن سیستم نظرات به سایت شما پشتیبانی می‌کند.
در حال حاضر [giscus](https://giscus.app/) پشتیبانی می‌شود.

<!--more-->

## giscus

[giscus](https://giscus.app/) یک سیستم نظرات است که توسط [GitHub Discussions](https://docs.github.com/en/discussions) قدرت می‌گیرد. این سیستم رایگان و متن‌باز است.

برای فعال کردن giscus، باید موارد زیر را به فایل پیکربندی سایت اضافه کنید:

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

تنظیمات giscus را می‌توان از وبسایت [giscus.app](https://giscus.app/) ساخت. جزئیات بیشتر نیز در آنجا موجود است.

می‌توان نظرات را برای یک صفحه خاص در front matter صفحه فعال یا غیرفعال کرد:

```yaml {filename="content/docs/about.md"}
---
title: درباره
comments: true
---
```