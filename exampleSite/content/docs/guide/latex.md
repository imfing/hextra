---
title: "LaTeX"
weight: 4
math: true
---

$\KaTeX$ is used for rendering LaTeX math expressions. It can be enabled per page by setting `math` to `true` in the page front matter.

```yaml {filename="Markdown"}
---
title: "My Page with LaTeX"
math: true
---

```

When enabled, the scripts, stylesheets and fonts from KaTeX will be included automatically in your site. You can start using LaTeX math expressions in your Markdown content.

## Example

Both inline and separate paragraph LaTeX math expressions are supported in the Markdown content.

### Inline

```markdown {filename="page.md"}
This $\sigma(z) = \frac{1}{1 + e^{-z}}$ is inline.
```

This $\sigma(z) = \frac{1}{1 + e^{-z}}$ is inline.

### Separate Paragraph

```markdown {filename="page.md"}
$$F(\omega) = \int_{-\infty}^{\infty} f(t) e^{-j\omega t} \, dt$$
```

will be rendered as:

$$F(\omega) = \int_{-\infty}^{\infty} f(t) e^{-j\omega t} \, dt$$


## Supported Functions

For a list of supported functions, see [KaTeX supported functions](https://katex.org/docs/supported.html).
