---
title: "シンタックスハイライト"
weight: 3
---

Hugoは、純粋なGoで書かれた汎用シンタックスハイライターである[Chroma](https://github.com/alecthomas/chroma)を使用してシンタックスハイライトを行います。
Markdownコンテンツ内のコードブロックにはバッククォートを使用することを推奨します。例えば：

<!--more-->

````markdown {filename="Markdown"}
```python
def say_hello():
    print("Hello!")
```
````

は次のようにレンダリングされます：

```python
def say_hello():
    print("Hello!")
```

## 機能

### ファイル名

コードブロックにファイル名やタイトルを追加するには、`filename`属性を設定します：

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

`base_url`属性を使用して、ファイル名と組み合わせてリンクを生成するベースURLを提供できます。

ファイル名には、ベースパス内のファイルの場所を指定する相対パスを含めることができます。

````markdown {filename="Markdown"}
```go {base_url="https://github.com/imfing/hextra/blob/main/",filename="exampleSite/hugo.work"}
go 1.20
```
````

```go {base_url="https://github.com/imfing/hextra/blob/main/",filename="exampleSite/hugo.work"}
go 1.20
```

### 行番号

行番号を設定するには、`linenos`属性を`table`に設定し、オプションで`linenostart`を開始行番号に設定します：

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

行をハイライトするには、`hl_lines`属性に行番号のリストを設定します：

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

デフォルトでは、コードブロックにコピーボタンが有効になっています。その動作はサイト設定ファイルを変更することで変更できます：

```yaml {linenos=table,linenostart=42,filename="hugo.yaml"}
params:
  highlight:
    copy:
      enable: true
      # hover | always
      display: hover
```

## サポートされている言語

サポートされている言語のリストについては、[Chromaのドキュメント](https://github.com/alecthomas/chroma#supported-languages)を参照してください。