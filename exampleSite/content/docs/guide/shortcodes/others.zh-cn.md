---
title: 其他短代码
linkTitle: 其他
next: /docs/guide/deploy-site
---

{{< callout type="warning" >}}
  其中部分为Hugo内置短代码。
  这些短代码稳定性较低，可能随时变更。
{{< /callout >}}

### 示例

{{< badge "default" >}}&nbsp;
{{< badge content="border" border=false >}}&nbsp;
{{< badge content="color" color="green" >}}&nbsp;
{{< badge content="link" link="https://github.com/imfing/hextra/releases" >}}&nbsp;
{{< badge content="icon" icon="sparkles" >}}&nbsp;

### 使用

#### 默认

{{< badge "徽章" >}}&nbsp;

```
{{</* badge "徽章" */>}}
```

#### 颜色

{{< badge content="徽章" >}}&nbsp;
{{< badge content="徽章" color="purple" >}}&nbsp;
{{< badge content="徽章" color="indigo" >}}&nbsp;
{{< badge content="徽章" color="blue" >}} &nbsp;
{{< badge content="徽章" color="green" >}} &nbsp;
{{< badge content="徽章" color="yellow" >}} &nbsp;
{{< badge content="徽章" color="amber" >}} &nbsp;
{{< badge content="徽章" color="orange" >}} &nbsp;
{{< badge content="徽章" color="red" >}}&nbsp;

```
{{</* badge content="徽章" */>}}
{{</* badge content="徽章" color="purple" */>}}
{{</* badge content="徽章" color="indigo" */>}}
{{</* badge content="徽章" color="blue" */>}}
{{</* badge content="徽章" color="green" */>}}
{{</* badge content="徽章" color="yellow" */>}}
{{</* badge content="徽章" color="amber" */>}}
{{</* badge content="徽章" color="orange" */>}}
{{</* badge content="徽章" color="red" */>}}
```

{{< badge content="徽章" border=false >}} &nbsp;
{{< badge content="徽章" color="purple" border=false >}} &nbsp;
{{< badge content="徽章" color="indigo" border=false >}} &nbsp;
{{< badge content="徽章" color="blue" border=false >}} &nbsp;
{{< badge content="徽章" color="green" border=false >}} &nbsp;
{{< badge content="徽章" color="yellow" border=false >}} &nbsp;
{{< badge content="徽章" color="amber" border=false >}} &nbsp;
{{< badge content="徽章" color="orange" border=false >}}&nbsp;
{{< badge content="徽章" color="red" border=false >}}&nbsp;

```
{{</* badge content="徽章" border=false */>}}
{{</* badge content="徽章" color="purple" border=false */>}}
{{</* badge content="徽章" color="indigo" border=false */>}}
{{</* badge content="徽章" color="blue" border=false */>}}
{{</* badge content="徽章" color="green" border=false */>}}
{{</* badge content="徽章" color="yellow" border=false */>}}
{{</* badge content="徽章" color="amber" border=false */>}}
{{</* badge content="徽章" color="orange" border=false */>}}
{{</* badge content="徽章" color="red" border=false */>}}
```

#### 变体

{{< badge content="徽章" icon="sparkles" >}}&nbsp;
{{< badge content="Releases" link="https://github.com/imfing/hextra/releases" icon="github" >}}&nbsp;

```
{{</* badge content="徽章" icon="sparkles" */>}}
{{</* badge content="Releases" link="https://github.com/imfing/hextra/releases" icon="github" */>}}
```

### 选项

| 姓名        | 描述                                                                                                 |
|-----------|----------------------------------------------------------------------------------------------------|
| `content` | 徽章的文字。                                                                                             |
| `link`    | 徽章的链接。                                                                                             |
| `icon`    | 徽章的图标。                                                                                             |
| `color`   | 徽章的颜色。 <br/> `gray` (默认), `purple`, `indigo`, `blue`, `green`, `yellow`, `amber`, `orange`, `red`. |
| `class`   | 徽章的等级。                                                                                             |
| `border`  | 添加或删除边框 (默认：true).                                                                                 |

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