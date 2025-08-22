---
title: سایر شورتکدها
linkTitle: سایر
next: /docs/guide/deploy-site
---

{{< callout type="warning" >}}
  برخی از این‌ها شورتکدهای داخلی Hugo هستند.
  این شورتکدها کمتر پایدار در نظر گرفته می‌شوند و ممکن است هر زمان تغییر کنند.
{{< /callout >}}

### أمثلة

{{< badge "default" >}}&nbsp;
{{< badge content="border" border=false >}}&nbsp;
{{< badge content="color" color="green" >}}&nbsp;
{{< badge content="link" link="https://github.com/imfing/hextra/releases" >}}&nbsp;
{{< badge content="icon" icon="sparkles" >}}&nbsp;

### الاستخدام

#### تقصير

{{< badge "Badge" >}}&nbsp;

```
{{</* badge "Badge" */>}}
```

#### الألوان

{{< badge content="Badge" >}}&nbsp;
{{< badge content="Badge" color="purple" >}}&nbsp;
{{< badge content="Badge" color="indigo" >}}&nbsp;
{{< badge content="Badge" color="blue" >}} &nbsp;
{{< badge content="Badge" color="green" >}} &nbsp;
{{< badge content="Badge" color="yellow" >}} &nbsp;
{{< badge content="Badge" color="amber" >}} &nbsp;
{{< badge content="Badge" color="orange" >}} &nbsp;
{{< badge content="Badge" color="red" >}}&nbsp;

```
{{</* badge content="Badge" */>}}
{{</* badge content="Badge" color="purple" */>}}
{{</* badge content="Badge" color="indigo" */>}}
{{</* badge content="Badge" color="blue" */>}}
{{</* badge content="Badge" color="green" */>}}
{{</* badge content="Badge" color="yellow" */>}}
{{</* badge content="Badge" color="amber" */>}}
{{</* badge content="Badge" color="orange" */>}}
{{</* badge content="Badge" color="red" */>}}
```

{{< badge content="Badge" border=false >}} &nbsp;
{{< badge content="Badge" color="purple" border=false >}} &nbsp;
{{< badge content="Badge" color="indigo" border=false >}} &nbsp;
{{< badge content="Badge" color="blue" border=false >}} &nbsp;
{{< badge content="Badge" color="green" border=false >}} &nbsp;
{{< badge content="Badge" color="yellow" border=false >}} &nbsp;
{{< badge content="Badge" color="amber" border=false >}} &nbsp;
{{< badge content="Badge" color="orange" border=false >}}&nbsp;
{{< badge content="Badge" color="red" border=false >}}&nbsp;

```
{{</* badge content="Badge" border=false */>}}
{{</* badge content="Badge" color="purple" border=false */>}}
{{</* badge content="Badge" color="indigo" border=false */>}}
{{</* badge content="Badge" color="blue" border=false */>}}
{{</* badge content="Badge" color="green" border=false */>}}
{{</* badge content="Badge" color="yellow" border=false */>}}
{{</* badge content="Badge" color="amber" border=false */>}}
{{</* badge content="Badge" color="orange" border=false */>}}
{{</* badge content="Badge" color="red" border=false */>}}
```

#### المتغيرات

{{< badge content="Badge" icon="sparkles" >}}&nbsp;
{{< badge content="Releases" link="https://github.com/imfing/hextra/releases" icon="github" >}}&nbsp;

```
{{</* badge content="Badge" icon="sparkles" */>}}
{{</* badge content="Releases" link="https://github.com/imfing/hextra/releases" icon="github" */>}}
```

### خيارات

| المعلمة   | وصف                                                                                                       |
|-----------|-----------------------------------------------------------------------------------------------------------|
| `content` | نص الشارة.                                                                                                |
| `link`    | رابط الشارة.                                                                                              |
| `icon`    | رمز الشارة.                                                                                               |
| `color`   | `gray` (تقصير), `purple`, `indigo`, `blue`, `green`, `yellow`, `amber`, `orange`, `red`.<br/> لون الشارة. |
| `class`   | فئة الشارة.                                                                                               |
| `border`  | إضافة أو إزالة الحدود (افتراضي: true                                                                      |

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