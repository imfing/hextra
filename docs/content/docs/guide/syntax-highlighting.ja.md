---
title: "シンタックスハイライト"
weight: 3
---

Hugo は構文強調表示に、純粋な Go で書かれた汎用シンタックスハイライタ [Chroma](https://github.com/alecthomas/chroma) を使用しています。
Markdown コンテンツ内のコードブロックにはバッククォートを使用することを推奨します。例えば:

<!--more-->

````markdown {filename="Markdown"}
```python
def say_hello():
    print("Hello!")
```
````

は次のようにレンダリングされます:

```python
def say_hello():
    print("Hello!")
```

## 機能

### ファイル名

コードブロックにファイル名やタイトルを追加するには、`filename` 属性を設定します:

````markdown {filename="Markdown"}
```python {filename="hello.py"}
def say_hello():
    print("Hello!")
```
````

```python {filename="hello.py"}
def say_hello():
    print("Hello!")
```

### ファイルへのリンク

{{< new-feature version="v0.9.2" >}}

`base_url` 属性を使用してベース URL を指定し、ファイル名と組み合わせてリンクを生成できます。

ファイル名には、ベースパス内のファイルの場所を指定する相対パスを含めることができます。

````markdown {filename="Markdown"}
```go {base_url="https://github.com/imfing/hextra/blob/main/",filename="docs/hugo.work"}
go 1.20
```
````

```go {base_url="https://github.com/imfing/hextra/blob/main/",filename="docs/hugo.work"}
go 1.20
```

### 行番号

行番号を表示するには、`linenos` 属性を `table` に設定し、必要に応じて `linenostart` で開始行番号を指定します:

````markdown {filename="Markdown"}
```python {linenos=table,linenostart=42}
def say_hello():
    print("Hello!")
```
````

```python {linenos=table,linenostart=42}
def say_hello():
    print("Hello!")
```

### 行のハイライト

特定の行をハイライト表示するには、`hl_lines` 属性に行番号のリストを設定します:

````markdown {filename="Markdown"}
```python {linenos=table,hl_lines=[2,4],linenostart=1,filename="hello.py"}
def say_hello():
    print("Hello!")

def main():
    say_hello()
```
````

```python {linenos=table,hl_lines=[2,4],linenostart=1,filename="hello.py"}
def say_hello():
    print("Hello!")

def main():
    say_hello()
```

### コピーボタン

デフォルトでコードブロックにはコピーボタンが有効になっています。この動作はサイト設定ファイルで変更できます:

```yaml {linenos=table,linenostart=42,filename="hugo.yaml"}
params:
  highlight:
    copy:
      enable: true
      # hover | always
      display: hover
```

## 対応言語

対応言語の一覧については、[Chroma のドキュメント](https://github.com/alecthomas/chroma#supported-languages)を参照してください。
