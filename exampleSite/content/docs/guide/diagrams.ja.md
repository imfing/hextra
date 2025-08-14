---
title: ダイアグラム
weight: 6
next: /docs/guide/shortcodes
---

現在、Hextra は [Mermaid](#mermaid) によるダイアグラム作成をサポートしています。

<!--more-->

## Mermaid

[Mermaid](https://github.com/mermaid-js/mermaid#readme) は、JavaScript ベースのダイアグラムおよびチャート作成ツールで、Markdown 風のテキスト定義をブラウザ上で動的にダイアグラムに変換します。例えば、Mermaid はフローチャート、シーケンス図、円グラフなどをレンダリングできます。

Hextra で Mermaid を使用するには、言語を `mermaid` に設定したコードブロックを記述するだけです:

````markdown
```mermaid
graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
```
````

これは以下のようにレンダリングされます:

```mermaid
graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
```

シーケンス図の例:

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

詳細については、[Mermaid ドキュメント](https://mermaid-js.github.io/mermaid/#/)を参照してください。