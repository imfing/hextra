---
title: Markdown
weight: 2
---

Hugo 支持 [Markdown](https://en.wikipedia.org/wiki/Markdown) 来书写内容，创建列表等。本页将向你展示一些最常见的 Markdown 语法示例。

<!--more-->

## Markdown 示例

### 文本样式

| Style   | Syntax     | Example   | Output   |
| --------  | -------- | ------ | ------ |
| Bold | `**bold text**` | `**bold text**` | **bold text** |
| Italic | `*italicized text*` | `*italicized text* | *italicized text* |
| Strikethrough | `~~strikethrough text~~` | `~~strikethrough text~~` | ~~strikethrough text~~ |
| Subscript | `<sub></sub>` | `This is a <sub>subscript</sub> text` | This is a <sub>subscript</sub> text |
| Superscript | `<sup></sup>` | `This is a <sup>superscript</sup> text` | This is a <sup>superscript</sup> text |

### 引用

带角标的块引用：

> Don't communicate by sharing memory, share memory by communicating.<br>
> — <cite>Rob Pike[^1]</cite>

[^1]: The above quote is excerpted from Rob Pike's [talk](https://www.youtube.com/watch?v=PAAkCSZUG1c) during Gopherfest, November 18, 2015.

```markdown {filename=Markdown}
> Don't communicate by sharing memory, share memory by communicating.<br>
> — <cite>Rob Pike[^1]</cite>

[^1]: The above quote is excerpted from Rob Pike's [talk](https://www.youtube.com/watch?v=PAAkCSZUG1c) during Gopherfest, November 18, 2015.
```

### 表格

表格并非核心 Markdown 规范，但 Hugo 支持开箱即用的表格：

|   Name | Age  |
|--------|------|
|    Bob | 27   |
|  Alice | 23   |

```markdown {filename=Markdown}
|   Name | Age  |
|--------|------|
|    Bob | 27   |
|  Alice | 23   |
```

#### Markdown 表格中的内联

| Italics   | Bold     | Code   |
| --------  | -------- | ------ |
| *italics* | **bold** | `code` |

```markdown {filename=Markdown}
| Italics   | Bold     | Code   |
| --------  | -------- | ------ |
| *italics* | **bold** | `code` |
```

### 代码块

{{< cards >}}
  {{< card link="../../guide/syntax-highlighting" title="Syntax Highlighting" icon="sparkles" >}}
{{< /cards >}}

### 列表

#### 有序列表

1. First item
2. Second item
3. Third item

```markdown {filename=Markdown}
1. First item
2. Second item
3. Third item
```

#### 无序列表

* List item
* Another item
* And another item

```markdown {filename=Markdown}
* List item
* Another item
* And another item
```

#### 嵌套列表

* Fruit
  * Apple
  * Orange
  * Banana
* Dairy
  * Milk
  * Cheese

```markdown {filename=Markdown}
* Fruit
  * Apple
  * Orange
  * Banana
* Dairy
  * Milk
  * Cheese
```

### 图片

![landscape](https://picsum.photos/800/600)

```markdown {filename=Markdown}
![landscape](https://picsum.photos/800/600)
```

带有标题：

![landscape](https://picsum.photos/800/600 "Unsplash Landscape")

```markdown {filename=Markdown}
![landscape](https://picsum.photos/800/600 "Unsplash Landscape")
```

## 配置

Hugo 使用 [Goldmark](https://github.com/yuin/goldmark) 解析 Markdown。
Markdown 渲染可以在 `hugo.yaml` 中的 `markup.goldmark` 中配置。以下是Hextra的默认配置：

```yaml {filename="hugo.yaml"}
markup:
  goldmark:
    renderer:
      unsafe: true
  highlight:
    noClasses: false
```

如需了解更多选项，转至 [Configure Markup](https://gohugo.io/getting-started/configuration-markup/)。

## 参考资料

* [Markdown Guide](https://www.markdownguide.org/)
* [Markdown Cheatsheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)
* [Markdown Tutorial](https://www.markdowntutorial.com/)
* [Markdown Reference](https://commonmark.org/help/)
