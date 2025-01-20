# Search Component

Search component that can be used to search across the whole site or just a section. Identical to the search component inside the nav bar.

## Example

<br />
{{< search name="example1">}}

<br />
{{< search name="example2">}}

<br />
{{< search name="example3" placeholder="Custom placeholder via parameter">}}

<br />
{{< search name="example4" keybinding="true" placeholder="With keybinding">}}

<br />
{{< search name="example5" placeholder="Search only in Shortcodes" base-url="/docs/guide/shortcodes/" >}}

## Usage

{{< callout type="warning" >}}
Parameter `name` is required and must be unique.
{{< /callout >}}

```text {filename="Markdown"}
{{</* search
  name="example1"
  placeholder="Custom placeholder"
  <!-- Should respond to Ctrl+K  -->
  keybinding="true"
  base-url="/docs/guide/shortcodes/"
*/>}}
```

## Parameters

| Parameter     | Description                                                                                                           |
| ------------- | --------------------------------------------------------------------------------------------------------------------- |
| `name`        | Globally unique identifier (Required)                                                                                 |
| `placeholder` | Custom placeholder. By default `searchPlaceHolder{name}` is used, then `searchPlaceholder` .                          |
| `keybinding`  | Should respond to keybinding. Note: Only the first last search element on the whole page will capture the keybinding. |
| `baseUrl`     | How narrow the search should be. `/` (whole site) by default.                                                         |

## Styling

Due to CSS limitations out of the box the Search Results element has a fixed size. It is recommended to customize each Search Component individually to your liking.

### Example

```scss {filename="custom.css"}
.search-wrapper-mysearch {
  // Applies to the search wrapper element with name="myname"
}

.search-input-mysearch {
  // Applies to the search input with name="myname"
}

.search-results-mysearch {
  // Applies to the search results container with name="myname"

  // For example this is the style applied to the search component in the desktop navbar
  @apply hx-w-screen hx-max-w-[min(calc(100vw-2rem),calc(100%+20rem))];
}
```