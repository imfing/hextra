---
title: Cards Component
linkTitle: Cards
---

## Example

{{< cards >}}
  {{< card link="../callout" title="Callout" icon="warning" >}}
  {{< card link="/" title="No Icon" >}}
{{< /cards >}}

{{< cards >}}
  {{< card link="/" title="Image Card" image="https://source.unsplash.com/featured/800x600?landscape" subtitle="Unsplash Landscape" >}}
  {{< card link="/" title="Local Image" image="/images/astronaut.jpg" subtitle="This is a local image on the server, processed by Hugo." >}}
{{< /cards >}}


## Usage

```
{{</* cards */>}}
  {{</* card link="../callout" title="Callout" icon="warning" */>}}
  {{</* card link="/" title="No Icon" */>}}
{{</* /cards */>}}
```

```
{{</* cards */>}}
  {{</* card link="/" title="Image Card" image="https://source.unsplash.com/featured/800x600?landscape" subtitle="Unsplash Landscape" */>}}
  {{</* card link="/" title="Local Image" image="/images/" subtitle="This is a local image on the server, processed by Hugo." */>}}
{{</* /cards */>}}
```
**Please Note**: Image cards now support Hugo image processing for speedier sites! Simply store your images in the `assets` folder and call them in the short code via relative url (`/images/someImg.jpg`). Hugo will automatically determine if the image is an asset, then process it appropriately.