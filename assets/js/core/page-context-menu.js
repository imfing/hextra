document.addEventListener('DOMContentLoaded', () => {
  // Initialize copy buttons
  const copyButtons = document.querySelectorAll('.hextra-page-context-menu-copy');
  copyButtons.forEach(button => {
    button.addEventListener('click', async () => {
      const url = button.dataset.url;

      try {
        // Fetch markdown content from Hugo output format URL
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch markdown content');
        }
        const markdown = await response.text();

        // Copy to clipboard
        await navigator.clipboard.writeText(markdown);

        // Show success feedback (add 'copied' class for 1000ms)
        button.classList.add('copied');
        setTimeout(() => button.classList.remove('copied'), 1000);
      } catch (error) {
        console.error('Failed to copy markdown:', error);
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
          const otherContainer = t.closest('.hextra-page-context-menu');
          const otherMenu = otherContainer.querySelector('.hextra-page-context-menu-dropdown');
          const otherChevron = t.querySelector('[data-chevron]');
          otherMenu.classList.add('hx:hidden');
          otherChevron.style.transform = '';
        }
      });

      // Toggle current
      toggle.dataset.state = isOpen ? 'closed' : 'open';
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

  // Helper to close dropdown
  const closeDropdown = (container) => {
    const toggle = container.querySelector('.hextra-page-context-menu-toggle');
    const menu = container.querySelector('.hextra-page-context-menu-dropdown');
    const chevron = toggle.querySelector('[data-chevron]');
    toggle.dataset.state = 'closed';
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
      const copyBtn = container.querySelector('.hextra-page-context-menu-copy');

      closeDropdown(container);
      copyBtn.click();
    });
  });

  // Handle dropdown menu view action
  document.querySelectorAll('.hextra-page-context-menu-dropdown button[data-action="view"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const container = btn.closest('.hextra-page-context-menu');
      const url = btn.dataset.url;

      closeDropdown(container);
      window.open(url, '_blank', 'noopener,noreferrer');
    });
  });
});
