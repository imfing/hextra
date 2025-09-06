---
title: Markdown 構文ガイド
date: 2020-01-01
authors:
  - name: imfing
    link: https://github.com/imfing
    image: https://github.com/imfing.png
  - name: Octocat
    link: https://github.com/octocat
    image: https://github.com/octocat.png
tags:
  - Markdown
  - サンプル
  - ガイド
excludeSearch: true
---

この記事では、Hugo のコンテンツファイルで使用できる基本的な Markdown 構文のサンプルを紹介します。
<!--more-->

## 基本構文

### 見出し

```
# 見出し1
## 見出し2
### 見出し3
#### 見出し4
##### 見出し5
###### 見出し6
```

## 見出し2
### 見出し3
#### 見出し4
##### 見出し5
###### 見出し6

### 強調

```text
*このテキストは斜体になります*
_これも斜体になります_

**このテキストは太字になります**
__これも太字になります__

_これらを**組み合わせる**こともできます_
```

*このテキストは斜体になります*

_これも斜体になります_

**このテキストは太字になります**

__これも太字になります__

_これらを**組み合わせる**こともできます_

### リスト

#### 順序なしリスト

```
* 項目1
* 項目2
  * 項目2a
  * 項目2b
```

* 項目1
* 項目2
  * 項目2a
  * 項目2b

#### 順序付きリスト

```
1. 項目1
2. 項目2
3. 項目3
   1. 項目3a
   2. 項目3b
```

### 画像

```markdown
![GitHub ロゴ](https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png)
```

![GitHub ロゴ](https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png)

### リンク

```markdown
[Hugo](https://gohugo.io)
```

[Hugo](https://gohugo.io)

### ブロッククォート

```markdown
ニュートンはこう言いました:

> 私が遠くを見渡せたとしたら、それは巨人の肩の上に立っていたからです。
```

> 私が遠くを見渡せたとしたら、それは巨人の肩の上に立っていたからです。

### インラインコード

```markdown
インライン `コード` は `バッククォートで囲みます`。
```

インライン `コード` は `バッククォートで囲みます`。

### コードブロック

#### シンタックスハイライト

````markdown
```go
func main() {
    fmt.Println("Hello World")
}
```
````

```go
func main() {
    fmt.Println("Hello World")
}
```

### テーブル

```markdown
| 構文      | 説明         |
| --------- | ----------- |
| 見出し    | タイトル     |
| 段落      | テキスト     |
```

| 構文      | 説明         |
| --------- | ----------- |
| 見出し    | タイトル     |
| 段落      | テキスト     |

## 参考資料

- [Markdown 構文](https://www.markdownguide.org/basic-syntax/)
- [Hugo Markdown](https://gohugo.io/content-management/formats/#markdown)