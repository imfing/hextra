---
title: "LaTeX"
weight: 4
---

عبارات ریاضی LaTeX به طور پیش‌فرض با استفاده از \(\KaTeX\) ([katex.org](https://katex.org/)) نمایش داده می‌شوند. کافی است آن‌ها را در محتوای Markdown خود قرار دهید بدون نیاز به هیچ پیکربندی دستی.

## نحوه استفاده

می‌توانید از LaTeX هم برای عبارات درون خطی و هم برای بلوک‌های بزرگتر متن استفاده کنید.

### ریاضی درون خطی

برای قرار دادن یک عبارت درون یک خط متن، آن را بین `\(` و `\)` قرار دهید.

```markdown {filename="page.md"}
این \(\sigma(z) = \frac{1}{1 + e^{-z}}\) یک عبارت درون خطی است.
```

این \( \sigma(z) = \frac{1}{1 + e^{-z}} \) یک عبارت درون خطی است.

### ریاضی نمایشی

برای عباراتی که می‌خواهید به صورت مستقل در یک پاراگراف جداگانه نمایش داده شوند، از `$$` استفاده کنید.

```markdown {filename="page.md"}
$$F(\omega) = \int_{-\infty}^{\infty} f(t)\, e^{-j \omega t} \, dt$$
```

به این صورت نمایش داده می‌شود:

$$F(\omega) = \int_{-\infty}^{\infty} f(t)\, e^{-j \omega t} \, dt$$

همچنین می‌توانید از محیط‌های LaTeX مانند `aligned` برای عبارات چندخطی استفاده کنید.

```latex {filename="page.md"}
$$
\begin{aligned}
  \nabla \cdot \mathbf{E} &= \frac{\rho}{\varepsilon_0} \\
  \nabla \cdot \mathbf{B} &= 0 \\
  \nabla \times \mathbf{E} &= -\frac{\partial \mathbf{B}}{\partial t} \\
  \nabla \times \mathbf{B} &= \mu_0 \left( \mathbf{J} + \varepsilon_0 \frac{\partial \mathbf{E}}{\partial t} \right)
\end{aligned}
$$
```

به این صورت نمایش داده می‌شود:

$$
\begin{aligned}
  \nabla \cdot \mathbf{E} &= \frac{\rho}{\varepsilon_0} \\
  \nabla \cdot \mathbf{B} &= 0 \\
  \nabla \times \mathbf{E} &= -\frac{\partial \mathbf{B}}{\partial t} \\
  \nabla \times \mathbf{B} &= \mu_0 \left( \mathbf{J} + \varepsilon_0 \frac{\partial \mathbf{E}}{\partial t} \right)
\end{aligned}
$$

برای مشاهده لیست توابع پشتیبانی شده، به [توابع پشتیبانی شده توسط KaTeX](https://katex.org/docs/supported.html) مراجعه کنید.

### عبارات شیمیایی

افزونه [mhchem][mhchem] به طور پیش‌فرض فعال است و به شما امکان می‌دهد معادلات و فرمول‌های شیمیایی را به راحتی نمایش دهید.

درون خطی: \(\ce{H2O}\) آب است.

پاراگراف جداگانه:

```markdown {filename="page.md"}
$$\ce{Hg^2+ ->[I-] HgI2 ->[I-] [Hg^{II}I4]^2-}$$
```

به این صورت نمایش داده می‌شود:

$$\ce{Hg^2+ ->[I-] HgI2 ->[I-] [Hg^{II}I4]^2-}$$

## پیکربندی

> [!IMPORTANT]
> لطفاً افزونه [passthrough](https://gohugo.io/content-management/mathematics/) را در فایل پیکربندی Hugo فعال و پیکربندی کنید تا Hugo بتواند عبارات ریاضی LaTeX را در محتوای Markdown شما تشخیص دهد.

```yaml {filename="hugo.yaml"}
markup:
  goldmark:
    extensions:
      passthrough:
        delimiters:
          block: [['\[', '\]'], ["$$", "$$"]]
          inline: [['\(', '\)']]
        enable: true
```

### موتور ریاضی

[KaTeX][katex] موتور پیش‌فرضی است که برای نمایش عبارات ریاضی LaTeX در فرآیند ساخت توسط [Hugo][hugo-transform-tomath] استفاده می‌شود.

پیش‌فرض KaTeX است، اما در صورت نیاز به ویژگی‌هایی که فقط در [MathJax][mathjax] موجود است، می‌توانید به MathJax سوئیچ کنید.

#### KaTeX

پیکربندی پیش‌فرض نیاز به هیچ تنظیمی ندارد. Hugo فایل CSS مربوط به KaTeX را از CDN دریافت می‌کند.
اگر نیاز به استفاده از نسخه خاصی از KaTeX یا استفاده از فایل‌های محلی دارید، می‌توانید این کار را در فایل `hugo.yaml` انجام دهید.

##### تغییر آدرس پایه CDN

```yaml {filename="hugo.yaml"}
params:
  math:
    engine: katex
    katex:
      base: "https://cdn.jsdelivr.net/npm/katex@0.16.22/dist"
```

##### استفاده از فایل‌های محلی

همچنین می‌توانید فایل css را در پوشه `assets` قرار دهید و فایل‌های فونت مورد نیاز KaTeX را منتشر کنید.

```yaml {filename="hugo.yaml"}
params:
  math:
    engine: katex
    katex:
      css: "css/katex.min.css"
      assets:
        - "fonts/KaTeX_Main-Regular.woff2"
        # سایر فایل‌های فونت را اینجا اضافه کنید
```

این تنظیمات باعث می‌شود فایل CSS مربوط به KaTeX از `assets/css/katex.min.css` بارگیری شود به جای دانلود از CDN.

#### MathJax

به عنوان جایگزین، می‌توانید از [MathJax][mathjax] برای نمایش عبارات ریاضی استفاده کنید:

```yaml {filename="hugo.yaml"}
params:
  math:
    engine: mathjax
```

> [!NOTE]
> می‌توانید MathJax را بیشتر سفارشی کنید (مثلاً تنظیمات لودر را تغییر دهید یا CDN/منبع را عوض کنید) با بازنویسی قالب در `layouts/_partials/scripts/mathjax.html` در پروژه خود. Hugo به جای نسخه پیش‌فرض قالب، از نسخه شما استفاده خواهد کرد.

[katex]: https://katex.org/
[mathjax]: https://www.mathjax.org/
[mhchem]: https://mhchem.github.io/MathJax-mhchem/
[hugo-transform-tomath]: https://gohugo.io/functions/transform/tomath/
