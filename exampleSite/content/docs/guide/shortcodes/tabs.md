---
title: Tabs
next: /docs/guide/deploy-site
---

## Example

{{< tabs items="macOS,Linux,Windows" >}}

  {{< tab >}}**macOS**: A desktop operating system by Apple.{{< /tab >}}
  {{< tab >}}**Linux**: An open-source operating system.{{< /tab >}}
  {{< tab >}}**Windows**: A desktop operating system by Microsoft.{{< /tab >}}

{{< /tabs >}}

## Usage

### Default

```
{{</* tabs items="JSON,YAML,TOML" */>}}

  {{</* tab */>}}**JSON**: JavaScript Object Notation (JSON) is a standard text-based format for representing structured data based on JavaScript object syntax.{{</* /tab */>}}
  {{</* tab */>}}**YAML**: YAML is a human-readable data serialization language.{{</* /tab */>}}
  {{</* tab */>}}**TOML**: TOML aims to be a minimal configuration file format that's easy to read due to obvious semantics.{{</* /tab */>}}

{{</* /tabs */>}}
```

### Specify Selected Index

Use `defaultIndex` property to specify the selected tab. The index starts from 0.

```
{{</* tabs items="JSON,YAML,TOML" defaultIndex="1" */>}}

  {{</* tab */>}}**JSON**: JavaScript Object Notation (JSON) is a standard text-based format for representing structured data based on JavaScript object syntax.{{</* /tab */>}}
  {{</* tab */>}}**YAML**: YAML is a human-readable data serialization language.{{</* /tab */>}}
  {{</* tab */>}}**TOML**: TOML aims to be a minimal configuration file format that's easy to read due to obvious semantics.{{</* /tab */>}}

{{</* /tabs */>}}
```

The `YAML` tab will be selected by default.

{{< tabs items="JSON,YAML,TOML" defaultIndex="1" >}}

{{< tab >}}**JSON**: JavaScript Object Notation (JSON) is a standard text-based format for representing structured data based on JavaScript object syntax.{{< /tab >}}
{{< tab >}}**YAML**: YAML is a human-readable data serialization language.{{< /tab >}}
{{< tab >}}**TOML**: TOML aims to be a minimal configuration file format that's easy to read due to obvious semantics.{{< /tab >}}

{{< /tabs >}}


### Use Markdown

Markdown syntax including code block is also supported:

````
{{</* tabs items="JSON,YAML,TOML" */>}}

  {{</* tab */>}}
  ```json
  { "hello": "world" }
  ```
  {{</* /tab */>}}

  ... add other tabs similarly

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


### Sync Tabs

Tabs with the same list of `items` can be synchronized. When enabled, selecting a tab updates all other tabs with the same `items` and remembers the selection across pages.

Enable globally in your `hugo.yaml` under the `page` section:

```yaml {filename="hugo.yaml"}
params:
  page:
    tabs:
      sync: true
```

With this enabled the following two tab blocks will always display the same selected item:

```markdown
{{</* tabs items="A,B" */>}}

  {{</* tab */>}}A content{{</* /tab */>}}
  {{</* tab */>}}B content{{</* /tab */>}}

{{</* /tabs */>}}

{{</* tabs items="A,B" */>}}

  {{</* tab */>}}Second A content{{</* /tab */>}}
  {{</* tab */>}}Second B content{{</* /tab */>}}

{{</* /tabs */>}}
```
