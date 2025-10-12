---
title: راهنمای نحو Markdown
date: 2020-01-01
authors:
  - name: imfing
    link: https://github.com/imfing
    image: https://github.com/imfing.png
  - name: Octocat
    link: https://github.com/octocat
    image: https://github.com/octocat.png
  - name: Goudarz Jafari
    link: https://github.com/Goudarz
    image: https://github.com/Goudarz.png
tags:
  - Markdown
  - مثال
  - راهنما
excludeSearch: true
---

این مقاله نمونه‌ای از نحو پایه‌ای Markdown را ارائه می‌دهد که می‌توان در فایل‌های محتوای Hugo استفاده کرد.
<!--more-->

## نحو پایه

### سرتیترها

```
# سرتیتر 1
## سرتیتر 2
### سرتیتر 3
#### سرتیتر 4
##### سرتیتر 5
###### سرتیتر 6
```

## سرتیتر 2
### سرتیتر 3
#### سرتیتر 4
##### سرتیتر 5
###### سرتیتر 6

### تأکید

```text
*این متن به صورت ایتالیک نمایش داده می‌شود*
_این نیز به صورت ایتالیک نمایش داده می‌شود_

**این متن به صورت پررنگ نمایش داده می‌شود**
__این نیز به صورت پررنگ نمایش داده می‌شود__

_شما می‌توانید **آن‌ها را ترکیب** کنید_
```

*این متن به صورت ایتالیک نمایش داده می‌شود*

_این نیز به صورت ایتالیک نمایش داده می‌شود_

**این متن به صورت پررنگ نمایش داده می‌شود**

__این نیز به صورت پررنگ نمایش داده می‌شود__

_شما می‌توانید **آن‌ها را ترکیب** کنید_

### فهرست‌ها

#### بدون ترتیب

```
* مورد ۱
* مورد ۲
  * مورد ۲الف
  * مورد ۲ب
```

* مورد ۱
* مورد ۲
  * مورد ۲الف
  * مورد ۲ب

#### با ترتیب

```
۱. مورد ۱
۲. مورد ۲
۳. مورد ۳
   ۱. مورد ۳الف
   ۲. مورد ۳ب
```

### تصاویر

```markdown
![لوگوی GitHub](https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png)
```

![لوگوی GitHub](https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png)

### پیوندها

```markdown
[Hugo](https://gohugo.io)
```

[Hugo](https://gohugo.io)

### نقل‌قول‌ها

```markdown
همان‌طور که نیوتن گفت:

> اگر من دورتر را دیده‌ام، به این دلیل است که بر شانه‌های غول‌ها ایستاده‌ام.
```

> اگر من دورتر را دیده‌ام، به این دلیل است که بر شانه‌های غول‌ها ایستاده‌ام.

### کد درون‌خطی

```markdown
کد `درون‌خطی` با `علامت back-tick` احاطه شده است.
```

کد `درون‌خطی` با `علامت back-tick` احاطه شده است.

### بلوک‌های کد

#### هایلایت سینتکس

````markdown
```go
func main() {
    fmt.Println("Hello World")
}
```
````

```go
func main() {
    fmt.Println("Hello World")
}
```

### جداول

```markdown
| سینتکس    | توضیحات     |
| --------- | ----------- |
| هدر       | عنوان       |
| پاراگراف | متن         |
```

| سینتکس    | توضیحات     |
| --------- | ----------- |
| هدر       | عنوان       |
| پاراگراف | متن         |

## منابع

- [نحو Markdown](https://www.markdownguide.org/basic-syntax/)
- [Markdown در Hugo](https://gohugo.io/content-management/formats/#markdown)