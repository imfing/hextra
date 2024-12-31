---
title: 图表
weight: 6
next: /docs/guide/shortcodes
---

目前，Hextra 支持使用 [Mermaid](#mermaid) 来绘制图表。

<!--more-->

## Mermaid

[Mermaid](https://github.com/mermaid-js/mermaid#readme) 是一个基于 JavaScript 的图表工具，它通过类似 Markdown 的文本定义，在浏览器中动态生成图表。例如，Mermaid 可以渲染流程图、序列图、饼图等。

在 Hextra 中使用 Mermaid 非常简单，只需编写一个语言设置为 `mermaid` 的代码块：

````markdown
```mermaid
graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
```
````

将会渲染为：

```mermaid
graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
```

序列图示例：

```mermaid
sequenceDiagram
    participant Alice
    participant Bob
    Alice->>John: 你好 John，最近怎么样？
    loop 健康检查
        John->>John: 与疑病症作斗争
    end
    Note right of John: 理性思考 <br/>占据上风！
    John-->>Alice: 很好！
    John->>Bob: 你怎么样？
    Bob-->>John: 非常好！
```

更多信息，请参考 [Mermaid 文档](https://mermaid-js.github.io/mermaid/#/)。