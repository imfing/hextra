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

### بسته‌های آیکون راه دور

آیکون‌های راه دور را می‌توان با استفاده از پیشوند ارائه‌دهنده و به صورت موردنیاز بارگذاری کرد. Hextra از این ارائه‌دهنده‌ها پشتیبانی می‌کند:

| ارائه‌دهنده                              | مثال                              | آیکون                       |
| ---------------------------------------- | --------------------------------- | --------------------------- |
| [Lucide](https://lucide.dev/icons/)      | `{{</* icon "lucide:house" */>}}` | {{< icon "lucide:house" >}} |
| [Tabler Icons](https://tabler.io/icons)  | `{{</* icon "tabler:user" */>}}`  | {{< icon "tabler:user" >}}  |
| [Simple Icons](https://simpleicons.org/) | `{{</* icon "simple:hugo" */>}}`  | {{< icon "simple:hugo" >}}  |

آیکون‌های راه دور در زمان ساخت دریافت می‌شوند. ارائه‌دهنده‌های پیش‌فرض به نسخه اصلی بسته‌ها محدود شده‌اند و از این URLهای CDN بارگذاری می‌شوند:

```yaml
lucide: "https://unpkg.com/lucide-static@1/icons/%s.svg"
tabler: "https://unpkg.com/@tabler/icons@3/icons/outline/%s.svg"
simple: "https://cdn.jsdelivr.net/npm/simple-icons@16/icons/%s.svg"
```

نام آیکون‌های راه دور در هر جایی از Hextra که نام آیکون می‌پذیرد قابل استفاده است، از جمله کارت‌ها، تب‌ها، نشان‌ها، کال‌اوت‌ها و آیتم‌های منوی نوار ناوبری.

## خيارات

| المعلمة      | وصف            |
| ------------ | -------------- |
| `name`       | اسم الأيقونة   |
| `attributes` | سمات الأيقونة. |
