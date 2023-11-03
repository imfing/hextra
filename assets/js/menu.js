// Hamburger menu for mobile navigation

document.addEventListener('DOMContentLoaded', function () {
  const menu = document.querySelector('.hamburger-menu');
  const overlay = document.querySelector('.mobile-menu-overlay');
  const sidebarContainer = document.querySelector('.sidebar-container');

  // Initialize the overlay
  const overlayClasses = ['fixed', 'inset-0', 'z-10', 'bg-black/80', 'dark:bg-black/60'];
  overlay.classList.add('bg-transparent');
  overlay.classList.remove("hidden", ...overlayClasses);

  function toggleMenu() {
    // Toggle the hamburger menu
    menu.querySelector('svg').classList.toggle('open');

    // When the menu is open, we want to show the navigation sidebar
    sidebarContainer.classList.toggle('max-md:[transform:translate3d(0,-100%,0)]');
    sidebarContainer.classList.toggle('max-md:[transform:translate3d(0,0,0)]');

    // When the menu is open, we want to prevent the body from scrolling
    document.body.classList.toggle('overflow-hidden');
    document.body.classList.toggle('md:overflow-auto');
  }

  menu.addEventListener('click', (e) => {
    e.preventDefault();
    toggleMenu();

    if (overlay.classList.contains('bg-transparent')) {
      // Show the overlay
      overlay.classList.add(...overlayClasses);
      overlay.classList.remove('bg-transparent');
    } else {
      // Hide the overlay
      overlay.classList.remove(...overlayClasses);
      overlay.classList.add('bg-transparent');
    }
  });

  overlay.addEventListener('click', (e) => {
    e.preventDefault();
    toggleMenu();

    // Hide the overlay
    overlay.classList.remove(...overlayClasses);
    overlay.classList.add('bg-transparent');
  });
});
