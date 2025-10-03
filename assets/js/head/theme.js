// The section must not be in the theme.js (body) file because it can create a quick flash (switch between light and dark).

function setTheme(theme) {
  document.documentElement.classList.remove("light", "dark");

  if (theme !== "light" && theme !== "dark") {
    theme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  document.documentElement.classList.add(theme);
  document.documentElement.style.colorScheme = theme;
}

setTheme("color-theme" in localStorage ? localStorage.getItem("color-theme") : '{{ site.Params.theme.default | default `system`}}')
