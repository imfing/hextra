(function () {
  const languageSwitchers = document.querySelectorAll('.hextra-language-switcher');
  languageSwitchers.forEach((switcher) => {
    switcher.addEventListener('click', (e) => {
      e.preventDefault();

      switcher.dataset.state = switcher.dataset.state === 'open' ? 'closed' : 'open';

      const optionsElement = switcher.nextElementSibling;

      optionsElement.classList.toggle('hx:hidden');

      // Calculate the position of a language options element.
      const switcherRect = switcher.getBoundingClientRect();

      // Must be called before optionsElement.clientWidth.
      optionsElement.style.minWidth = `${Math.max(switcherRect.width, 50)}px`;

      const isOnTop = switcher.dataset.location === 'top';
      const isRTL = document.body.dir === 'rtl'

      // Stuck on the left side of the switcher.
      let translateX = switcherRect.left;

      if (isOnTop && !isRTL || !isOnTop && isRTL) {
        // Stuck on the right side of the switcher.
        translateX = switcherRect.right - optionsElement.clientWidth;
      }

      // Stuck on the top of the switcher.
      let translateY = switcherRect.top - window.innerHeight - 15;

      if (isOnTop) {
        // Stuck on the bottom of the switcher.
        translateY = switcherRect.top - window.innerHeight + 180;
      }

      optionsElement.style.transform = `translate3d(${translateX}px, ${translateY}px, 0)`;
    });
  });

  // Dismiss language switcher when clicking outside
  document.addEventListener('click', (e) => {
    if (e.target.closest('.hextra-language-switcher') === null) {
      languageSwitchers.forEach((switcher) => {
        switcher.dataset.state = 'closed';
        const optionsElement = switcher.nextElementSibling;
        optionsElement.classList.add('hx:hidden');
      });
    }
  });
})();
