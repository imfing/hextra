---
title: پیکربندی
weight: 2
---

Hugo پیکربندی خود را از `hugo.yaml` در ریشه سایت Hugo شما می‌خواند.
 پرونده پیکربندی جایی است که می‌توانید تمام جنبه‌های سایت خود را پیکربندی کنید.
 پرونده پیکربندی این سایت [`exampleSite/hugo.yaml`](https://github.com/imfing/hextra/blob/main/exampleSite/hugo.yaml) را در گیت‌هاب بررسی کنید تا ایده‌ای جامع از تنظیمات موجود و بهترین شیوه‌ها بدست آورید.

<!--more-->

## ناوبری

### منو

منوی سمت چپ بالا در قسمت `menu.main` در پرونده پیکربندی تعریف شده است:

```yaml {filename="hugo.yaml"}
menu:
  main:
    - name: مستندات
      pageRef: /docs
      weight: 1
    - name: وبلاگ
      pageRef: /blog
      weight: 2
    - name: درباره ما
      pageRef: /about
      weight: 3
    - name: جستجو
      weight: 4
      params:
        type: search
    - name: گیت‌هاب
      weight: 5
      url: "https://github.com/imfing/hextra"
      params:
        icon: github
```

انواع مختلفی از آیتم‌های منو وجود دارد:

1. پیوند به صفحه‌ای در سایت با `pageRef`
    ```yaml
    - name: مستندات
      pageRef: /docs
    ```
2. پیوند به یک نشانی اینترنتی با `url`
    ```yaml
    - name: گیت‌هاب
      url: "https://github.com"
    ```
3. نوار جستجو با `type: search`
    ```yaml
    - name: جستجو
      params:
        type: search
    ```
4. آیکون
    ```yaml
    - name: گیت‌هاب
      params:
        icon: github
    ```

این آیتم‌های منو را می‌توانید با تنظیم پارامتر `weight` مرتب کنید.

### آرم و عنوان

برای تغییر آرم پیش‌فرض، `hugo.yaml` را ویرایش کنید و مسیر را به پرونده آرم خود در دایرکتوری `static` اضافه کنید.
 به صورت اختیاری، می‌توانید پیوندی را که کاربران هنگام کلیک کردن روی آرم شما به آن هدایت می‌شوند، تغییر دهید، همچنین عرض و ارتفاع آرم را به پیکسل تنظیم کنید.

```yaml {filename="hugo.yaml"}
params:
  navbar:
    displayTitle: true
    displayLogo: true
    logo:
      path: images/logo.svg
      dark: images/logo-dark.svg
      link: /
      width: 40
      height: 20
```

## نوار کناری

### نوار کناری اصلی

برای نوار کناری اصلی، به طور خودکار از ساختار دایرکتوری محتوا تولید می‌شود.
 برای جزئیات بیشتر به صفحه [سازماندهی پرونده‌ها](/fa/docs/guide/organize-files) مراجعه کنید.

برای حذف یک صفحه از نوار کناری سمت راست، پارامتر`sidebar.exclude` را در قسمت بالایی صفحه تنظیم کنید:

```yaml {filename="content/docs/guide/configuration.md"}
---
title: پیکربندی
sidebar:
  exclude: true
---
```

### پیوندهای اضافی

پیوندهای اضافی نوار کناری در زیر بخش `menu.sidebar` در پرونده پیکربندی تعریف شده است:

```yaml {filename="hugo.yaml"}
menu:
  sidebar:
    - name: بیشتر
      params:
        type: separator
      weight: 1
    - name: "درباره ما"
      pageRef: "/about"
      weight: 2
    - name: "مستندات هیوگو ↖"
      url: "https://gohugo.io/documentation/"
      weight: 3
```

## نوار کناری سمت چپ

### فهرست مطالب

فهرست مطالب به طور خودکار از سرتیرهای موجود در پرونده محتوا تولید می‌شود. می‌توان آن را با تنظیم `toc: false` در قسمت بالایی صفحه غیرفعال کرد.

```yaml {filename="content/docs/guide/configuration.md"}
---
title: پیکربندی
toc: false
---
```

### پیوند ویرایش صفحه

برای پیکربندی پیوند ویرایش صفحه، می‌توانیم پارامتر `params.editURL.base` را در پرونده پیکربندی تنظیم کنیم:

```yaml {filename="hugo.yaml"}
params:
  editURL:
    enable: true
    base: "https://github.com/your-username/your-repo/edit/main"
```

پیوندهای ویرایش به طور خودکار برای هر صفحه براساس نشانی اینترنتی ارائه شده به عنوان دایرکتوری ریشه ایجاد می‌شود.
 اگر می‌خواهید پیوند ویرایش را برای یک صفحه خاص تنظیم کنید، می‌توانید پارامتر `editURL` را در قسمت بالای صفحه تنظیم کنید:

```yaml {filename="content/docs/guide/configuration.md"}
---
title: پیکربندی
editURL: "https://example.com/edit/this/page"
---
```

## پاورقی

### کپی‌رایت

برای تغییر متن کپی‌رایت نمایش داده شده در پاورقی وب‌سایت خود، باید پرونده‌ای به نام `i18n/fa.yaml` ایجاد کنید.
 در این پرونده متن کپی‌رایت جدید خود را مطابق شکل زیر مشخص کنید:

```yaml {filename="i18n/fa.yaml"}
copyright: "© ۲۰۲۴ متن شما در اینجا"
```

برای مرجع شما، یک مثال [`i18n/en.yaml`](https://github.com/imfing/hextra/blob/main/i18n/en.yaml) را می‌توانید در مخزن گیت‌هاب پیدا کنید. علاوه بر این، می‌توانید از فرمت مارک‌داون در متن کپی‌رایت استفاده کنید.

## سایر موارد

### Favicon

برای سفارشی کردن [favicon](https://en.wikipedia.org/wiki/Favicon) برای سایت خود، پرونده‌های آیکون را درون پوشه `static` قرار دهید تا [faviconهای پیش‌فرض در تم](https://github.com/imfing/hextra/tree/main/static) جایگزین شود:

{{< filetree/container >}}
  {{< filetree/folder name="static" >}}
    {{< filetree/file name="android-chrome-192x192.png" >}}
    {{< filetree/file name="android-chrome-512x512.png" >}}
    {{< filetree/file name="apple-touch-icon.png" >}}
    {{< filetree/file name="favicon-16x16.png" >}}
    {{< filetree/file name="favicon-32x32.png" >}}
    {{< filetree/file name="favicon-dark.svg" >}}
    {{< filetree/file name="favicon.ico" >}}
    {{< filetree/file name="favicon.svg" >}}
    {{< filetree/file name="site.webmanifest" >}}
  {{< /filetree/folder >}}
{{< /filetree/container >}}

هر دو پرونده `favicon.ico` و `favicon.svg` را در پروژه خود قرار دهید، تا از نمایش صحیح faviconهای سایت خود مطمئن شوید.

در حالی که `favicon.ico` به طور کلی برای مرورگرهای قدیمی‌تر است، `favicon.svg` توسط مرورگرهای مدرن پشتیبانی می‌شود. favicon`favicon-dark.svg` اختیاری را می‌توانید برای یک تجربه سفارشی در حالت تیره اضافه کرد.
 با خیال راحت از ابزارهایی مانند [favicon.io](https://favicon.io/) یا [favycon](https://github.com/ruisaraiva19/favycon) برای تولید این آیکون‌ها استفاده کنید.

### پیکربندی تم

از تنظیمات `theme` برای پیکربندی حالت پیش‌فرض تم و دکمه جابه‌جایی استفاده کنید و به بازدیدکنندگان اجازه دهید بین حالت روشن یا تیره جابجا شوند.

```yaml {filename="hugo.yaml"}
params:
  theme:
    # light | dark | system
    default: system
    displayToggle: true
```

گزینه‌های `theme.default`:

- `light` - همیشه از حالت روشن استفاده شود
- `dark` - همیشه از حالت تیره استفاده شود
- `system` - همگام‌سازی با تنظیمات سیستم‌عامل (پیش‌فرض)

پارامتر `theme.displayToggle` به شما این امکان را می‌دهد که یک دکمه جابجایی برای تغییر حالت تم‌ها نمایش دهید.
 وقتی روی `true` تنظیم شود، بازدیدکنندگان می‌توانند بین حالت روشن یا تیره جابه‌جا شوند و تنظیمات پیش‌فرض را نادیده بگیرند.

### عرض صفحه

عرض صفحه را می‌توان با پارامتر `params.page.width` در پرونده پیکربندی سفارشی کرد:

```yaml {filename="hugo.yaml"}
params:
  page:
    # full (100%), wide (90rem), normal (1280px)
    width: wide
```

سه گزینه در دسترس وجود دارد: `full`، `wide` و normal`. به طور پیش‌فرض، عرض صفحه روی normal` تنظیم شده است.

به طور مشابه، عرض نوار ناوبری و پاورقی را می‌توان با پارامترهای `params.navbar.width` و `params.footer.width` سفارشی کرد.

### فهرست جستجو

جستجوی متن کامل توسط [FlexSearch](https://github.com/nextapps-de/flexsearch) پیاده‌سازی شده و به طور پیش‌فرض فعال است.
 برای سفارشی کردن فهرست جستجو، پارامتر `params.search.flexsearch.index` را در پرونده پیکربندی تنظیم کنید:

```yaml {filename="hugo.yaml"}
params:
  # Search
  search:
    enable: true
    type: flexsearch

    flexsearch:
      # index page by: content | summary | heading | title
      index: content
```

گزینه‌های `flexsearch.index`:

- `content` - محتوای کامل صفحه (پیش‌فرض)
- `summary` - خلاصه صفحه، برای جزئیات بیشتر به [خلاصه مطالب Hugo](https://gohugo.io/content-management/summaries/) مراجعه کنید
- `heading` - سرتیترهای سطح ۱ و سطح ۲
- `title` -  فقط شامل عنوان صفحه است

برای حذف یک صفحه از فهرست جستجو، `excludeSearch: true` را در قسمت بالای صفحه تنظیم کنید:

```yaml {filename="content/docs/guide/configuration.md"}
---
title: پیکربندی
excludeSearch: true
---
```

### گوگل آنالیتیکس

برای فعال کردن [گوگل آنالیتیکس](https://marketingplatform.google.com/about/analytics/)، پرچم `services.googleAnalytics.ID` را در `hugo.yaml` تنظیم کنید:

```yaml {filename="hugo.yaml"}
services:
  googleAnalytics:
    ID: G-MEASUREMENT_ID
```
