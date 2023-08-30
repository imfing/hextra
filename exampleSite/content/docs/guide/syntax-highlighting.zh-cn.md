---
title: "代码高亮"
weight: 3
---

Hugo 使用 [Chroma](https://github.com/alecthomas/chroma)，一种纯 Golang 实现的代码高亮渲染器.
建议对 Markdown 内容中的代码块使用反引号. 例如: 

<!--more-->

````markdown {filename="Markdown"}
```python
def say_hello():
    print("Hello!")
```
````

将呈现为：

```python
def say_hello():
    print("Hello!")
```

## 特性

### 文件名

要向代码块添加文件名或标题, 请设置 `filename`:

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

### 行号

如需设置行号, 将 `linenos` 设置为 `table` , 并将 `linenostart` 设置为起始行号:

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

### 突出显示线条

要突出显示线条, 设置 `hl_lines` 为行号:

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

默认情况下, 为代码块启用复制按钮.


## 支持的语言

如需了解支持的语言, 转至 [Chroma's documentation](https://github.com/alecthomas/chroma#supported-languages).
