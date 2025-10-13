---
title: "LaTeX"
weight: 4
---

LaTeX の数式表現はデフォルトで \(\KaTeX\) ([katex.org](https://katex.org/)) を使用してレンダリングされます。特別な設定なしで、Markdown コンテンツ内に直接記述できます。

## 使用方法

LaTeX はインライン式とブロック式の両方で使用できます。

### インライン数式

文中に数式を含めるには、`\(` と `\)` で囲みます。

```markdown {filename="page.md"}
この \(\sigma(z) = \frac{1}{1 + e^{-z}}\) はインライン式です。
```

この \( \sigma(z) = \frac{1}{1 + e^{-z}} \) はインライン式です。

### ディスプレイ数式

独立した段落として表示する数式には、`$$` で囲みます。

```markdown {filename="page.md"}
$$F(\omega) = \int_{-\infty}^{\infty} f(t)\, e^{-j \omega t} \, dt$$
```

次のようにレンダリングされます:

$$F(\omega) = \int_{-\infty}^{\infty} f(t)\, e^{-j \omega t} \, dt$$

複数行の数式には `aligned` などの LaTeX 環境も使用できます。

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

サポートされている関数の一覧は [KaTeX サポート関数](https://katex.org/docs/supported.html) を参照してください。

### 化学式

[mhchem][mhchem] 拡張がデフォルトで有効になっており、化学式を簡単に記述できます。

インライン: \(\ce{H2O}\) は水です。

独立段落:

```markdown {filename="page.md"}
$$\ce{Hg^2+ ->[I-] HgI2 ->[I-] [Hg^{II}I4]^2-}$$
```

次のようにレンダリングされます:

$$\ce{Hg^2+ ->[I-] HgI2 ->[I-] [Hg^{II}I4]^2-}$$

## 設定

> [!IMPORTANT]
> Hugo が Markdown コンテンツ内の LaTeX 数式を認識できるよう、[パススルー拡張](https://gohugo.io/content-management/mathematics/) を Hugo 設定ファイルで有効にしてください。

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

### 数式エンジン

[KaTeX][katex] はビルド時に LaTeX 数式をレンダリングするデフォルトエンジンで、[Hugo][hugo-transform-tomath] でサポートされています。

デフォルトは KaTeX ですが、MathJax のみの機能が必要な場合は [MathJax][mathjax] に切り替えられます。

#### KaTeX

デフォルト設定では追加の設定は不要です。Hugo は KaTeX の CSS を CDN から取得します。
特定のバージョンを固定したりローカルアセットを使用する場合は、`hugo.yaml` ファイルで設定できます。

##### CDN ベース URL の上書き

```yaml {filename="hugo.yaml"}
params:
  math:
    engine: katex
    katex:
      base: "https://cdn.jsdelivr.net/npm/katex@0.16.22/dist"
```

##### ローカルアセットの使用

CSS ファイルを `assets` ディレクトリに配置し、KaTeX に必要なフォントファイルを追加できます。

```yaml {filename="hugo.yaml"}
params:
  math:
    engine: katex
    katex:
      css: "css/katex.min.css"
      assets:
        - "fonts/KaTeX_Main-Regular.woff2"
        # 他のフォントファイルをここに追加
```

これにより、CDN ではなく `assets/css/katex.min.css` から KaTeX CSS ファイルが読み込まれます。

#### MathJax

代わりに [MathJax][mathjax] を使用して数式をレンダリングすることもできます:

```yaml {filename="hugo.yaml"}
params:
  math:
    engine: mathjax
```

> [!NOTE]
> MathJax をさらにカスタマイズするには（ローダーオプションの調整や CDN/ソースの変更など）、プロジェクトの `layouts/_partials/scripts/mathjax.html` でテンプレートを上書きしてください。Hugo はテーマのデフォルトではなく、あなたのバージョンを使用します。

[katex]: https://katex.org/
[mathjax]: https://www.mathjax.org/
[mhchem]: https://mhchem.github.io/MathJax-mhchem/
[hugo-transform-tomath]: https://gohugo.io/functions/transform/tomath/
