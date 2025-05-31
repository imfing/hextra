---
title: Markdown
weight: 2
---

Hugo 支持使用 [Markdown](https://en.wikipedia.org/wiki/Markdown) 语法来格式化文本、创建列表等。本页将展示一些最常见的 Markdown 语法示例。

<!--more-->

## Markdown 示例

### 文本样式

| 样式   | 语法     | 示例   | 输出   |
| --------  | -------- | ------ | ------ |
| 粗体 | `**粗体文本**` | `**粗体文本**` | **粗体文本** |
| 斜体 | `*斜体文本*` | `*斜体文本*` | *斜体文本* |
| 删除线 | `~~删除线文本~~` | `~~删除线文本~~` | ~~删除线文本~~ |
| 下标 | `<sub></sub>` | `这是一个<sub>下标</sub>文本` | 这是一个<sub>下标</sub>文本 |
| 上标 | `<sup></sup>` | `这是一个<sup>上标</sup>文本` | 这是一个<sup>上标</sup>文本 |

### 引用块

带出处的引用块

> 不要通过共享内存来通信，而要通过通信来共享内存。<br>
> — <cite>Rob Pike[^1]</cite>

[^1]: 以上引用摘自 Rob Pike 在 2015 年 11 月 18 日 Gopherfest 上的[演讲](https://www.youtube.com/watch?v=PAAkCSZUG1c)。

```markdown {filename=Markdown}
> 不要通过共享内存来通信，而要通过通信来共享内存。<br>
> — <cite>Rob Pike[^1]</cite>

[^1]: 以上引用摘自 Rob Pike 在 2015 年 11 月 18 日 Gopherfest 上的[演讲](https://www.youtube.com/watch?v=PAAkCSZUG1c)。
```

### 提示框

{{< new-feature version="v0.9.0" >}}

提示框是基于引用块语法的 Markdown 扩展，可用于强调关键信息。
支持 [GitHub 风格的提示框](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax#alerts)。
请确保您使用的是最新版本的 Hextra 和 [Hugo v0.146.0](https://github.com/gohugoio/hugo/releases/tag/v0.146.0) 或更高版本。

> [!NOTE]
> 用户应该知道的有用信息，即使是在浏览内容时。

> [!TIP]
> 帮助用户更好地或更轻松地完成任务的建议。

> [!IMPORTANT]
> 用户需要了解的关键信息，以实现他们的目标。

> [!WARNING]
> 需要用户立即注意的紧急信息，以避免问题。

> [!CAUTION]
> 关于某些操作的风险或负面结果的建议。

```markdown {filename=Markdown}
> [!NOTE]
> 用户应该知道的有用信息，即使是在浏览内容时。

> [!TIP]
> 帮助用户更好地或更轻松地完成任务的建议。

> [!IMPORTANT]
> 用户需要了解的关键信息，以实现他们的目标。

> [!WARNING]
> 需要用户立即注意的紧急信息，以避免问题。

> [!CAUTION]
> 关于某些操作的风险或负面结果的建议。
```

### 表格

表格不是 Markdown 核心规范的一部分，但 Hugo 默认支持它们。

|   姓名 | 年龄  |
|--------|------|
|    Bob | 27   |
|  Alice | 23   |

```markdown {filename=Markdown}
|   姓名 | 年龄  |
|--------|------|
|    Bob | 27   |
|  Alice | 23   |
```

#### 表格中的内联 Markdown

| 斜体   | 粗体     | 代码   |
| --------  | -------- | ------ |
| *斜体* | **粗体** | `代码` |

```markdown {filename=Markdown}
| 斜体   | 粗体     | 代码   |
| --------  | -------- | ------ |
| *斜体* | **粗体** | `代码` |
```

### 代码块

{{< cards >}}
  {{< card link="../../guide/syntax-highlighting" title="语法高亮" icon="sparkles" >}}
{{< /cards >}}

### 列表

#### 有序列表

1. 第一项
2. 第二项
3. 第三项

```markdown {filename=Markdown}
1. 第一项
2. 第二项
3. 第三项
```

#### 无序列表

* 列表项
* 另一个项
* 再一个项

```markdown {filename=Markdown}
* 列表项
* 另一个项
* 再一个项
```

#### 嵌套列表

* 水果
  * 苹果
  * 橙子
  * 香蕉
* 乳制品
  * 牛奶
  * 奶酪

```markdown {filename=Markdown}
* 水果
  * 苹果
  * 橙子
  * 香蕉
* 乳制品
  * 牛奶
  * 奶酪
```

### 图片

![风景](https://picsum.photos/800/600)

```markdown {filename=Markdown}
![风景](https://picsum.photos/800/600)
```

带标题：

![风景](https://picsum.photos/800/600 "Unsplash 风景")

```markdown {filename=Markdown}
![风景](https://picsum.photos/800/600 "Unsplash 风景")
```

## 配置

Hugo 使用 [Goldmark](https://github.com/yuin/goldmark) 进行 Markdown 解析。
Markdown 渲染可以在 `hugo.yaml` 中的 `markup.goldmark` 下进行配置。
以下是 Hextra 的默认配置：

```yaml {filename="hugo.yaml"}
markup:
  goldmark:
    renderer:
      unsafe: true
  highlight:
    noClasses: false
```

更多配置选项，请参阅 Hugo 文档中的 [配置 Markup](https://gohugo.io/getting-started/configuration-markup/)。

## 学习资源

* [Markdown 指南](https://www.markdownguide.org/)
* [Markdown 速查表](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)
* [Markdown 教程](https://www.markdowntutorial.com/)
* [Markdown 参考](https://commonmark.org/help/)