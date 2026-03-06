// Hamburger menu for mobile navigation

document.addEventListener('DOMContentLoaded', function () {
  const menu = document.querySelector('.hextra-hamburger-menu');
  const sidebarContainer = document.querySelector('.hextra-sidebar-container');
  const mobileQuery = window.matchMedia('(max-width: 767px)');

  function isMenuOpen() {
    return menu.querySelector('svg').classList.contains('open');
  }

  // On mobile, the sidebar is off-screen so hide it from assistive tech
  function syncAriaHidden() {
    if (mobileQuery.matches) {
      sidebarContainer.setAttribute('aria-hidden', isMenuOpen() ? 'false' : 'true');
    } else {
      sidebarContainer.removeAttribute('aria-hidden');
    }
  }

  // Set initial state
  syncAriaHidden();
  mobileQuery.addEventListener('change', syncAriaHidden);

  function toggleMenu(options = {}) {
    const { focusOnOpen = true } = options;

    // Toggle the hamburger menu
    menu.querySelector('svg').classList.toggle('open');

    // When the menu is open, we want to show the navigation sidebar
    sidebarContainer.classList.toggle('hx:max-md:[transform:translate3d(0,-100%,0)]');
    sidebarContainer.classList.toggle('hx:max-md:[transform:translate3d(0,0,0)]');

    // When the menu is open, we want to prevent the body from scrolling
    document.body.classList.toggle('hx:overflow-hidden');
    document.body.classList.toggle('hx:md:overflow-auto');

    // Sync aria-expanded and aria-hidden
    const isOpen = isMenuOpen();
    menu.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    syncAriaHidden();

    // Move focus into sidebar when opening, restore when closing
    if (isOpen) {
      if (focusOnOpen) {
        const firstFocusable = sidebarContainer.querySelector('a, button, input, [tabindex="0"]');
        if (firstFocusable) firstFocusable.focus();
      }
    } else {
      menu.focus();
    }
  }

  menu.addEventListener('click', (e) => {
    e.preventDefault();
    // Pointer-initiated clicks on mobile should not force focus into the search input,
    // which opens the software keyboard immediately.
    toggleMenu({ focusOnOpen: e.detail === 0 });
  });

  // Close menu on Escape key (mobile only)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileQuery.matches && isMenuOpen()) {
      toggleMenu();
    }
  });

  // Select all anchor tags in the sidebar container
  const sidebarLinks = sidebarContainer.querySelectorAll('a');

  // Add click event listener to each anchor tag
  sidebarLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      // Check if the href attribute contains a hash symbol (links to a heading)
      if (link.getAttribute('href') && link.getAttribute('href').startsWith('#')) {
        // Only dismiss overlay on mobile view
        if (window.innerWidth < 768) {
          toggleMenu();
        }
      }
    });
  });
});
