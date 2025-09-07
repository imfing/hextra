---
title: "数学公式"
weight: 4
---

LaTeX 数学表达式默认使用 \(\KaTeX\) 渲染。直接在 Markdown 内容中使用即可，无需手动配置。

## 使用方法

LaTeX 既可用于行内表达式，也可用于大段文本。

### 行内公式

要在文本行内插入表达式，用 `\(` 和 `\)` 包裹。

```markdown {filename="page.md"}
这个 \(\sigma(z) = \frac{1}{1 + e^{-z}}\) 是行内表达式。
```

这个 \( \sigma(z) = \frac{1}{1 + e^{-z}} \) 是行内表达式。

### 独立公式

对于需要单独成段的表达式，使用 `$$` 包裹。

```markdown {filename="page.md"}
$$F(\omega) = \int_{-\infty}^{\infty} f(t)\, e^{-j \omega t} \, dt$$
```

将渲染为：

$$F(\omega) = \int_{-\infty}^{\infty} f(t)\, e^{-j \omega t} \, dt$$

还可以使用 LaTeX 环境如 `aligned` 处理多行公式。

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

支持的函数列表见 [KaTeX 支持函数](https://katex.org/docs/supported.html)。

### 化学表达式

默认启用了 [mhchem][mhchem] 扩展，可轻松渲染化学方程式和分子式。

行内示例：\(\ce{H2O}\) 是水。

独立段落：

```markdown {filename="page.md"}
$$\ce{Hg^2+ ->[I-] HgI2 ->[I-] [Hg^{II}I4]^2-}$$
```

将渲染为：

$$\ce{Hg^2+ ->[I-] HgI2 ->[I-] [Hg^{II}I4]^2-}$$

## 配置

> [!IMPORTANT]
> 请在 Hugo 配置文件中启用并配置 [passthrough 扩展](https://gohugo.io/content-management/mathematics/)，以便 Hugo 能识别 Markdown 中的 LaTeX 数学表达式。

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

### 数学引擎

构建过程中默认使用 [KaTeX][katex] 渲染 LaTeX 数学表达式，由 [Hugo][hugo-transform-tomath] 支持。

默认引擎是 KaTeX，但也可切换至 [MathJax][mathjax] 以使用其特有功能。

#### KaTeX

默认设置无需配置。Hugo 会从 CDN 获取 KaTeX CSS。如需指定 KaTeX 版本或使用本地资源，可在 `hugo.yaml` 中配置。

##### 覆盖 CDN 基础 URL

```yaml {filename="hugo.yaml"}
params:
  math:
    engine: katex
    katex:
      base: "https://cdn.jsdelivr.net/npm/katex@0.16.22/dist"
```

##### 使用本地资源

可将 CSS 文件置于 `assets` 目录，并发布 KaTeX 所需的字体文件。

```yaml {filename="hugo.yaml"}
params:
  math:
    engine: katex
    katex:
      css: "css/katex.min.css"
      assets:
        - "fonts/KaTeX_Main-Regular.woff2"
        # 在此添加其他字体文件
```

此时将从 `assets/css/katex.min.css` 加载 KaTeX CSS 文件，而非从 CDN 下载。

#### MathJax

也可使用 [MathJax][mathjax] 渲染数学表达式：

```yaml {filename="hugo.yaml"}
params:
  math:
    engine: mathjax
```

> [!NOTE]
> 可通过在项目中覆盖 `layouts/_partials/scripts/mathjax.html` 模板进一步定制 MathJax（如调整加载器选项或更改 CDN/源）。Hugo 将优先使用你的版本而非主题默认配置。

[katex]: https://katex.org/
[mathjax]: https://www.mathjax.org/
[mhchem]: https://mhchem.github.io/MathJax-mhchem/
[hugo-transform-tomath]: https://gohugo.io/functions/transform/tomath/