function computeMenuTranslation(switcher, optionsElement) {
  // Calculate the position of a language options element.
  const switcherRect = switcher.getBoundingClientRect();

  // Must be called before optionsElement.clientWidth.
  optionsElement.style.minWidth = `${Math.max(switcherRect.width, 50)}px`;

  const isOnTop = switcher.dataset.location === 'top';
  const isOnBottom = switcher.dataset.location === 'bottom';
  const isOnBottomRight = switcher.dataset.location === 'bottom-right';
  const isRTL = document.documentElement.dir === 'rtl'

  // Stuck on the left side of the switcher.
  let x = switcherRect.left;

  if (isOnTop && !isRTL || isOnBottom && isRTL || isOnBottomRight && !isRTL) {
    // Stuck on the right side of the switcher.
    x = switcherRect.right - optionsElement.clientWidth;
  }

  // Stuck on the top of the switcher.
  let y = switcherRect.top - window.innerHeight - 10;

  if (isOnTop) {
    // Stuck on the bottom of the switcher.
    y = switcherRect.top - window.innerHeight + optionsElement.clientHeight + switcher.clientHeight + 4;
  }

  return { x: x, y: y };
}

function toggleMenu(switcher) {
  const optionsElement = switcher.nextElementSibling;

  optionsElement.classList.toggle('hx:hidden');

  // Calculate the position of a language options element.
  const translate = computeMenuTranslation(switcher, optionsElement);

  optionsElement.style.transform = `translate3d(${translate.x}px, ${translate.y}px, 0)`;
}

function resizeMenu(switcher) {
  const optionsElement = switcher.nextElementSibling;

  if (optionsElement.classList.contains('hx:hidden')) return;

  // Calculate the position of a language options element.
  const translate = computeMenuTranslation(switcher, optionsElement);

  optionsElement.style.transform = `translate3d(${translate.x}px, ${translate.y}px, 0)`;
}
