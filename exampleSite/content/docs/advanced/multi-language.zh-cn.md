---
title: "多语言"
weight: 1
prev: /docs/advanced
---

Hextra 支持使用 Hugo 的[多语言模式](https://gohugo.io/content-management/multilingual/) 创建多语言的网站。

<!--more-->

## 启用多语言支持

为了使我们的网站支持多语言，我们需要告诉 Hugo 需要支持的语言。 在站点配置文件中添加：

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

## 按文件名管理翻译

Hugo 支持按文件名管理翻译。例如，如果我们有一个英文文件 `content/docs/_index.md`，我们可以创建一个翻译为法语的文件 `content/docs/_index.fr.md`。

{{< filetree/container >}}
  {{< filetree/folder name="content" >}}
    {{< filetree/folder name="docs" state="open" >}}
      {{< filetree/file name="_index.md" >}}
      {{< filetree/file name="_index.fr.md" >}}
      {{< filetree/file name="_index.ja.md" >}}
    {{< /filetree/folder >}}
  {{< /filetree/folder >}}
{{< /filetree/container >}}

注意：Hugo 还支持[按内容目录管理翻译](https://gohugo.io/content-management/multilingual/#translation-by-content-directory)。

## 翻译菜单项

要翻译导航栏中的菜单项，我们需要设置 `identifier` 字段：

```yaml {filename="hugo.yaml"}
menu:
  main:
    - identifier: documentation
      name: Documentation
      pageRef: /docs
      weight: 1
    - identifier: blog
      name: Blog
      pageRef: /blog
      weight: 2
```

## 翻译字符串

要翻译其他地方的字符串，我们需要将翻译添加到相应的 `i18n` 文件中：

```yaml {filename="i18n/fr.yaml"}
readMore: Lire la suite
```

## 更多参考

- [Hugo Multilingual Mode](https://gohugo.io/content-management/multilingual/)
- [Hugo Multilingual Part 1: Content translation](https://www.regisphilibert.com/blog/2018/08/hugo-multilingual-part-1-managing-content-translation/)
- [Hugo Multilingual Part 2: Strings localization](https://www.regisphilibert.com/blog/2018/08/hugo-multilingual-part-2-i18n-string-localization/)
