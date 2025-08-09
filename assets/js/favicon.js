// {{- $faviconDarkExists := fileExists (path.Join "static" "favicon-dark.svg") -}}
(function () {
  const faviconEl = document.getElementById("favicon-svg");
  if (!faviconEl) return;

  const faviconDarkExists = "{{ $faviconDarkExists }}";
  if (!faviconDarkExists) return;

  const lightFavicon = '{{ "favicon.svg" | relURL }}';
  const darkFavicon = '{{ "favicon-dark.svg" | relURL }}';

  const darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)");

  function updateFavicon(e) {
    faviconEl.href = e.matches ? darkFavicon : lightFavicon;
  }

  // Set favicon on load
  updateFavicon(darkModeQuery);

  // Listen for system preference changes
  darkModeQuery.addEventListener("change", updateFavicon);
})();
