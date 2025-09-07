---
title: "多语言支持"
weight: 1
prev: /docs/advanced
---

Hextra 支持使用 Hugo 的[多语言模式](https://gohugo.io/content-management/multilingual/)创建多语言网站。

<!--more-->

## 启用多语言功能

要使网站支持多语言，我们需要在站点配置文件中指定支持的语言：

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

Hugo 支持通过文件名管理翻译。例如，如果我们有一个英文文件 `content/docs/_index.md`，可以创建 `content/docs/_index.fr.md` 作为法语翻译。

{{< filetree/container >}}
  {{< filetree/folder name="content" >}}
    {{< filetree/folder name="docs" state="open" >}}
      {{< filetree/file name="_index.md" >}}
      {{< filetree/file name="_index.fr.md" >}}
      {{< filetree/file name="_index.ja.md" >}}
    {{< /filetree/folder >}}
  {{< /filetree/folder >}}
{{< /filetree/container >}}

注意：Hugo 还支持[通过内容目录翻译](https://gohugo.io/content-management/multilingual/#translation-by-content-directory)。

## 翻译菜单项

要翻译导航栏中的菜单项，需要设置 `identifier` 字段：

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

并在对应的 i18n 文件中进行翻译：

```yaml {filename="i18n/fr.yaml"}
documentation: Documentation
blog: Blog
```

## 翻译字符串

要翻译其他位置的字符串，需要将翻译添加到对应的 i18n 文件中：

```yaml {filename="i18n/fr.yaml"}
readMore: Lire la suite
```

主题中使用的字符串列表可以在 `i18n/en.yaml` 文件中找到。

## 延伸阅读

- [Hugo 多语言模式](https://gohugo.io/content-management/multilingual/)
- [Hugo 多语言第一部分：内容翻译](https://www.regisphilibert.com/blog/2018/08/hugo-multilingual-part-1-managing-content-translation/)
- [Hugo 多语言第二部分：字符串本地化](https://www.regisphilibert.com/blog/2018/08/hugo-multilingual-part-2-i18n-string-localization/)