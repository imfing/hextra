---
title: その他のショートコード
linkTitle: その他
sidebar:
  exclude: true
next: /docs/guide/deploy-site
---

{{< callout emoji="ℹ️" >}}
  これらの一部は Hugo 組み込みのショートコードです。
  これらのショートコードは安定性が低く、いつでも変更される可能性があります。
{{< /callout >}}

## バッジ

```
{{</* badge "Badge" */>}}
```

結果:

{{< badge "Badge" >}}

バリエーション:

```
{{</* badge content="info" type="info" */>}}
{{</* badge content="warning" type="warning" */>}}
{{</* badge content="error" type="error" */>}}
```

結果:

{{< badge content="info" type="info" >}} &nbsp;
{{< badge content="warning" type="warning" >}} &nbsp;
{{< badge content="error" type="error" >}}

リンクとアイコン付き:

```
{{</* badge content="Releases" link="https://github.com/imfing/hextra/releases" icon="github" */>}}
```

結果:

{{< badge content="Releases" link="https://github.com/imfing/hextra/releases" icon="github" >}}

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