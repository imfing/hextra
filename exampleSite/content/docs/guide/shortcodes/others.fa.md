---
title: سایر شورتکدها
linkTitle: سایر
sidebar:
  exclude: true
next: /docs/guide/deploy-site
---

{{< callout emoji="ℹ️" >}}
  برخی از این‌ها شورتکدهای داخلی Hugo هستند.
  این شورتکدها کمتر پایدار در نظر گرفته می‌شوند و ممکن است هر زمان تغییر کنند.
{{< /callout >}}

## نشان

```
{{</* badge "نشان" */>}}
```

نتیجه:

{{< badge "نشان" >}}

انواع مختلف:

```
{{</* badge content="اطلاعات" type="info" */>}}
{{</* badge content="هشدار" type="warning" */>}}
{{</* badge content="خطا" type="error" */>}}
```

نتیجه:

{{< badge content="اطلاعات" type="info" >}} &nbsp;
{{< badge content="هشدار" type="warning" >}} &nbsp;
{{< badge content="خطا" type="error" >}}

با لینک و آیکون:

```
{{</* badge content="انتشارها" link="https://github.com/imfing/hextra/releases" icon="github" */>}}
```

نتیجه:

{{< badge content="انتشارها" link="https://github.com/imfing/hextra/releases" icon="github" >}}

## یوتیوب

تعبیه یک ویدیوی یوتیوب.

```
{{</* youtube VIDEO_ID */>}}
```

نتیجه:

{{< youtube id=dQw4w9WgXcQ loading=lazy >}}

برای اطلاعات بیشتر، به [شورتکد یوتیوب Hugo](https://gohugo.io/content-management/shortcodes/#youtube) مراجعه کنید.

## پی‌دی‌اف

با شورتکد پی‌دی‌اف، می‌توانید یک فایل پی‌دی‌اف را در محتوای خود تعبیه کنید.

```
{{</* pdf "https://example.com/sample.pdf" */>}}
```

همچنین می‌توانید فایل پی‌دی‌اف را در دایرکتوری پروژه خود قرار دهید و از مسیر نسبی استفاده کنید.

```
{{</* pdf "path/to/file.pdf" */>}}
```

مثال:

{{< pdf "https://upload.wikimedia.org/wikipedia/commons/1/13/Example.pdf" >}}