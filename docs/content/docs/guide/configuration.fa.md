---
title: پیکربندی
weight: 2
tags:
  - پیکربندی
---

Hugo تنظیمات خود را از فایل `hugo.yaml` در ریشه سایت شما می‌خواند.
فایل پیکربندی جایی است که می‌توانید تمام جنبه‌های سایت خود را تنظیم کنید.
برای آشنایی جامع با تنظیمات موجود و بهترین روش‌ها، فایل پیکربندی این سایت [`docs/hugo.yaml`](https://github.com/imfing/hextra/blob/main/docs/hugo.yaml) را در GitHub بررسی کنید.

<!--more-->

## ناوبری

### منو

منوی بالای صفحه در بخش `menu.main` در فایل پیکربندی تعریف می‌شود:

```yaml {filename="hugo.yaml"}
menu:
  main:
    - name: مستندات
      pageRef: /docs
      weight: 1
    - name: وبلاگ
      pageRef: /blog
      weight: 2
    - name: درباره
      pageRef: /about
      weight: 3
    - name: جستجو
      weight: 4
      params:
        type: search
    - name: GitHub
      weight: 5
      url: "https://github.com/imfing/hextra"
      params:
        icon: github
```

انواع مختلفی از آیتم‌های منو وجود دارد:

1. لینک به یک صفحه در سایت با `pageRef`
   ```yaml
   - name: مستندات
     pageRef: /docs
   ```
2. لینک به یک URL خارجی با `url`
   ```yaml
   - name: GitHub
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
   - name: GitHub
     params:
       icon: github
   ```
5. تبديل السمة
   ```yaml
    - name: Theme Toggle
      params:
        type: theme-toggle
        label: true # optional, default is false
   ```
6. مُبدِّل اللغة
   ```yaml
    - name: مُبدِّل اللغة
      params:
        type: language-switch
        label: true # optional, default is false
        icon: "globe-alt" # optional, default is "translate"
   ```

این آیتم‌های منو را می‌توان با تنظیم پارامتر `weight` مرتب کرد.

### منوهای تو در تو

با تعریف آیتم‌های منوی فرزند می‌توانید منوهای کشویی ایجاد کنید. منوهای فرزند با کلیک روی آیتم منوی والد نمایش داده می‌شوند.

```yaml {filename="hugo.yaml"}
menu:
  main:
    - identifier: sdk
      name: SDK
    - identifier: python
      name: Python ↗
      url: https://python.org
      parent: sdk
    - identifier: go
      name: Go
      url: https://go.dev
      parent: sdk
```

آیتم‌های منوی فرزند باید پارامتر `parent` را با مقدار `identifier` والد مشخص کنند.

### لوگو و عنوان

برای تغییر لوگوی پیش‌فرض، فایل `hugo.yaml` را ویرایش کرده و مسیر فایل لوگوی خود را در دایرکتوری `static` اضافه کنید.
همچنین می‌توانید لینکی که کاربران با کلیک روی لوگو به آن هدایت می‌شوند را تغییر دهید و عرض و ارتفاع لوگو را بر حسب پیکسل تنظیم کنید.

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

برای نوار کناری اصلی، به طور خودکار از ساختار دایرکتوری محتوا ایجاد می‌شود.
برای جزئیات بیشتر به صفحه [سازماندهی فایل‌ها](/docs/guide/organize-files) مراجعه کنید.

برای حذف یک صفحه از نوار کناری چپ، پارامتر `sidebar.exclude` را در front matter صفحه تنظیم کنید:

```yaml {filename="content/docs/guide/configuration.md"}
---
title: پیکربندی
sidebar:
  exclude: true
---
```

### لینک‌های اضافی

لینک‌های اضافی نوار کناری در بخش `menu.sidebar` در فایل پیکربندی تعریف می‌شوند:

```yaml {filename="hugo.yaml"}
menu:
  sidebar:
    - name: بیشتر
      params:
        type: separator
      weight: 1
    - name: "درباره"
      pageRef: "/about"
      weight: 2
    - name: "مستندات Hugo ↗"
      url: "https://gohugo.io/documentation/"
      weight: 3
```

## نوار کناری راست

### فهرست مطالب

فهرست مطالب به طور خودکار از عناوین موجود در فایل محتوا ایجاد می‌شود. می‌توانید آن را با تنظیم `toc: false` در front matter صفحه غیرفعال کنید.

```yaml {filename="content/docs/guide/configuration.md"}
---
title: پیکربندی
toc: false
---
```

### لینک ویرایش صفحه

برای پیکربندی لینک ویرایش صفحه، می‌توانیم پارامتر `params.editURL.base` را در فایل پیکربندی تنظیم کنیم:

```yaml {filename="hugo.yaml"}
params:
  editURL:
    enable: true
    base: "https://github.com/your-username/your-repo/edit/main"
```

لینک‌های ویرایش به طور خودکار برای هر صفحه بر اساس URL ارائه شده به عنوان دایرکتوری ریشه ایجاد می‌شوند.
اگر می‌خواهید لینک ویرایش را برای یک صفحه خاص تنظیم کنید، می‌توانید پارامتر `editURL` را در front matter صفحه تنظیم کنید:

```yaml {filename="content/docs/guide/configuration.md"}
---
title: پیکربندی
editURL: "https://example.com/edit/this/page"
---
```

## پاورقی

### کپی رایت

برای تغییر متن کپی رایت نمایش داده شده در پاورقی سایت، باید یک فایل به نام `i18n/en.yaml` ایجاد کنید.
در این فایل، متن جدید کپی رایت را به صورت زیر مشخص کنید:

```yaml {filename="i18n/en.yaml"}
copyright: "© 2024 متن دلخواه شما"
```

برای مرجع، یک فایل نمونه [`i18n/en.yaml`](https://github.com/imfing/hextra/blob/main/i18n/en.yaml) در مخزن GitHub موجود است. همچنین می‌توانید از قالب Markdown در متن کپی رایت استفاده کنید.

## سایر موارد

### فاوآیکون

برای سفارشی کردن [فاوآیکون](https://fa.wikipedia.org/wiki/فاوآیکون) سایت، فایل‌های آیکون را در پوشه `static` قرار دهید تا [فاوآیکون‌های پیش‌فرض قالب](https://github.com/imfing/hextra/tree/main/static) را جایگزین کنید:

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

#### تنظیمات پایه

حداقل، فایل `favicon.svg` را در پوشه `static` قرار دهید. این فایل به عنوان فاوآیکون پیش‌فرض سایت استفاده می‌شود.

می‌توانید یک فاوآیکون SVG تطبیقی ایجاد کنید که به ترجیحات تم سیستم پاسخ دهد با استفاده از media queryهای CSS درون خود SVG، با پیروی از روش توضیح داده شده در [ساخت یک فاوآیکون تطبیقی](https://web.dev/articles/building/an-adaptive-favicon).

#### پشتیبانی از حالت تاریک

برای پشتیبانی بهتر از حالت تاریک، فایل `favicon-dark.svg` را در کنار `favicon.svg` در پوشه `static` قرار دهید. وقتی هر دو فایل موجود باشند، Hextra به طور خودکار:

- از `favicon.svg` برای حالت روشن یا زمانی که ترجیح تمی مشخص نشده استفاده می‌کند
- به `favicon-dark.svg` تغییر می‌کند وقتی سیستم کاربر در حالت تاریک تنظیم شده است
- تنظیمات `prefers-color-scheme` سیستم را برای تغییر خودکار رعایت می‌کند

تغییر فاوآیکون حالت تاریک در تمام مرورگرهای مدرن، از جمله Firefox، کار می‌کند و تجربه‌ای یکپارچه که با تم سایت شما مطابقت دارد ارائه می‌دهد.

#### فرمت‌های اضافی

در حالی که `favicon.ico` عمدتاً برای مرورگرهای قدیمی است، مرورگرهای مدرن از فاوآیکون‌های SVG پشتیبانی می‌کنند که به دلیل مقیاس‌پذیری و حجم کم فایل ترجیح داده می‌شوند.
در صورت نیاز از ابزارهایی مانند [favicon.io](https://favicon.io/) یا [favycon](https://github.com/ruisaraiva19/favycon) برای تولید فرمت‌های اضافی فاوآیکون استفاده کنید.

### پیکربندی تم

از تنظیم `theme` برای پیکربندی حالت پیش‌فرض تم و دکمه تغییر تم استفاده کنید، که به بازدیدکنندگان امکان تغییر بین حالت روشن یا تاریک را می‌دهد.

```yaml {filename="hugo.yaml"}
params:
  theme:
    # light | dark | system
    default: system
    displayToggle: true
```

گزینه‌های `theme.default`:

- `light` - همیشه از حالت روشن استفاده کنید
- `dark` - همیشه از حالت تاریک استفاده کنید
- `system` - همگام با تنظیمات سیستم عامل (پیش‌فرض)

پارامتر `theme.displayToggle` به شما امکان می‌دهد دکمه‌ای برای تغییر تم نمایش دهید.
وقتی روی `true` تنظیم شود، بازدیدکنندگان می‌توانند بین حالت روشن یا تاریک تغییر دهند و تنظیم پیش‌فرض را لغو کنند.

### آخرین تغییر صفحه

تاریخ آخرین تغییر صفحه را می‌توان با فعال کردن پرچم `params.displayUpdatedDate` نمایش داد. برای استفاده از تاریخ commit Git به عنوان منبع، پرچم `enableGitInfo` را نیز فعال کنید.

برای سفارشی کردن فرمت تاریخ، پارامتر `params.dateFormat` را تنظیم کنید. چیدمان آن با [`time.Format`](https://gohugo.io/functions/time/format/) Hugo مطابقت دارد.

```yaml {filename="hugo.yaml"}
# تجزیه commit Git
enableGitInfo: true

params:
  # نمایش تاریخ آخرین تغییر
  displayUpdatedDate: true
  dateFormat: "January 2, 2006"
```

### برچسب‌ها

برای نمایش برچسب‌های صفحه، پرچم‌های زیر را در فایل پیکربندی تنظیم کنید:

```yaml {filename="hugo.yaml"}
params:
  blog:
    list:
      displayTags: true
  toc:
    displayTags: true
```

### عرض صفحه

عرض صفحه را می‌توان با پارامتر `params.page.width` در فایل پیکربندی سفارشی کرد:

```yaml {filename="hugo.yaml"}
params:
  page:
    # full (100%), wide (90rem), normal (1280px)
    width: wide
```

سه گزینه موجود است: `full`, `wide`, و `normal`. به طور پیش‌فرض، عرض صفحه روی `normal` تنظیم شده است.

به طور مشابه، عرض نوار ناوبری و پاورقی را می‌توان با پارامترهای `params.navbar.width` و `params.footer.width` سفارشی کرد.

### نمایه FlexSearch

جستجوی تمام متن با قدرت [FlexSearch](https://github.com/nextapps-de/flexsearch) به طور پیش‌فرض فعال است.
برای سفارشی کردن نمایه جستجو، پارامتر `params.search.flexsearch.index` را در فایل پیکربندی تنظیم کنید:

```yaml {filename="hugo.yaml"}
params:
  # جستجو
  search:
    enable: true
    type: flexsearch

    flexsearch:
      # نمایه صفحه بر اساس: content | summary | heading | title
      index: content
```

گزینه‌های `flexsearch.index`:

- `content` - محتوای کامل صفحه (پیش‌فرض)
- `summary` - خلاصه صفحه، برای جزئیات بیشتر به [خلاصه‌های محتوای Hugo](https://gohugo.io/content-management/summaries/) مراجعه کنید
- `heading` - عناوین سطح 1 و سطح 2
- `title` - فقط عنوان صفحه را شامل شود

برای سفارشی کردن tokenize جستجو، پارامتر `params.search.flexsearch.tokenize` را در فایل پیکربندی تنظیم کنید:

```yaml {filename="hugo.yaml"}
params:
  search:
    # ...
    flexsearch:
      # full | forward | reverse | strict
      tokenize: forward
```

گزینه‌های [`flexsearch.tokenize`](https://github.com/nextapps-de/flexsearch/#tokenizer-prefix-search):

- `strict` - نمایه‌گذاری کل کلمات
- `forward` - نمایه‌گذاری تدریجی کلمات در جهت جلو
- `reverse` - نمایه‌گذاری تدریجی کلمات در هر دو جهت
- `full` - نمایه‌گذاری هر ترکیب ممکن

برای حذف یک صفحه از نمایه جستجوی FlexSearch، `excludeSearch: true` را در front matter صفحه تنظیم کنید:

```yaml {filename="content/docs/guide/configuration.md"}
---
title: پیکربندی
excludeSearch: true
---
```

### Google Analytics

برای فعال کردن [Google Analytics](https://marketingplatform.google.com/about/analytics/)، پرچم `services.googleAnalytics.ID` را در `hugo.yaml` تنظیم کنید:

```yaml {filename="hugo.yaml"}
services:
  googleAnalytics:
    ID: G-MEASUREMENT_ID
```

### نمایه Google Search

برای [مسدود کردن Google Search](https://developers.google.com/search/docs/crawling-indexing/block-indexing) از نمایه‌گذاری یک صفحه، `noindex` را در front matter صفحه روی true تنظیم کنید:

```yaml
title: پیکربندی (نسخه آرشیو)
params:
  noindex: true
```

برای حذف یک دایرکتوری کامل، از کلید [`cascade`](https://gohugo.io/configuration/cascade/) در فایل `_index.md` والد استفاده کنید.

> [!NOTE]
> برای مسدود کردن خزنده‌های جستجو، می‌توانید یک [قالب `robots.txt`](https://gohugo.io/templates/robots/) ایجاد کنید.
> با این حال، دستورالعمل‌های `robots.txt` لزوماً صفحه را از نتایج جستجوی Google خارج نمی‌کنند.

### پشتیبانی از LLMS.txt

برای فعال کردن فرمت خروجی [llms.txt](https://llmstxt.org/) برای سایت شما، که یک طرح متنی ساختاریافته برای [مدل‌های زبانی بزرگ](https://fa.wikipedia.org/wiki/مدل_زبانی_بزرگ) و عامل‌های هوش مصنوعی ارائه می‌دهد، فرمت خروجی `llms` را به `hugo.yaml` سایت خود اضافه کنید:

```diff {filename="hugo.yaml"}
outputs:
- home: [html]
+ home: [html, llms]
  page: [html]
  section: [html, rss]
```

این کار یک فایل `llms.txt` در ریشه سایت شما ایجاد می‌کند که شامل:

- عنوان و توضیحات سایت
- لیست سلسله مراتبی تمام بخش‌ها و صفحات
- خلاصه صفحات و تاریخ انتشار
- لینک‌های مستقیم به تمام محتوا

فایل llms.txt به طور خودکار از ساختار محتوای شما ایجاد می‌شود و سایت شما را برای ابزارهای هوش مصنوعی و مدل‌های زبانی برای زمینه و مرجع قابل دسترس‌تر می‌کند.

### Open Graph

برای افزودن متادیتای [Open Graph](https://ogp.me/) به یک صفحه، مقادیر را در پارامترهای frontmatter اضافه کنید.

از آنجا که یک صفحه می‌تواند چندین تگ `image` و `video` داشته باشد، مقادیر آنها را در یک آرایه قرار دهید.
سایر ویژگی‌های Open Graph می‌توانند فقط یک مقدار داشته باشند.
به عنوان مثال، این صفحه یک تگ `og:image` (که تصویری برای پیش‌نمایش در اشتراک‌گذاری‌های اجتماعی پیکربندی می‌کند) و یک تگ `og:audio` دارد.

```yaml {filename
