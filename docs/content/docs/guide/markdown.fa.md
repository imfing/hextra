---
title: Markdown
weight: 2
---

Hugo از [Markdown](https://en.wikipedia.org/wiki/Markdown) برای قالب‌بندی متن، ایجاد لیست‌ها و موارد دیگر پشتیبانی می‌کند. این صفحه برخی از رایج‌ترین نمونه‌های نحوه استفاده از Markdown را به شما نشان می‌دهد.

<!--more-->

## نمونه‌های Markdown

### استایل‌دهی متن

| استایل         | نحو                     | مثال                                   | خروجی                                  |
| :------------ | :----------------------- | :-------------------------------------- | :------------------------------------ |
| پررنگ          | `**متن پررنگ**`          | `**متن پررنگ**`                         | **متن پررنگ**                         |
| مورب        | `*متن مورب*`      | `*متن مورب*`                     | _متن مورب_                     |
| خط‌خورده | `~~متن خط‌خورده~~` | `~~متن خط‌خورده~~`                | ~~متن خط‌خورده~~                |
| زیرنویس     | `<sub></sub>`            | `این یک <sub>زیرنویس</sub> است`   | این یک <sub>زیرنویس</sub> است   |
| بالانویس   | `<sup></sup>`            | `این یک <sup>بالانویس</sup> است` | این یک <sup>بالانویس</sup> است |

### نقل‌قول‌ها

نقل‌قول با ذکر منبع

> با اشتراک‌گذاری حافظه ارتباط برقرار نکنید، بلکه با ارتباط، حافظه را اشتراک بگذارید.<br>
> — <cite>Rob Pike[^1]</cite>

[^1]: این نقل‌قول از [سخنرانی](https://www.youtube.com/watch?v=PAAkCSZUG1c) Rob Pike در Gopherfest در ۱۸ نوامبر ۲۰۱۵ گرفته شده است.

```markdown {filename=Markdown}
> با اشتراک‌گذاری حافظه ارتباط برقرار نکنید، بلکه با ارتباط، حافظه را اشتراک بگذارید.<br>
> — <cite>Rob Pike[^1]</cite>

[^1]: این نقل‌قول از [سخنرانی](https://www.youtube.com/watch?v=PAAkCSZUG1c) Rob Pike در Gopherfest در ۱۸ نوامبر ۲۰۱۵ گرفته شده است.
```

### هشدارها

{{< new-feature version="v0.9.0" >}}

هشدارها یک افزونه Markdown بر اساس نحو نقل‌قول هستند که می‌توانید برای تأکید بر اطلاعات مهم از آن‌ها استفاده کنید.
[هشدارهای به سبک GitHub](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax#alerts) پشتیبانی می‌شوند.
لطفاً مطمئن شوید که از آخرین نسخه Hextra و [Hugo v0.146.0](https://github.com/gohugoio/hugo/releases/tag/v0.146.0) یا بالاتر استفاده می‌کنید.

> [!NOTE]
> اطلاعات مفیدی که کاربران باید بدانند، حتی هنگام مرور سریع محتوا.

> [!TIP]
> توصیه‌های مفید برای انجام بهتر یا آسان‌تر کارها.

> [!IMPORTANT]
> اطلاعات کلیدی که کاربران برای رسیدن به هدف خود نیاز دارند.

> [!WARNING]
> اطلاعات فوری که نیاز به توجه فوری کاربر دارد تا از مشکلات جلوگیری شود.

> [!CAUTION]
> هشدار درباره خطرات یا نتایج منفی برخی اقدامات.

```markdown {filename=Markdown}
> [!NOTE]
> اطلاعات مفیدی که کاربران باید بدانند، حتی هنگام مرور سریع محتوا.

> [!TIP]
> توصیه‌های مفید برای انجام بهتر یا آسان‌تر کارها.

> [!IMPORTANT]
> اطلاعات کلیدی که کاربران برای رسیدن به هدف خود نیاز دارند.

> [!WARNING]
> اطلاعات فوری که نیاز به توجه فوری کاربر دارد تا از مشکلات جلوگیری شود.

> [!CAUTION]
> هشدار درباره خطرات یا نتایج منفی برخی اقدامات.
```

### جداول

جداول بخشی از مشخصه اصلی Markdown نیستند، اما Hugo به صورت پیش‌فرض از آن‌ها پشتیبانی می‌کند.

| نام  | سن |
| :---- | :-- |
| باب   | ۲۷  |
| آلیس | ۲۳  |

```markdown {filename=Markdown}
| نام  | سن |
| :---- | :-- |
| باب   | ۲۷  |
| آلیس | ۲۳  |
```

#### Markdown درون‌خطی در جداول

| مورب   | پررنگ     | کد   |
| :-------- | :------- | :----- |
| _مورب_ | **پررنگ** | `کد` |

```markdown {filename=Markdown}
| مورب   | پررنگ     | کد   |
| :-------- | :------- | :----- |
| _مورب_ | **پررنگ** | `کد` |
```

### بلوک‌های کد

{{< cards >}}
  {{< card link="../../guide/syntax-highlighting" title="رنگ‌آمیزی نحوی" icon="sparkles" >}}
{{< /cards >}}

### لیست‌ها

#### لیست مرتب

۱. مورد اول
۲. مورد دوم
۳. مورد سوم

```markdown {filename=Markdown}
۱. مورد اول
۲. مورد دوم
۳. مورد سوم
```

#### لیست نامرتب

* مورد لیست
* مورد دیگر
* و یک مورد دیگر

```markdown {filename=Markdown}
* مورد لیست
* مورد دیگر
* و یک مورد دیگر
```

#### لیست تو در تو

- میوه
  - سیب
  - پرتقال
  - موز
- لبنیات
  - شیر
  - پنیر

```markdown {filename=Markdown}
- میوه
  - سیب
  - پرتقال
  - موز
- لبنیات
  - شیر
  - پنیر
```

#### لیست وظایف

- [x] نوشتن مستندات
- [ ] بازبینی کد
- [ ] استقرار تغییرات

```markdown {filename=Markdown}
- [x] نوشتن مستندات
- [ ] بازبینی کد
- [ ] استقرار تغییرات
```

### تصاویر

![منظره](https://picsum.photos/800/600)

```markdown {filename=Markdown}
![منظره](https://picsum.photos/800/600)
```

با عنوان:

![منظره](https://picsum.photos/800/600 "Lorem Picsum")

```markdown {filename=Markdown}
![منظره](https://picsum.photos/800/600 "Lorem Picsum")
```

برای عملکرد پیشرفته‌تر، از [shortcode Figure](https://gohugo.io/shortcodes/figure/) داخلی Hugo استفاده کنید.

## پیکربندی

Hugo از [Goldmark](https://github.com/yuin/goldmark) برای تجزیه Markdown استفاده می‌کند.
رندر Markdown را می‌توان در `hugo.yaml` تحت `markup.goldmark` پیکربندی کرد.
در زیر پیکربندی پیش‌فرض Hextra آمده است:

```yaml {filename="hugo.yaml"}
markup:
  goldmark:
    renderer:
      unsafe: true
  highlight:
    noClasses: false
```

برای گزینه‌های پیکربندی بیشتر، مستندات Hugo در مورد [پیکربندی Markup](https://gohugo.io/getting-started/configuration-markup/) را ببینید.

## منابع یادگیری

- [راهنمای Markdown](https://www.markdownguide.org/)
- [راهنمای سریع Markdown](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)
- [آموزش Markdown](https://www.markdowntutorial.com/)
- [مرجع Markdown](https://commonmark.org/help/)