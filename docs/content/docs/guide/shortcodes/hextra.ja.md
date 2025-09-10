---
title: Hextra Shortcodes
linkTitle: Hextra
sidebar:
  exclude: true
next: /docs/guide/deploy-site
---

これらのショートコードの主な使用場所は、レイアウト `hextra-home` 内です。

## `hextra/feature-card`

機能カードを表示するためのショートコード。

### Usage

```
{{</* hextra/feature-card title="Title" subtitle="Subtitle" */>}}
```

### Options

| Parameter    | Description |
|--------------|-------------|
| `title`      | カードのタイトル。   |
| `subtitle`   | カードのサブタイトル。 |
| `class`      | カードのクラス。    |
| `image`      | カードの画像。     |
| `imageClass` | 画像のクラス。     |
| `style`      | カードのスタイル。   |
| `icon`       | カードのアイコン。   |
| `link`       | カードのリンク。    |

## `hextra/feature-grid`

機能グリッドを表示するためのショートコード。

### Usage

```
{{</* hextra/feature-grid cols="3" */>}}
  {{</* hextra/feature-card title="One" */>}}
  {{</* hextra/feature-card title="Two" */>}}
  {{</* hextra/feature-card title="Three" */>}}
{{</* /hextra/feature-grid */>}}
```

### Options

| Parameter | Description |
|-----------|-------------|
| `cols`    | 列の数。        |
| `style`   | グリッドのスタイル。  |

## `hextra/hero-badge`

リンク付きのバッジをレンダリングするためのショートコード。

### Usage

```
{{</* hextra/hero-badge */>}}
  <div class="hx:w-2 hx:h-2 hx:rounded-full hx:bg-primary-400"></div>
  <span>Free, open source</span>
  {{</* icon name="arrow-circle-right" attributes="height=14" */>}}
{{</* /hextra/hero-badge */>}}
```

### Options

| Parameter | Description |
|-----------|-------------|
| `link`    | バッジのリンク。    |
| `class`   | バッジのクラス。    |
| `style`   | バッジのスタイル。   |

## `hextra/hero-button`

リンク付きのボタンをレンダリングするためのショートコード。

### Usage

```
{{</* hextra/hero-button text="Get Started" link="/docs" */>}}
```

### Options

| Parameter | Description |
|-----------|-------------|
| `link`    | ボタンのリンク。    |
| `text`    | ボタンのテキスト。   |
| `style`   | ボタンのスタイル。   |

## `hextra/hero-container`

左側に画像があるシンプルなヒーロー コンテナー。

### Usage

```
{{</* hextra/hero-container image="images/logo.svg"  imageTitle="title" */>}}
    Content
{{</* /hextra/hero-container */>}}
```

### Options

| Parameter     | Description                       |
|---------------|-----------------------------------|
| `class`       | コンテナのクラス。                         |
| `cols`        | 列数（デフォルト：`2`）。                    |
| `image`       | コンテナの画像。                          |
| `imageCard`   | 画像をカードとして表示するかどうか（デフォルト：`false`）。 |
| `imageClass`  | 画像のクラス。                           |
| `imageLink`   | 画像のリンク。                           |
| `imageStyle`  | 画像のスタイル。                          |
| `imageTitle`  | 画像のタイトル。                          |
| `imageWidth`  | 画像の幅（デフォルト：`350`）。                |
| `imageHeight` | 画像の高さ（デフォルト：`350`）。               |
| `style`       | コンテナのスタイル。                        |

## `hextra/hero-headline`

ヒーローの見出しを表示するためのショートコード。

### Usage

```
{{</* hextra/hero-headline */>}}
  Build modern websites&nbsp;<br class="hx:sm:block hx:hidden" />with Markdown and Hugo
{{</* /hextra/hero-headline */>}}
```

### Options

| Parameter | Description |
|-----------|-------------|
| `style`   | 見出しのスタイル。   |

## `hextra/hero-section`

見出しとオプションのスタイルを備えたシンプルなヒーロー セクション。

### Usage

```
{{</* hextra/hero-section heading="h3" */>}}Title{{</* /hextra/hero-section */>}}>
```

### Options

| Parameter | Description          |
|-----------|----------------------|
| `heading` | 見出しレベル（デフォルト: `h2`）。 |
| `style`   | 見出しのスタイル。            |
| `content` | 見出しの内容。              |

## `hextra/hero-subtitle`

ヒーローのサブタイトルを表示するためのショートコード。

### Usage

```
{{</* hextra/hero-subtitle */>}}
  Fast, batteries-included Hugo theme&nbsp;<br class="hx:sm:block hx:hidden" />for creating beautiful static websites
{{</* /hextra/hero-subtitle */>}}
```

### Options

| Parameter | Description |
|-----------|-------------|
| `style`   | 字幕のスタイル。    |
