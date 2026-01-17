// Search functionality using FlexSearch.

// Change shortcut key to cmd+k on Mac, iPad or iPhone.
document.addEventListener("DOMContentLoaded", function () {
  if (/iPad|iPhone|Macintosh/.test(navigator.userAgent)) {
    // select the kbd element under the .hextra-search-wrapper class
    const keys = document.querySelectorAll(".hextra-search-wrapper kbd");
    keys.forEach(key => {
      key.innerHTML = '<span class="hx:text-xs">⌘</span>K';
    });
  }
});

// Render the search data as JSON.
// {{ $searchDataFile := printf "%s.search-data.json" .Language.Lang }}
// {{ $searchData := resources.Get "json/search-data.json" | resources.ExecuteAsTemplate $searchDataFile . }}
// {{ if hugo.IsProduction }}
//   {{ $searchData := $searchData | minify | fingerprint }}
// {{ end }}
// {{ $noResultsFound := (T "noResultsFound") | default "No results found." }}

(function () {
  const searchDataURL = '{{ $searchData.RelPermalink }}';

  const inputElements = document.querySelectorAll('.hextra-search-input');
  for (const el of inputElements) {
    el.addEventListener('focus', init);
    el.addEventListener('keyup', search);
    el.addEventListener('keydown', handleKeyDown);
    el.addEventListener('input', handleInputChange);
  }

  const shortcutElements = document.querySelectorAll('.hextra-search-wrapper kbd');

  function setShortcutElementsOpacity(opacity) {
    shortcutElements.forEach(el => {
      el.style.opacity = opacity;
    });
  }

  function handleInputChange(e) {
    const opacity = e.target.value.length > 0 ? 0 : 100;
    setShortcutElementsOpacity(opacity);
  }

  // Get the search wrapper, input, and results elements.
  function getActiveSearchElement() {
    const inputs = Array.from(document.querySelectorAll('.hextra-search-wrapper')).filter(el => el.clientHeight > 0);
    if (inputs.length === 1) {
      return {
        wrapper: inputs[0],
        inputElement: inputs[0].querySelector('.hextra-search-input'),
        resultsElement: inputs[0].querySelector('.hextra-search-results')
      };
    }
    return undefined;
  }

  const INPUTS = ['input', 'select', 'button', 'textarea']

  // Focus the search input when pressing ctrl+k/cmd+k or /.
  document.addEventListener('keydown', function (e) {
    const { inputElement } = getActiveSearchElement();
    if (!inputElement) return;

    const activeElement = document.activeElement;
    const tagName = activeElement && activeElement.tagName;
    if (
      inputElement === activeElement ||
      !tagName ||
      INPUTS.includes(tagName) ||
      (activeElement && activeElement.isContentEditable))
      return;

    if (
      e.key === '/' ||
      (e.key === 'k' &&
        (e.metaKey /* for Mac */ || /* for non-Mac */ e.ctrlKey))
    ) {
      e.preventDefault();
      inputElement.focus();
    } else if (e.key === 'Escape' && inputElement.value) {
      inputElement.blur();
    }
  });

  // Dismiss the search results when clicking outside the search box.
  document.addEventListener('mousedown', function (e) {
    const { inputElement, resultsElement } = getActiveSearchElement();
    if (!inputElement || !resultsElement) return;
    if (
      e.target !== inputElement &&
      e.target !== resultsElement &&
      !resultsElement.contains(e.target)
    ) {
      setShortcutElementsOpacity(100);
      hideSearchResults();
    }
  });

  // Get the currently active result and its index.
  function getActiveResult() {
    const { resultsElement } = getActiveSearchElement();
    if (!resultsElement) return { result: undefined, index: -1 };

    const result = resultsElement.querySelector('.hextra-search-active');
    if (!result) return { result: undefined, index: -1 };

    const index = parseInt(result.dataset.index, 10);
    return { result, index };
  }

  // Set the active result by index.
  function setActiveResult(index) {
    const { resultsElement } = getActiveSearchElement();
    if (!resultsElement) return;

    const { result: activeResult } = getActiveResult();
    activeResult && activeResult.classList.remove('hextra-search-active');
    const result = resultsElement.querySelector(`[data-index="${index}"]`);
    if (result) {
      result.classList.add('hextra-search-active');
      result.focus();
    }
  }

  // Get the number of search results from the DOM.
  function getResultsLength() {
    const { resultsElement } = getActiveSearchElement();
    if (!resultsElement) return 0;
    return resultsElement.dataset.count;
  }

  // Finish the search by hiding the results and clearing the input.
  function finishSearch() {
    const { inputElement } = getActiveSearchElement();
    if (!inputElement) return;
    hideSearchResults();
    inputElement.value = '';
    inputElement.blur();
  }

  function hideSearchResults() {
    const { resultsElement } = getActiveSearchElement();
    if (!resultsElement) return;
    resultsElement.classList.add('hx:hidden');
  }

  // Handle keyboard events.
  function handleKeyDown(e) {
    const { inputElement } = getActiveSearchElement();
    if (!inputElement) return;

    const resultsLength = getResultsLength();
    const { result: activeResult, index: activeIndex } = getActiveResult();

    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault();
        if (activeIndex > 0) setActiveResult(activeIndex - 1);
        break;
      case 'ArrowDown':
        e.preventDefault();
        if (activeIndex + 1 < resultsLength) setActiveResult(activeIndex + 1);
        break;
      case 'Enter':
        e.preventDefault();
        if (activeResult) {
          activeResult.click();
        }
        finishSearch();
      case 'Escape':
        e.preventDefault();
        hideSearchResults();
        // Clear the input when pressing escape
        inputElement.value = '';
        inputElement.dispatchEvent(new Event('input'));
        // Remove focus from the input
        inputElement.blur();
        break;
    }
  }

  // Initializes the search.
  function init(e) {
    e.target.removeEventListener('focus', init);
    if (!(window.pageIndex && window.sectionIndex)) {
      preloadIndex();
    }
  }

  /**
   * Preloads the search index by fetching data and adding it to the FlexSearch index.
   * @returns {Promise<void>} A promise that resolves when the index is preloaded.
   */
  async function preloadIndex() {
    const tokenize = '{{- site.Params.search.flexsearch.tokenize | default  "forward" -}}';

    // https://github.com/TryGhost/Ghost/pull/21148
    const regex = new RegExp(
      `[\u{4E00}-\u{9FFF}\u{3040}-\u{309F}\u{30A0}-\u{30FF}\u{AC00}-\u{D7A3}\u{3400}-\u{4DBF}\u{20000}-\u{2A6DF}\u{2A700}-\u{2B73F}\u{2B740}-\u{2B81F}\u{2B820}-\u{2CEAF}\u{2CEB0}-\u{2EBEF}\u{30000}-\u{3134F}\u{31350}-\u{323AF}\u{2EBF0}-\u{2EE5F}\u{F900}-\u{FAFF}\u{2F800}-\u{2FA1F}]|[0-9A-Za-zа-я\u00C0-\u017F\u0400-\u04FF\u0600-\u06FF\u0980-\u09FF\u1E00-\u1EFF\u0590-\u05FF]+`,
      'mug'
    );
    const encode = (str) => { return ('' + str).toLowerCase().match(regex) ?? []; }

    window.pageIndex = new FlexSearch.Document({
      tokenize,
      encode,
      cache: 100,
      document: {
        id: 'id',
        store: ['title', 'crumb'],
        index: "content"
      }
    });

    window.sectionIndex = new FlexSearch.Document({
      tokenize,
      encode,
      cache: 100,
      document: {
        id: 'id',
        store: ['title', 'content', 'url', 'display', 'crumb'],
        index: "content",
        tag: [{
          field: "pageId"
        }]
      }
    });

    const resp = await fetch(searchDataURL);
    const data = await resp.json();
    let pageId = 0;
    for (const route in data) {
      let pageContent = '';
      ++pageId;
      const urlParts = route.split('/').filter(x => x != "" && !x.startsWith('#'));

      let crumb = '';
      let searchUrl = '/';
      for (let i = 0; i < urlParts.length; i++) {
        const urlPart = urlParts[i];
        searchUrl += urlPart + '/'

        const crumbData = data[searchUrl];
        if (!crumbData) {
          console.warn('Excluded page', searchUrl, '- will not be included for search result breadcrumb for', route);
          continue;
        }

        let title = data[searchUrl].title;
        if (title == "_index") {
          title = urlPart.split("-").map(x => x).join(" ");
        }
        crumb += title;

        if (i < urlParts.length - 1) {
          crumb += ' > ';
        }
      }

      for (const heading in data[route].data) {
        const [hash, text] = heading.split('#');
        const url = route.trimEnd('/') + (hash ? '#' + hash : '');
        const title = text || data[route].title;

        const content = data[route].data[heading] || '';
        const paragraphs = content.split('\n').filter(Boolean);

        sectionIndex.add({
          id: url,
          url,
          title,
          crumb,
          pageId: `page_${pageId}`,
          content: title,
          ...(paragraphs[0] && { display: paragraphs[0] })
        });

        for (let i = 0; i < paragraphs.length; i++) {
          sectionIndex.add({
            id: `${url}_${i}`,
            url,
            title,
            crumb,
            pageId: `page_${pageId}`,
            content: paragraphs[i]
          });
        }

        pageContent += ` ${title} ${content}`;
      }

      window.pageIndex.add({
        id: pageId,
        title: data[route].title,
        crumb,
        content: pageContent
      });

    }
  }

  /**
   * Performs a search based on the provided query and displays the results.
   * @param {Event} e - The event object.
   */
  function search(e) {
    const query = e.target.value;
    if (!e.target.value) {
      hideSearchResults();
      return;
    }

    const { resultsElement } = getActiveSearchElement();
    while (resultsElement.firstChild) {
      resultsElement.removeChild(resultsElement.firstChild);
    }
    resultsElement.classList.remove('hx:hidden');

    // Configurable search limits with sensible defaults
    const maxPageResults = parseInt('{{- site.Params.search.flexsearch.maxPageResults | default 20 -}}', 10);
    const maxSectionResults = parseInt('{{- site.Params.search.flexsearch.maxSectionResults | default 10 -}}', 10);
    const pageResults = window.pageIndex.search(query, maxPageResults, { enrich: true, suggest: true })[0]?.result || [];

    const results = [];
    const pageTitleMatches = {};

    for (let i = 0; i < pageResults.length; i++) {
      const result = pageResults[i];
      pageTitleMatches[i] = 0;

      const sectionResults = window.sectionIndex.search(query,
        { enrich: true, suggest: true, tag: { 'pageId': `page_${result.id}` } })[0]?.result || [];
      let isFirstItemOfPage = true
      const occurred = {}

      const nResults = Math.min(sectionResults.length, maxSectionResults);
      for (let j = 0; j < nResults; j++) {
        const { doc } = sectionResults[j]
        const isMatchingTitle = doc.display !== undefined
        if (isMatchingTitle) {
          pageTitleMatches[i]++
        }
        const { url, title } = doc
        const content = doc.display || doc.content

        if (occurred[url + '@' + content]) continue
        occurred[url + '@' + content] = true
        results.push({
          _page_rk: i,
          _section_rk: j,
          route: url,
          prefix: isFirstItemOfPage ? result.doc.crumb : undefined,
          children: { title, content }
        })
        isFirstItemOfPage = false
      }
    }
    const sortedResults = results
      .sort((a, b) => {
        // Sort by number of matches in the title.
        if (a._page_rk === b._page_rk) {
          return a._section_rk - b._section_rk
        }
        if (pageTitleMatches[a._page_rk] !== pageTitleMatches[b._page_rk]) {
          return pageTitleMatches[b._page_rk] - pageTitleMatches[a._page_rk]
        }
        return a._page_rk - b._page_rk
      })
      .map(res => ({
        id: `${res._page_rk}_${res._section_rk}`,
        route: res.route,
        prefix: res.prefix,
        children: res.children
      }));
    displayResults(sortedResults, query);
  }

  /**
   * Displays the search results on the page.
   *
   * @param {Array} results - The array of search results.
   * @param {string} query - The search query.
   */
  function displayResults(results, query) {
    const { resultsElement } = getActiveSearchElement();
    if (!resultsElement) return;

    if (!results.length) {
      resultsElement.innerHTML = `<span class="hextra-search-no-result">{{ $noResultsFound | safeHTML }}</span>`;
      return;
    }

    // Highlight the query in the result text.
    function highlightMatches(text, query) {
      const escapedQuery = query.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');
      const regex = new RegExp(escapedQuery, 'gi');
      return text.replace(regex, (match) => `<span class="hextra-search-match">${match}</span>`);
    }

    // Create a DOM element from the HTML string.
    function createElement(str) {
      const div = document.createElement('div');
      div.innerHTML = str.trim();
      return div.firstChild;
    }

    function handleMouseMove(e) {
      const target = e.target.closest('a');
      if (target) {
        const active = resultsElement.querySelector('a.hextra-search-active');
        if (active) {
          active.classList.remove('hextra-search-active');
        }
        target.classList.add('hextra-search-active');
      }
    }

    const fragment = document.createDocumentFragment();
    for (let i = 0; i < results.length; i++) {
      const result = results[i];
      if (result.prefix) {
        fragment.appendChild(createElement(`
          <div class="hextra-search-prefix">${result.prefix}</div>`));
      }
        let li = createElement(`
        <li>
          <a data-index="${i}" href="${result.route}" class=${i === 0 ? "hextra-search-active" : ""}>
            <div class="hextra-search-title">`+ highlightMatches(result.children.title, query) + `</div>` +
        (result.children.content ?
            `<div class="hextra-search-excerpt">` + highlightMatches(result.children.content, query) + `</div>` : '') + `
          </a>
        </li>`);
      li.addEventListener('mousemove', handleMouseMove);
      li.addEventListener('keydown', handleKeyDown);
      li.querySelector('a').addEventListener('click', finishSearch);
      fragment.appendChild(li);
    }
    resultsElement.appendChild(fragment);
    resultsElement.dataset.count = results.length;
  }
})();
