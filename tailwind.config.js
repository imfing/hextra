const colors = require("tailwindcss/colors");
const colorVariable = require("@mertasan/tailwindcss-variables/colorVariable");

const makePrimaryColor =
  (l) =>
  ({ opacityValue }) => {
    return `hsl(var(--primary-hue) var(--primary-saturation) ${l}%` + (opacityValue ? ` / ${opacityValue})` : ")");
  };

/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: "hx-",
  content: ["./**/hugo_stats.json"],
  safelist: ["max-w-screen-xl", "max-w-[90rem]", "max-w-full"],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    fontSize: {
      xs: ".75rem",
      sm: ".875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
      "6xl": "4rem",
    },
    letterSpacing: {
      tight: "-0.015em",
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: "#000",
      white: "#fff",
      gray: colors.gray,
      slate: colors.slate,
      neutral: colors.neutral,
      red: colors.red,
      orange: colors.orange,
      blue: colors.blue,
      yellow: colors.yellow,
      primary: {
        50: colorVariable("var(--colors-primary-50)"),
        100: colorVariable("var(--colors-primary-100)"),
        200: colorVariable("var(--colors-primary-200)"),
        300: colorVariable("var(--colors-primary-300)"),
        400: colorVariable("var(--colors-primary-400)"),
        500: colorVariable("var(--colors-primary-500)"),
        600: colorVariable("var(--colors-primary-600)"),
        700: colorVariable("var(--colors-primary-700)"),
        750: colorVariable("var(--colors-primary-50)"),
        800: colorVariable("var(--colors-primary-800)"),
        900: colorVariable("var(--colors-primary-900)"),
        950: colorVariable("var(--colors-primary-950)"),
      },

      neutral: {
        50: colorVariable("var(--colors-neutral-50)"),
        100: colorVariable("var(--colors-neutral-100)"),
        200: colorVariable("var(--colors-neutral-200)"),
        300: colorVariable("var(--colors-neutral-300)"),
        400: colorVariable("var(--colors-neutral-400)"),
        500: colorVariable("var(--colors-neutral-500)"),
        600: colorVariable("var(--colors-neutral-600)"),
        700: colorVariable("var(--colors-neutral-700)"),
        750: colorVariable("var(--colors-neutral-50)"),
        800: colorVariable("var(--colors-neutral-800)"),
        900: colorVariable("var(--colors-neutral-900)"),
        950: colorVariable("var(--colors-neutral-950)"),
      },
    },
    extend: {
      colors: {
        dark: "#111",
      },

      //! Max-size
    },
    variables: {
      DEFAULT: {
        colors: {
          primary: {
            50: colors.blue[50],
            100: colors.blue[100],
            200: colors.blue[200],
            300: colors.blue[300],
            400: colors.blue[400],
            500: colors.blue[500],
            600: colors.blue[600],
            700: colors.blue[700],
            750: colors.blue[750],
            800: colors.blue[800],
            900: colors.blue[900],
            950: colors.blue[950],
          },

          neutral: {
            50: colors.slate[50],
            100: colors.slate[100],
            200: colors.slate[200],
            300: colors.slate[300],
            400: colors.slate[400],
            500: colors.slate[500],
            600: colors.slate[600],
            700: colors.slate[700],
            750: colors.slate[750],
            800: colors.slate[800],
            900: colors.slate[900],
            950: colors.slate[950],
          },
        },
      },
    },
  },
  darkMode: ["class", 'html[class~="dark"]'],
  plugins: [
    require("@mertasan/tailwindcss-variables")({
      darkToRoot: false,
      colorVariables: true,
    }),
  ],
};
