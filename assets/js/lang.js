(function () {
  const languageSwitchers = document.querySelectorAll('.hextra-language-switcher');

  languageSwitchers.forEach((switcher) => {
    switcher.addEventListener('click', (e) => {
      e.preventDefault();

      switcher.dataset.state = switcher.dataset.state === 'open' ? 'closed' : 'open';

      toggleMenu(switcher);
    });
  });

  window.addEventListener("resize", () => languageSwitchers.forEach(resizeMenu))

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
