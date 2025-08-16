(function () {
  const languageSwitchers = document.querySelectorAll('.hextra-language-switcher');
  languageSwitchers.forEach((switcher) => {
    switcher.addEventListener('click', (e) => {
      e.preventDefault();
      switcher.dataset.state = switcher.dataset.state === 'open' ? 'closed' : 'open';
      const optionsElement = switcher.nextElementSibling;
      optionsElement.classList.toggle('hx:hidden');

      // Calculate position of language options element
      const switcherRect = switcher.getBoundingClientRect();

      let translateX = switcherRect.left;
      let translateY = switcherRect.top - window.innerHeight - 15;

      if (switcher.dataset.location === 'top') {
        if (document.body.dir !== 'rtl') {
          translateX = switcherRect.right - optionsElement.clientWidth;
        }

        translateY = switcherRect.top - window.innerHeight + 180;
      }

      optionsElement.style.transform = `translate3d(${translateX}px, ${translateY}px, 0)`;
      optionsElement.style.minWidth = `${Math.max(switcherRect.width, 50)}px`;
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
