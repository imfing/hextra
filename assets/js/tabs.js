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
        tab.removeAttribute('tabindex');
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
  });
})();
