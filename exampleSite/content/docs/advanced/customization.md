---
title: Customizing Hextra
linkTitle: Customization
---

Hextra offers some default customization options in the `hugo.yaml` config file to configure the theme.
This page describes the available options and how to customize the theme further.

<!--more-->

## Custom CSS

To add custom CSS, we need to create a file `assets/css/custom.css` in our site. Hextra will automatically load this file.

### Font Family

The font family of the content can be customized using:

```css {filename="assets/css/custom.css"}
.content {
  font-family: "Times New Roman", Times, serif;
}
```

### Inline Code Element

The color of text mixed with `other text` can be customized with:

```css {filename="assets/css/custom.css"}
.content code:not(.code-block code) {
  color: #c97c2e;
}
```

### Custom Colors

You can provide a custom color palettes to override the defaults.

To generate a custom color palette you can use a site like [tints.dev](https://www.tints.dev/).

```css {filename="assets/css/custom.css"}
:root {
  /* Primary/brand color */
  --colors-primary-50: "#EBF6FF";
  --colors-primary-100: "#D2EDFE";
  --colors-primary-200: "#A4DEFE";
  --colors-primary-300: "#7CD7FD";
  --colors-primary-400: "#4FD1FD";
  --colors-primary-500: "#21CFFC";
  --colors-primary-600: "#03ABE2";
  --colors-primary-700: "#0278AB";
  --colors-primary-800: "#02486F";
  --colors-primary-900: "#012237";
  --colors-primary-950: "#00111E";

  /* The colors of text */
  --colors-neutral-50: "#ECF2F8";
  --colors-neutral-100: "#DCE6EF";
  --colors-neutral-200: "#B7C9DC";
  --colors-neutral-300: "#99B0C7";
  --colors-neutral-400: "#7994AF";
  --colors-neutral-500: "#617A94";
  --colors-neutral-600: "#4E5E6E";
  --colors-neutral-700: "#3B454F";
  --colors-neutral-800: "#24292D";
  --colors-neutral-900: "#0D0E0F";
  --colors-neutral-950: "#070808";

  /* Background colors */

  /* Light mode */
  --colors-bright: "#eceeee";
  /* Dark mode */
  --colors-dark: "#0c0d0e";
}
```

### Syntax Highlighting

List of available syntax highlighting themes are available at [Chroma Styles Gallery](https://xyproto.github.io/splash/docs/all.html). The stylesheet can be generated using the command:

```shell
hugo gen chromastyles --style=github
```

To override the default syntax highlighting theme, we can add the generated styles to the custom CSS file.

## Custom Scripts

You may add custom scripts to the end of the head for every page by adding the following file:

```
layouts/partials/custom/head-end.html
```

## Custom Layouts

The layouts of the theme can be overridden by creating a file with the same name in the `layouts` directory of your site.
For example, to override the `single.html` layout for docs, create a file `layouts/docs/single.html` in your site.

For further information, refer to the [Hugo Templates](https://gohugo.io/templates/).

## Further Customization

Didn't find what you were looking for? Feel free to [open a discussion](https://github.com/imfing/hextra/discussions) or make a contribution to the theme!
