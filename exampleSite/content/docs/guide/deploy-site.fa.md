---
title: استقرار سایت
prev: /docs/guide/shortcodes
next: /docs/advanced
---

Hugo وبسایت‌های استاتیک تولید می‌کند که امکان میزبانی انعطاف‌پذیر را فراهم می‌سازد.
این صفحه راهنماهایی برای استقرار سایت Hextra شما روی پلتفرم‌های مختلف ارائه می‌دهد.

<!--more-->


## GitHub Pages

[GitHub Pages](https://docs.github.com/pages) روش توصیه‌شده برای استقرار و میزبانی رایگان وبسایت شماست.

اگر سایت را با استفاده از [hextra-starter-template](https://github.com/imfing/hextra-starter-template) راه‌اندازی کرده‌اید، این قالب از پیش یک گردش کار GitHub Actions برای استقرار خودکار در GitHub Pages ارائه می‌دهد.

{{% details title="پیکربندی GitHub Actions" closed="true" %}}

در زیر یک نمونه پیکربندی از [hextra-starter-template](https://github.com/imfing/hextra-starter-template) آمده است:

```yaml {filename=".github/workflows/pages.yaml"}
# نمونه گردش کار برای ساخت و استقرار یک سایت Hugo در GitHub Pages
name: استقرار سایت Hugo در Pages

on:
  # در push به شاخه پیش‌فرض اجرا می‌شود
  push:
    branches: ["main"]

  # امکان اجرای دستی این گردش کار از تب Actions
  workflow_dispatch:

# تنظیم مجوزهای GITHUB_TOKEN برای امکان استقرار در GitHub Pages
permissions:
  contents: read
  pages: write
  id-token: write

# اجازه فقط یک استقرار همزمان، رد کردن اجراهای در صف بین اجرای در حال انجام و آخرین صف
# با این حال، اجراهای در حال انجام را لغو نکنید زیرا می‌خواهیم این استقرارها کامل شوند.
concurrency:
  group: "pages"
  cancel-in-progress: false

# پیش‌فرض bash
defaults:
  run:
    shell: bash

jobs:
  # کار ساخت
  build:
    runs-on: ubuntu-latest
    env:
      HUGO_VERSION: 0.147.7
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          fetch-depth: 0  # دریافت تمام تاریخچه برای .GitInfo و .Lastmod
          submodules: recursive
      - name: راه‌اندازی Go
        uses: actions/setup-go@v5
        with:
          go-version: '1.22'
      - name: راه‌اندازی Pages
        id: pages
        uses: actions/configure-pages@v4
      - name: راه‌اندازی Hugo
        run: |
          wget -O ${{ runner.temp }}/hugo.deb https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/hugo_extended_${HUGO_VERSION}_linux-amd64.deb \
          && sudo dpkg -i ${{ runner.temp }}/hugo.deb
      - name: ساخت با Hugo
        env:
          # برای حداکثر سازگاری با ماژول‌های Hugo
          HUGO_ENVIRONMENT: production
          HUGO_ENV: production
        run: |
          hugo \
            --gc --minify \
            --baseURL "${{ steps.pages.outputs.base_url }}/"
      - name: آپلود آرتیفکت
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./public

  # کار استقرار
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: استقرار در GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

{{% /details %}}


{{< callout >}}
  در تنظیمات مخزن، بخش **Pages** > **Build and deployment** > **Source** را روی **GitHub Actions** تنظیم کنید:
  ![](https://user-images.githubusercontent.com/5097752/266784808-99676430-884e-42ab-b901-f6534a0d6eee.png)
{{< /callout >}}

به طور پیش‌فرض، گردش کار GitHub Actions فوق `.github/workflows/pages.yaml` فرض می‌کند که سایت در `https://<USERNAME>.github.io/<REPO>/` مستقر می‌شود.

اگر در `https://<USERNAME>.github.io/` مستقر می‌کنید، `--baseURL` را اصلاح کنید:

```yaml {filename=".github/workflows/pages.yaml",linenos=table,linenostart=54,hl_lines=[4]}
run: |
  hugo \
    --gc --minify \
    --baseURL "https://${{ github.repository_owner }}.github.io/"
```

اگر در دامنه خود مستقر می‌کنید، لطفاً مقدار `--baseURL` را متناسب با آن تغییر دهید.


## Cloudflare Pages

1. کد منبع سایت را در یک مخزن Git (مثلاً GitHub) قرار دهید.
2. به [داشبورد Cloudflare](https://dash.cloudflare.com/) وارد شوید و حساب خود را انتخاب کنید.
3. در صفحه اصلی حساب، **Workers & Pages** > **Create application** > **Pages** > **Connect to Git** را انتخاب کنید.
4. مخزن را انتخاب کنید و در بخش **Set up builds and deployments** اطلاعات زیر را ارائه دهید:

| تنظیمات          | مقدار                |
| ---------------- | -------------------- |
| شاخه تولید      | `main`               |
| دستور ساخت      | `hugo --gc --minify` |
| دایرکتوری ساخت  | `public`             |

برای جزئیات بیشتر، بررسی کنید:
- [استقرار یک سایت Hugo](https://developers.cloudflare.com/pages/framework-guides/deploy-a-hugo-site/#deploy-with-cloudflare-pages).
- [پشتیبانی زبان و ابزارها](https://developers.cloudflare.com/pages/platform/language-support-and-tools/).


## Netlify

1. کد خود را به مخزن Git (GitHub, GitLab و غیره) push کنید.
2. [پروژه را به Netlify وارد کنید](https://app.netlify.com/start).
3. اگر از [hextra-starter-template][hextra-starter-template] استفاده نمی‌کنید، موارد زیر را به صورت دستی پیکربندی کنید:
   - دستور ساخت را روی `hugo --gc --minify` تنظیم کنید.
   - دایرکتوری انتشار را روی `public` مشخص کنید.
   - متغیر محیطی `HUGO_VERSION` را اضافه کرده و روی `0.147.7` تنظیم کنید، یا آن را در فایل `netlify.toml` مشخص کنید.
4. استقرار دهید!

برای جزئیات بیشتر، [Hugo در Netlify](https://docs.netlify.com/integrations/frameworks/hugo/) را بررسی کنید.


## Vercel

1. کد خود را به مخزن Git (GitHub, GitLab و غیره) push کنید.
2. به [داشبورد Vercel](https://vercel.com/dashboard) بروید و پروژه Hugo خود را وارد کنید.
3. پروژه را پیکربندی کنید، Hugo را به عنوان پیش‌تنظیم فریمورک انتخاب کنید.
4. دستور ساخت و دستور نصب را بازنویسی کنید:
   1. دستور ساخت را روی `hugo --gc --minify` تنظیم کنید.
   2. دستور نصب را روی `yum install golang` تنظیم کنید.

![پیکربندی استقرار Vercel](https://github.com/imfing/hextra/assets/5097752/887d949b-8d05-413f-a2b4-7ab92192d0b3)