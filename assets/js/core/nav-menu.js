(function () {
  const hiddenClass = "hx:hidden";
  const dropdownToggles = document.querySelectorAll(".hextra-nav-menu-toggle");

  // Function to open dropdown
  function openDropdown(toggle) {
    const menuItemsElement = toggle.nextElementSibling;

    // Position dropdown centered with toggle
    menuItemsElement.style.position = "absolute";
    menuItemsElement.style.top = "100%";
    menuItemsElement.style.left = "50%";
    menuItemsElement.style.transform = "translateX(-50%)";
    menuItemsElement.style.zIndex = "1000";

    // Show dropdown
    toggle.dataset.state = "open";
    menuItemsElement.classList.remove(hiddenClass);
  }

  // Function to close dropdown
  function closeDropdown(toggle) {
    toggle.dataset.state = "closed";
    const menuItemsElement = toggle.nextElementSibling;
    menuItemsElement.classList.add(hiddenClass);
  }

  dropdownToggles.forEach((toggle) => {
    toggle.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();

      // Close all other dropdowns first
      dropdownToggles.forEach((otherToggle) => {
        if (otherToggle !== toggle) {
          closeDropdown(otherToggle);
        }
      });

      // Toggle current dropdown
      const isOpen = toggle.dataset.state === "open";
      if (!isOpen) {
        openDropdown(toggle);
      } else {
        closeDropdown(toggle);
      }
    });

    // Mouse enter event for hover effect
    toggle.addEventListener("mouseenter", (e) => {
      e.preventDefault();
      e.stopPropagation();

      // Close all other dropdowns first
      dropdownToggles.forEach((otherToggle) => {
        if (otherToggle !== toggle) {
          closeDropdown(otherToggle);
        }
      });

      // Open current dropdown
      openDropdown(toggle);
    });

    // Mouse leave event to close dropdown when mouse leaves the toggle
    toggle.addEventListener("mouseleave", (e) => {
      // Use a timeout to allow moving to the dropdown menu
      setTimeout(() => {
        const menuItemsElement = toggle.nextElementSibling;
        if (!menuItemsElement.matches(":hover") && toggle.dataset.state === "open") {
          closeDropdown(toggle);
        }
      }, 100);
    });

    // Also handle mouse leaving the dropdown menu itself
    const menuItemsElement = toggle.nextElementSibling;
    menuItemsElement.addEventListener("mouseleave", (e) => {
      // Use a timeout to allow moving back to the toggle
      setTimeout(() => {
        if (!toggle.matches(":hover") && toggle.dataset.state === "open") {
          closeDropdown(toggle);
        }
      }, 100);
    });
  });

  // Dismiss dropdown when clicking outside
  document.addEventListener("click", (e) => {
    if (e.target.closest(".hextra-nav-menu-toggle") === null) {
      dropdownToggles.forEach((toggle) => {
        toggle.dataset.state = "closed";
        const menuItemsElement = toggle.nextElementSibling;
        menuItemsElement.classList.add(hiddenClass);
      });
    }
  });

  // Close dropdowns on escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      dropdownToggles.forEach((toggle) => {
        toggle.dataset.state = "closed";
        const menuItemsElement = toggle.nextElementSibling;
        menuItemsElement.classList.add(hiddenClass);
      });
    }
  });
})();
