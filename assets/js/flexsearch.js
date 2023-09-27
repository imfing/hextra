// Search functionality using FlexSearch.

// Change shortcut key to cmd+k on Mac, iPad or iPhone.
document.addEventListener("DOMContentLoaded", function () {
  if (/iPad|iPhone|Macintosh/.test(navigator.userAgent)) {
    // select the kbd element under the .search-wrapper class
    const keys = document.querySelectorAll(".search-wrapper kbd");
    keys.forEach(key => {
      key.innerHTML = '<span class="text-xs">⌘</span>K';
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

  const inputElements = document.querySelectorAll('.search-input');
  for (const el of inputElements) {
    el.addEventListener('focus', init);
    el.addEventListener('keyup', search);
    el.addEventListener('keydown', handleKeyDown);
  }

  // Get the search wrapper, input, and results elements.
  function getActiveSearchElement() {
    const inputs = Array.from(document.querySelectorAll('.search-wrapper')).filter(el => el.clientHeight > 0);
    if (inputs.length === 1) {
      return {
        wrapper: inputs[0],
        inputElement: inputs[0].querySelector('.search-input'),
        resultsElement: inputs[0].querySelector('.search-results')
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
      hideSearchResults();
    }
  });

  // Get the currently active result and its index.
  function getActiveResult() {
    const { resultsElement } = getActiveSearchElement();
    if (!resultsElement) return { result: undefined, index: -1 };

    const result = resultsElement.querySelector('.active');
    if (!result) return { result: undefined, index: -1 };

    const index = parseInt(result.dataset.index, 10);
    return { result, index };
  }

  // Set the active result by index.
  function setActiveResult(index) {
    const { resultsElement } = getActiveSearchElement();
    if (!resultsElement) return;

    const { result: activeResult } = getActiveResult();
    activeResult && activeResult.classList.remove('active');
    const result = resultsElement.querySelector(`[data-index="${index}"]`);
    if (result) {
      result.classList.add('active');
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
    resultsElement.classList.add('hidden');
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

  // Preload the search index.
  async function preloadIndex() {
    window.pageIndex = new FlexSearch.Document({
      tokenize: 'forward',
      cache: 100,
      document: {
        id: 'id',
        store: ['title'],
        index: "content"
      }
    });

    window.sectionIndex = new FlexSearch.Document({
      tokenize: 'forward',
      cache: 100,
      document: {
        id: 'id',
        store: ['title', 'content', 'url', 'display'],
        index: "content",
        tag: 'pageId'
      }
    });

    const resp = await fetch(searchDataURL);
    const data = await resp.json();
    let pageId = 0;
    for (const route in data) {
      let pageContent = '';
      ++pageId;

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
          pageId: `page_${pageId}`,
          content: title,
          ...(paragraphs[0] && { display: paragraphs[0] })
        });

        for (let i = 0; i < paragraphs.length; i++) {
          sectionIndex.add({
            id: `${url}_${i}`,
            url,
            title,
            pageId: `page_${pageId}`,
            content: paragraphs[i]
          });
        }

        pageContent += ` ${title} ${content}`;
      }

      window.pageIndex.add({
        id: pageId,
        title: data[route].title,
        content: pageContent
      });

    }
  }

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
    resultsElement.classList.remove('hidden');

    const pageResults = window.pageIndex.search(query, 5, { enrich: true, suggest: true })[0]?.result || [];

    const results = [];
    const pageTitleMatches = {};

    for (let i = 0; i < pageResults.length; i++) {
      const result = pageResults[i];
      pageTitleMatches[i] = 0;

      // Show the top 5 results for each page
      const sectionResults = window.sectionIndex.search(query, 5, { enrich: true, suggest: true, tag: `page_${result.id}` })[0]?.result || [];
      let isFirstItemOfPage = true
      const occurred = {}

      for (let j = 0; j < sectionResults.length; j++) {
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
          prefix: isFirstItemOfPage ? result.doc.title : undefined,
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

  function displayResults(results, query) {
    const { resultsElement } = getActiveSearchElement();
    if (!resultsElement) return;

    if (!results.length) {
      resultsElement.innerHTML = `<span class="no-result">{{ $noResultsFound | safeHTML }}</span>`;
      return;
    }

    // Highlight the query in the result text.
    function highlightMatches(text, query) {
      const escapedQuery = query.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');
      const regex = new RegExp(escapedQuery, 'gi');
      return text.replace(regex, (match) => `<span class="match">${match}</span>`);
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
        const active = resultsElement.querySelector('a.active');
        if (active) {
          active.classList.remove('active');
        }
        target.classList.add('active');
      }
    }

    const fragment = document.createDocumentFragment();
    for (let i = 0; i < results.length; i++) {
      const result = results[i];
      if (result.prefix) {
        fragment.appendChild(createElement(`
          <div class="prefix">${result.prefix}</div>`));
      }
      let li = createElement(`
        <li>
          <a data-index="${i}" href="${result.route}" class=${i === 0 ? "active" : ""}>
            <div class="title">`+ highlightMatches(result.children.title, query) + `</div>` +
        (result.children.content ?
          `<div class="excerpt">` + highlightMatches(result.children.content, query) + `</div>` : '') + `
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
