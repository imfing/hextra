// Light / Dark theme toggle
(function () {
  const defaultTheme = '{{ site.Params.theme.default | default `system`}}'
  const themes = ["light", "dark"];

  const themeToggleButtons = document.querySelectorAll(".hextra-theme-toggle");
  const themeToggleOptions = document.querySelectorAll(".hextra-theme-toggle-options p");

  function applyTheme(theme) {
    theme = themes.includes(theme) ? theme : "system";

    themeToggleButtons.forEach((btn) => btn.parentElement.dataset.theme = theme );

    localStorage.setItem("color-theme", theme);
  }

  function switchTheme(theme) {
    setTheme(theme);
    applyTheme(theme);
  }

  const colorTheme = "color-theme" in localStorage ? localStorage.getItem("color-theme") : defaultTheme;
  switchTheme(colorTheme);

  // Add click event handler to the menu items.
  themeToggleOptions.forEach((option) => {
    option.addEventListener("click", function (e) {
      e.preventDefault();

      switchTheme(option.dataset.item);
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
      const isOnBottomRight = toggler.dataset.location === 'bottom-right';
      const isRTL = document.body.dir === 'rtl'

      // Stuck on the left side of the switcher.
      let translateX = switcherRect.left;

      if (isOnTop && !isRTL || isOnBottom && isRTL || isOnBottomRight && !isRTL) {
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
        toggler.nextElementSibling.classList.add('hx:hidden');
      });
    }
  });

  // Listen for system theme changes
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
    if (localStorage.getItem("color-theme") === "system") {
      setTheme("system");
    }
  });
})();
