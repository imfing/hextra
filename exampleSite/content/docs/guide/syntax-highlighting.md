---
title: "Syntax Highlighting"
weight: 3
---

Hugo uses [Chroma](https://github.com/alecthomas/chroma), a general purpose syntax highlighter in pure Go, for syntax highlighting.
It is recommended to use backticks for code blocks in Markdown content. For example:

<!--more-->

````markdown {filename="Markdown"}
```python
def say_hello():
    print("Hello!")
```
````

will be rendered as:

```python
def say_hello():
    print("Hello!")
```

## Features

### Filename

To add a filename or title to the code block, set attribute `filename`:

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

### Link to File

{{< new-feature version="v0.9.2" >}}

You can use the `base_url` attribute to provide a base URL that will be combined with the file name to generate a link.

The file name can include a relative path if it specifies the file's location within the base path.

````markdown {filename="Markdown"}
```go {base_url="https://github.com/imfing/hextra/blob/main/",filename="exampleSite/hugo.work"}
go 1.20
```
````

```go {base_url="https://github.com/imfing/hextra/blob/main/",filename="exampleSite/hugo.work"}
go 1.20
```

### Line Numbers

To set line numbers, set attribute `linenos` to `table` and optionally set `linenostart` to the starting line number:

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

### Highlighting Lines

To highlight lines, set attribute `hl_lines` to a list of line numbers:

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

### Copy Button

By default, copy button is enabled for code blocks. Its behavior can changed by modifying the site configuration file:

```yaml {linenos=table,linenostart=42,filename="hugo.yaml"}
params:
  highlight:
    copy:
      enable: true
      # hover | always
      display: hover
```

## Supported Languages

For a list of supported languages, please see the [Chroma documentation](https://github.com/alecthomas/chroma#supported-languages).
