---
title: サイトのデプロイ
prev: /docs/guide/shortcodes
next: /docs/advanced
---

Hugo は静的サイトを生成するため、柔軟なホスティングオプションが利用可能です。
このページでは、Hextra サイトを様々なプラットフォームにデプロイする方法を解説します。

<!--more-->


## GitHub Pages

[GitHub Pages](https://docs.github.com/pages) は無料でサイトをデプロイ・ホストするための推奨方法です。

[hextra-starter-template](https://github.com/imfing/hextra-starter-template) を使用してサイトを構築した場合、GitHub Pages への自動デプロイを支援する GitHub Actions ワークフローが最初から用意されています。

{{% details title="GitHub Actions 設定" closed="true" %}}

以下は [hextra-starter-template](https://github.com/imfing/hextra-starter-template) の設定例です:

```yaml {filename=".github/workflows/pages.yaml"}
# Hugo サイトをビルドし GitHub Pages にデプロイするサンプルワークフロー
name: Deploy Hugo site to Pages

on:
  # デフォルトブランチへのプッシュ時に実行
  push:
    branches: ["main"]

  # Actions タブから手動で実行可能
  workflow_dispatch:

# GITHUB_TOKEN の権限を設定（GitHub Pages へのデプロイを許可）
permissions:
  contents: read
  pages: write
  id-token: write

# 同時実行を1つに制限（進行中の実行はキャンセルしない）
concurrency:
  group: "pages"
  cancel-in-progress: false

# デフォルトシェルを bash に設定
defaults:
  run:
    shell: bash

jobs:
  # ビルドジョブ
  build:
    runs-on: ubuntu-latest
    env:
      HUGO_VERSION: 0.147.7
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          fetch-depth: 0  # .GitInfo と .Lastmod 用に全履歴を取得
          submodules: recursive
      - name: Setup Go
        uses: actions/setup-go@v5
        with:
          go-version: '1.22'
      - name: Setup Pages
        id: pages
        uses: actions/configure-pages@v4
      - name: Setup Hugo
        run: |
          wget -O ${{ runner.temp }}/hugo.deb https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/hugo_extended_${HUGO_VERSION}_linux-amd64.deb \
          && sudo dpkg -i ${{ runner.temp }}/hugo.deb
      - name: Build with Hugo
        env:
          # Hugo モジュールとの最大互換性のため
          HUGO_ENVIRONMENT: production
          HUGO_ENV: production
        run: |
          hugo \
            --gc --minify \
            --baseURL "${{ steps.pages.outputs.base_url }}/"
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./public

  # デプロイジョブ
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

{{% /details %}}


{{< callout type="warning" >}}
  リポジトリ設定で、**Pages** > **Build and deployment** > **Source** を **GitHub Actions** に設定してください:
  ![](https://user-images.githubusercontent.com/5097752/266784808-99676430-884e-42ab-b901-f6534a0d6eee.png)
{{< /callout >}}

デフォルトでは、上記の GitHub Actions ワークフロー `.github/workflows/pages.yaml` は `https://<USERNAME>.github.io/<REPO>/` へのデプロイを想定しています。

`https://<USERNAME>.github.io/` にデプロイする場合は `--baseURL` を修正してください:

```yaml {filename=".github/workflows/pages.yaml",linenos=table,linenostart=54,hl_lines=[4]}
run: |
  hugo \
    --gc --minify \
    --baseURL "https://${{ github.repository_owner }}.github.io/"
```

独自ドメインを使用する場合は、`--baseURL` の値を適宜変更してください。


## Cloudflare Pages

1. サイトのソースコードを Git リポジトリ（GitHub など）に配置
2. [Cloudflare ダッシュボード](https://dash.cloudflare.com/) にログインしアカウントを選択
3. Account Home で **Workers & Pages** > **Create application** > **Pages** > **Connect to Git** を選択
4. リポジトリを選択し、**Set up builds and deployments** セクションで以下を設定:

| 設定項目          | 値                   |
| ----------------- | -------------------- |
| Production branch | `main`               |
| Build command     | `hugo --gc --minify` |
| Build directory   | `public`             |

詳細は以下を参照:
- [Deploy a Hugo site](https://developers.cloudflare.com/pages/framework-guides/deploy-a-hugo-site/#deploy-with-cloudflare-pages)
- [Language support and tools](https://developers.cloudflare.com/pages/platform/language-support-and-tools/)


## Netlify

1. コードを Git リポジトリ（GitHub, GitLab など）にプッシュ
2. Netlify に [プロジェクトをインポート](https://app.netlify.com/start)
3. [hextra-starter-template][hextra-starter-template] を使用していない場合、以下を手動設定:
   - Build command を `hugo --gc --minify` に設定
   - Publish directory を `public` に指定
   - 環境変数 `HUGO_VERSION` を追加し `0.147.7` を設定、または `netlify.toml` ファイルで設定
4. デプロイ！

詳細は [Hugo on Netlify](https://docs.netlify.com/integrations/frameworks/hugo/) を参照


## Vercel

1. コードを Git リポジトリ（GitHub, GitLab など）にプッシュ
2. [Vercel ダッシュボード](https://vercel.com/dashboard) に移動し Hugo プロジェクトをインポート
3. プロジェクトを設定、Framework Preset で Hugo を選択
4. Build Command と Install command を上書き:
   1. Build Command を `hugo --gc --minify` に設定
   2. Install Command を `yum install golang` に設定

![Vercel デプロイ設定](https://github.com/imfing/hextra/assets/5097752/887d949b-8d05-413f-a2b4-7ab92192d0b3)