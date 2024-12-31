---
title: ダイアグラム
weight: 6
next: /docs/guide/shortcodes
---

現在、Hextraはダイアグラムのために[Mermaid](#mermaid)をサポートしています。

<!--more-->

## Mermaid

[Mermaid](https://github.com/mermaid-js/mermaid#readme)は、JavaScriptベースのダイアグラムおよびチャート作成ツールで、Markdownにインスパイアされたテキスト定義を取り込み、ブラウザ内でダイナミックにダイアグラムを作成します。例えば、Mermaidはフローチャート、シーケンス図、円グラフなどをレンダリングできます。

HextraでMermaidを使用するのは、言語を`mermaid`に設定したコードブロックを書くのと同じくらい簡単です:

````markdown
```mermaid
graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
```
````

これは次のようにレンダリングされます:

```mermaid
graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
```

シーケンス図:

```mermaid
sequenceDiagram
    participant Alice
    participant Bob
    Alice->>John: こんにちはJohn、元気ですか？
    loop 健康チェック
        John->>John: 心気症と戦う
    end
    Note right of John: 理性的な思考 <br/>が勝つ！
    John-->>Alice: 元気です！
    John->>Bob: あなたはどうですか？
    Bob-->>John: とても元気です！
```

詳細については、[Mermaidドキュメント](https://mermaid-js.github.io/mermaid/#/)を参照してください。