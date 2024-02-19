---
title: آیکون

---

برای استفاده از این کد کوتاه درون‌خطی، باید آن را در پیکربندی فعال کنید:

```yaml {filename="hugo.yaml"}
enableInlineShortcodes: true
```

فهرست آیکون‌های موجود را می‌توانید در [`data/icons.yaml`](https://github.com/imfing/hextra/blob/main/data/icons.yaml) پیدا کنید.

<!--more-->

## مثال

{{< icon "academic-cap" >}}
{{< icon "cake" >}}
{{< icon "gift" >}}
{{< icon "sparkles" >}}

## استفاده

```
{{</* icon "github" */>}}
```

آیکون‌های با طرح‌های متفاوت در [Heroicons](https://v1.heroicons.com/) نسخه ۱ خارج از جعبه در دسترس هستند.

### چجوری آیکون‌های خودمان را اضافه کنیم

پرونده `data/icons.yaml` را ایجاد کنید، سپس آیکون‌های SVG خود را در فرمت زیر اضافه کنید:

```yaml {filename="data/icons.yaml"}
your-icon: <svg>your icon svg content</svg>
```

سپس می‌توان آن را در کد کوتاه مانند زیر استفاده کرد:

```
{{</* icon "your-icon" */>}}

{{</* card icon="your-icon" */>}}
```

نکته: [Iconify Design](https://iconify.design/) مکانی عالی برای پیدا کردن آیکون‌های SVG برای سایت شما است.
