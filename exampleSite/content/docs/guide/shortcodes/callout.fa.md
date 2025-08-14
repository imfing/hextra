---
title: کامپوننت Callout
linkTitle: Callout
aliases:
- callouts
prev: /docs/guide/shortcodes
---

یک کامپوننت داخلی برای نمایش اطلاعات مهم به خواننده.

<!--more-->

> [!NOTE]
> [هشدارهای سبک GitHub](../../markdown#alerts) از [نسخه 0.9.0](https://github.com/imfing/hextra/releases/tag/v0.9.0) پشتیبانی می‌شوند.
> این ویژگی از سینتکس Markdown برای رندر کردن callout استفاده می‌کند که باعث بهبود قابلیت حمل و خوانایی محتوا می‌شود.

## مثال

{{< callout emoji="👾">}}
  یک **callout** متن کوتاهی است که برای جلب توجه طراحی شده است.
{{< /callout >}}

{{< callout type="info" >}}
  یک **callout** متن کوتاهی است که برای جلب توجه طراحی شده است.
{{< /callout >}}

{{< callout type="warning" >}}
  یک **callout** متن کوتاهی است که برای جلب توجه طراحی شده است.
{{< /callout >}}

{{< callout type="error" >}}
  یک **callout** متن کوتاهی است که برای جلب توجه طراحی شده است.
{{< /callout >}}

## نحوه استفاده

### پیش‌فرض

{{< callout emoji="🌐">}}
  Hugo می‌تواند برای ایجاد انواع مختلف وب‌سایت‌ها از جمله وبلاگ‌ها، نمونه‌کارها، سایت‌های مستندات و غیره استفاده شود.
{{< /callout >}}

```markdown
{{</* callout emoji="🌐" */>}}
  Hugo می‌تواند برای ایجاد انواع مختلف وب‌سایت‌ها از جمله وبلاگ‌ها، نمونه‌کارها، سایت‌های مستندات و غیره استفاده شود.
{{</* /callout */>}}
```

### اطلاعات

{{< callout type="info" >}}
  لطفاً برای مشاهده آخرین نسخه‌ها به GitHub مراجعه کنید.
{{< /callout >}}

```markdown
{{</* callout type="info" */>}}
  لطفاً برای مشاهده آخرین نسخه‌ها به GitHub مراجعه کنید.
{{</* /callout */>}}
```

### هشدار

{{< callout type="warning" >}}
  این API در نسخه بعدی منسوخ خواهد شد.
{{< /callout >}}

```markdown
{{</* callout type="warning" */>}}
  این API در نسخه بعدی منسوخ خواهد شد.
{{</* /callout */>}}
```

### خطا

{{< callout type="error" >}}
  مشکلی پیش آمده و قرار است منفجر شود.
{{< /callout >}}

```markdown
{{</* callout type="error" */>}}
  مشکلی پیش آمده و قرار است منفجر شود.
{{</* /callout */>}}
```