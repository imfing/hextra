---
title: "برجسته‌کردن سینتکس"
weight: 3
---

هیوگو از [Chroma](https://github.com/alecthomas/chroma)، یک برجسته‌کننده سینتکس عمومی در Go خالص، برای برجسته‌سازی کردن سینتکس استفاده می‌کند.
 توصیه می‌شود از بک‌تیک برای بلوک‌های کد در محتوای مارک‌داون استفاده کنید. مثلا:

<!--more-->

````markdown {filename="Markdown"}
```python
def say_hello():
    print("سلام!")
```
````

به صورت زیر رندر خواهد شد:

```python
def say_hello():
    print("سلام!")
```

## ویژگی‌ها

### Filename

برای افزودن نام پرونده یا عنوان به بلوک کد، `filename` را مشخص کنید:

````markdown {filename="Markdown"}
```python {filename="hello.py"}
def say_hello():
    print("سلام!")
```
````

```python {filename="hello.py"}
def say_hello():
    print("سلام!")
```

### شماره خطوط

برای تنظیم شماره خطوط، ویژگی `linenos` را روی `table` قرار دهید و به صورت اختیاری `linenostart` را روی شماره‌ای که خط شروع می‌شود تنظیم کنید:

````markdown {filename="Markdown"}
```python {linenos=table,linenostart=42}
def say_hello():
    print("سلام!")
```
````

```python {linenos=table,linenostart=42}
def say_hello():
    print("سلام!")
```

### برجسته کردن خطوط

برای برجسته کردن خطوط، ویژگی `hl_lines` را به فهرستی از شماره خطوط تنظیم کنید:

````markdown {filename="Markdown"}
```python {linenos=table,hl_lines=[2,4],linenostart=1,filename="hello.py"}
def say_hello():
    print("سلام!")

def main():
    say_hello()
```
````

```python {linenos=table,hl_lines=[2,4],linenostart=1,filename="hello.py"}
def say_hello():
    print("سلام!")

def main():
    say_hello()
```


### دکمه کپی

به طور پیش‌فرض، دکمه کپی برای بلوک‌های کد فعال است.


## زبان‌های پشتیبانی شده

برای مشاهده فهرست زبان‌های پشتیبانی شده، لطفا به [مستندات Chroma](https://github.com/alecthomas/chroma#supported-languages) مراجعه کنید.
