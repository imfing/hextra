---
title: "LaTeX 公式"
weight: 4
math: true
---

$\KaTeX$ 用于呈现 LaTeX 数学表达式。可在 `frontmatter` 将 `math` 设置为 `true` 来启用。

<!--more-->

```yaml {filename="Markdown"}
---
title: "My Page with LaTeX"
math: true
---
```

启用后，KaTeX 中的脚本，样式表和字体将自动包含在你的网站中。这样就可以在 Markdown 内容中使用 LaTeX 数学表达式。

## 示例

Markdown 内容支持行内和独立段落的 LaTeX 数学表达式。

### 行内

```markdown {filename="page.md"}
This $\sigma(z) = \frac{1}{1 + e^{-z}}$ is inline.
```

This $\sigma(z) = \frac{1}{1 + e^{-z}}$ is inline.

### 独立段落

```markdown {filename="page.md"}
$$F(\omega) = \int_{-\infty}^{\infty} f(t) e^{-j\omega t} \, dt$$
```

将被渲染为：

$$F(\omega) = \int_{-\infty}^{\infty} f(t) e^{-j\omega t} \, dt$$


## 支持的功能

有关支持的符号列表，转至 [KaTeX 支持的公式](https://katex.org/docs/supported.html)。

## 化学表达式

通过 [mhchem](https://mhchem.github.io/MathJax-mhchem/) 支持化学表达式。

行内：$\ce{H2O}$ 是水。

独立段落：

```markdown {filename="page.md"}
$$\ce{Hg^2+ ->[I-] HgI2 ->[I-] [Hg^{II}I4]^2-}$$
```

$$\ce{Hg^2+ ->[I-] HgI2 ->[I-] [Hg^{II}I4]^2-}$$
