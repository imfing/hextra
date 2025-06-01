(function () {
  const hiddenClass = "hx:hidden";
  const dropdownToggles = document.querySelectorAll(".hextra-nav-menu-toggle");

  dropdownToggles.forEach((toggle) => {
    toggle.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();

      // Close all other dropdowns first
      dropdownToggles.forEach((otherToggle) => {
        if (otherToggle !== toggle) {
          otherToggle.dataset.state = "closed";
          const otherMenuItems = otherToggle.nextElementSibling;
          otherMenuItems.classList.add(hiddenClass);
        }
      });

      // Toggle current dropdown
      const isOpen = toggle.dataset.state === "open";
      toggle.dataset.state = isOpen ? "closed" : "open";
      const menuItemsElement = toggle.nextElementSibling;

      if (!isOpen) {
        // Position dropdown centered with toggle
        menuItemsElement.style.position = "absolute";
        menuItemsElement.style.top = "100%";
        menuItemsElement.style.left = "50%";
        menuItemsElement.style.transform = "translateX(-50%)";
        menuItemsElement.style.zIndex = "1000";

        // Show dropdown
        menuItemsElement.classList.remove(hiddenClass);
      } else {
        // Hide dropdown
        menuItemsElement.classList.add(hiddenClass);
      }
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
