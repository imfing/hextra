---
title: 图表
weight: 6
next: /docs/guide/shortcodes
---

目前，Hextra 支持 [Mermaid](#mermaid) 的图表。

<!--more-->

## Mermaid

[Mermaid](https://github.com/mermaid-js/mermaid#readme) 是一个基于 JavaScript 的图表绘制工具，它的文本定义和 Markdown 类似，可在浏览器中动态创建图表。例如：流程图、序列图、饼图等。

在 Hextra 中使用 Mermaid 就像使用代码块一样简单：

````markdown
```mermaid
graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
```
````

将呈现为：

```mermaid
graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
```

Sequence diagram：

```mermaid
sequenceDiagram
    participant Alice
    participant Bob
    Alice->>John: Hello John, how are you?
    loop Healthcheck
        John->>John: Fight against hypochondria
    end
    Note right of John: Rational thoughts <br/>prevail!
    John-->>Alice: Great!
    John->>Bob: How about you?
    Bob-->>John: Jolly good!
```

如需获取更多信息，转至 [Mermaid Documentation](https://mermaid-js.github.io/mermaid/#/)。
