---
title: Markdown 语法指南
date: 2020-01-01
authors:
  - name: John Doe
    link: https://example.com/johndoe
excludeSearch: true
---

这篇文章提供了一些基础的 Markdown 语法样例，这些可以在 Hugo 的内容文件中使用。

<!--more-->

## 基础语法

### 标题

```
# 一级标题
## 二级标题
### 三级标题
#### 四级标题
##### 五级标题
###### 六级标题
```

## 二级标题
### 三级标题
#### 四级标题
##### 五级标题
###### 六级标题

```text
*这段文字将是斜体*
_这也将是斜体_

**这段文字将是粗体**
__这也将是粗体__

_你 **可以** 组合它们_
```

*这段文字将是斜体*
_这也将是斜体_

**这段文字将是粗体**
__这也将是粗体__

_你 **可以** 组合它们_

### 列表

#### 无序列表

* 项目 1
* 项目 2
  * 项目 2a
  * 项目 2b

#### 有序列表

1. 项目 1
2. 项目 2
3. 项目 3
   1. 项目 3a
   2. 项目 3b

### 图片

```markdown
![GitHub Logo](https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png)
```

![GitHub Logo](https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png)

### 链接

```markdown
[Hugo](https://gohugo.io)
```

[Hugo](https://gohugo.io)

### 块引用

```markdown
牛顿曾说：

> 如果我看得更远，那是因为我站在巨人的肩膀上。
```

> 如果我看得更远，那是因为我站在巨人的肩膀上。

### 行内代码

```markdown
行内 `代码` 有 `反引号` 包围。
```

行内 `代码` 有 `反引号` 包围。

### 代码块

#### 语法高亮

````markdown
```go
func main() {
    fmt.Println("Hello World")
}
```
````

```go
func main() {
    fmt.Println("Hello World")
}
```

### 表格

```markdown
| Syntax    | Description |
| --------- | ----------- |
| Header    | Title       |
| Paragraph | Text        |
```

| Syntax    | Description |
| --------- | ----------- |
| Header    | Title       |
| Paragraph | Text        |

## 参考

- [Markdown Syntax](https://www.markdownguide.org/basic-syntax/)
- [Hugo Markdown](https://gohugo.io/content-management/formats/#markdown)
