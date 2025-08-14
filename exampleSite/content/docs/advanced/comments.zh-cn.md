---
title: 评论系统
linkTitle: 评论
---

Hextra 支持为您的网站添加评论系统。
目前支持 [giscus](https://giscus.app/)。

<!--more-->

## giscus

[giscus](https://giscus.app/) 是一个由 [GitHub Discussions](https://docs.github.com/en/discussions) 驱动的评论系统。它是免费且开源的。

要启用 giscus，您需要在网站配置文件中添加以下内容：

```yaml {filename="hugo.yaml"}
params:
  comments:
    enable: false
    type: giscus

    giscus:
      repo: <仓库>
      repoId: <仓库 ID>
      category: <分类>
      categoryId: <分类 ID>
```

giscus 的配置可以从 [giscus.app](https://giscus.app/) 网站生成。更多详情也可以在那里找到。

可以在页面的 front matter 中为特定页面启用或禁用评论：

```yaml {filename="content/docs/about.md"}
---
title: 关于
comments: true
---
```