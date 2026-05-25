// Search command palette UI. Owns the <dialog>, keyboard shortcuts, result
// rendering, and animations. Reads data from `window.hextraSearch` (defined
// in flexsearch.js).

// {{ $noResultsFound := (T "noResultsFound") | default "No results found." }}

(function () {
  const resultsFoundTemplate = '{{ (T "resultsFound") | default "%d results found" }}';
  const noResultsText = '{{ $noResultsFound | safeJS }}';

  const EDITABLE_TAGS = ['INPUT', 'SELECT', 'BUTTON', 'TEXTAREA'];
  const isMac = /iPad|iPhone|Macintosh/.test(navigator.userAgent);

  let dialog;
  let input;
  let resultsEl;
  let emptyEl;
  let statusEl;
  let viewportEl;
  let innerEl;
  let closeAnimationListener = null;

  document.addEventListener('DOMContentLoaded', init);

  function init() {
    dialog = document.getElementById('hextra-search-dialog');
    if (!dialog) return;

    input = dialog.querySelector('.hextra-search-input');
    resultsEl = dialog.querySelector('.hextra-search-results');
    emptyEl = dialog.querySelector('[data-search-empty]');
    statusEl = dialog.querySelector('.hextra-search-status');
    viewportEl = dialog.querySelector('[data-search-viewport]');
    innerEl = dialog.querySelector('[data-search-inner]');

    if (isMac) {
      document.querySelectorAll('.hextra-search-trigger-kbd').forEach(el => {
        el.innerHTML = '<span class="hx:text-xs">⌘</span>K';
      });
    }

    document.querySelectorAll('[data-search-open]').forEach(btn => {
      btn.addEventListener('click', () => openDialog());
    });

    document.addEventListener('keydown', handleGlobalKeyDown);

    input.addEventListener('input', runSearch);
    input.addEventListener('keydown', handleInputKeyDown);

    // Click on backdrop closes the dialog.
    dialog.addEventListener('click', (e) => {
      if (e.target === dialog) closeDialog();
    });

    // Keep the previous query and results when reopening — only flip aria state.
    dialog.addEventListener('close', () => {
      input.setAttribute('aria-expanded', 'false');
    });

    // Intercept the native Escape "cancel" so we can play the close animation.
    dialog.addEventListener('cancel', (e) => {
      e.preventDefault();
      closeDialog();
    });

    // Delegate result clicks so we can close the dialog on navigation.
    resultsEl.addEventListener('click', (e) => {
      const anchor = e.target.closest('a[role="option"]');
      if (anchor) closeDialog();
    });

    // Hover updates selection like a standard command palette.
    resultsEl.addEventListener('mousemove', (e) => {
      const anchor = e.target.closest('a[role="option"]');
      if (anchor) setActiveOption(anchor, { scroll: false });
    });
  }

  function handleGlobalKeyDown(e) {
    if ((e.key === 'k' || e.key === 'K') && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      // A dialog mid-dismiss is logically "closed" for toggle purposes — without
      // this, a rapid second Cmd+K is eaten by closeDialog's early-return.
      const isClosing = dialog.dataset.state === 'closing';
      if (dialog.open && !isClosing) closeDialog();
      else openDialog();
      return;
    }

    if (dialog.open) return;

    if (e.key === '/') {
      const active = document.activeElement;
      const tag = active && active.tagName;
      const inEditable = active && (EDITABLE_TAGS.includes(tag) || active.isContentEditable);
      if (inEditable) return;
      e.preventDefault();
      openDialog();
    }
  }

  function openDialog() {
    // Mid-dismiss? Cancel the close animation and stay open — the in animation
    // re-plays so the dialog visibly snaps back instead of completing the fade.
    if (dialog.open && dialog.dataset.state === 'closing') {
      cancelClose();
      input.focus();
      input.select();
      return;
    }
    if (dialog.open) return;
    dialog.showModal();
    input.setAttribute('aria-expanded', 'true');
    // showModal autofocuses the first focusable element, but be explicit.
    // Select existing query so typing immediately replaces it.
    requestAnimationFrame(() => {
      input.focus();
      input.select();
    });
    if (window.hextraSearch) window.hextraSearch.preload();
  }

  function cancelClose() {
    if (closeAnimationListener) {
      dialog.removeEventListener('animationend', closeAnimationListener);
      closeAnimationListener = null;
    }
    delete dialog.dataset.state;
  }

  function closeDialog() {
    if (!dialog.open || dialog.dataset.state === 'closing') return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      dialog.close();
      return;
    }

    dialog.dataset.state = 'closing';
    // The backdrop animation is the longest — wait for it so neither layer
    // gets cut off when the dialog is removed from the top layer.
    closeAnimationListener = (e) => {
      if (e.animationName !== 'hextra-search-backdrop-out') return;
      dialog.removeEventListener('animationend', closeAnimationListener);
      closeAnimationListener = null;
      delete dialog.dataset.state;
      dialog.close();
    };
    dialog.addEventListener('animationend', closeAnimationListener);
  }

  function collapseViewport() {
    if (!viewportEl) return;
    viewportEl.style.setProperty('--hextra-search-height', '0px');
  }

  function syncViewport() {
    if (!viewportEl || !innerEl) return;
    viewportEl.style.setProperty('--hextra-search-height', innerEl.offsetHeight + 'px');
  }

  function clearResults() {
    while (resultsEl.firstChild) resultsEl.removeChild(resultsEl.firstChild);
  }

  function handleInputKeyDown(e) {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        moveSelection(1);
        break;
      case 'ArrowUp':
        e.preventDefault();
        moveSelection(-1);
        break;
      case 'Home':
        if (!getOptions().length) return;
        e.preventDefault();
        setActiveOption(getOptions()[0]);
        break;
      case 'End': {
        const all = getOptions();
        if (!all.length) return;
        e.preventDefault();
        setActiveOption(all[all.length - 1]);
        break;
      }
      case 'Enter': {
        const opt = getActiveOption();
        if (!opt) return;
        e.preventDefault();
        opt.click();
        break;
      }
      case 'Escape':
        // input[type=search] clears its value on Escape and swallows the event,
        // so close the dialog explicitly here.
        e.preventDefault();
        closeDialog();
        break;
    }
  }

  function getOptions() {
    return Array.from(resultsEl.querySelectorAll('a[role="option"]'));
  }

  function getActiveOption() {
    return resultsEl.querySelector('a[aria-selected="true"]');
  }

  function setActiveOption(el, opts) {
    const scroll = !opts || opts.scroll !== false;
    getOptions().forEach((o) => {
      o.setAttribute('aria-selected', o === el ? 'true' : 'false');
    });
    if (el) {
      input.setAttribute('aria-activedescendant', el.id || '');
      if (scroll) el.scrollIntoView({ block: 'nearest' });
    } else {
      input.setAttribute('aria-activedescendant', '');
    }
  }

  function moveSelection(delta) {
    const options = getOptions();
    if (!options.length) return;
    const current = getActiveOption();
    let i = options.indexOf(current);
    if (i === -1) {
      i = delta > 0 ? 0 : options.length - 1;
    } else {
      i = (i + delta + options.length) % options.length;
    }
    setActiveOption(options[i]);
  }

  async function runSearch() {
    const query = input.value.trim();
    if (!query) {
      clearResults();
      if (emptyEl) emptyEl.hidden = true;
      input.setAttribute('aria-activedescendant', '');
      if (statusEl) statusEl.textContent = '';
      collapseViewport();
      return;
    }
    if (!window.hextraSearch) return;
    const results = await window.hextraSearch.search(query);
    renderResults(results, query);
  }

  function appendHighlightedText(container, text, query) {
    if (!text) return;
    if (!query) {
      container.textContent = text;
      return;
    }
    const escapedQuery = query.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');
    if (!escapedQuery) {
      container.textContent = text;
      return;
    }
    const regex = new RegExp(escapedQuery, 'gi');
    let lastIndex = 0;
    let match;
    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        container.appendChild(document.createTextNode(text.slice(lastIndex, match.index)));
      }
      const span = document.createElement('span');
      span.className = 'hextra-search-match';
      span.textContent = match[0];
      container.appendChild(span);
      lastIndex = match.index + match[0].length;
    }
    if (lastIndex < text.length) {
      container.appendChild(document.createTextNode(text.slice(lastIndex)));
    }
  }

  function renderResults(results, query) {
    clearResults();

    if (!results.length) {
      if (emptyEl) emptyEl.hidden = false;
      if (statusEl) statusEl.textContent = noResultsText;
      input.setAttribute('aria-activedescendant', '');
      syncViewport();
      return;
    }

    if (emptyEl) emptyEl.hidden = true;

    const fragment = document.createDocumentFragment();
    for (let i = 0; i < results.length; i++) {
      const result = results[i];
      const isParent = !!result.prefix;

      const li = document.createElement('li');
      li.setAttribute('role', 'presentation');
      if (!isParent) li.classList.add('hextra-search-child');

      const link = document.createElement('a');
      link.id = result.id;
      link.href = result.route;
      link.setAttribute('role', 'option');
      link.setAttribute('aria-selected', i === 0 ? 'true' : 'false');

      if (isParent) {
        const crumb = document.createElement('div');
        crumb.className = 'hextra-search-crumb';
        crumb.textContent = result.prefix;
        link.appendChild(crumb);

        const title = document.createElement('div');
        title.className = 'hextra-search-title';
        appendHighlightedText(title, result.children.title, query);
        link.appendChild(title);
      } else {
        const excerpt = document.createElement('div');
        excerpt.className = 'hextra-search-excerpt';
        appendHighlightedText(excerpt, result.children.content || result.children.title, query);
        link.appendChild(excerpt);
      }

      li.appendChild(link);
      fragment.appendChild(li);
    }
    resultsEl.appendChild(fragment);

    const firstOption = resultsEl.querySelector('a[role="option"]');
    if (firstOption) input.setAttribute('aria-activedescendant', firstOption.id || '');

    if (statusEl) {
      statusEl.textContent = resultsFoundTemplate.replace('%d', results.length.toString());
    }

    syncViewport();
  }
})();
