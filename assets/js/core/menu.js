// Hamburger menu for mobile navigation

document.addEventListener('DOMContentLoaded', function () {
  const menu = document.querySelector('.hextra-hamburger-menu');
  const sidebarContainer = document.querySelector('.hextra-sidebar-container');
  const mobileQuery = window.matchMedia('(max-width: 767px)');

  function isMenuOpen() {
    return sidebarContainer.hasAttribute('data-open');
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

    // Toggle the hamburger menu icon
    menu.querySelector('svg').classList.toggle('open');

    // Toggle sidebar visibility via data attribute
    if (isMenuOpen()) {
      sidebarContainer.removeAttribute('data-open');
      document.body.style.overflow = '';
    } else {
      sidebarContainer.setAttribute('data-open', '');
      document.body.style.overflow = 'hidden';
    }

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
    if (e.key !== 'Escape') return;
    if (document.getElementById('hextra-search-dialog')?.open) return;
    if (mobileQuery.matches && isMenuOpen()) {
      toggleMenu();
    }
  });

  // Dismiss the overlay when an in-page (hash) link is tapped on mobile.
  // Delegated to the container so links injected after load (e.g. the mobile
  // TOC inserted by sidebar.js) are covered without re-binding.
  sidebarContainer.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (!link || !sidebarContainer.contains(link)) return;
    const href = link.getAttribute('href');
    if (href && href.startsWith('#') && window.innerWidth < 768) {
      toggleMenu();
    }
  });
});
