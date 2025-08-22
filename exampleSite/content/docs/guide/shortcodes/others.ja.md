---
title: その他のショートコード
linkTitle: その他
next: /docs/guide/deploy-site
---

{{< callout type="warning" >}}
  これらの一部は Hugo 組み込みのショートコードです。
  これらのショートコードは安定性が低く、いつでも変更される可能性があります。
{{< /callout >}}

### 例

{{< badge "default" >}}&nbsp;
{{< badge content="border" border=false >}}&nbsp;
{{< badge content="color" color="green" >}}&nbsp;
{{< badge content="link" link="https://github.com/imfing/hextra/releases" >}}&nbsp;
{{< badge content="icon" icon="sparkles" >}}&nbsp;

### 使用法

#### デフォルト

{{< badge "Badge" >}}&nbsp;

```
{{</* badge "Badge" */>}}
```

#### 色

{{< badge content="Badge" >}}&nbsp;
{{< badge content="Badge" color="purple" >}}&nbsp;
{{< badge content="Badge" color="indigo" >}}&nbsp;
{{< badge content="Badge" color="blue" >}} &nbsp;
{{< badge content="Badge" color="green" >}} &nbsp;
{{< badge content="Badge" color="yellow" >}} &nbsp;
{{< badge content="Badge" color="amber" >}} &nbsp;
{{< badge content="Badge" color="orange" >}} &nbsp;
{{< badge content="Badge" color="red" >}}&nbsp;

```
{{</* badge content="Badge" */>}}
{{</* badge content="Badge" color="purple" */>}}
{{</* badge content="Badge" color="indigo" */>}}
{{</* badge content="Badge" color="blue" */>}}
{{</* badge content="Badge" color="green" */>}}
{{</* badge content="Badge" color="yellow" */>}}
{{</* badge content="Badge" color="amber" */>}}
{{</* badge content="Badge" color="orange" */>}}
{{</* badge content="Badge" color="red" */>}}
```

{{< badge content="Badge" border=false >}} &nbsp;
{{< badge content="Badge" color="purple" border=false >}} &nbsp;
{{< badge content="Badge" color="indigo" border=false >}} &nbsp;
{{< badge content="Badge" color="blue" border=false >}} &nbsp;
{{< badge content="Badge" color="green" border=false >}} &nbsp;
{{< badge content="Badge" color="yellow" border=false >}} &nbsp;
{{< badge content="Badge" color="amber" border=false >}} &nbsp;
{{< badge content="Badge" color="orange" border=false >}}&nbsp;
{{< badge content="Badge" color="red" border=false >}}&nbsp;

```
{{</* badge content="Badge" border=false */>}}
{{</* badge content="Badge" color="purple" border=false */>}}
{{</* badge content="Badge" color="indigo" border=false */>}}
{{</* badge content="Badge" color="blue" border=false */>}}
{{</* badge content="Badge" color="green" border=false */>}}
{{</* badge content="Badge" color="yellow" border=false */>}}
{{</* badge content="Badge" color="amber" border=false */>}}
{{</* badge content="Badge" color="orange" border=false */>}}
{{</* badge content="Badge" color="red" border=false */>}}
```

#### 変種

{{< badge content="Badge" icon="sparkles" >}}&nbsp;
{{< badge content="Releases" link="https://github.com/imfing/hextra/releases" icon="github" >}}&nbsp;

```
{{</* badge content="Badge" icon="sparkles" */>}}
{{</* badge content="Releases" link="https://github.com/imfing/hextra/releases" icon="github" */>}}
```

### オプション

| パラメータ     | 説明                                                                                                                       |
|-----------|--------------------------------------------------------------------------------------------------------------------------|
| `content` | バッジのテキスト。                                                                                                                |
| `link`    | バッジのリンク。                                                                                                                 |
| `icon`    | バッジのアイコン。                                                                                                                |
| `color`   | The color of the badge. <br/> `gray` (default), `purple`, `indigo`, `blue`, `green`, `yellow`, `amber`, `orange`, `red`. |
| `class`   | バッジのクラス。                                                                                                                 |
| `border`  | 境界線を追加または削除します (デフォルト: true)。                                                                                            |

## YouTube

YouTube 動画を埋め込みます。

```
{{</* youtube VIDEO_ID */>}}
```

結果:

{{< youtube id=dQw4w9WgXcQ loading=lazy >}}

詳細については、[Hugo の YouTube ショートコード](https://gohugo.io/content-management/shortcodes/#youtube)を参照してください。

## PDF

PDF ショートコードを使用すると、コンテンツ内に PDF ファイルを埋め込むことができます。

```
{{</* pdf "https://example.com/sample.pdf" */>}}
```

プロジェクトディレクトリ内に PDF ファイルを配置し、相対パスを使用することもできます。

```
{{</* pdf "path/to/file.pdf" */>}}
```

例:

{{< pdf "https://upload.wikimedia.org/wikipedia/commons/1/13/Example.pdf" >}}