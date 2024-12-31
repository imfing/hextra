---
title: はじめに
weight: 1
next: /docs/guide
prev: /docs
---

## テンプレートからクイックスタート

{{< icon "github" >}}&nbsp;[imfing/hextra-starter-template](https://github.com/imfing/hextra-starter-template)

上記のテンプレートリポジトリを使用して、すぐに始めることができます。

<img src="https://docs.github.com/assets/cb-77734/mw-1440/images/help/repository/use-this-template-button.webp" width="500">

[GitHub Actionsワークフロー](https://docs.github.com/ja/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site#publishing-with-a-custom-github-actions-workflow)を提供しており、サイトを自動的にビルドしてGitHub Pagesにデプロイし、無料でホストすることができます。
その他のオプションについては、[サイトのデプロイ](../guide/deploy-site)を確認してください。

[🌐 デモ ↗](https://imfing.github.io/hextra-starter-template/)

## 新しいプロジェクトとして始める

HugoプロジェクトにHextraテーマを追加する主な方法は2つあります：

1. **Hugoモジュール（推奨）**: 最も簡単で推奨される方法です。[Hugoモジュール](https://gohugo.io/hugo-modules/)を使用すると、テーマを直接オンラインソースから取り込むことができます。テーマは自動的にダウンロードされ、Hugoによって管理されます。

2. **Gitサブモジュール**: または、Hextraを[Gitサブモジュール](https://git-scm.com/book/ja/v2/Git-%E3%83%84%E3%83%BC%E3%83%AB-%E3%82%B5%E3%83%96%E3%83%A2%E3%82%B8%E3%83%A5%E3%83%BC%E3%83%AB)として追加します。テーマはGitによってダウンロードされ、プロジェクトの`themes`フォルダに保存されます。

### HugoモジュールとしてHextraをセットアップ

#### 前提条件

開始する前に、以下のソフトウェアがインストールされている必要があります：

- [Hugo（拡張版）](https://gohugo.io/installation/)
- [Git](https://git-scm.com/)
- [Go](https://go.dev/)

#### 手順

{{% steps %}}

### 新しいHugoサイトを初期化

```shell
hugo new site my-site --format=yaml
```

### モジュール経由でHextraテーマを設定

```shell
# Hugoモジュールを初期化
cd my-site
hugo mod init github.com/username/my-site

# Hextraテーマを追加
hugo mod get github.com/imfing/hextra
```

`hugo.yaml`を設定してHextraテーマを使用するために、以下を追加します：

```yaml
module:
  imports:
    - path: github.com/imfing/hextra
```

### 最初のコンテンツページを作成

ホームページとドキュメントページの新しいコンテンツページを作成します：

```shell
hugo new content/_index.md
hugo new content/docs/_index.md
```

### ローカルでサイトをプレビュー

```shell
hugo server --buildDrafts --disableFastRender
```

これで、新しいサイトのプレビューが`http://localhost:1313/`で利用可能です。

{{% /steps %}}


{{% details title="テーマを更新するには？" %}}

プロジェクト内のすべてのHugoモジュールを最新バージョンに更新するには、次のコマンドを実行します：

```shell
hugo mod get -u
```

Hextraを[最新リリースバージョン](https://github.com/imfing/hextra/releases)に更新するには、次のコマンドを実行します：

```shell
hugo mod get -u github.com/imfing/hextra
```

詳細については、[Hugoモジュール](https://gohugo.io/hugo-modules/use-modules/#update-all-modules)を参照してください。

{{% /details %}}

### GitサブモジュールとしてHextraをセットアップ

#### 前提条件

開始する前に、以下のソフトウェアがインストールされている必要があります：

- [Hugo（拡張版）](https://gohugo.io/installation/)
- [Git](https://git-scm.com/)

#### 手順

{{% steps %}}

### 新しいHugoサイトを初期化

```shell
hugo new site my-site --format=yaml
```

### HextraテーマをGitサブモジュールとして追加

```shell
git submodule add https://github.com/imfing/hextra.git themes/hextra
```

`hugo.yaml`を設定してHextraテーマを使用するために、以下を追加します：

```yaml
theme: hextra
```

### 最初のコンテンツページを作成

ホームページとドキュメントページの新しいコンテンツページを作成します：

```shell
hugo new content/_index.md
hugo new content/docs/_index.md
```

### ローカルでサイトをプレビュー

```shell
hugo server --buildDrafts --disableFastRender
```

新しいサイトのプレビューが`http://localhost:1313/`で利用可能です。

{{% /steps %}}


[CI/CD](https://ja.wikipedia.org/wiki/CI/CD)を使用してHugoウェブサイトをデプロイする場合、`hugo`コマンドを実行する前に以下のコマンドを実行することが重要です。

```shell
git submodule update --init
```

このコマンドを実行しないと、テーマフォルダにHextraテーマファイルが取り込まれず、ビルドが失敗します。


{{% details title="テーマを更新するには？" %}}

リポジトリ内のすべてのサブモジュールを最新のコミットに更新するには、次のコマンドを実行します：

```shell
git submodule update --remote
```

Hextraを最新のコミットに更新するには、次のコマンドを実行します：

```shell
git submodule update --remote themes/hextra
```

詳細については、[Gitサブモジュール](https://git-scm.com/book/ja/v2/Git-%E3%83%84%E3%83%BC%E3%83%AB-%E3%82%B5%E3%83%96%E3%83%A2%E3%82%B8%E3%83%A5%E3%83%BC%E3%83%AB)を参照してください。

{{% /details %}}

## 次へ

以下のセクションを探索して、さらにコンテンツを追加し始めましょう：

{{< cards >}}
  {{< card link="../guide/organize-files" title="ファイルの整理" icon="document-duplicate" >}}
  {{< card link="../guide/configuration" title="設定" icon="adjustments" >}}
  {{< card link="../guide/markdown" title="Markdown" icon="markdown" >}}
{{< /cards >}}