---
title: "LaTeX"
weight: 4
math: true
---
\(\KaTeX\) is used for rendering LaTeX math expressions. No manual activation is needed, you can start using LaTeX math expressions in your Markdown content right away.

## Example

Both inline and separate paragraph LaTeX math expressions are supported in the Markdown content.

### Inline

```markdown {filename="page.md"}
This \(\sigma(z) = \frac{1}{1 + e^{-z}}\) is inline.
```

This \(\sigma(z) = \frac{1}{1 + e^{-z}}\) is inline.

### Separate Paragraph

```markdown {filename="page.md"}
$$F(\omega) = \int_{-\infty}^{\infty} f(t) e^{-j\omega t} \, dt$$
```

will be rendered as:

$$F(\omega) = \int_{-\infty}^{\infty} f(t) e^{-j\omega t} \, dt$$

> [!IMPORTANT]
> Please enable and configure the [passthrough extension](https://gohugo.io/content-management/mathematics/) in the Hugo configuration file. It preserves raw content within the delimiters to avoid rendering issues for complex expressions.

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

For example, using the aligned environment:

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

will be rendered as:

$$
\begin{aligned}
  \nabla \cdot \mathbf{E} &= \frac{\rho}{\varepsilon_0} \\
  \nabla \cdot \mathbf{B} &= 0 \\
  \nabla \times \mathbf{E} &= -\frac{\partial \mathbf{B}}{\partial t} \\
  \nabla \times \mathbf{B} &= \mu_0 \left( \mathbf{J} + \varepsilon_0 \frac{\partial \mathbf{E}}{\partial t} \right)
\end{aligned}
$$

## Supported Functions

For a list of supported functions, see [KaTeX supported functions](https://katex.org/docs/supported.html).

## Chemistry

Chemistry expressions are supported via [mhchem](https://mhchem.github.io/MathJax-mhchem/) extension.

Inline: \(\ce{H2O}\) is water.

Separate paragraph:

```markdown {filename="page.md"}
$$\ce{Hg^2+ ->[I-] HgI2 ->[I-] [Hg^{II}I4]^2-}$$
```

$$\ce{Hg^2+ ->[I-] HgI2 ->[I-] [Hg^{II}I4]^2-}$$
