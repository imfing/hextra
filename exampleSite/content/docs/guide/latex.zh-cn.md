---
title: "数学公式"
weight: 4
math: true
---

默认情况下，\(\KaTeX\) 用于渲染 LaTeX 数学表达式。
无需手动激活，您可以直接在 Markdown 内容中开始使用 LaTeX 数学表达式。

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


## 配置

> [!IMPORTANT]
> 请在 Hugo 配置文件中启用并配置 [passthrough 扩展](https://gohugo.io/content-management/mathematics/)，以便 Hugo 可以检测 Markdown 内容中的 LaTeX 数学表达式。

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

## 支持的函数

有关支持的函数列表，请参阅 [KaTeX 支持的函数](https://katex.org/docs/supported.html)。

## 化学

通过 [mhchem](https://mhchem.github.io/MathJax-mhchem/) 扩展支持化学表达式。

内联：\(\ce{H2O}\) 是水。

独立段落：

```markdown {filename="page.md"}
$$\ce{Hg^2+ ->[I-] HgI2 ->[I-] [Hg^{II}I4]^2-}$$
```

将渲染为：

$$\ce{Hg^2+ ->[I-] HgI2 ->[I-] [Hg^{II}I4]^2-}$$


## 数学引擎

### MathJax

默认情况下，使用 [KaTeX][katex] 在构建过程中渲染 LaTeX 数学表达式，这是首选方式。
或者，您可以使用 [MathJax][mathjax] 来渲染数学表达式。

要使用 MathJax，请将以下内容添加到 `hugo.yaml` 配置文件中：

```yaml {filename="hugo.yaml"}
params:
  math:
    engine: mathjax
```

[katex]: https://katex.org/
[mathjax]: https://www.mathjax.org/
