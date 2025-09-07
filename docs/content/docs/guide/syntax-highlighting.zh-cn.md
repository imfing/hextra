---
title: "语法高亮"
weight: 3
---

Hugo 使用纯 Go 编写的通用语法高亮工具 [Chroma](https://github.com/alecthomas/chroma) 来实现代码高亮。建议在 Markdown 内容中使用反引号标记代码块，例如：

<!--more-->

````markdown {filename="Markdown"}
```python
def say_hello():
    print("Hello!")
```
````

将渲染为：

```python
def say_hello():
    print("Hello!")
```

## 功能特性

### 文件名标注

通过设置 `filename` 属性可为代码块添加文件名或标题：

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

### 文件链接

{{< new-feature version="v0.9.2" >}}

通过 `base_url` 属性可设置基础 URL，该 URL 会与文件名组合生成可点击的链接。文件名可包含相对路径以指定文件在基础路径中的位置。

````markdown {filename="Markdown"}
```go {base_url="https://github.com/imfing/hextra/blob/main/",filename="docs/hugo.work"}
go 1.20
```
````

```go {base_url="https://github.com/imfing/hextra/blob/main/",filename="docs/hugo.work"}
go 1.20
```

### 行号显示

设置 `linenos=table` 可启用行号，并通过 `linenostart` 指定起始行号：

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

### 行高亮

通过 `hl_lines` 属性可高亮指定行号（支持数组格式）：

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

### 复制按钮

代码块默认启用复制功能，可通过站点配置文件修改其行为：

```yaml {linenos=table,linenostart=42,filename="hugo.yaml"}
params:
  highlight:
    copy:
      enable: true
      # hover | always
      display: hover
```

## 支持语言

完整支持的语言列表请参阅 [Chroma 文档](https://github.com/alecthomas/chroma#supported-languages)。
