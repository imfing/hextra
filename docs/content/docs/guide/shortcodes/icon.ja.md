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

### リモートアイコンパック

リモートアイコンは、プロバイダープレフィックスを使って必要なものだけ読み込めます。Hextra は以下のプロバイダーをサポートしています:

| プロバイダー                             | 例                                | アイコン                    |
| ---------------------------------------- | --------------------------------- | --------------------------- |
| [Lucide](https://lucide.dev/icons/)      | `{{</* icon "lucide:house" */>}}` | {{< icon "lucide:house" >}} |
| [Tabler Icons](https://tabler.io/icons)  | `{{</* icon "tabler:user" */>}}`  | {{< icon "tabler:user" >}}  |
| [Simple Icons](https://simpleicons.org/) | `{{</* icon "simple:hugo" */>}}`  | {{< icon "simple:hugo" >}}  |

リモートアイコンはビルド時に取得されます。デフォルトのプロバイダーはメジャーバージョンに固定され、以下の CDN URL から読み込まれます:

```yaml
lucide: "https://unpkg.com/lucide-static@1/icons/%s.svg"
tabler: "https://unpkg.com/@tabler/icons@3/icons/outline/%s.svg"
simple: "https://cdn.jsdelivr.net/npm/simple-icons@16/icons/%s.svg"
```

リモートアイコン名は、カード、タブ、バッジ、コールアウト、ナビゲーションバーメニュー項目など、Hextra がアイコン名を受け付ける場所ならどこでも使用できます。

## オプション

| パラメータ   | 説明             |
| ------------ | ---------------- |
| `name`       | アイコン名       |
| `attributes` | アイコンの属性。 |
