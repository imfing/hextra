---
title: "多语言"
weight: 1
prev: /docs/advanced
---

Hextra 支持使用 Hugo 的[多语言模式](https://gohugo.io/content-management/multilingual/) 创建多语言的网站.

<!--more-->

## 启用多语言支持

为了使我们的网站支持多语言，我们需要告诉 Hugo 需要支持的语言. 在站点配置文件中添加：

```yaml {filename="hugo.yaml"}
defaultContentLanguage: en
languages:
  en:
    languageName: English
    weight: 1
  fr:
    languageName: Français
    weight: 2
  ja:
    languageName: 日本語
    weight: 3
```

## 通过文件名管理翻译



