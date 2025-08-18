// Light / Dark theme toggle
(function () {
  const defaultTheme = '{{ site.Params.theme.default | default `system`}}'

  const themeToggleButtons = document.querySelectorAll(".hextra-theme-toggle");

  function getRootClassTheme() {
    if (document.documentElement.classList.contains("light")) {
      return "light";
    }

    if (document.documentElement.classList.contains("dark")) {
      return "dark";
    }

    return "";
  }

  function switchToLightTheme() {
    setLightTheme();
    themeToggleButtons.forEach((el) => el.dataset.theme = "light");
    localStorage.setItem("color-theme", "light");
  }

  function switchToDarkTheme() {
    setDarkTheme();
    themeToggleButtons.forEach((el) => el.dataset.theme = "dark");
    localStorage.setItem("color-theme", "dark");
  }

  function switchToSystemTheme() {
    setSystemTheme();
    themeToggleButtons.forEach((el) => el.dataset.theme = "system");
    localStorage.setItem("color-theme", "system");
  }

  const colorTheme = "color-theme" in localStorage ? localStorage.getItem("color-theme") : defaultTheme;

  switch (colorTheme) {
    case "light":
      themeToggleButtons.forEach((el) => el.dataset.theme = "light");
      localStorage.setItem("color-theme", "light");
      break;
    case "dark":
      themeToggleButtons.forEach((el) => el.dataset.theme = "dark");
      localStorage.setItem("color-theme", "dark");
      break;
    default:
      themeToggleButtons.forEach((el) => el.dataset.theme = "system");
      localStorage.setItem("color-theme", "system");
      break;
  }

  // Add click event handler to the buttons
  themeToggleButtons.forEach((el) => {
    el.addEventListener("click", function () {
      const prefersColorScheme = detectPrefersColorScheme();
      const localStorageColorTheme = localStorage.getItem("color-theme");
      const rootClassTheme = getRootClassTheme();

      // prefersColorScheme (light): system -> dark -> light -> system
      // prefersColorScheme (dark): system -> light -> dark -> system

      if ((prefersColorScheme === "light" || prefersColorScheme === "dark") && localStorageColorTheme === prefersColorScheme) {
        switchToSystemTheme();
      } else if (prefersColorScheme === "light" && rootClassTheme === prefersColorScheme) {
        switchToDarkTheme();
      } else if (prefersColorScheme === "dark" && rootClassTheme === prefersColorScheme) {
        switchToLightTheme();
      } else if (prefersColorScheme === "light") {
        switchToLightTheme();
      } else if (prefersColorScheme === "dark") {
        switchToDarkTheme();
      } else {
        // Default to light theme if the system theme is not detected.
        switchToLightTheme();
      }
    });
  });

  // Listen for system theme changes
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
    if (localStorage.getItem("color-theme") === "system") {
      setSystemTheme();
    }
  });
})();
