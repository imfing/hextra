// FlexSearch data plane. Builds the page + section indexes lazily on first
// use, runs queries, and returns normalized results. UI lives in
// search-dialog.js and consumes this via `window.hextraSearch`.

// Render the search data as JSON.
// {{ $searchDataFile := printf "%s.search-data.json" .Language.Lang }}
// {{ $searchData := resources.Get "json/search-data.json" | resources.ExecuteAsTemplate $searchDataFile . }}
// {{ if hugo.IsProduction }}
//   {{ $searchData := $searchData | minify | fingerprint }}
// {{ end }}

(function () {
  const searchDataURL = '{{ $searchData.RelPermalink }}';

  let pageIndex;
  let sectionIndex;
  let indexPromise = null;

  /**
   * Preloads the search index by fetching data and adding it to the FlexSearch index.
   * @returns {Promise<void>} A promise that resolves when the index is preloaded.
   */
  function preloadIndex() {
    if (indexPromise) return indexPromise;
    const attempt = (async () => {
      const tokenize = '{{- site.Params.search.flexsearch.tokenize | default  "forward" -}}';

      // https://github.com/TryGhost/Ghost/pull/21148
      const regex = new RegExp(
        `[\u{4E00}-\u{9FFF}\u{3040}-\u{309F}\u{30A0}-\u{30FF}\u{AC00}-\u{D7A3}\u{3400}-\u{4DBF}\u{20000}-\u{2A6DF}\u{2A700}-\u{2B73F}\u{2B740}-\u{2B81F}\u{2B820}-\u{2CEAF}\u{2CEB0}-\u{2EBEF}\u{30000}-\u{3134F}\u{31350}-\u{323AF}\u{2EBF0}-\u{2EE5F}\u{F900}-\u{FAFF}\u{2F800}-\u{2FA1F}]|[0-9A-Za-zа-яÀ-ſЀ-ӿ؀-ۿঀ-৿Ḁ-ỿ֐-׿]+`,
        'mug'
      );
      const encode = (str) => { return ('' + str).toLowerCase().match(regex) ?? []; }

      pageIndex = new FlexSearch.Document({
        tokenize,
        encode,
        cache: 100,
        document: {
          id: 'id',
          store: ['title', 'breadcrumbs'],
          index: "content"
        }
      });

      sectionIndex = new FlexSearch.Document({
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
        const urlParts = route.split('/').filter(x => x !== "" && !x.startsWith('#'));

        let crumb = '';
        const crumbParts = [];
        let searchUrl = '/';
        for (let i = 0; i < urlParts.length; i++) {
          const urlPart = urlParts[i];
          searchUrl += urlPart + '/'

          const crumbData = data[searchUrl];
          if (!crumbData) {
            console.debug('Excluded page', searchUrl, '- will not be included for search result breadcrumb for', route);
            continue;
          }

          let title = data[searchUrl].title;
          if (title === "_index") {
            title = urlPart.split("-").map(x => x).join(" ");
          }
          crumbParts.push(title);
          crumb += title;

          if (i < urlParts.length - 1) {
            crumb += ' > ';
          }
        }

        for (const heading in data[route].data) {
          const separator = heading.indexOf('#');
          const hash = separator === -1 ? heading : heading.slice(0, separator);
          const text = separator === -1 ? '' : heading.slice(separator + 1);
          const url = hash ? `${route}#${hash}` : route;
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

        pageIndex.add({
          id: pageId,
          title: data[route].title,
          breadcrumbs: crumbParts.slice(0, -1),
          content: pageContent
        });
      }
    })();
    // Clear the cached promise on failure so the next call retries instead of
    // returning the rejection forever.
    const wrapped = attempt.catch((err) => {
      if (indexPromise === wrapped) indexPromise = null;
      pageIndex = undefined;
      sectionIndex = undefined;
      throw err;
    });
    indexPromise = wrapped;
    return indexPromise;
  }

  /**
   * Run the actual FlexSearch query and return sorted, deduped page groups.
   * @param {string} query
   * @returns {Array<{id: string, route: string, title: string, breadcrumbs: string[], matches: Array<{id: string, route: string, title: string, content: string}>}>}
   */
  function performSearch(query) {
    const maxPageResults = parseInt('{{- site.Params.search.flexsearch.maxPageResults | default 20 -}}', 10);
    const maxSectionResults = parseInt('{{- site.Params.search.flexsearch.maxSectionResults | default 10 -}}', 10);
    const pageResults = pageIndex.search(query, maxPageResults, { enrich: true, suggest: true })[0]?.result || [];

    const groups = [];
    const pageTitleMatches = {};

    for (let i = 0; i < pageResults.length; i++) {
      const result = pageResults[i];
      pageTitleMatches[i] = 0;

      const sectionResults = sectionIndex.search(query,
        { enrich: true, suggest: true, tag: { 'pageId': `page_${result.id}` } })[0]?.result || [];
      const occurred = {};
      const group = {
        _page_rk: i,
        route: '',
        title: result.doc.title,
        breadcrumbs: result.doc.breadcrumbs || [],
        matches: []
      };

      const nResults = Math.min(sectionResults.length, maxSectionResults);
      for (let j = 0; j < nResults; j++) {
        const { doc } = sectionResults[j];
        const isMatchingTitle = doc.display !== undefined;
        if (isMatchingTitle) {
          pageTitleMatches[i]++;
        }
        const { url, title } = doc;
        const content = doc.display || doc.content;

        if (occurred[url + '@' + content]) continue;
        occurred[url + '@' + content] = true;
        if (!group.route) group.route = url.split('#')[0];
        group.matches.push({
          route: url,
          title,
          content
        });
      }

      if (group.matches.length) groups.push(group);
    }

    let optionId = 0;
    return groups
      .sort((a, b) => {
        if (pageTitleMatches[a._page_rk] !== pageTitleMatches[b._page_rk]) {
          return pageTitleMatches[b._page_rk] - pageTitleMatches[a._page_rk];
        }
        return a._page_rk - b._page_rk;
      })
      .map((res) => ({
        id: `hextra-search-opt-${optionId++}`,
        route: res.route,
        title: res.title,
        breadcrumbs: res.breadcrumbs,
        matches: res.matches.map((match) => ({
          id: `hextra-search-opt-${optionId++}`,
          route: match.route,
          title: match.title,
          content: match.content
        }))
      }));
  }

  window.hextraSearch = {
    preload: preloadIndex,
    async search(query) {
      await preloadIndex();
      return performSearch(query);
    },
  };
})();
