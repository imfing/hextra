---
title: 标签页
next: /docs/guide/deploy-site
---

## 示例

{{< tabs items="JSON,YAML,TOML" >}}

{{< tab >}}**JSON**: JavaScript 对象表示法（JSON）是一种基于 JavaScript 对象语法的标准文本格式，用于表示结构化数据。{{< /tab >}}
{{< tab >}}**YAML**: YAML 是一种人类可读的数据序列化语言。{{< /tab >}}
{{< tab >}}**TOML**: TOML 旨在成为一种最小化的配置文件格式，由于其明显的语义，易于阅读。{{< /tab >}}

{{< /tabs >}}

## 用法

### 默认

```
{{</* tabs items="JSON,YAML,TOML" */>}}

  {{</* tab */>}}**JSON**: JavaScript 对象表示法（JSON）是一种基于 JavaScript 对象语法的标准文本格式，用于表示结构化数据。{{</* /tab */>}}
  {{</* tab */>}}**YAML**: YAML 是一种人类可读的数据序列化语言。{{</* /tab */>}}
  {{</* tab */>}}**TOML**: TOML 旨在成为一种最小化的配置文件格式，由于其明显的语义，易于阅读。{{</* /tab */>}}

{{</* /tabs */>}}
```

### 指定选中索引

使用 `defaultIndex` 属性来指定选中的标签页。索引从 0 开始。

```
{{</* tabs items="JSON,YAML,TOML" defaultIndex="1" */>}}

  {{</* tab */>}}**JSON**: JavaScript 对象表示法（JSON）是一种基于 JavaScript 对象语法的标准文本格式，用于表示结构化数据。{{</* /tab */>}}
  {{</* tab */>}}**YAML**: YAML 是一种人类可读的数据序列化语言。{{</* /tab */>}}
  {{</* tab */>}}**TOML**: TOML 旨在成为一种最小化的配置文件格式，由于其明显的语义，易于阅读。{{</* /tab */>}}

{{</* /tabs */>}}
```

默认情况下，`YAML` 标签页将被选中。

{{< tabs items="JSON,YAML,TOML" defaultIndex="1" >}}

{{< tab >}}**JSON**: JavaScript 对象表示法（JSON）是一种基于 JavaScript 对象语法的标准文本格式，用于表示结构化数据。{{< /tab >}}
{{< tab >}}**YAML**: YAML 是一种人类可读的数据序列化语言。{{< /tab >}}
{{< tab >}}**TOML**: TOML 旨在成为一种最小化的配置文件格式，由于其明显的语义，易于阅读。{{< /tab >}}

{{< /tabs >}}


### 使用 Markdown

Markdown 语法，包括代码块，也受支持：

````
{{</* tabs items="JSON,YAML,TOML" */>}}

  {{</* tab */>}}
  ```json
  { "hello": "world" }
  ```
  {{</* /tab */>}}

  ... 类似地添加其他标签页

{{</* /tabs */>}}
````

{{< tabs items="JSON,YAML,TOML" >}}

  {{< tab >}}
  ```json
  { "hello": "world" }
  ```
  {{< /tab >}}

  {{< tab >}}
  ```yaml
  hello: world
  ```
  {{< /tab >}}

  {{< tab >}}
  ```toml
  hello = "world"
  ```
  {{< /tab >}}

{{< /tabs >}}