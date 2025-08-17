---
title: アイコン
next: /docs/guide/shortcodes/steps
---

このショートコードをインラインで使用するには、設定でインラインショートコードを有効にする必要があります:

```yaml {filename="hugo.yaml"}
enableInlineShortcodes: true
```

利用可能なアイコンの一覧は [`data/icons.yaml`](https://github.com/imfing/hextra/blob/main/data/icons.yaml) で確認できます。

<!--more-->

## 例

{{< icon "academic-cap" >}}
{{< icon "cake" >}}
{{< icon "gift" >}}
{{< icon "sparkles" >}}

## 使用方法

```
{{</* icon "github" */>}}
```

[Heroicons](https://v1.heroicons.com/) v1 のアウトラインアイコンがデフォルトで利用可能です。

### 独自のアイコンを追加する方法

`data/icons.yaml` ファイルを作成し、以下の形式で独自の SVG アイコンを追加します:

```yaml {filename="data/icons.yaml"}
your-icon: <svg>your icon svg content</svg>
```

追加したアイコンは以下のようにショートコードで使用できます:

```
{{</* icon "your-icon" */>}}

{{</* card icon="your-icon" */>}}
```

ヒント: [Iconify Design](https://iconify.design/) はサイト用の SVG アイコンを見つけるのに最適な場所です。

## オプション

| パラメータ        | 説明       |
|--------------|----------|
| `name`       | アイコン名    |
| `attributes` | アイコンの属性。 |
