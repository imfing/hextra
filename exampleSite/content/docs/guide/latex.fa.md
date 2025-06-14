---
title: "LaTeX"
weight: 4
---

به طور پیش‌فرض، \(\KaTeX\) برای رندر کردن عبارت‌های ریاضی LaTeX استفاده می‌شود.
نیازی به فعال‌سازی دستی نیست، می‌توانید فوراً از عبارت‌های ریاضی LaTeX در محتوای مارک‌داون خود استفاده کنید.

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

به عنوان مثال، استفاده از محیط هم‌ترازی:

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

به صورت زیر رندر خواهد شد:

$$
\begin{aligned}
  \nabla \cdot \mathbf{E} &= \frac{\rho}{\varepsilon_0} \\
  \nabla \cdot \mathbf{B} &= 0 \\
  \nabla \times \mathbf{E} &= -\frac{\partial \mathbf{B}}{\partial t} \\
  \nabla \times \mathbf{B} &= \mu_0 \left( \mathbf{J} + \varepsilon_0 \frac{\partial \mathbf{E}}{\partial t} \right)
\end{aligned}
$$


## پیکربندی

> [!IMPORTANT]
> لطفاً [افزونه passthrough](https://gohugo.io/content-management/mathematics/) را در فایل پیکربندی Hugo فعال و پیکربندی کنید تا Hugo بتواند عبارت‌های ریاضی LaTeX را در محتوای مارک‌داون شما تشخیص دهد.

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

## توابع پشتیبانی شده

برای مشاهده فهرست توابع پشتیبانی شده، به [توابع پشتیبانی شده KaTeX](https://katex.org/docs/supported.html) مراجعه کنید.

## شیمی

عبارت‌های شیمی از طریق افزونه [mhchem](https://mhchem.github.io/MathJax-mhchem/) پشتیبانی می‌شوند.

درون‌خطی: \(\ce{H2O}\) آب است.

پاراگراف جداگانه:

```markdown {filename="page.md"}
$$\ce{Hg^2+ ->[I-] HgI2 ->[I-] [Hg^{II}I4]^2-}$$
```

به صورت زیر رندر خواهد شد:

$$\ce{Hg^2+ ->[I-] HgI2 ->[I-] [Hg^{II}I4]^2-}$$


## موتور ریاضی

### MathJax

به طور پیش‌فرض، [KaTeX][katex] برای رندر کردن عبارت‌های ریاضی LaTeX در طول فرآیند ساخت استفاده می‌شود که روش ترجیحی است.
به عنوان جایگزین، می‌توانید از [MathJax][mathjax] برای رندر کردن عبارت‌های ریاضی استفاده کنید.

برای استفاده از آن، موارد زیر را به فایل پیکربندی `hugo.yaml` اضافه کنید:

```yaml {filename="hugo.yaml"}
params:
  math:
    engine: mathjax
```

[katex]: https://katex.org/
[mathjax]: https://www.mathjax.org/
