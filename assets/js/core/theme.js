// Light / Dark theme toggle
(function () {
  const defaultTheme = '{{ site.Params.theme.default | default `system`}}'
  const themes = ["light", "dark"];

  const themeToggleButtons = document.querySelectorAll(".hextra-theme-toggle");
  const themeToggleOptions = document.querySelectorAll(".hextra-theme-toggle-options button[role=menuitemradio]");

  function applyTheme(theme) {
    theme = themes.includes(theme) ? theme : "system";

    themeToggleButtons.forEach((btn) => btn.parentElement.dataset.theme = theme );
    themeToggleOptions.forEach((option) => {
      option.setAttribute('aria-checked', option.dataset.item === theme ? 'true' : 'false');
    });

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

      toggler.dataset.state = toggler.dataset.state === 'open' ? 'closed' : 'open';
      toggleMenu(toggler);
      const isOpen = toggler.dataset.state === 'open';
      toggler.setAttribute('aria-expanded', isOpen ? 'true' : 'false');

      // Focus first menuitem when opening
      if (isOpen) {
        const firstItem = toggler.nextElementSibling.querySelector('button[role=menuitemradio]');
        if (firstItem) firstItem.focus();
      }
    });
  });

  window.addEventListener("resize", () => themeToggleButtons.forEach(resizeMenu))

  // Dismiss the menu when clicking outside
  document.addEventListener('click', (e) => {
    if (e.target.closest('.hextra-theme-toggle') === null) {
      themeToggleButtons.forEach((toggler) => {
        toggler.dataset.state = 'closed';
        toggler.setAttribute('aria-expanded', 'false');
        toggler.nextElementSibling.classList.add('hx:hidden');
      });
    }
  });

  // Keyboard navigation for the theme menu
  document.querySelectorAll('.hextra-theme-toggle-options[role=menu]').forEach(function (menu) {
    menu.addEventListener('keydown', function (e) {
      const items = Array.from(menu.querySelectorAll('button[role=menuitemradio]'));
      const currentIndex = items.indexOf(document.activeElement);
      let newIndex;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          newIndex = (currentIndex + 1) % items.length;
          items[newIndex].focus();
          break;
        case 'ArrowUp':
          e.preventDefault();
          newIndex = (currentIndex - 1 + items.length) % items.length;
          items[newIndex].focus();
          break;
        case 'Home':
          e.preventDefault();
          items[0].focus();
          break;
        case 'End':
          e.preventDefault();
          items[items.length - 1].focus();
          break;
        case 'Escape':
          e.preventDefault();
          var toggler = menu.previousElementSibling;
          toggler.dataset.state = 'closed';
          toggler.setAttribute('aria-expanded', 'false');
          menu.classList.add('hx:hidden');
          toggler.focus();
          break;
      }
    });
  });

  // Listen for system theme changes
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
    if (localStorage.getItem("color-theme") === "system") {
      setTheme("system");
    }
  });
})();
