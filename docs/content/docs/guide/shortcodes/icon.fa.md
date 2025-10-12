---
title: آیکون
next: /docs/guide/shortcodes/steps
---

برای استفاده از این شورت‌کد به صورت درون‌خطی، باید قابلیت شورت‌کدهای درون‌خطی در تنظیمات فعال شود:

```yaml {filename="hugo.yaml"}
enableInlineShortcodes: true
```

لیست آیکون‌های موجود را می‌توانید در [`data/icons.yaml`](https://github.com/imfing/hextra/blob/main/data/icons.yaml) مشاهده کنید.

<!--more-->

## مثال

{{< icon "academic-cap" >}}
{{< icon "cake" >}}
{{< icon "gift" >}}
{{< icon "sparkles" >}}

## نحوه استفاده

```
{{</* icon "github" */>}}
```

آیکون‌های [Heroicons](https://v1.heroicons.com/) نسخه 1 به صورت پیش‌فرض در دسترس هستند.

### چگونه آیکون‌های خود را اضافه کنید

فایل `data/icons.yaml` را ایجاد کنید، سپس آیکون‌های SVG خود را با فرمت زیر اضافه کنید:

```yaml {filename="data/icons.yaml"}
your-icon: <svg>محتوای SVG آیکون شما</svg>
```

سپس می‌توانید از آن در شورت‌کد به این صورت استفاده کنید:

```
{{</* icon "your-icon" */>}}

{{</* card icon="your-icon" */>}}
```

نکته: [Iconify Design](https://iconify.design/) منبع خوبی برای یافتن آیکون‌های SVG برای سایت شماست.

## خيارات

| المعلمة      | وصف            |
|--------------|----------------|
| `name`       | اسم الأيقونة   |
| `attributes` | سمات الأيقونة. |
