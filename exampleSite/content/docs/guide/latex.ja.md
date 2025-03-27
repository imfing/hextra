---
title: "LaTeX"
weight: 4
math: true
---

\(\KaTeX\) は LaTeX の数式をレンダリングするために使用されます。ページのフロントマターで `math` を `true` に設定することで、ページごとに有効にすることができます。

<!--more-->

```yaml {filename="page.md"}
---
title: "LaTeX を使用した私のページ"
math: true
---

```

有効にすると、KaTeX のスクリプト、スタイルシート、フォントが自動的にサイトに含まれます。Markdown コンテンツ内で LaTeX 数式を使用できます。

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

> [!IMPORTANT]
> Hugo 設定ファイルで [パススルー拡張機能](https://gohugo.io/content-management/mathematics/) を有効にして設定してください。これにより、複雑な式のレンダリング問題を回避するために、デリミタ内の生のコンテンツが保持されます。

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

## サポートされている関数

サポートされている関数の一覧については、[KaTeX サポートされている関数](https://katex.org/docs/supported.html) を参照してください。

## 化学

化学式は [mhchem](https://mhchem.github.io/MathJax-mhchem/) 拡張機能を介してサポートされています。

インライン: \(\ce{H2O}\) は水です。

別段落:

```markdown {filename="page.md"}
$$\ce{Hg^2+ ->[I-] HgI2 ->[I-] [Hg^{II}I4]^2-}$$
```

$$\ce{Hg^2+ ->[I-] HgI2 ->[I-] [Hg^{II}I4]^2-}$$