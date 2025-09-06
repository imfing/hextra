---
title: "Asciinema Player کامپوننت"
linktitle: "Asciinema Player"
sidebar:
  exclude: true
---

shortcode asciinema به شما امکان می‌دهد تا ضبط‌های ترمینال ایجاد شده با [asciinema](https://asciinema.org/) را در سایت Hugo خود جاسازی کنید. این یک پخش‌کننده ترمینال غنی با ویژگی‌هایی مانند کنترل پخش، تنظیم سرعت و سفارشی‌سازی تم ارائه می‌دهد.

## استفاده پایه

shortcode asciinema از فایل‌های `.cast` محلی و URL های راه دور پشتیبانی می‌کند. روش‌های مختلف استفاده از فایل‌های محلی به شرح زیر است:

### فایل‌های محلی

**روش 1: دایرکتوری Assets (توصیه شده)**
فایل‌های cast را در دایرکتوری `assets/` سایت Hugo خود قرار دهید:

```
your-site/
├── assets/
│   └── demo.cast
└── content/
    └── my-page.md
```

در فایل markdown خود:
```markdown
{{</* asciinema file="demo.cast" */>}}
```

**روش 2: دایرکتوری Static**
فایل‌های cast را در دایرکتوری `static/` قرار دهید:

```
your-site/
├── static/
│   └── demo.cast
└── content/
    └── my-page.md
```

در فایل markdown خود:
```markdown
{{</* asciinema file="demo.cast" */>}}
```

**روش 3: بسته صفحه**
برای بسته‌های صفحه، فایل‌های cast را همراه با فایل markdown قرار دهید:

```
your-site/
└── content/
    └── my-page/
        ├── index.md
        └── demo.cast
```

در فایل markdown خود:
```markdown
{{</* asciinema file="demo.cast" */>}}
```

{{< asciinema file="casts/demo.cast" >}}

### فایل‌های راه دور

همچنین می‌توانید از فایل‌های cast از هر URL راه دور استفاده کنید:

```markdown
{{</* asciinema file="https://asciinema.org/a/85R4jTtjKVRIYXTcKCNq0vzYH.cast" */>}}
{{</* asciinema file="https://example.com/demo.cast" */>}}
```

{{< asciinema file="https://asciinema.org/a/85R4jTtjKVRIYXTcKCNq0vzYH.cast" >}}

### نحوه کارکرد جستجوی فایل

shortcode به ترتیب زیر فایل‌های cast شما را به طور خودکار پیدا می‌کند:
1. **منابع بسته صفحه** (اگر از بسته صفحه استفاده می‌کنید)
2. **دایرکتوری assets جهانی** (`assets/`)
3. **دایرکتوری Static** (`static/`)
4. **URL های راه دور** (اگر مسیر با `http://` یا `https://` شروع شود)

اگر فایل پیدا نشود، Hugo پیام خطای مفیدی نمایش می‌دهد که به شما می‌گوید فایل را کجا قرار دهید.

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
  file="casts/demo.cast"
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
