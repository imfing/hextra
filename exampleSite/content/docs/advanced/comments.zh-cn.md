---
title: 评论系统
linkTitle: Comments
---

Hextra 支持在你的网站中添加评论系统。
目前已经支持 [giscus](https://giscus.app/).

<!--more-->

## giscus

[giscus](https://giscus.app/) 是由 [GitHub Discussions](https://docs.github.com/en/discussions)驱动的评论系统。Giscus 免费并且开源。

如需启用 Giscus, 你需要在配置文件中添加以下内容：

```yaml {filename="hugo.yaml"}
params:
  comments:
    enable: false
    type: giscus

    giscus:
      repo: <repository>
      repoId: <repository ID>
      category: <category>
      categoryId: <category ID>
```

Giscus 配置可以参考 [giscus.app](https://giscus.app/)，还可以在那里找到更多详细信息。

可以在 front matter 中启用或禁用特定页面的评论：

```yaml {filename="content/docs/about.md"}
---
title: About
comments: true
---
```
