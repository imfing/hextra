---
title: 部署站点
prev: /docs/guide/shortcodes
next: /docs/advanced
---

Hugo 生成静态网站，允许灵活的托管选项。
本页提供了在各种平台上部署 Hextra 站点的指南。

<!--more-->


## GitHub Pages

[GitHub Pages](https://docs.github.com/pages) 是推荐的方式，可以免费部署和托管您的网站。

如果您使用 [hextra-starter-template](https://github.com/imfing/hextra-starter-template) 引导站点，它已经提供了开箱即用的 GitHub Actions 工作流，帮助自动部署到 GitHub Pages。

{{% details title="GitHub Actions 配置" closed="true" %}}

以下是 [hextra-starter-template](https://github.com/imfing/hextra-starter-template) 的示例配置：

```yaml {filename=".github/workflows/pages.yaml"}
# 用于构建和部署 Hugo 站点到 GitHub Pages 的示例工作流
name: 部署 Hugo 站点到 Pages

on:
  # 在推送到默认分支时运行
  push:
    branches: ["main"]

  # 允许您从 Actions 选项卡手动运行此工作流
  workflow_dispatch:

# 设置 GITHUB_TOKEN 的权限以允许部署到 GitHub Pages
permissions:
  contents: read
  pages: write
  id-token: write

# 只允许一个并发部署，跳过在运行中和最新排队之间的运行。
# 但是，不要取消正在运行的运行，因为我们希望这些生产部署能够完成。
concurrency:
  group: "pages"
  cancel-in-progress: false

# 默认使用 bash
defaults:
  run:
    shell: bash

jobs:
  # 构建任务
  build:
    runs-on: ubuntu-latest
    env:
      HUGO_VERSION: 0.145.0
    steps:
      - name: 检出
        uses: actions/checkout@v4
        with:
          fetch-depth: 0  # 获取所有历史记录以支持 .GitInfo 和 .Lastmod
          submodules: recursive
      - name: 设置 Go
        uses: actions/setup-go@v5
        with:
          go-version: '1.22'
      - name: 设置 Pages
        id: pages
        uses: actions/configure-pages@v4
      - name: 设置 Hugo
        run: |
          wget -O ${{ runner.temp }}/hugo.deb https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/hugo_extended_${HUGO_VERSION}_linux-amd64.deb \
          && sudo dpkg -i ${{ runner.temp }}/hugo.deb
      - name: 使用 Hugo 构建
        env:
          # 为了最大程度地兼容 Hugo 模块
          HUGO_ENVIRONMENT: production
          HUGO_ENV: production
        run: |
          hugo \
            --gc --minify \
            --baseURL "${{ steps.pages.outputs.base_url }}/"
      - name: 上传工件
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./public

  # 部署任务
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: 部署到 GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

{{% /details %}}


{{< callout >}}
  在您的仓库设置中，将 **Pages** > **Build and deployment** > **Source** 设置为 **GitHub Actions**：
  ![](https://user-images.githubusercontent.com/5097752/266784808-99676430-884e-42ab-b901-f6534a0d6eee.png)
{{< /callout >}}

默认情况下，上述 GitHub Actions 工作流 `.github/workflows/pages.yaml` 假设站点部署到 `https://<USERNAME>.github.io/<REPO>/`。

如果您部署到 `https://<USERNAME>.github.io/`，请修改 `--baseURL`：

```yaml {filename=".github/workflows/pages.yaml",linenos=table,linenostart=54,hl_lines=[4]}
run: |
  hugo \
    --gc --minify \
    --baseURL "https://${{ github.repository_owner }}.github.io/"
```

如果您部署到自己的域名，请相应地更改 `--baseURL` 值。


## Cloudflare Pages

1. 将您的站点源代码放入 Git 仓库（例如 GitHub）
2. 登录 [Cloudflare 仪表板](https://dash.cloudflare.com/) 并选择您的账户
3. 在账户主页中，选择 **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**
4. 选择仓库，并在 **Set up builds and deployments** 部分提供以下信息：

| 配置项             | 值                   |
| ------------------ | -------------------- |
| 生产分支           | `main`               |
| 构建命令           | `hugo --gc --minify` |
| 构建目录           | `public`             |

更多详情，请查看：
- [部署 Hugo 站点](https://developers.cloudflare.com/pages/framework-guides/deploy-a-hugo-site/#deploy-with-cloudflare-pages)。
- [语言支持和工具](https://developers.cloudflare.com/pages/platform/language-support-and-tools/)。


## Netlify

1. 将代码推送到您的 Git 仓库（GitHub、GitLab 等）
2. [导入项目](https://app.netlify.com/start) 到 Netlify
3. 如果您没有使用 [hextra-starter-template][hextra-starter-template]，请手动配置以下内容：
   - 将构建命令配置为 `hugo --gc --minify`
   - 指定发布目录为 `public`
   - 添加环境变量 `HUGO_VERSION` 并设置为 `0.145.0`，或者将其设置在 `netlify.toml` 文件中
4. 部署！

查看 [Netlify 上的 Hugo](https://docs.netlify.com/integrations/frameworks/hugo/) 了解更多详情。


## Vercel

1. 将代码推送到您的 Git 仓库（GitHub、GitLab 等）
2. 前往 [Vercel 仪表板](https://vercel.com/dashboard) 并导入您的 Hugo 项目
3. 配置项目，选择 Hugo 作为框架预设
4. 覆盖构建命令和安装命令：
   1. 将构建命令设置为 `hugo --gc --minify`
   2. 将安装命令设置为 `yum install golang`

![Vercel 部署配置](https://github.com/imfing/hextra/assets/5097752/887d949b-8d05-413f-a2b4-7ab92192d0b3)