---
title: 部署站点
prev: /docs/guide/shortcodes
next: /docs/advanced
---

Hugo 生成静态网站，支持灵活的托管方案。
本页提供在各类平台上部署 Hextra 站点的指南。

<!--more-->


## GitHub Pages

[GitHub Pages](https://docs.github.com/pages) 是推荐的免费部署托管方案。

若使用 [hextra-starter-template](https://github.com/imfing/hextra-starter-template) 初始化项目，已内置 GitHub Actions 工作流，可自动部署至 GitHub Pages。

{{% details title="GitHub Actions 配置" closed="true" %}}

以下是 [hextra-starter-template](https://github.com/imfing/hextra-starter-template) 的示例配置：

```yaml {filename=".github/workflows/pages.yaml"}
# 构建并部署 Hugo 站点到 GitHub Pages 的示例工作流
name: 部署 Hugo 站点到 Pages

on:
  # 针对默认分支的推送触发
  push:
    branches: ["main"]

  # 允许从 Actions 标签手动运行
  workflow_dispatch:

# 设置 GITHUB_TOKEN 权限以允许部署到 GitHub Pages
permissions:
  contents: read
  pages: write
  id-token: write

# 仅允许一个并发部署，跳过正在运行与最新排队之间的运行
# 但不会取消进行中的运行，以确保生产部署完成
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
      HUGO_VERSION: 0.147.7
    steps:
      - name: 检出代码
        uses: actions/checkout@v4
        with:
          fetch-depth: 0  # 获取完整历史记录以支持 .GitInfo 和 .Lastmod
          submodules: recursive
      - name: 设置 Go 环境
        uses: actions/setup-go@v5
        with:
          go-version: '1.22'
      - name: 配置 Pages
        id: pages
        uses: actions/configure-pages@v4
      - name: 安装 Hugo
        run: |
          wget -O ${{ runner.temp }}/hugo.deb https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/hugo_extended_${HUGO_VERSION}_linux-amd64.deb \
          && sudo dpkg -i ${{ runner.temp }}/hugo.deb
      - name: 使用 Hugo 构建
        env:
          # 为 Hugo 模块提供最大兼容性
          HUGO_ENVIRONMENT: production
          HUGO_ENV: production
        run: |
          hugo \
            --gc --minify \
            --baseURL "${{ steps.pages.outputs.base_url }}/"
      - name: 上传产物
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


{{< callout type="warning" >}}
  在仓库设置中，将 **Pages** > **构建与部署** > **源** 设为 **GitHub Actions**：
  ![](https://user-images.githubusercontent.com/5097752/266784808-99676430-884e-42ab-b901-f6534a0d6eee.png)
{{< /callout >}}

默认配置中，GitHub Actions 工作流 `.github/workflows/pages.yaml` 假设站点部署在 `https://<用户名>.github.io/<仓库名>/`。

若需部署到 `https://<用户名>.github.io/`，请修改 `--baseURL`：

```yaml {filename=".github/workflows/pages.yaml",linenos=table,linenostart=54,hl_lines=[4]}
run: |
  hugo \
    --gc --minify \
    --baseURL "https://${{ github.repository_owner }}.github.io/"
```

若使用自定义域名，请相应调整 `--baseURL` 值。


## Cloudflare Pages

1. 将站点源码存入 Git 仓库（如 GitHub）
2. 登录 [Cloudflare 控制台](https://dash.cloudflare.com/) 并选择账户
3. 在账户首页选择 **Workers & Pages** > **创建应用** > **Pages** > **连接 Git**
4. 选择仓库后，在 **设置构建与部署** 部分填写：

| 配置项           | 值                   |
| ---------------- | -------------------- |
| 生产分支         | `main`               |
| 构建命令         | `hugo --gc --minify` |
| 构建输出目录     | `public`             |

更多细节请参阅：
- [部署 Hugo 站点](https://developers.cloudflare.com/pages/framework-guides/deploy-a-hugo-site/#deploy-with-cloudflare-pages)
- [语言支持与工具](https://developers.cloudflare.com/pages/platform/language-support-and-tools/)


## Netlify

1. 将代码推送到 Git 仓库（GitHub/GitLab 等）
2. 在 Netlify 中[导入项目](https://app.netlify.com/start)
3. 若未使用 [hextra-starter-template][hextra-starter-template]，需手动配置：
   - 构建命令设为 `hugo --gc --minify`
   - 发布目录设为 `public`
   - 添加环境变量 `HUGO_VERSION` 并设为 `0.147.7`，或在 `netlify.toml` 中配置
4. 开始部署！

详见 [Netlify 上的 Hugo](https://docs.netlify.com/integrations/frameworks/hugo/)


## Vercel

1. 将代码推送到 Git 仓库（GitHub/GitLab 等）
2. 进入 [Vercel 控制台](https://vercel.com/dashboard) 导入 Hugo 项目
3. 配置项目时选择 Hugo 作为框架预设
4. 覆盖构建命令与安装命令：
   1. 构建命令设为 `hugo --gc --minify`
   2. 安装命令设为 `yum install golang`

![Vercel 部署配置](https://github.com/imfing/hextra/assets/5097752/887d949b-8d05-413f-a2b4-7ab92192d0b3)