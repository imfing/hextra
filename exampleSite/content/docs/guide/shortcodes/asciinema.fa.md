---
title: "پخش‌کننده Asciinema"
---

shortcode asciinema به شما امکان می‌دهد تا ضبط‌های ترمینال ایجاد شده با [asciinema](https://asciinema.org/) را در سایت Hugo خود جاسازی کنید. این یک پخش‌کننده ترمینال غنی با ویژگی‌هایی مانند کنترل پخش، تنظیم سرعت و سفارشی‌سازی تم ارائه می‌دهد.

## استفاده پایه

می‌توانید از فایل‌های `.cast` محلی یا URL های راه دور استفاده کنید. برای فایل‌های محلی، آن‌ها را در دایرکتوری `static/casts/` قرار دهید:

```markdown
{{</* asciinema file="demo.cast" */>}}
```

### فایل‌های راه دور

همچنین می‌توانید از فایل‌های cast راه دور از هر URL استفاده کنید:

```markdown
{{</* asciinema file="https://asciinema.org/a/85R4jTtjKVRIYXTcKCNq0vzYH.cast" */>}}
{{</* asciinema file="https://example.com/demo.cast" */>}}
```

{{< asciinema file="https://asciinema.org/a/85R4jTtjKVRIYXTcKCNq0vzYH.cast" >}}

{{< asciinema file="demo.cast" >}}

## نمایش پیشرفته

این یک مثال پیشرفته است که تمام پارامترهای موجود را نشان می‌دهد:

```markdown
{{</* asciinema 
  file="demo.cast"
  theme="dracula"
  speed="2"
  autoplay="true"
  loop="true"
  markers="1.5:Installation,3.2:Configuration,5.8:Testing"
*/>}}
```

{{< asciinema 
  file="demo.cast"
  theme="dracula"
  speed="2"
  autoplay="true"
  loop="true"
  markers="1.5:Installation,3.2:Configuration,5.8:Testing"
>}}

## پارامترها

| پارامتر | نوع | پیش‌فرض | توضیحات |
|---------|-----|---------|---------|
| `file` | string | - | مسیر فایل .cast (ضروری). از فایل‌های محلی، مسیرهای مطلق و URL های راه دور پشتیبانی می‌کند |
| `theme` | string | `"asciinema"` | تم پخش‌کننده |
| `speed` | number | `1` | ضریب سرعت پخش |
| `autoplay` | boolean | `false` | شروع خودکار پخش |
| `loop` | boolean | `false` | پخش حلقه‌ای |
| `poster` | string | `""` | پوستر (فریم پیش‌نمایش) برای نمایش تا زمان شروع پخش. از نمادگذاری NPT پشتیبانی می‌کند (مثل "npt:1:23") |
| `markers` | string | `""` | نشانگرهای زمانی جدا شده با کاما. فرمت: "زمان:برچسب" یا فقط "زمان" (مثل "1.5:Installation,3.2:Configuration,5.8") |
