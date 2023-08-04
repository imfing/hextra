// {{ $searchDataFile := printf "%s.search-data.json" .Language.Lang }}
// {{ $searchData := resources.Get "json/search-data.json" | resources.ExecuteAsTemplate $searchDataFile . | resources.Minify | resources.Fingerprint }}

(function () {
  const searchDataURL = '{{ $searchData.Permalink }}';
  console.log('searchDataURL', searchDataURL);

  const indexConfig = {
    tokenize: "full",
    cache: 100,
    document: {
      id: 'id',
      store: ['title', 'href', 'section'],
      index: ["title", "content"]
    },
    context: {
      resolution: 9,
      depth: 2,
      bidirectional: true
    }
  }
  window.flexSearchIndex = new FlexSearch.Document(indexConfig);

  const input = document.getElementById('search-input');
  const results = document.getElementById('search-results');

  input.addEventListener('focus', init);
  input.addEventListener('keyup', search);


  /**
   * Initializes the search functionality by adding the necessary event listeners and fetching the search data.
   */
  function init() {
    input.removeEventListener('focus', init); // init once

    fetch(searchDataURL).then(resp => resp.json()).then(pages => {
      pages.forEach(page => {
        window.flexSearchIndex.add(page);
      });
    }).then(search);
  }

  function search() {
    console.log('search', input.value);
    while (results.firstChild) {
      results.removeChild(results.firstChild);
    }

    if (!input.value) {
      return;
    }

    const searchHits = window.flexSearchIndex.search(input.value, { limit: 5, enrich: true });
    showResults(searchHits);
  }

  function showResults(hits) {
    console.log('showResults', hits);
    const flatResults = new Map(); // keyed by href to dedupe hits
    for (const result of hits.flatMap(r => r.result)) {
      if (flatResults.has(result.doc.href)) continue;
      flatResults.set(result.doc.href, result.doc);
    }
    console.log('flatResults', flatResults);
    const create = (str) => {
      const div = document.createElement('div');
      div.innerHTML = str.trim();
      return div.firstChild;
    }
    const fragment = document.createDocumentFragment();

    console.log(fragment)

    for (const result of flatResults.values()) {
      const li = create(`
      <li class="mx-2.5 break-words rounded-md contrast-more:border text-gray-800 contrast-more:border-transparent dark:text-gray-300">
        <a class="block scroll-m-12 px-2.5 py-2" data-index="0" href="${result.href}">
          <div class="text-base font-semibold leading-5">${result.title}</div>
        </a>
      </li>`);
      fragment.appendChild(li);
    }
    results.appendChild(fragment);
  }
})();
