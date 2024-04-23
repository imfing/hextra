---
title: Deploy Site
prev: /docs/guide/shortcodes
next: /docs/advanced
---

Hugo generates static websites, allowing for flexible hosting options.
This page provides guides for deploying your Hextra site on various platforms.

<!--more-->


## GitHub Pages

[GitHub Pages](https://docs.github.com/pages) is the recommended way to deploy and host your website for free.

If you bootstrap the site using [hextra-starter-template](https://github.com/imfing/hextra-starter-template), it has provided GitHub Actions workflow out-of-the-box that helps automatically deploy to GitHub Pages.

{{% details title="GitHub Actions Configuration" closed="true" %}}

Below is an example configuration from [hextra-starter-template](https://github.com/imfing/hextra-starter-template):

```yaml {filename=".github/workflows/pages.yaml"}
# Sample workflow for building and deploying a Hugo site to GitHub Pages
name: Deploy Hugo site to Pages

on:
  # Runs on pushes targeting the default branch
  push:
    branches: ["main"]

  # Allows you to run this workflow manually from the Actions tab
  workflow_dispatch:

# Sets permissions of the GITHUB_TOKEN to allow deployment to GitHub Pages
permissions:
  contents: read
  pages: write
  id-token: write

# Allow only one concurrent deployment, skipping runs queued between the run in-progress and latest queued.
# However, do NOT cancel in-progress runs as we want to allow these production deployments to complete.
concurrency:
  group: "pages"
  cancel-in-progress: false

# Default to bash
defaults:
  run:
    shell: bash

jobs:
  # Build job
  build:
    runs-on: ubuntu-latest
    env:
      HUGO_VERSION: 0.121.2
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          fetch-depth: 0  # fetch all history for .GitInfo and .Lastmod
          submodules: recursive
      - name: Setup Go
        uses: actions/setup-go@v5
        with:
          go-version: '1.21'
      - name: Setup Pages
        id: pages
        uses: actions/configure-pages@v4
      - name: Setup Hugo
        run: |
          wget -O ${{ runner.temp }}/hugo.deb https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/hugo_extended_${HUGO_VERSION}_linux-amd64.deb \
          && sudo dpkg -i ${{ runner.temp }}/hugo.deb
      - name: Build with Hugo
        env:
          # For maximum backward compatibility with Hugo modules
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

  # Deployment job
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


{{< callout >}}
  In your repository settings, set the **Pages** > **Build and deployment** > **Source** to **GitHub Actions**:
  ![](https://user-images.githubusercontent.com/5097752/266784808-99676430-884e-42ab-b901-f6534a0d6eee.png)
{{< /callout >}}

By default, the above GitHub Actions workflow `.github/workflows/pages.yaml` assumes that the site is deploying to `https://<USERNAME>.github.io/<REPO>/`.

If you are deploying to `https://<USERNAME>.github.io/` then modify the `--baseURL`:

```yaml {filename=".github/workflows/pages.yaml",linenos=table,linenostart=54,hl_lines=[4]}
run: |
  hugo \
    --gc --minify \
    --baseURL "https://${{ github.repository_owner }}.github.io/"
```

If you are deploying to your own domain, please change the `--baseURL` value accordingly.


## Cloudflare Pages

1. Put your site source code in a Git repository (e.g. GitHub)
2. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account
3. In Account Home, select **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**
4. Select the repository, and in the **Set up builds and deployments** section, provide the following information:

| Configuration     | Value                |
| ----------------- | -------------------- |
| Production branch | `main`               |
| Build command     | `hugo --gc --minify` |
| Build directory   | `public`             |

For more details, check out:
- [Deploy a Hugo site](https://developers.cloudflare.com/pages/framework-guides/deploy-a-hugo-site/#deploy-with-cloudflare-pages).
- [Language support and tools](https://developers.cloudflare.com/pages/platform/language-support-and-tools/).


## Netlify

1. Push your code to your Git repository (GitHub, GitLab, etc.)
2. [Import the project](https://app.netlify.com/start) to Netlify
3. If you are not using [hextra-starter-template][hextra-starter-template], configure the following manually:
   - Configure the Build command to `hugo --gc --minify`
   - Specify the Publish directory to `public`
   - Add Environment variable `HUGO_VERSION` and set to `0.119.0`
4. Deploy!

Check [Hugo on Netlify](https://docs.netlify.com/integrations/frameworks/hugo/) for more details.


## Vercel

1. Push your code to your Git repository (GitHub, GitLab, etc.)
2. Go to [Vercel Dashboard](https://vercel.com/dashboard) and import your Hugo project
3. Configure the project, select Hugo as Framework Preset
4. Override the Build Command and Install command:
   1. Set Build Command to `hugo --gc --minify`
   2. Set Install Command to `yum install golang`

![Vercel Deployment Configuration](https://github.com/imfing/hextra/assets/5097752/887d949b-8d05-413f-a2b4-7ab92192d0b3)
