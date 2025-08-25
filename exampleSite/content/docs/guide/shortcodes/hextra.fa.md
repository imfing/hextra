---
title: Hextra Shortcodes
linkTitle: Hextra
sidebar:
  exclude: true
next: /docs/guide/deploy-site
---

الاستخدام الرئيسي لهذه الرموز المختصرة هو داخل التخطيط `hextra-home`.

## `hextra/feature-card`

رمز مختصر لعرض بطاقة مميزة.

### Usage

```
{{</* hextra/feature-card title="Title" subtitle="Subtitle" */>}}
```

### Options

| Parameter    | Description             |
|--------------|-------------------------|
| `title`      | عنوان البطاقة.          |
| `subtitle`   | العنوان الفرعي للبطاقة. |
| `class`      | فئة البطاقة.            |
| `image`      | صورة البطاقة.           |
| `imageClass` | فئة الصورة.             |
| `style`      | نمط البطاقة.            |
| `icon`       | أيقونة البطاقة.         |
| `link`       | رابط البطاقة.           |

## `hextra/feature-grid`

رمز مختصر لعرض شبكة الميزات.

### Usage

```
{{</* hextra/feature-grid cols="3" */>}}
  {{</* hextra/feature-card title="One" */>}}
  {{</* hextra/feature-card title="Two" */>}}
  {{</* hextra/feature-card title="Three" */>}}
{{</* /hextra/feature-grid */>}}
```

### Options

| Parameter | Description  |
|-----------|--------------|
| `cols`    | عدد الأعمدة. |
| `style`   | نمط الشبكة.  |

## `hextra/hero-badge`

رمز مختصر لعرض شارة تحتوي على رابط.

### Usage

```
{{</* hextra/hero-badge */>}}
  <div class="hx:w-2 hx:h-2 hx:rounded-full hx:bg-primary-400"></div>
  <span>Free, open source</span>
  {{</* icon name="arrow-circle-right" attributes="height=14" */>}}
{{</* /hextra/hero-badge */>}}
```

### Options

| Parameter | Description  |
|-----------|--------------|
| `link`    | رابط الشارة. |
| `class`   | فئة الشارة.  |
| `style`   | شكل الشارة.  |

## `hextra/hero-button`

رمز مختصر لعرض زر يحتوي على رابط.

### Usage

```
{{</* hextra/hero-button text="Get Started" link="/docs" */>}}
```

### Options

| Parameter | Description |
|-----------|-------------|
| `link`    | رابط الزر.  |
| `text`    | نص الزر.    |
| `style`   | شكل الزر.   |

## `hextra/hero-container`

حاوية بطل بسيطة مع صورة على الجانب الأيسر.

### Usage

```
{{</* hextra/hero-container image="images/logo.svg"  imageTitle="title" */>}}
    Content
{{</* /hextra/hero-container */>}}
```

### Options

| Parameter     | Description                             |
|---------------|-----------------------------------------|
| `class`       | فئة الحاوية.                            |
| `cols`        | عدد الأعمدة (الافتراضي: `2`).           |
| `image`       | صورة الحاوية.                           |
| `imageCard`   | عرض الصورة كبطاقة (الافتراضي: `false`). |
| `imageClass`  | فئة الصورة.                             |
| `imageLink`   | رابط الصورة.                            |
| `imageStyle`  | شكل الصورة.                             |
| `imageTitle`  | عنوان الصورة.                           |
| `imageWidth`  | عرض الصورة (الافتراضي: `350`).          |
| `imageHeight` | ارتفاع الصورة (الافتراضي: `350`).       |
| `style`       | شكل الحاوية.                            |

## `hextra/hero-headline`

رمز مختصر لعرض عنوان رئيسي.

### Usage

```
{{</* hextra/hero-headline */>}}
  Build modern websites&nbsp;<br class="hx:sm:block hx:hidden" />with Markdown and Hugo
{{</* /hextra/hero-headline */>}}
```

### Options

| Parameter | Description    |
|-----------|----------------|
| `style`   | أسلوب العنوان. |

## `hextra/hero-section`

قسم بطل بسيط مع عنوان ونمط اختياري.

### Usage

```
{{</* hextra/hero-section heading="h3" */>}}Title{{</* /hextra/hero-section */>}}>
```

### Options

| Parameter | Description                    |
|-----------|--------------------------------|
| `heading` | مستوى العنوان (افتراضي: `h2`). |
| `style`   | نمط العنوان.                   |
| `content` | محتوى العنوان.                 |

## `hextra/hero-subtitle`

رمز مختصر لعرض عنوان فرعي للبطل.

### Usage

```
{{</* hextra/hero-subtitle */>}}
  Fast, batteries-included Hugo theme&nbsp;<br class="hx:sm:block hx:hidden" />for creating beautiful static websites
{{</* /hextra/hero-subtitle */>}}
```

### Options

| Parameter | Description    |
|-----------|----------------|
| `style`   | أسلوب الترجمة. |
