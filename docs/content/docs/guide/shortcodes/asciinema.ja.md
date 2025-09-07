---
title: "Asciinema Player コンポーネント"
linktitle: "Asciinema Player"
sidebar:
  exclude: true
---

asciinema shortcode を使用すると、[asciinema](https://asciinema.org/) で作成されたターミナル録画を Hugo サイトに埋め込むことができます。再生制御、速度調整、テーマカスタマイズなどの機能を備えたリッチなターミナルプレイヤーを提供します。

## 基本的な使用方法

asciinema shortcode はローカルの `.cast` ファイルとリモート URL の両方をサポートしています。ローカルファイルを使用する方法は以下の通りです：

### ローカルファイル

**方法 1：Assets ディレクトリ（推奨）**
cast ファイルを Hugo サイトの `assets/` ディレクトリに配置：

```
your-site/
├── assets/
│   └── demo.cast
└── content/
    └── my-page.md
```

markdown ファイル内：
```markdown
{{</* asciinema file="demo.cast" */>}}
```

**方法 2：Static ディレクトリ**
cast ファイルを `static/` ディレクトリに配置：

```
your-site/
├── static/
│   └── demo.cast
└── content/
    └── my-page.md
```

markdown ファイル内：
```markdown
{{</* asciinema file="demo.cast" */>}}
```

**方法 3：ページバンドル**
ページバンドルの場合、cast ファイルを markdown ファイルと一緒に配置：

```
your-site/
└── content/
    └── my-page/
        ├── index.md
        └── demo.cast
```

markdown ファイル内：
```markdown
{{</* asciinema file="demo.cast" */>}}
```

{{< asciinema file="casts/demo.cast" >}}

### リモートファイル

任意のリモート URL からの cast ファイルも使用できます：

```markdown
{{</* asciinema file="https://asciinema.org/a/85R4jTtjKVRIYXTcKCNq0vzYH.cast" */>}}
{{</* asciinema file="https://example.com/demo.cast" */>}}
```

{{< asciinema file="https://asciinema.org/a/85R4jTtjKVRIYXTcKCNq0vzYH.cast" >}}

### ファイル検索の仕組み

shortcode は以下の順序で cast ファイルを自動的に検索します：
1. **ページバンドルリソース**（ページバンドルを使用している場合）
2. **グローバル assets ディレクトリ**（`assets/`）
3. **Static ディレクトリ**（`static/`）
4. **リモート URL**（パスが `http://` または `https://` で始まる場合）

ファイルが見つからない場合、Hugo はファイルをどこに配置すべきかを示す有用なエラーメッセージを表示します。

## 高度なデモ

利用可能なすべてのパラメータを紹介する高度な例：

```markdown
{{</* asciinema 
  file="demo.cast"
  theme="dracula"
  speed="2"
  autoplay="true"
  loop="true"
  markers="1.5:Installation,3.2:Configuration,5.8:Testing"
*/>}}
```

{{< asciinema 
  file="casts/demo.cast"
  theme="dracula"
  speed="2"
  autoplay="true"
  loop="true"
  markers="1.5:Installation,3.2:Configuration,5.8:Testing"
>}}

## パラメータ

| パラメータ | 型 | デフォルト | 説明 |
|-----------|----|-----------|------|
| `file` | string | - | .cast ファイルパス（必須）。ローカルファイル、絶対パス、リモート URL をサポート |
| `theme` | string | `"asciinema"` | プレイヤーテーマ |
| `speed` | number | `1` | 再生速度倍率 |
| `autoplay` | boolean | `false` | 自動再生 |
| `loop` | boolean | `false` | ループ再生 |
| `poster` | string | `""` | 再生開始前に表示されるポスター（プレビューフレーム）。NPT表記法をサポート（例："npt:1:23"） |
| `markers` | string | `""` | カンマ区切りの時間マーカー。形式："時間:ラベル" または "時間"のみ（例："1.5:Installation,3.2:Configuration,5.8"） |
