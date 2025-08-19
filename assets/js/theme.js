// Light / Dark theme toggle
(function () {
  const defaultTheme = '{{ site.Params.theme.default | default `system`}}'

  const themeToggleButtons = document.querySelectorAll(".hextra-theme-toggle");
  const themeToggleOptions = document.querySelectorAll(".hextra-theme-toggle-options p");

  function detectPrefersColorScheme() {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    } else if (window.matchMedia("(prefers-color-scheme: light)").matches) {
      return "light";
    } else {
      return "light";
    }
  }

  function setDarkTheme() {
    document.documentElement.classList.remove("light");
    document.documentElement.classList.add("dark");
    document.documentElement.style.colorScheme = "dark";
  }

  function setLightTheme() {
    document.documentElement.classList.remove("dark");
    document.documentElement.classList.add("light");
    document.documentElement.style.colorScheme = "light";
  }

  function setSystemTheme() {
    document.documentElement.classList.remove("dark");
    document.documentElement.classList.remove("light");

    const prefersColorScheme = detectPrefersColorScheme();
    document.documentElement.classList.add(prefersColorScheme);
    document.documentElement.style.colorScheme = prefersColorScheme;
  }

  function applyTheme(theme) {
    themeToggleButtons.forEach((btn) => {
      btn.dataset.theme = theme;
      btn.nextElementSibling.dataset.theme = theme;
    });

    localStorage.setItem("color-theme", theme);
  }

  function switchToLightTheme() {
    setLightTheme();
    applyTheme("light");
  }

  function switchToDarkTheme() {
    setDarkTheme();
    applyTheme("dark");
  }

  function switchToSystemTheme() {
    setSystemTheme();
    applyTheme("system");
  }

  const colorTheme = "color-theme" in localStorage ? localStorage.getItem("color-theme") : defaultTheme;

  switch (colorTheme) {
    case "light":
      switchToLightTheme();
      break;
    case "dark":
      switchToDarkTheme("dark");
      break;
    default:
      switchToSystemTheme();
      break;
  }

  // Add click event handler to the menu items.
  themeToggleOptions.forEach((option) => {
    option.addEventListener("click", function (e) {
      e.preventDefault();

      switch (option.dataset.item) {
        case "light":
          switchToLightTheme();
          break;
        case "dark":
          switchToDarkTheme();
          break;
        case "system":
          switchToSystemTheme();
          break;
      }
    })
  })

  // Add click event handler to the buttons
  themeToggleButtons.forEach((toggler) => {
    toggler.addEventListener("click", function (e) {
      e.preventDefault();

      const optionsElement = toggler.nextElementSibling;

      optionsElement.classList.toggle('hx:hidden');

      // Calculate the position of a language options element.
      const switcherRect = toggler.getBoundingClientRect();

      // Must be called before optionsElement.clientWidth.
      optionsElement.style.minWidth = `${Math.max(switcherRect.width, 50)}px`;

      const isOnTop = toggler.dataset.location === 'top';
      const isOnBottom = toggler.dataset.location === 'bottom';
      const isOnBottomLeft = toggler.dataset.location === 'bottom-left';
      const isRTL = document.body.dir === 'rtl'

      // Stuck on the left side of the switcher.
      let translateX = switcherRect.left;

      if (isOnTop && !isRTL || isOnBottom && isRTL || isOnBottomLeft && !isRTL) {
        // Stuck on the right side of the switcher.
        translateX = switcherRect.right - optionsElement.clientWidth;
      }

      // Stuck on the top of the switcher.
      let translateY = switcherRect.top - window.innerHeight - 15;

      if (isOnTop) {
        // Stuck on the bottom of the switcher.
        translateY = switcherRect.top - window.innerHeight + 150;
      }

      optionsElement.style.transform = `translate3d(${translateX}px, ${translateY}px, 0)`;
    });
  });


  // Dismiss the menu when clicking outside
  document.addEventListener('click', (e) => {
    if (e.target.closest('.hextra-theme-toggle') === null) {
      themeToggleButtons.forEach((toggler) => {
        toggler.dataset.state = 'closed';
        const optionsElement = toggler.nextElementSibling;
        optionsElement.classList.add('hx:hidden');
      });
    }
  });

  // Listen for system theme changes
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
    if (localStorage.getItem("color-theme") === "system") {
      setSystemTheme();
    }
  });
})();
