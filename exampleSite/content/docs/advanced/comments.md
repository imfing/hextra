---
title: Comments System
linkTitle: Comments
---

Hextra supports adding comments system to your site.
Currently [giscus](https://giscus.app/) is supported.

## giscus

[giscus](https://giscus.app/) is a comments system powered by [GitHub Discussions](https://docs.github.com/en/discussions). It is free and open source.

To enable giscus, you need to add the following to the site configuration file:

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

The giscus configurations can be constructed from the [giscus.app](https://giscus.app/) website. More details can also be found there.
