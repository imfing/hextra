---
title: 其他短代码
linkTitle: 其他
sidebar:
  exclude: true
---

{{< callout emoji="ℹ️" >}}
  其中一些是 Hugo 内置的短代码。
  这些短代码被认为不太稳定，可能会随时更改。
{{< /callout >}}

## 徽章

```
{{</* badge "徽章" */>}}
```

结果：

{{< badge "徽章" >}}

变体：

```
{{</* badge content="信息" type="info" */>}}
{{</* badge content="警告" type="warning" */>}}
{{</* badge content="错误" type="error" */>}}
```

结果：

{{< badge content="信息" type="info" >}} &nbsp;
{{< badge content="警告" type="warning" >}} &nbsp;
{{< badge content="错误" type="error" >}}

带链接和图标：

```
{{</* badge content="发布" link="https://github.com/imfing/hextra/releases" icon="github" */>}}
```

结果：

{{< badge content="发布" link="https://github.com/imfing/hextra/releases" icon="github" >}}

## YouTube

嵌入 YouTube 视频。

```
{{</* youtube 视频ID */>}}
```

结果：

{{< youtube id=dQw4w9WgXcQ loading=lazy >}}

更多信息，请参阅 [Hugo 的 YouTube 短代码](https://gohugo.io/content-management/shortcodes/#youtube)。

## PDF

使用 PDF 短代码，您可以在内容中嵌入 PDF 文件。

```
{{</* pdf "https://example.com/sample.pdf" */>}}
```

您也可以将 PDF 文件放在项目目录中并使用相对路径。

```
{{</* pdf "path/to/file.pdf" */>}}
```

示例：

{{< pdf "https://upload.wikimedia.org/wikipedia/commons/1/13/Example.pdf" >}}