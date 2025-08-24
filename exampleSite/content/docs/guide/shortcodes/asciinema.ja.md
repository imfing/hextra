---
title: "Asciinema プレイヤー"
---

asciinema shortcode を使用すると、[asciinema](https://asciinema.org/) で作成されたターミナル録画を Hugo サイトに埋め込むことができます。再生制御、速度調整、テーマカスタマイズなどの機能を備えたリッチなターミナルプレイヤーを提供します。

## 基本的な使用方法

ローカル `.cast` ファイルまたはリモート URL を使用できます。ローカルファイルの場合は、`static/casts/` ディレクトリに配置してください：

```markdown
{{</* asciinema file="demo.cast" */>}}
```

### リモートファイル

任意の URL からのリモート cast ファイルも使用できます：

```markdown
{{</* asciinema file="https://asciinema.org/a/85R4jTtjKVRIYXTcKCNq0vzYH" */>}}
{{</* asciinema file="https://example.com/demo.cast" */>}}
```

{{< asciinema file="https://asciinema.org/a/85R4jTtjKVRIYXTcKCNq0vzYH" >}}

{{< asciinema file="demo.cast" >}}

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
  file="demo.cast"
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
