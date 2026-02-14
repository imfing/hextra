(function () {
  const hiddenClass = "hx:hidden";
  const dropdownToggles = document.querySelectorAll(".hextra-nav-menu-toggle");
  const closeDropdown = (toggle, focusToggle = false) => {
    toggle.dataset.state = "closed";
    toggle.setAttribute("aria-expanded", "false");
    const menuItemsElement = toggle.nextElementSibling;
    menuItemsElement.classList.add(hiddenClass);
    if (focusToggle) {
      toggle.focus();
    }
  };

  const openDropdown = (toggle, focusTarget = "none") => {
    // Close all other dropdowns first.
    dropdownToggles.forEach((otherToggle) => {
      if (otherToggle !== toggle) {
        closeDropdown(otherToggle);
      }
    });

    toggle.dataset.state = "open";
    toggle.setAttribute("aria-expanded", "true");
    const menuItemsElement = toggle.nextElementSibling;

    // Position dropdown centered with toggle.
    menuItemsElement.style.position = "absolute";
    menuItemsElement.style.top = "100%";
    menuItemsElement.style.left = "50%";
    menuItemsElement.style.transform = "translateX(-50%)";
    menuItemsElement.style.zIndex = "1000";
    menuItemsElement.classList.remove(hiddenClass);

    if (focusTarget !== "none") {
      const items = Array.from(menuItemsElement.querySelectorAll('[role="menuitem"]'));
      if (items.length > 0) {
        const target = focusTarget === "last" ? items[items.length - 1] : items[0];
        target.focus();
      }
    }
  };

  dropdownToggles.forEach((toggle) => {
    toggle.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();

      // Toggle current dropdown.
      const isOpen = toggle.dataset.state === "open";
      if (isOpen) {
        closeDropdown(toggle);
      } else {
        openDropdown(toggle);
      }
    });

    toggle.addEventListener("keydown", (e) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        openDropdown(toggle, "first");
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        openDropdown(toggle, "last");
      }
    });
  });

  document.querySelectorAll(".hextra-nav-menu-items[role=menu]").forEach((menu) => {
    menu.addEventListener("keydown", (e) => {
      const items = Array.from(menu.querySelectorAll('[role="menuitem"]'));
      if (items.length === 0) return;

      const currentIndex = items.indexOf(document.activeElement);
      let newIndex;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          newIndex = (currentIndex + 1) % items.length;
          items[newIndex].focus();
          break;
        case "ArrowUp":
          e.preventDefault();
          newIndex = (currentIndex - 1 + items.length) % items.length;
          items[newIndex].focus();
          break;
        case "Home":
          e.preventDefault();
          items[0].focus();
          break;
        case "End":
          e.preventDefault();
          items[items.length - 1].focus();
          break;
        case "Escape": {
          e.preventDefault();
          const toggle = menu.previousElementSibling;
          if (toggle) {
            closeDropdown(toggle, true);
          }
          break;
        }
      }
    });
  });

  // Dismiss dropdown when clicking outside.
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".hextra-nav-menu-toggle") && !e.target.closest(".hextra-nav-menu-items")) {
      dropdownToggles.forEach((toggle) => {
        closeDropdown(toggle);
      });
    }
  });

  // Close dropdowns on escape key.
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      dropdownToggles.forEach((toggle) => {
        if (toggle.dataset.state === "open") {
          closeDropdown(toggle, true);
        }
      });
    }
  });
})();
