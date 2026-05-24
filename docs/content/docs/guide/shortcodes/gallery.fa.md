---
title: "گالری تصاویر"
linktitle: "گالری تصاویر"
sidebar:
  exclude: true
---

## مرور کلی

شورت‌کد `gallery` مجموعه‌ای از تصاویر را همراه با لایت‌باکس تعاملی [PhotoSwipe v5](https://photoswipe.com/) نمایش می‌دهد. با کلیک روی هر تصویر، یک نمایشگر تمام‌صفحه با ناوبری قبلی/بعدی، عنوان و پشتیبانی از صفحه‌کلید باز می‌شود.

## استفاده پایه

یک یا چند شورت‌کد `{{</* gallery-item */>}}` را درون `{{</* gallery */>}}` قرار دهید. می‌توان تصاویر محلی و راه دور را در یک گالری ترکیب کرد:

```markdown
{{</* gallery */>}}
  {{</* gallery-item src="images/space.jpg" caption="فضا" */>}}
  {{</* gallery-item src="https://picsum.photos/id/1015/1600/1200" thumb="https://picsum.photos/id/1015/800/600" width="1600" height="1200" caption="دره رودخانه" */>}}
  {{</* gallery-item src="https://picsum.photos/id/1018/1600/1200" thumb="https://picsum.photos/id/1018/800/600" width="1600" height="1200" caption="دریاچه کوهستانی" */>}}
{{</* /gallery */>}}
```

{{< gallery >}}
  {{< gallery-item src="images/space.jpg" caption="فضا" >}}
  {{< gallery-item src="https://picsum.photos/id/1015/1600/1200" thumb="https://picsum.photos/id/1015/800/600" width="1600" height="1200" caption="دره رودخانه" >}}
  {{< gallery-item src="https://picsum.photos/id/1018/1600/1200" thumb="https://picsum.photos/id/1018/800/600" width="1600" height="1200" caption="دریاچه کوهستانی" >}}
{{< /gallery >}}

## منابع تصویر

تصاویر می‌توانند از چند مکان مختلف بیایند. شورت‌کد مقدار `src` را به ترتیب زیر بررسی می‌کند:

1. **منابع باندل صفحه**: فایل‌هایی که در کنار `index.md` در یک [باندل برگ](https://gohugo.io/content-management/page-bundles/) قرار دارند.
2. **اسسِت‌های سراسری**: فایل‌های موجود در پوشه `assets/` سایت.
3. **فایل‌های استاتیک**: فایل‌های موجود در پوشه `static/` سایت (با مسیری که با `/` شروع می‌شود ارجاع داده می‌شوند).
4. **URLهای راه دور**: هر `src` که با `http://` یا `https://` شروع شود.

برای تصاویر محلی، ابعاد به‌صورت خودکار تشخیص داده می‌شوند. برای تصاویر راه دور، مقادیر `width` و `height` را تعیین کنید تا لایت‌باکس بتواند پیش از بارگذاری تصویر، فضای لازم را رزرو کند:

```markdown
{{</* gallery-item
  src="https://picsum.photos/id/1043/1920/1280"
  width="1920"
  height="1280"
  caption="عکس از picsum.photos"
*/>}}
```

پارامتر اختیاری `thumb` به یک تصویر کوچک‌تر اشاره می‌کند که در شبکه داخل صفحه استفاده می‌شود؛ هنگام کلیک کاربر، PhotoSwipe همچنان `src` با وضوح کامل را باز می‌کند.

## انواع چیدمان

پارامتر `type` الگوریتم چیدمان را انتخاب می‌کند. مقدار پیش‌فرض `grid` است.

### Grid (پیش‌فرض)

یک شبکه یکنواخت که در آن همه سلول‌ها اندازه یکسانی دارند. از `cols` برای کنترل تعداد ستون‌ها استفاده کنید:

```markdown
{{</* gallery type="grid" cols="3" */>}}
  {{</* gallery-item src="https://picsum.photos/id/1015/1200/1200" thumb="https://picsum.photos/id/1015/600/600" width="1200" height="1200" caption="رودخانه" */>}}
  {{</* gallery-item src="https://picsum.photos/id/1018/1200/1200" thumb="https://picsum.photos/id/1018/600/600" width="1200" height="1200" caption="دریاچه" */>}}
  {{</* gallery-item src="https://picsum.photos/id/1019/1200/1200" thumb="https://picsum.photos/id/1019/600/600" width="1200" height="1200" caption="مسیر" */>}}
  {{</* gallery-item src="https://picsum.photos/id/1039/1200/1200" thumb="https://picsum.photos/id/1039/600/600" width="1200" height="1200" caption="دره" */>}}
  {{</* gallery-item src="https://picsum.photos/id/1043/1200/1200" thumb="https://picsum.photos/id/1043/600/600" width="1200" height="1200" caption="آبشار" */>}}
  {{</* gallery-item src="https://picsum.photos/id/1059/1200/1200" thumb="https://picsum.photos/id/1059/600/600" width="1200" height="1200" caption="جنگل" */>}}
{{</* /gallery */>}}
```

{{< gallery type="grid" cols="3" >}}
  {{< gallery-item src="https://picsum.photos/id/1015/1200/1200" thumb="https://picsum.photos/id/1015/600/600" width="1200" height="1200" caption="رودخانه" >}}
  {{< gallery-item src="https://picsum.photos/id/1018/1200/1200" thumb="https://picsum.photos/id/1018/600/600" width="1200" height="1200" caption="دریاچه" >}}
  {{< gallery-item src="https://picsum.photos/id/1019/1200/1200" thumb="https://picsum.photos/id/1019/600/600" width="1200" height="1200" caption="مسیر" >}}
  {{< gallery-item src="https://picsum.photos/id/1039/1200/1200" thumb="https://picsum.photos/id/1039/600/600" width="1200" height="1200" caption="دره" >}}
  {{< gallery-item src="https://picsum.photos/id/1043/1200/1200" thumb="https://picsum.photos/id/1043/600/600" width="1200" height="1200" caption="آبشار" >}}
  {{< gallery-item src="https://picsum.photos/id/1059/1200/1200" thumb="https://picsum.photos/id/1059/600/600" width="1200" height="1200" caption="جنگل" >}}
{{< /gallery >}}

### Carousel

نواری از تصاویر که به‌صورت افقی قابل پیمایش است و دارای دکمه‌های قبلی/بعدی و ناوبری با کلیدهای جهت‌نما است:

```markdown
{{</* gallery type="carousel" */>}}
  {{</* gallery-item src="https://picsum.photos/id/1015/1600/1200" thumb="https://picsum.photos/id/1015/800/600" width="1600" height="1200" caption="رودخانه" */>}}
  {{</* gallery-item src="https://picsum.photos/id/1018/1600/1200" thumb="https://picsum.photos/id/1018/800/600" width="1600" height="1200" caption="دریاچه" */>}}
  {{</* gallery-item src="https://picsum.photos/id/1019/1600/1200" thumb="https://picsum.photos/id/1019/800/600" width="1600" height="1200" caption="مسیر" */>}}
  {{</* gallery-item src="https://picsum.photos/id/1039/1600/1200" thumb="https://picsum.photos/id/1039/800/600" width="1600" height="1200" caption="دره" */>}}
  {{</* gallery-item src="https://picsum.photos/id/1043/1600/1200" thumb="https://picsum.photos/id/1043/800/600" width="1600" height="1200" caption="آبشار" */>}}
  {{</* gallery-item src="https://picsum.photos/id/1059/1600/1200" thumb="https://picsum.photos/id/1059/800/600" width="1600" height="1200" caption="جنگل" */>}}
{{</* /gallery */>}}
```

{{< gallery type="carousel" >}}
  {{< gallery-item src="https://picsum.photos/id/1015/1600/1200" thumb="https://picsum.photos/id/1015/800/600" width="1600" height="1200" caption="رودخانه" >}}
  {{< gallery-item src="https://picsum.photos/id/1018/1600/1200" thumb="https://picsum.photos/id/1018/800/600" width="1600" height="1200" caption="دریاچه" >}}
  {{< gallery-item src="https://picsum.photos/id/1019/1600/1200" thumb="https://picsum.photos/id/1019/800/600" width="1600" height="1200" caption="مسیر" >}}
  {{< gallery-item src="https://picsum.photos/id/1039/1600/1200" thumb="https://picsum.photos/id/1039/800/600" width="1600" height="1200" caption="دره" >}}
  {{< gallery-item src="https://picsum.photos/id/1043/1600/1200" thumb="https://picsum.photos/id/1043/800/600" width="1600" height="1200" caption="آبشار" >}}
  {{< gallery-item src="https://picsum.photos/id/1059/1600/1200" thumb="https://picsum.photos/id/1059/800/600" width="1600" height="1200" caption="جنگل" >}}
{{< /gallery >}}

### Mosaic

یک چیدمان CSS grid که در آن هر آیتم می‌تواند با استفاده از پارامتر `span` در `gallery-item` چندین ستون یا سطر را اشغال کند. مقادیر معتبر `span` عبارت‌اند از `wide` (۲ ستون)، `tall` (۲ سطر) و `large` (۲ ستون و ۲ سطر):

```markdown
{{</* gallery type="mosaic" */>}}
  {{</* gallery-item src="https://picsum.photos/id/1015/1600/900" thumb="https://picsum.photos/id/1015/1200/600" width="1600" height="900" caption="رودخانه" span="wide" */>}}
  {{</* gallery-item src="https://picsum.photos/id/1018/800/1200" thumb="https://picsum.photos/id/1018/400/600" width="800" height="1200" caption="دریاچه" span="tall" */>}}
  {{</* gallery-item src="https://picsum.photos/id/1019/800/600" thumb="https://picsum.photos/id/1019/400/300" width="800" height="600" caption="مسیر" */>}}
  {{</* gallery-item src="https://picsum.photos/id/1039/800/600" thumb="https://picsum.photos/id/1039/400/300" width="800" height="600" caption="دره" */>}}
  {{</* gallery-item src="https://picsum.photos/id/1043/1600/900" thumb="https://picsum.photos/id/1043/1200/600" width="1600" height="900" caption="آبشار" span="wide" */>}}
{{</* /gallery */>}}
```

{{< gallery type="mosaic" >}}
  {{< gallery-item src="https://picsum.photos/id/1015/1600/900" thumb="https://picsum.photos/id/1015/1200/600" width="1600" height="900" caption="رودخانه" span="wide" >}}
  {{< gallery-item src="https://picsum.photos/id/1018/800/1200" thumb="https://picsum.photos/id/1018/400/600" width="800" height="1200" caption="دریاچه" span="tall" >}}
  {{< gallery-item src="https://picsum.photos/id/1019/800/600" thumb="https://picsum.photos/id/1019/400/300" width="800" height="600" caption="مسیر" >}}
  {{< gallery-item src="https://picsum.photos/id/1039/800/600" thumb="https://picsum.photos/id/1039/400/300" width="800" height="600" caption="دره" >}}
  {{< gallery-item src="https://picsum.photos/id/1043/1600/900" thumb="https://picsum.photos/id/1043/1200/600" width="1600" height="900" caption="آبشار" span="wide" >}}
{{< /gallery >}}

### Masonry

یک چیدمان masonry واکنش‌گرا. تعداد ستون‌ها به‌طور خودکار بر اساس عرض ویوپورت تعیین می‌شود، بنابراین پارامتر `cols` برای این نوع نادیده گرفته می‌شود. هر آیتم نسبت ابعاد طبیعی خود را حفظ می‌کند:

```markdown
{{</* gallery type="masonry" */>}}
  {{</* gallery-item src="https://picsum.photos/id/1015/1200/800"  thumb="https://picsum.photos/id/1015/600/400"  width="1200" height="800"  caption="رودخانه" */>}}
  {{</* gallery-item src="https://picsum.photos/id/1018/800/1200"  thumb="https://picsum.photos/id/1018/400/600"  width="800"  height="1200" caption="دریاچه" */>}}
  {{</* gallery-item src="https://picsum.photos/id/1019/1200/900"  thumb="https://picsum.photos/id/1019/600/450"  width="1200" height="900"  caption="مسیر" */>}}
  {{</* gallery-item src="https://picsum.photos/id/1039/1000/1000" thumb="https://picsum.photos/id/1039/500/500"  width="1000" height="1000" caption="دره" */>}}
  {{</* gallery-item src="https://picsum.photos/id/1043/1200/800"  thumb="https://picsum.photos/id/1043/600/400"  width="1200" height="800"  caption="آبشار" */>}}
  {{</* gallery-item src="https://picsum.photos/id/1059/800/1200"  thumb="https://picsum.photos/id/1059/400/600"  width="800"  height="1200" caption="جنگل" */>}}
{{</* /gallery */>}}
```

{{< gallery type="masonry" >}}
  {{< gallery-item src="https://picsum.photos/id/1015/1200/800" thumb="https://picsum.photos/id/1015/600/400" width="1200" height="800" caption="رودخانه" >}}
  {{< gallery-item src="https://picsum.photos/id/1018/800/1200" thumb="https://picsum.photos/id/1018/400/600" width="800" height="1200" caption="دریاچه" >}}
  {{< gallery-item src="https://picsum.photos/id/1019/1200/900" thumb="https://picsum.photos/id/1019/600/450" width="1200" height="900" caption="مسیر" >}}
  {{< gallery-item src="https://picsum.photos/id/1039/1000/1000" thumb="https://picsum.photos/id/1039/500/500" width="1000" height="1000" caption="دره" >}}
  {{< gallery-item src="https://picsum.photos/id/1043/1200/800" thumb="https://picsum.photos/id/1043/600/400" width="1200" height="800" caption="آبشار" >}}
  {{< gallery-item src="https://picsum.photos/id/1059/800/1200" thumb="https://picsum.photos/id/1059/400/600" width="800" height="1200" caption="جنگل" >}}
{{< /gallery >}}

## پیوند به‌جای لایت‌باکس

با تنظیم `link` روی یک `gallery-item`، کلیک به‌جای باز کردن لایت‌باکس، کاربر را به آدرس URL هدایت می‌کند:

```markdown
{{</* gallery */>}}
  {{</* gallery-item src="https://picsum.photos/id/1015/800/600" width="800" height="600" caption="Picsum در وب" link="https://picsum.photos/" */>}}
  {{</* gallery-item src="https://picsum.photos/id/1018/800/600" width="800" height="600" caption="لایت‌باکس" */>}}
{{</* /gallery */>}}
```

## پیکربندی

به‌طور پیش‌فرض، PhotoSwipe از CDN jsDelivr بارگذاری می‌شود. برای استفاده از نسخه self-host شده یا آینه‌شده، یک بلوک `gallery` به `params` در پیکربندی سایت خود اضافه کنید. برای جزئیات به صفحه [پیکربندی]({{< ref "/docs/guide/configuration" >}}#local-and-mirrored-script-assets) مراجعه کنید.

## پارامترها

### `gallery`

| پارامتر | نوع    | پیش‌فرض  | توضیح                                                    |
| ------- | ------ | -------- | -------------------------------------------------------- |
| `type`  | string | `grid`   | نوع چیدمان: `grid`، `mosaic`، `masonry` یا `carousel`    |
| `cols`  | number | `3`      | تعداد ستون‌ها (در `masonry` استفاده نمی‌شود)             |
| `gap`   | string | `0.5rem` | فاصله CSS بین آیتم‌ها                                    |

### `gallery-item`

| پارامتر   | نوع    | پیش‌فرض  | توضیح                                                                                                                       |
| --------- | ------ | -------- | --------------------------------------------------------------------------------------------------------------------------- |
| `src`     | string | -        | منبع تصویر (اجباری). مسیر منبع صفحه، مسیر اسسِت سراسری، مسیر فایل استاتیک یا URL راه دور                                    |
| `alt`     | string | caption  | متن جایگزین تصویر                                                                                                           |
| `caption` | string | -        | عنوانی که زیر تصویر و داخل لایت‌باکس نمایش داده می‌شود                                                                      |
| `link`    | string | -        | در صورت تنظیم، کلیک به این URL هدایت می‌شود و لایت‌باکس باز نمی‌شود                                                         |
| `width`   | number | خودکار   | عرض تصویر بر حسب پیکسل. برای URLهای راه دور که ابعاد آن‌ها قابل تشخیص خودکار نیست، الزامی است                               |
| `height`  | number | خودکار   | ارتفاع تصویر بر حسب پیکسل. برای URLهای راه دور که ابعاد آن‌ها قابل تشخیص خودکار نیست، الزامی است                            |
| `thumb`   | string | مشتق‌شده | تصویر پیش‌نمایش کوچک‌تر نمایش‌داده‌شده در شبکه. برای تصاویر محلی، پیش‌فرض، نسخه تغییر اندازه‌داده‌شده `src` است             |
| `span`    | string | -        | راهنمای span برای mosaic: `wide` (۲ ستون)، `tall` (۲ سطر) یا `large` (۲x۲). تنها زمانی اعمال می‌شود که `type="mosaic"` باشد |
