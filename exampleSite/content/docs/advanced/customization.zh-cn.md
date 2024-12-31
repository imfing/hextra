---
title: 自定义 Hextra
linkTitle: 自定义
---

Hextra 在 `hugo.yaml` 配置文件中提供了一些默认的自定义选项，用于配置主题。
本页描述了可用的选项以及如何进一步自定义主题。

<!--more-->

## 自定义 CSS

要添加自定义 CSS，我们需要在站点中创建一个文件 `assets/css/custom.css`。Hextra 会自动加载此文件。

### 字体

内容的字体可以通过以下方式自定义：

```css {filename="assets/css/custom.css"}
.content {
  font-family: "Times New Roman", Times, serif;
}
```

### 内联代码元素

与 `其他文本` 混合的文本颜色可以通过以下方式自定义：

```css {filename="assets/css/custom.css"}
.content code:not(.code-block code) {
  color: #c97c2e;
}
```

### 主色调

主题的主色调可以通过设置 `--primary-hue`、`--primary-saturation` 和 `--primary-lightness` 变量来自定义：

```css {filename="assets/css/custom.css"}
:root {
  --primary-hue: 100deg;
  --primary-saturation: 90%;
  --primary-lightness: 50%;
}
```

### 进一步的主题自定义

可以通过覆盖暴露的 CSS 类来进一步自定义主题。以下是一个自定义页脚元素的示例：

```css {filename="assets/css/custom.css"}
.hextra-footer {
  /* 样式将应用于页脚元素 */
}

.hextra-footer:is(html[class~="dark"] *) {
  /* 样式将应用于暗模式下的页脚元素 */
}
```

以下类可用于自定义主题的各个部分。

#### 通用

- `hextra-scrollbar` - 滚动条元素
- `content` - 页面内容容器

#### 短代码

##### 徽章

- `hextra-badge` - 徽章元素

##### 卡片

- `hextra-card` - 卡片元素
- `hextra-card-image` - 卡片图片元素
- `hextra-card-icon` - 卡片图标元素
- `hextra-card-subtitle` - 卡片副标题元素

##### 卡片组

- `hextra-cards` - 卡片网格容器

##### Jupyter Notebook

- `hextra-jupyter-code-cell` - Jupyter 代码单元容器
- `hextra-jupyter-code-cell-outputs-container` - Jupyter 代码单元输出容器
- `hextra-jupyter-code-cell-outputs` - Jupyter 代码单元输出 div 元素

##### PDF

- `hextra-pdf` - PDF 容器元素

##### 步骤

- `steps` - 步骤容器

##### 标签页

- `hextra-tabs-panel` - 标签页面板容器
- `hextra-tabs-toggle` - 标签页切换按钮

##### 文件树

- `hextra-filetree` - 文件树容器

##### 文件夹

- `hextra-filetree-folder` - 文件树文件夹容器

#### 导航栏

- `nav-container` - 导航栏容器
- `nav-container-blur` - 导航栏模糊元素
- `hamburger-menu` - 汉堡菜单按钮

#### 页脚

- `hextra-footer` - 页脚元素
- `hextra-custom-footer` - 自定义页脚部分容器

#### 搜索

- `search-wrapper` - 搜索包装容器
- `search-input` - 搜索输入元素
- `search-results` - 搜索结果列表容器

#### 目录

- `hextra-toc` - 目录容器

#### 侧边栏

- `mobile-menu-overlay` - 移动菜单的覆盖元素
- `sidebar-container` - 侧边栏容器
- `sidebar-active-item` - 侧边栏中的活动项

#### 语言切换器

- `language-switcher` - 语言切换按钮
- `language-options` - 语言选项容器

#### 主题切换

- `theme-toggle` - 主题切换按钮

#### 代码复制按钮

- `hextra-code-copy-btn-container` - 代码复制按钮容器
- `hextra-code-copy-btn` - 代码复制按钮

#### 代码块

- `hextra-code-block` - 代码块容器

#### 功能卡片

- `hextra-feature-card` - 功能卡片链接元素

#### 功能网格

- `hextra-feature-grid` - 功能网格容器

#### 面包屑导航

面包屑导航没有特定的类。

### 语法高亮

可用的语法高亮主题列表可在 [Chroma 样式库](https://xyproto.github.io/splash/docs/all.html) 中找到。可以使用以下命令生成样式表：

```shell
hugo gen chromastyles --style=github
```

要覆盖默认的语法高亮主题，可以将生成的样式添加到自定义 CSS 文件中。

## 自定义脚本

你可以通过添加以下文件在每个页面的 head 末尾添加自定义脚本：

```
layouts/partials/custom/head-end.html
```

## 自定义页脚额外部分

你可以通过在站点中创建文件 `layouts/partials/custom/footer.html` 来在页脚中添加额外部分。

```html {filename="layouts/partials/custom/footer.html"}
<!-- 你的页脚元素在这里 -->
```

添加的部分将出现在页脚的版权部分之前。
你可以使用 [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML) 和 [Hugo 模板语法](https://gohugo.io/templates/) 来添加自己的内容。

页脚部分可用的 Hugo 变量有：`.switchesVisible` 和 `.copyrightVisible`。

## 自定义布局

可以通过在站点的 `layouts` 目录中创建同名文件来覆盖主题的布局。
例如，要覆盖文档的 `single.html` 布局，可以在站点中创建文件 `layouts/docs/single.html`。

更多信息，请参阅 [Hugo 模板文档][hugo-template-docs]。

## 进一步自定义

没有找到你想要的？欢迎 [发起讨论](https://github.com/imfing/hextra/discussions) 或为主题做出贡献！

[hugo-template-docs]: https://gohugo.io/templates/