---
title: "LaTeX"
weight: 4
math: true
---

\(\KaTeX\) برای رندر کردن عبارت‌های ریاضی LaTeX استفاده می‌شود. می‌توان آن را در هر صفحه با تنظیم `math` روی `true` در قسمت بالای صفحه فعال کرد.

<!--more-->

```yaml {filename="Markdown"}
---
title: "صفحه من با LaTeX"
math: true
---

```

وقتی فعال باشد، اسکریپت‌ها، شیوه‌نامه‌ها و فونت‌های KaTeX به طور خودکار در سایت شما قرار می‌گیرند. می‌توانید از عبارت‌های ریاضی LaTeX در محتوای مارک‌داون خود استفاده کنید.

## مثال

هر دو عبارت‌های ریاضی درون‌خطی و پاراگراف جداگانه LaTeX در محتوای مارک‌داون پشتیبانی می‌شوند.

### درون‌خطی

```markdown {filename="page.md"}
این \(\sigma(z) = \frac{1}{1 + e^{-z}}\) درون‌خطی است.
```

این \(\sigma(z) = \frac{1}{1 + e^{-z}}\) درون‌خطی است.

### پاراگراف جداگانه

```markdown {filename="page.md"}
$$F(\omega) = \int_{-\infty}^{\infty} f(t) e^{-j\omega t} \, dt$$
```

به صورت زیر رندر خواهد شد:

$$F(\omega) = \int_{-\infty}^{\infty} f(t) e^{-j\omega t} \, dt$$


## توابع پشتیبانی شده

برای مشاهده فهرست توابع پشتیبانی شده، به [توابع پشتیبانی شده KaTeX](https://katex.org/docs/supported.html) مراجعه کنید.

## شیمی

عبارت‌های شیمی از طریق افزونه [mhchem](https://mhchem.github.io/MathJax-mhchem/) پشتیبانی می‌شوند.

درون‌خطی: \(\ce{H2O}\) آب است.

پاراگراف جداگانه:

```markdown {filename="page.md"}
$$\ce{Hg^2+ ->[I-] HgI2 ->[I-] [Hg^{II}I4]^2-}$$
```

$$\ce{Hg^2+ ->[I-] HgI2 ->[I-] [Hg^{II}I4]^2-}$$
