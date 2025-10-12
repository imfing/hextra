---
title: Tabs
next: /docs/guide/deploy-site
---

## Example

{{< tabs >}}
  {{< tab name="JSON" >}}**JSON**: JavaScript Object Notation (JSON) is a standard text-based format for representing structured data based on JavaScript object syntax.{{< /tab >}}
  {{< tab name="YAML" >}}**YAML**: YAML is a human-readable data serialization language.{{< /tab >}}
  {{< tab name="TOML" >}}**TOML**: TOML aims to be a minimal configuration file format that's easy to read due to obvious semantics.{{< /tab >}}
{{< /tabs >}}

## Usage

### Default

```
{{</* tabs */>}}

  {{</* tab name="JSON" */>}}**JSON**: JavaScript Object Notation (JSON) is a standard text-based format for representing structured data based on JavaScript object syntax.{{</* /tab */>}}
  {{</* tab name="YAML" */>}}**YAML**: YAML is a human-readable data serialization language.{{</* /tab */>}}
  {{</* tab name="TOML" */>}}**TOML**: TOML aims to be a minimal configuration file format that's easy to read due to obvious semantics.{{</* /tab */>}}

{{</* /tabs */>}}
```

### Specify Selected Tab

Use `selected` property to specify the selected tab.

```
{{</* tabs */>}}

  {{</* tab name="JSON" */>}}**JSON**: JavaScript Object Notation (JSON) is a standard text-based format for representing structured data based on JavaScript object syntax.{{</* /tab */>}}
  {{</* tab name="YAML" selected=true */>}}**YAML**: YAML is a human-readable data serialization language.{{</* /tab */>}}
  {{</* tab name="TOML" */>}}**TOML**: TOML aims to be a minimal configuration file format that's easy to read due to obvious semantics.{{</* /tab */>}}

{{</* /tabs */>}}
```

The `YAML` tab will be selected by default.

{{< tabs >}}
  {{< tab name="JSON" >}}**JSON**: JavaScript Object Notation (JSON) is a standard text-based format for representing structured data based on JavaScript object syntax.{{< /tab >}}
  {{< tab name="YAML" selected=true >}}**YAML**: YAML is a human-readable data serialization language.{{< /tab >}}
  {{< tab name="TOML" >}}**TOML**: TOML aims to be a minimal configuration file format that's easy to read due to obvious semantics.{{< /tab >}}
{{< /tabs >}}


### Use Markdown

Markdown syntax including code block is also supported:

````
{{</* tabs */>}}

  {{</* tab name="JSON" */>}}
  ```json
  { "hello": "world" }
  ```
  {{</* /tab */>}}

  ... add other tabs similarly

{{</* /tabs */>}}
````

{{< tabs >}}

  {{< tab name="JSON" >}}
  ```json
  { "hello": "world" }
  ```
  {{< /tab >}}

  {{< tab name="YAML" >}}
  ```yaml
  hello: world
  ```
  {{< /tab >}}

  {{< tab name="TOML" >}}
  ```toml
  hello = "world"
  ```
  {{< /tab >}}

{{< /tabs >}}


### Sync Tabs

Tabs with the same list of `items` can be synchronized. When enabled, selecting a tab updates all other tabs with the same `items` and remembers the selection across pages.

Enable/disable globally in your `hugo.yaml` under the `page` section:

```yaml {filename="hugo.yaml"}
params:
  page:
    tabs:
      sync: true
```

Enable/disable per page inside the front matter:

```yaml {filename="my_page.md"}
---
title: My page
params:
  tabs:
    sync: true
---

Example content.
```

With this enabled, the following two tab blocks will always display the same selected item:

```markdown
{{</* tabs */>}}

  {{</* tab name="A" */>}}A content{{</* /tab */>}}
  {{</* tab name="B" */>}}B content{{</* /tab */>}}

{{</* /tabs */>}}

{{</* tabs */>}}

  {{</* tab name="A" */>}}Second A content{{</* /tab */>}}
  {{</* tab name="B" */>}}Second B content{{</* /tab */>}}

{{</* /tabs */>}}
```
