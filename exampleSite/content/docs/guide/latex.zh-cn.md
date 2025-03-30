---
title: "数学公式"
weight: 4
math: true
---

\(\KaTeX\) 用于渲染 LaTeX 数学表达式。可以通过在页面前置设置中将 `math` 设置为 `true` 来启用它。

<!--more-->

```yaml {filename="page.md"}
---
title: "我的页面包含 LaTeX"
math: true
---

```

启用后，KaTeX 的脚本、样式表和字体将自动包含在您的站点中。您可以在 Markdown 内容中开始使用 LaTeX 数学表达式。

## 示例

Markdown 内容中支持内联和独立段落的 LaTeX 数学表达式。

### 内联

```markdown {filename="page.md"}
这个 \(\sigma(z) = \frac{1}{1 + e^{-z}}\) 是内联的。
```

这个 \(\sigma(z) = \frac{1}{1 + e^{-z}}\) 是内联的。

### 独立段落

```markdown {filename="page.md"}
$$F(\omega) = \int_{-\infty}^{\infty} f(t) e^{-j\omega t} \, dt$$
```

将渲染为：

$$F(\omega) = \int_{-\infty}^{\infty} f(t) e^{-j\omega t} \, dt$$

> [!IMPORTANT]
> 请在 Hugo 配置文件中启用并配置 [passthrough 扩展](https://gohugo.io/content-management/mathematics/)。它保留分隔符内的原始内容，以避免复杂表达式的渲染问题。

```yaml {filename="hugo.yaml"}
markup:
  goldmark:
    extensions:
      passthrough:
        delimiters:
          block: [['\[', '\]'], ['$$', '$$']]
          inline: [['\(', '\)']]
        enable: true
```

例如，使用对齐环境：

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

将渲染为：

$$
\begin{aligned}
  \nabla \cdot \mathbf{E} &= \frac{\rho}{\varepsilon_0} \\
  \nabla \cdot \mathbf{B} &= 0 \\
  \nabla \times \mathbf{E} &= -\frac{\partial \mathbf{B}}{\partial t} \\
  \nabla \times \mathbf{B} &= \mu_0 \left( \mathbf{J} + \varepsilon_0 \frac{\partial \mathbf{E}}{\partial t} \right)
\end{aligned}
$$

## 支持的函数

有关支持的函数列表，请参阅 [KaTeX 支持的函数](https://katex.org/docs/supported.html)。

## 化学

通过 [mhchem](https://mhchem.github.io/MathJax-mhchem/) 扩展支持化学表达式。

内联：\(\ce{H2O}\) 是水。

独立段落：

```markdown {filename="page.md"}
$$\ce{Hg^2+ ->[I-] HgI2 ->[I-] [Hg^{II}I4]^2-}$$
```

$$\ce{Hg^2+ ->[I-] HgI2 ->[I-] [Hg^{II}I4]^2-}$$
