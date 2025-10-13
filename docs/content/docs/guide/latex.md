---
title: "LaTeX"
weight: 4
---

LaTeX math expressions are rendered using \(\KaTeX\) ([katex.org](https://katex.org/)) by default. Simply start including them in your Markdown content without any manual configurations.

## Usage

You can use LaTeX for both inline expressions and for larger blocks of text.

### Inline Math

To include an expression within a line of text, wrap it in `\(` and `\)` delimiters.

```markdown {filename="page.md"}
This \(\sigma(z) = \frac{1}{1 + e^{-z}}\) is an inline expression.
```

This \( \sigma(z) = \frac{1}{1 + e^{-z}} \) is an inline expression.

### Display Math

For expressions that you want to stand on their own in a separate paragraph, use `$$` delimiters.

```markdown {filename="page.md"}
$$F(\omega) = \int_{-\infty}^{\infty} f(t)\, e^{-j \omega t} \, dt$$
```

will be rendered as:

$$F(\omega) = \int_{-\infty}^{\infty} f(t)\, e^{-j \omega t} \, dt$$

You can also use LaTeX environments like `aligned` for multi-line expressions.

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

For a list of supported functions, see [KaTeX supported functions](https://katex.org/docs/supported.html).

### Chemistry Expressions

The [mhchem][mhchem] extension is enabled by default, allowing you to easily render chemistry equations and formulas.

Inline: \(\ce{H2O}\) is water.

Separate paragraph:

```markdown {filename="page.md"}
$$\ce{Hg^2+ ->[I-] HgI2 ->[I-] [Hg^{II}I4]^2-}$$
```

will be rendered as:

$$\ce{Hg^2+ ->[I-] HgI2 ->[I-] [Hg^{II}I4]^2-}$$

## Configuration

> [!IMPORTANT]
> Please enable and configure the [passthrough extension](https://gohugo.io/content-management/mathematics/) in the Hugo configuration file, so that Hugo can detect LaTeX math expressions in your Markdown content.

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

### Math Engine

[KaTeX][katex] is the default engine used to render LaTeX math expressions during the build process supported by [Hugo][hugo-transform-tomath].

The default is KaTeX, but you can also switch to [MathJax][mathjax] if you need features only available in MathJax.

#### KaTeX

The default setup requires no configuration. Hugo fetches the KaTeX CSS from the CDN.
If you need to pin a specific version of KaTeX or use local assets, you can do so in your `hugo.yaml` file.

##### Override CDN base URL

```yaml {filename="hugo.yaml"}
params:
  math:
    engine: katex
    katex:
      base: "https://cdn.jsdelivr.net/npm/katex@0.16.22/dist"
```

##### Use local assets

You can also place the css file under `assets` and publish additional font files required by KaTeX.

```yaml {filename="hugo.yaml"}
params:
  math:
    engine: katex
    katex:
      css: "css/katex.min.css"
      assets:
        - "fonts/KaTeX_Main-Regular.woff2"
        # Add other font files here
```

It will load the KaTeX CSS file from `assets/css/katex.min.css` instead of downloading from CDN.

#### MathJax

Alternatively, you can use [MathJax][mathjax] to render math expressions:

```yaml {filename="hugo.yaml"}
params:
  math:
    engine: mathjax
```

> [!NOTE]
> You can further customize MathJax (for example, adjust loader options, or change the CDN/source) by overriding the template at `layouts/_partials/scripts/mathjax.html` in your project. Hugo will use your version instead of the theme's default.

[katex]: https://katex.org/
[mathjax]: https://www.mathjax.org/
[mhchem]: https://mhchem.github.io/MathJax-mhchem/
[hugo-transform-tomath]: https://gohugo.io/functions/transform/tomath/
