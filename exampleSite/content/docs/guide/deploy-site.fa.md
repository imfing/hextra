---
title: به‌کاراندازی سایت
prev: /docs/guide/shortcodes
next: /docs/advanced
---

Hugo وب‌سایت‌های استاتیک را ایجاد می‌کند و امکان گزینه‌های میزبانی انعطاف‌پذیر را فراهم می‌کند.
 این صفحه راهنماهایی برای به‌کاراندازی سایت هگزترا شما در پلتفرم‌های مختلف ارائه می‌کند.


<!--more-->


## گیت‌هاب Pages

[گیت‌هاب Pages](https://docs.github.com/pages) روشی توصیه شده برای به‌کاراندازی و میزبانی وب‌سایت شما به صورت رایگان است.

اگر سایت را با استفاده از [hextra-starter-template](https://github.com/imfing/hextra-starter-template) راه‌اندازی سریع پیاده‌سازی می‌کنید، گردش کار گیت‌هاب Actions را به صورت خارج از جعبه ارائه کرده‌ایم که به‌کاراندازی خودکار در گیت‌هاب Pages  به شما کمک می‌کند.

{{% details title="پیکربندی گیت‌هاب Actions" closed="true" %}}

در زیر یک پیکربندی مثال از [hextra-starter-template](https://github.com/imfing/hextra-starter-template) آورده شده است:

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
      HUGO_VERSION: 0.117.0
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          fetch-depth: 0    # Fetch all history for .GitInfo and .Lastmod
      - name: Setup Go
        uses: actions/setup-go@v4
        with:
          go-version: '1.21'
      - name: Setup Hugo
        uses: peaceiris/actions-hugo@v2
        with:
          hugo-version: '0.117.0'
          extended: true
      - name: Build with Hugo
        env:
          # For maximum backward compatibility with Hugo modules
          HUGO_ENVIRONMENT: production
          HUGO_ENV: production
        run: |
          hugo \
            --gc --minify \
            --baseURL "https://${{ github.repository_owner }}.github.io/${{ github.event.repository.name }}/"
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v2
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
        uses: actions/deploy-pages@v2
```

{{% /details %}}


{{< callout >}}
  در تنظیمات مخزن خود، **Pages** > **Build and deployment** > **Source** را روی **GitHub Actions** تنظیم کنید:
  ![](https://user-images.githubusercontent.com/5097752/266784808-99676430-884e-42ab-b901-f6534a0d6eee.png)
{{< /callout >}}

به‌طور پیش‌فرض، گردش کار گیت‌هاب Actions بالا `.github/workflows/pages.yaml` فرض می‌کند که سایت در حال به‌کاراندازی در `https://<USERNAME>.github.io/<REPO>/` است.

اگر در حال استفاده از `https://<USERNAME>.github.io/` هستید، سپس `--baseURL` را تغییر دهید:

```yaml {filename=".github/workflows/pages.yaml",linenos=table,linenostart=54,hl_lines=[4]}
run: |
  hugo \
    --gc --minify \
    --baseURL "https://${{ github.repository_owner }}.github.io/"
```

اگر می‌خواهید روی دامنه شخصی خود استقرار پیدا کند، لطفا مقدار `--baseURL` را بر این اساس تغییر دهید.


## کلودفلر Pages

1. کد منبع سایت خود را در یک مخزن Git (به عنوان مثال گیت‌هاب) قرار دهید
2. وارد [پیشخوان کلودفلر](https://dash.cloudflare.com/) شوید و حساب خود را انتخاب کنید
3. در صفحه اصلی حساب‌کاربری، **Workers & Pages** > **Create application** > **Pages** > **Connect to Git** را انتخاب کنید
4. مخزن را انتخاب کنید و در بخش Set up builds and Deployments اطلاعات زیر را وارد کنید:

| Configuration     | Value                |
| ----------------- | -------------------- |
| Production branch | `main`               |
| Build command     | `hugo --gc --minify` |
| Build directory   | `public`             |

برای جزئیات بیشتر، بررسی کنید:
- [یک سایت هیوگو راه‌اندازی کنید.](https://developers.cloudflare.com/pages/framework-guides/deploy-a-hugo-site/#deploy-with-cloudflare-pages).
- [پشتیبانی زبان و ابزار.](https://developers.cloudflare.com/pages/platform/language-support-and-tools/).


## Netlify

1. کد خود را به مخزن Git خود (گیت‌هاب، گیت‌لب و غیره) ارسال کنید.
2. [وارد کردن پروژه](https://app.netlify.com/start) به Netlify
3. اگر از [hextra-starter-template][hextra-starter-template] استفاده نمی‌کنید، موارد زیر را به صورت دستی پیکربندی کنید:
   - دستور Build را روی `hugo --gc --minify` پیکربندی کنید
   - دایرکتوری Publish را برای `public` مشخص کنید
   - `HUGO_VERSION` متغیر محیط استقرار را اضافه کنید و روی `0.119.0` تنظیم کنید
4. استقرار!

برای جزئیات بیشتر [Hugo را در Netlify](https://docs.netlify.com/integrations/frameworks/hugo/) بررسی کنید.


## Vercel

1. کد خود را به مخزن Git خود (گیت‌هاب، گیت‌لب و غیره) ارسال کنید.
2. به [پیشخوان Vercel](https://vercel.com/dashboard) بروید و پروژه Hugo خود را وارد کنید
3. پروژه را پیکربندی کنید، Hugo را به‌ عنوان چارچوب Preset انتخاب کنید
4. دستور Build و Install را لغو کنید:
   1. دستور Build را روی `hugo --gc --minify` تنظیم کنید
   2. دستور Install را روی `yum install golang` تنظیم کنید

![پیکربندی استقرار Vercel](https://github.com/imfing/hextra/assets/5097752/887d949b-8d05-413f-a2b4-7ab92192d0b3)
