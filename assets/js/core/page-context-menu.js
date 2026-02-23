document.addEventListener('DOMContentLoaded', () => {
  // Pre-fetch markdown content for all copy buttons to avoid Safari NotAllowedError
  // Safari requires clipboard writes to happen synchronously within user gesture
  const copyButtons = document.querySelectorAll('.hextra-page-context-menu-copy');
  const contentCache = new Map();

  // Pre-fetch content for each button on page load
  copyButtons.forEach(button => {
    const url = button.dataset.url;
    if (url) {
      fetch(url)
        .then(response => {
          if (response.ok) return response.text();
          throw new Error('Failed to fetch');
        })
        .then(markdown => contentCache.set(url, markdown))
        .catch(error => console.error('Failed to pre-fetch markdown:', error));
    }
  });

  // Initialize copy buttons with synchronous clipboard access
  copyButtons.forEach(button => {
    button.addEventListener('click', () => {
      const url = button.dataset.url;
      const markdown = contentCache.get(url);

      if (markdown) {
        // Synchronous clipboard write initiation - works in Safari
        navigator.clipboard.writeText(markdown)
          .then(() => {
            button.classList.add('copied');
            setTimeout(() => button.classList.remove('copied'), 1000);
          })
          .catch(error => console.error('Failed to copy markdown:', error));
      } else {
        // Fallback: fetch and copy (may fail in Safari if content not pre-fetched)
        fetch(url)
          .then(response => {
            if (!response.ok) throw new Error('Failed to fetch');
            return response.text();
          })
          .then(text => {
            contentCache.set(url, text);
            return navigator.clipboard.writeText(text);
          })
          .then(() => {
            button.classList.add('copied');
            setTimeout(() => button.classList.remove('copied'), 1000);
          })
          .catch(error => console.error('Failed to copy markdown:', error));
      }
    });
  });

  // Initialize dropdown toggles
  const dropdownToggles = document.querySelectorAll('.hextra-page-context-menu-toggle');
  dropdownToggles.forEach(toggle => {
    const container = toggle.closest('.hextra-page-context-menu');
    const menu = container.querySelector('.hextra-page-context-menu-dropdown');
    const chevron = toggle.querySelector('[data-chevron]');

    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = toggle.dataset.state === 'open';

      // Close all other dropdowns first
      dropdownToggles.forEach(t => {
        if (t !== toggle) {
          t.dataset.state = 'closed';
          t.setAttribute('aria-expanded', 'false');
          const otherContainer = t.closest('.hextra-page-context-menu');
          const otherMenu = otherContainer.querySelector('.hextra-page-context-menu-dropdown');
          const otherChevron = t.querySelector('[data-chevron]');
          otherMenu.classList.add('hx:hidden');
          if (otherChevron) {
            otherChevron.style.transform = '';
          }
        }
      });

      // Toggle current
      toggle.dataset.state = isOpen ? 'closed' : 'open';
      toggle.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
      menu.classList.toggle('hx:hidden', isOpen);

      // Rotate chevron icon
      if (chevron) {
        chevron.style.transform = isOpen ? '' : 'rotate(180deg)';
      }
    });
  });

  // Close dropdown when clicking outside
  document.addEventListener('click', (e) => {
    // Check if click is outside any dropdown container
    const isOutside = !e.target.closest('.hextra-page-context-menu');
    if (isOutside) {
      dropdownToggles.forEach(toggle => {
        toggle.dataset.state = 'closed';
        toggle.setAttribute('aria-expanded', 'false');
        const container = toggle.closest('.hextra-page-context-menu');
        const menu = container.querySelector('.hextra-page-context-menu-dropdown');
        const chevron = toggle.querySelector('[data-chevron]');
        menu.classList.add('hx:hidden');
        if (chevron) {
          chevron.style.transform = '';
        }
      });
    }
  });

  // Close dropdown on Escape key and return focus to toggle
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      dropdownToggles.forEach(toggle => {
        if (toggle.dataset.state === 'open') {
          const container = toggle.closest('.hextra-page-context-menu');
          closeDropdown(container);
          toggle.focus();
        }
      });
    }
  });

  // Helper to close dropdown
  const closeDropdown = (container) => {
    if (!container) return;
    
    const toggle = container.querySelector('.hextra-page-context-menu-toggle');
    const menu = container.querySelector('.hextra-page-context-menu-dropdown');
    
    if (!toggle || !menu) return;
    
    const chevron = toggle.querySelector('[data-chevron]');
    toggle.dataset.state = 'closed';
    toggle.setAttribute('aria-expanded', 'false');
    menu.classList.add('hx:hidden');
    if (chevron) {
      chevron.style.transform = '';
    }
  };

  // Handle dropdown menu copy action
  document.querySelectorAll('.hextra-page-context-menu-dropdown button[data-action="copy"]').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.stopPropagation();
      const container = btn.closest('.hextra-page-context-menu');
      if (!container) return;
      
      const copyBtn = container.querySelector('.hextra-page-context-menu-copy');
      if (!copyBtn) return;

      closeDropdown(container);
      copyBtn.click();
    });
  });

  // Handle dropdown menu view action
  document.querySelectorAll('.hextra-page-context-menu-dropdown button[data-action="view"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const container = btn.closest('.hextra-page-context-menu');
      if (!container) return;
      
      const url = btn.dataset.url;
      if (!url) return;

      closeDropdown(container);
      window.open(url, '_blank', 'noopener,noreferrer');
    });
  });
});
