---
title: 自定义 Hextra
linkTitle: 自定义
---

Hextra 在 `hugo.yaml` 中提供了一些自定义选项来配置主题。
本页介绍了可用选项以及如何进一步自定义主题。

<!--more-->

## 自定义 CSS

要添加自定义 CSS，我们需要在站点中创建一个文件 `assets/css/custom.css`。Hextra 将自动加载该文件，比如自定义字体：

```css {filename="assets/css/custom.css"}
.content {
  font-family: "Times New Roman", Times, serif;
}
```

### 主题色

主题色可以通过设置 `--primary-hue` 变量来自定义：

```css {filename="assets/css/custom.css"}
:root {
  --primary-hue: 100deg;
}
```

### 代码高亮

代码高亮风格的详细信息可在 [Chroma Styles Gallery](https://xyproto.github.io/splash/docs/all.html) 中找到。可以使用以下命令生成样式表：

```shell
hugo gen chromastyles --style=github
```

可将生成的样式添加到自定义 CSS 文件中以覆盖默认代码高亮样式。

## 自定义 Script

你可以添加以下文件以自定义 `script` 添加到每页的 `head` 最后：

```
layouts/partials/custom/head-end.html
```

## 自定义布局

可以在站点的 `layouts` 目录中创建同名文件来覆盖主题的默认布局。
例如，要覆盖文档的 `single.html` 布局，在站点中创建文件 `layouts/docs/single.html`。

如需或许更多信息，转至 [Hugo Templates](https://gohugo.io/templates/)。

## 进一步定制 Hextra

没有找到你想修改的内容？在 GitHub 上[创建 Discussion](https://github.com/imfing/hextra/discussions) 或为 Hextra 贡献你的智慧！
