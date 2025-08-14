---
title: 其他短代码
linkTitle: 其他
sidebar:
  exclude: true
next: /docs/guide/deploy-site
---

{{< callout emoji="ℹ️" >}}
  其中部分为Hugo内置短代码。
  这些短代码稳定性较低，可能随时变更。
{{< /callout >}}

## 徽章

```
{{</* badge "徽章" */>}}
```

效果：

{{< badge "徽章" >}}

变体：

```
{{</* badge content="信息" type="info" */>}}
{{</* badge content="警告" type="warning" */>}}
{{</* badge content="错误" type="error" */>}}
```

效果：

{{< badge content="信息" type="info" >}} &nbsp;
{{< badge content="警告" type="warning" >}} &nbsp;
{{< badge content="错误" type="error" >}}

带链接和图标：

```
{{</* badge content="版本发布" link="https://github.com/imfing/hextra/releases" icon="github" */>}}
```

效果：

{{< badge content="版本发布" link="https://github.com/imfing/hextra/releases" icon="github" >}}

## YouTube

嵌入YouTube视频。

```
{{</* youtube 视频ID */>}}
```

效果：

{{< youtube id=dQw4w9WgXcQ loading=lazy >}}

更多信息，请参阅 [Hugo 的 YouTube 短代码](https://gohugo.io/content-management/shortcodes/#youtube)。

## PDF

通过PDF短代码可在内容中嵌入PDF文件。

```
{{</* pdf "https://example.com/sample.pdf" */>}}
```

也可将PDF文件置于项目目录中并使用相对路径。

```
{{</* pdf "path/to/file.pdf" */>}}
```

示例：

{{< pdf "https://upload.wikimedia.org/wikipedia/commons/1/13/Example.pdf" >}}