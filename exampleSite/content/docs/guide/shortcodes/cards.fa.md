---
title: کامپوننت کارت‌ها
linkTitle: کارت‌ها
---

## مثال

{{< cards >}}
  {{< card link="../callout" title="فراخوانی" icon="warning" >}}
  {{< card link="/fa" title="بدون آیکون" >}}
{{< /cards >}}

{{< cards >}}
  {{< card link="/" title="کارت تصویر" image="https://source.unsplash.com/featured/800x600?landscape" subtitle="یک چشم‌انداز Unsplash" >}}
  {{< card link="/" title="تصویر محلی" image="/images/card-image-unprocessed.jpg" subtitle="تصویر خام در دایرکتوری استاتیک است." >}}
  {{< card link="/" title="تصویر محلی" image="images/space.jpg" subtitle="تصویر در دایرکتوری assets می‌باشد و پردازش توسط Hugo شده است." method="Resize" options="600x q80 webp" >}}
{{< /cards >}}

## استفاده

```
{{</* cards */>}}
  {{</* card link="../callout" title="فراخوانی" icon="warning" */>}}
  {{</* card link="/fa" title="بدون آیکون" */>}}
{{</* /cards */>}}
```

```
{{</* cards */>}}
  {{</* card link="/" title="کارت تصویر" image="https://source.unsplash.com/featured/800x600?landscape" subtitle="یک چشم‌انداز Unsplash" */>}}
  {{</* card link="/" title="تصویر محلی" image="/images/card-image-unprocessed.jpg" subtitle="تصویر خام در دایرکتوری استاتیک است." */>}}
  {{</* card link="/" title="تصویر محلی" image="images/space.jpg" subtitle="تصویر در دایرکتوری assets می‌باشد و پردازش توسط Hugo شده است." method="Resize" options="600x q80 webp" */>}}
{{</* /cards */>}}
```

## پارامترهای کارت

| پارامتر  | توضیحات                           |
|----------- |---------------------------------------|
| `link`     | نشانی اینترنتی (داخلی یا خارجی).          |
| `title`    | عنوان برای کارت.          |
| `subtitle` | عنوان زیرنویس (از مارک‌داون پشتیبانی می‌کند).. |
| `icon`     | نام آیکون.                     |

## کارت تصویر

علاوه بر این، کارت از افزودن تصویر و پردازش از طریق این پارامترها پشتیبانی می‌کند:

| پارامتر  | توضیحات                                 |
|----------- |---------------------------------------------|
| `image`    | نشانی اینترنتی تصویر کارت را مشخص می‌کند.      |
| `method`   | روش پردازش تصویر Hugo را تنظیم می‌کند.        |
| `options`  | گزینه‌های پردازش تصویر Hugo را پیکربندی می‌کند. |

کارت از سه نوع تصویر پشتیبانی می‌کند:

1. تصویر از راه دور: نشانی اینترنتی کامل در پارامتر `image`.
2. تصویر استاتیک: از مسیر نسبی در دایرکتوری `static/` Hugo استفاده کنید.
3. تصویر پردازش شده: از مسیر نسبی در دایرکتوری `assets/` Hugo استفاده کنید.

هگزترا در صورت نیاز به پردازش تصویر در حین ساخت، به طور خودکار تشخیص می‌دهد و پارامتر `options` یا تنظیمات پیش‌فرض را اعمال می‌کند (تغییر اندازه، 800x، کیفیت 80، فرمت WebP).
 در حال حاضر این `method` را پشتیبانی می‌کند: `Resize`، `Fit`، `Fill` و `Crop`.

برای اطلاعات بیشتر در مورد دستورات، روش‌ها و گزینه‌های پردازش تصویر داخلی Hugo به [مستندات پردازش تصویر](https://gohugo.io/content-management/image-processing/) آن‌ها مراجعه کنید.
