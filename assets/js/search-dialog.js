// Search command palette UI. Owns the <dialog>, keyboard shortcuts, result
// rendering, and animations. Reads data from `window.hextraSearch` (defined
// in flexsearch.js).

// {{ $noResultsFound := (T "noResultsFound") | default "No results found." }}

(function () {
  const resultsFoundTemplate = '{{ (T "resultsFound") | default "%d results found" | safeJS }}';
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
  let closeTimer = null;
  let collapseTimer = null;

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
        while (el.firstChild) el.removeChild(el.firstChild);
        const cmd = document.createElement('span');
        cmd.style.fontSize = '0.75rem';
        cmd.textContent = '⌘';
        el.appendChild(cmd);
        el.appendChild(document.createTextNode('K'));
      });
    }

    document.querySelectorAll('[data-search-open]').forEach(btn => {
      btn.addEventListener('click', () => openDialog());
    });

    const closeBtn = dialog.querySelector('[data-search-close]');
    if (closeBtn) closeBtn.addEventListener('click', () => closeDialog());

    document.addEventListener('keydown', handleGlobalKeyDown);

    input.addEventListener('input', runSearch);
    dialog.addEventListener('keydown', handleDialogKeyDown);

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

    // Result anchors are in the Tab sequence; keep aria-selected in sync with
    // the focused option so the highlighted row matches keyboard focus.
    resultsEl.addEventListener('focusin', (e) => {
      const anchor = e.target.closest('a[role="option"]');
      if (anchor) setActiveOption(anchor, { scroll: false });
    });

    // Dialog-level keyboard handling keeps input and result navigation in sync.
    // Enter on focused result anchors falls through to native anchor activation.
  }

  function handleGlobalKeyDown(e) {
    if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
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
    if (window.hextraSearch) window.hextraSearch.preload().catch(() => {});
  }

  function cancelClose() {
    if (closeAnimationListener) {
      dialog.removeEventListener('animationend', closeAnimationListener);
      closeAnimationListener = null;
    }
    if (closeTimer !== null) {
      clearTimeout(closeTimer);
      closeTimer = null;
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
    const finalize = () => {
      if (closeTimer !== null) {
        clearTimeout(closeTimer);
        closeTimer = null;
      }
      if (closeAnimationListener) {
        dialog.removeEventListener('animationend', closeAnimationListener);
        closeAnimationListener = null;
      }
      if (dialog.dataset.state === 'closing') {
        delete dialog.dataset.state;
        dialog.close();
      }
    };
    // The backdrop animation is the longest — wait for it so neither layer
    // gets cut off when the dialog is removed from the top layer.
    closeAnimationListener = (e) => {
      if (e.animationName !== 'hextra-search-backdrop-out') return;
      finalize();
    };
    dialog.addEventListener('animationend', closeAnimationListener);
    // animationend on ::backdrop doesn't bubble reliably across browsers
    // (Firefox in particular); force-close shortly after the 300ms animation
    // so the dialog can't get stranded.
    closeTimer = setTimeout(finalize, 400);
  }

  function setViewportExpanded(expanded) {
    if (!viewportEl) return;
    viewportEl.dataset.expanded = expanded ? 'true' : 'false';
  }

  function cancelCollapse() {
    if (collapseTimer !== null) {
      clearTimeout(collapseTimer);
      collapseTimer = null;
    }
  }

  function clearResults() {
    while (resultsEl.firstChild) resultsEl.removeChild(resultsEl.firstChild);
  }

  function handleDialogKeyDown(e) {
    const anchor = e.target.closest('a[role="option"]');
    const fromInput = e.target === input;
    if (!fromInput && !anchor) return;

    // During IME composition the user is still selecting a candidate; Enter
    // commits the candidate (not the result), arrow keys cycle candidates.
    if (fromInput && (e.isComposing || e.keyCode === 229)) return;

    const focusResults = !!anchor;
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        moveSelection(1, { current: anchor, focus: focusResults });
        break;
      case 'ArrowUp':
        e.preventDefault();
        moveSelection(-1, { current: anchor, focus: focusResults });
        break;
      case 'Home': {
        const all = getOptions();
        if (!all.length) return;
        e.preventDefault();
        selectOption(all[0], { focus: focusResults });
        break;
      }
      case 'End': {
        const all = getOptions();
        if (!all.length) return;
        e.preventDefault();
        selectOption(all[all.length - 1], { focus: focusResults });
        break;
      }
      case 'Enter': {
        if (!fromInput) return;
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

  function focusOption(el) {
    setActiveOption(el, { scroll: false });
    el.focus({ preventScroll: true });
    el.scrollIntoView({ block: 'nearest' });
  }

  function selectOption(el, opts) {
    if (opts && opts.focus) focusOption(el);
    else setActiveOption(el);
  }

  function moveSelection(delta, opts) {
    const options = getOptions();
    if (!options.length) return;
    const current = (opts && opts.current) || getActiveOption();
    let i = options.indexOf(current);
    if (i === -1) {
      i = delta > 0 ? 0 : options.length - 1;
    } else {
      i = (i + delta + options.length) % options.length;
    }
    selectOption(options[i], opts);
  }

  async function runSearch() {
    const query = input.value.trim();
    if (!query) {
      input.setAttribute('aria-activedescendant', '');
      if (statusEl) statusEl.textContent = '';
      setViewportExpanded(false);
      // Defer DOM clear until the viewport finishes collapsing — otherwise the
      // results vanish first and the viewport snaps to the inner padding before
      // animating the last few pixels to 0.
      cancelCollapse();
      collapseTimer = setTimeout(() => {
        collapseTimer = null;
        clearResults();
        if (emptyEl) emptyEl.hidden = true;
      }, 250);
      return;
    }
    if (!window.hextraSearch) return;
    let results;
    try {
      results = await window.hextraSearch.search(query);
    } catch (err) {
      // Stale failure for an old query — ignore. Otherwise log and fall
      // through to an empty render so the user sees feedback instead of stale
      // results.
      if (input.value.trim() !== query) return;
      console.warn('[hextra-search]', err);
      results = [];
    }
    // Drop stale results if the input changed during the await.
    if (input.value.trim() !== query) return;
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

  function getParentCrumb(result) {
    if (!result.prefix || !result.title) return result.prefix;
    if (result.prefix === result.title) return '';
    const suffix = ` > ${result.title}`;
    return result.prefix.endsWith(suffix) ? result.prefix.slice(0, -suffix.length) : result.prefix;
  }

  function renderResults(results, query) {
    cancelCollapse();
    clearResults();
    if (innerEl) innerEl.scrollTop = 0;

    if (!results.length) {
      if (emptyEl) emptyEl.hidden = false;
      if (statusEl) statusEl.textContent = noResultsText;
      input.setAttribute('aria-activedescendant', '');
      setViewportExpanded(true);
      return;
    }

    if (emptyEl) emptyEl.hidden = true;

    const fragment = document.createDocumentFragment();
    for (let i = 0; i < results.length; i++) {
      const result = results[i];
      const isParent = result.prefix !== undefined;
      const hasExcerpt = result.children.content && result.children.content !== result.children.title;

      const li = document.createElement('li');
      li.setAttribute('role', 'presentation');
      if (!isParent) li.classList.add('hextra-search-child');

      const link = document.createElement('a');
      link.id = result.id;
      link.href = result.route;
      link.setAttribute('role', 'option');
      link.setAttribute('aria-selected', i === 0 ? 'true' : 'false');

      const crumbText = isParent ? getParentCrumb(result) : result.prefix;
      if (crumbText) {
        const crumb = document.createElement('div');
        crumb.className = 'hextra-search-crumb';
        crumb.textContent = crumbText;
        link.appendChild(crumb);
      }

      const title = document.createElement('div');
      title.className = 'hextra-search-title';
      appendHighlightedText(title, isParent ? result.title : result.children.title, query);
      link.appendChild(title);

      if (!isParent && hasExcerpt) {
        const excerpt = document.createElement('div');
        excerpt.className = 'hextra-search-excerpt';
        appendHighlightedText(excerpt, result.children.content, query);
        link.appendChild(excerpt);
      }

      li.appendChild(link);
      fragment.appendChild(li);

      if (isParent && hasExcerpt) {
        const excerptLi = document.createElement('li');
        excerptLi.setAttribute('role', 'presentation');
        excerptLi.classList.add('hextra-search-child');

        const excerptLink = document.createElement('a');
        excerptLink.id = `${result.id}-excerpt`;
        excerptLink.href = result.route;
        excerptLink.setAttribute('role', 'option');
        excerptLink.setAttribute('aria-selected', 'false');
        excerptLink.setAttribute('aria-label', `${result.children.title} - ${result.children.content}`);

        if (result.children.title && result.children.title !== result.title) {
          const title = document.createElement('div');
          title.className = 'hextra-search-title';
          appendHighlightedText(title, result.children.title, query);
          excerptLink.appendChild(title);
        }

        const excerpt = document.createElement('div');
        excerpt.className = 'hextra-search-excerpt';
        appendHighlightedText(excerpt, result.children.content, query);
        excerptLink.appendChild(excerpt);

        excerptLi.appendChild(excerptLink);
        fragment.appendChild(excerptLi);
      }
    }
    resultsEl.appendChild(fragment);

    const firstOption = resultsEl.querySelector('a[role="option"]');
    if (firstOption) input.setAttribute('aria-activedescendant', firstOption.id || '');

    if (statusEl) {
      statusEl.textContent = resultsFoundTemplate.replace('%d', results.length.toString());
    }

    setViewportExpanded(true);
  }
})();
