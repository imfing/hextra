// Hamburger menu for mobile navigation

const menu = document.querySelector('.hamburger-menu');

menu.addEventListener('click', (e) => {
  e.preventDefault();
  const sidebarContainer = document.querySelector('.sidebar-container');

  // Toggle the hamburger menu
  menu.querySelector('svg').classList.toggle('open');

  // When the menu is open, we want to show the navigation sidebar
  sidebarContainer.classList.toggle('max-md:[transform:translate3d(0,-100%,0)]');
  sidebarContainer.classList.toggle('max-md:[transform:translate3d(0,0,0)]');

  // When the menu is open, we want to prevent the body from scrolling
  document.body.classList.toggle('overflow-hidden');
  document.body.classList.toggle('md:overflow-auto');
});
