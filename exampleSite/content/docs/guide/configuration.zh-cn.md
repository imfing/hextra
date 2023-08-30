---
title: 配置文件
weight: 2
---

Hugo 从 Hugo 网站根目录下的 `hugo.yaml` 读取配置。
在配置文件中，您可以配置站点的所有选项。
你可以在 `exampleSite/hugo.yaml` 中找到此站点的配置文件作为开始。

<!--more-->

## 导航栏

### 菜单

右上角的菜单在配置文件的 `menu.main` 中配置：

```yaml {filename="hugo.yaml"}
menu:
  main:
    - name: Documentation
      pageRef: /docs
      weight: 1
    - name: Blog
      pageRef: /blog
      weight: 2
    - name: About
      pageRef: /about
      weight: 3
    - name: Search
      weight: 4
      params:
        type: search
    - name: GitHub
      weight: 5
      url: "https://github.com/imfing/hextra"
      params:
        icon: github
```

有几种不同类型的菜单项: 

1. Link to a page in the site with `pageRef`
    ```yaml
    - name: Documentation
      pageRef: /docs
    ```
2. Link to an external URL with `url`
    ```yaml
    - name: GitHub
      url: "https://github.com"
    ```
3. Search bar with `type: search`
    ```yaml
    - name: Search
      params:
        type: search
    ```
4. Icon
    ```yaml
    - name: GitHub
      params:
        icon: github
    ```

这些菜单项可以通过设置 `weight` 进行排序。

## 侧边栏

### 主侧边栏

主侧边栏是自动从 `content` 目录结构生成的。
有关更多详细信息，转至 [目录结构](/docs/guide/organize-files)。

### 额外链接

侧边栏的额外链接在配置文件的 `menu.sidebar` 部分中配置：

```yaml {filename="hugo.yaml"}
menu:
  sidebar:
    - name: More
      params:
        type: separator
      weight: 1
    - name: "About"
      pageRef: "/about"
      weight: 2
    - name: "Hugo Docs ↗"
      url: "https://gohugo.io/documentation/"
      weight: 3
```

## 右侧边栏

### 目录

目录是根据内容文件中的标题自动生成的，可以在 `front matter` 设置 `toc：false` 来禁用它。

```yaml {filename="content/docs/guide/configuration.md"}
---
title: Configuration
toc: false
---
```

### 编辑此页链接

要配置编辑此页链接，我们可以在配置文件中设置 `params.editURL.base`：
```yaml {filename="hugo.yaml"}
params:
  editURL:
    base: "https://github.com/your-username/your-repo/edit/main"
```

将为每个页面自动生成编辑链接。
如需为特定页面设置编辑链接，可以在页面的 `front matter` 中设置 `params.editURL`：

```yaml {filename="content/docs/guide/configuration.md"}
---
title: Configuration
params:
  editURL: "https://example.com/edit/this/page"
---
```
