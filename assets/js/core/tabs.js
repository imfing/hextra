(function () {
  function updateGroup(container, index) {
    const tabs = Array.from(container.querySelectorAll('.hextra-tabs-toggle'));
    tabs.forEach((tab, i) => {
      tab.dataset.state = i === index ? 'selected' : '';
      if (i === index) {
        tab.setAttribute('aria-selected', 'true');
        tab.tabIndex = 0;
      } else {
        tab.removeAttribute('aria-selected');
        tab.tabIndex = -1;
      }
    });
    const panelsContainer = container.parentElement.nextElementSibling;
    if (!panelsContainer) return;
    Array.from(panelsContainer.children).forEach((panel, i) => {
      panel.dataset.state = i === index ? 'selected' : '';
      if (i === index) {
        panel.tabIndex = 0;
      } else {
        panel.removeAttribute('tabindex');
      }
    });
  }

  const syncGroups = document.querySelectorAll('[data-tab-group]');

  syncGroups.forEach((group) => {
    const key = encodeURIComponent(group.dataset.tabGroup);
    const saved = localStorage.getItem('hextra-tab-' + key);
    if (saved !== null) {
      updateGroup(group, parseInt(saved, 10));
    }
  });

  document.querySelectorAll('.hextra-tabs-toggle').forEach((button) => {
    button.addEventListener('click', function (e) {
      const container = e.target.parentElement;
      const index = Array.from(container.querySelectorAll('.hextra-tabs-toggle')).indexOf(
        e.target
      );

      if (container.dataset.tabGroup) {
        // Sync behavior: update all tab groups with the same name
        const tabGroupValue = container.dataset.tabGroup;
        const key = encodeURIComponent(tabGroupValue);
        document
          .querySelectorAll('[data-tab-group="' + tabGroupValue + '"]')
          .forEach((grp) => updateGroup(grp, index));
        localStorage.setItem('hextra-tab-' + key, index.toString());
      } else {
        // Non-sync behavior: update only this specific tab group
        updateGroup(container, index);
      }
    });

    // Keyboard navigation for tabs
    button.addEventListener('keydown', function (e) {
      const container = button.parentElement;
      const tabs = Array.from(container.querySelectorAll('.hextra-tabs-toggle'));
      const currentIndex = tabs.indexOf(button);
      let newIndex;

      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
          e.preventDefault();
          newIndex = (currentIndex + 1) % tabs.length;
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
          e.preventDefault();
          newIndex = (currentIndex - 1 + tabs.length) % tabs.length;
          break;
        case 'Home':
          e.preventDefault();
          newIndex = 0;
          break;
        case 'End':
          e.preventDefault();
          newIndex = tabs.length - 1;
          break;
        default:
          return;
      }

      if (container.dataset.tabGroup) {
        const tabGroupValue = container.dataset.tabGroup;
        const key = encodeURIComponent(tabGroupValue);
        document
          .querySelectorAll('[data-tab-group="' + tabGroupValue + '"]')
          .forEach((grp) => updateGroup(grp, newIndex));
        localStorage.setItem('hextra-tab-' + key, newIndex.toString());
      } else {
        updateGroup(container, newIndex);
      }
      tabs[newIndex].focus();
    });
  });
})();
