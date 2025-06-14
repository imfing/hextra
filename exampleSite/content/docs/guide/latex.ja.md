---
title: "LaTeX"
weight: 4
---

デフォルトでは、\(\KaTeX\) が LaTeX 数式のレンダリングに使用されます。
手動での有効化は不要で、Markdown コンテンツで LaTeX 数式をすぐに使い始めることができます。

## 例

Markdown コンテンツ内で、インラインおよび別段落の LaTeX 数式がサポートされています。

### インライン

```markdown {filename="page.md"}
これは \(\sigma(z) = \frac{1}{1 + e^{-z}}\) インラインです。
```

これは \(\sigma(z) = \frac{1}{1 + e^{-z}}\) インラインです。

### 別段落

```markdown {filename="page.md"}
$$F(\omega) = \int_{-\infty}^{\infty} f(t) e^{-j\omega t} \, dt$$
```

次のようにレンダリングされます:

$$F(\omega) = \int_{-\infty}^{\infty} f(t) e^{-j\omega t} \, dt$$

例えば、aligned 環境を使用する場合:

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

次のようにレンダリングされます:

$$
\begin{aligned}
  \nabla \cdot \mathbf{E} &= \frac{\rho}{\varepsilon_0} \\
  \nabla \cdot \mathbf{B} &= 0 \\
  \nabla \times \mathbf{E} &= -\frac{\partial \mathbf{B}}{\partial t} \\
  \nabla \times \mathbf{B} &= \mu_0 \left( \mathbf{J} + \varepsilon_0 \frac{\partial \mathbf{E}}{\partial t} \right)
\end{aligned}
$$


## 設定

> [!IMPORTANT]
> Hugo が Markdown コンテンツ内の LaTeX 数式を検出できるように、Hugo 設定ファイルで [パススルー拡張機能](https://gohugo.io/content-management/mathematics/) を有効にして設定してください。

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

## サポートされている関数

サポートされている関数の一覧については、[KaTeX サポートされている関数](https://katex.org/docs/supported.html) を参照してください。

## 化学

化学式は [mhchem](https://mhchem.github.io/MathJax-mhchem/) 拡張機能を介してサポートされています。

インライン: \(\ce{H2O}\) は水です。

別段落:

```markdown {filename="page.md"}
$$\ce{Hg^2+ ->[I-] HgI2 ->[I-] [Hg^{II}I4]^2-}$$
```

次のようにレンダリングされます:

$$\ce{Hg^2+ ->[I-] HgI2 ->[I-] [Hg^{II}I4]^2-}$$


## 数式エンジン

### MathJax

デフォルトでは、ビルドプロセス中に LaTeX 数式をレンダリングするために [KaTeX][katex] が使用されます（推奨）。
代替として、[MathJax][mathjax] を使用して数式をレンダリングすることもできます。

MathJax を使用するには、`hugo.yaml` 設定ファイルに以下を追加してください:

```yaml {filename="hugo.yaml"}
params:
  math:
    engine: mathjax
```

[katex]: https://katex.org/
[mathjax]: https://www.mathjax.org/
