// The section must not be in the banner.js (body) file because it can create a quick flash.

// {{- if site.Params.banner }}
if (localStorage.getItem('{{ site.Params.banner.key | default `banner-closed` }}')) {
  document.documentElement.style.setProperty("--hextra-banner-height", "0px");
  document.documentElement.classList.add("hextra-banner-hidden");
  document.documentElement.dataset.hextraBanner = "hidden";
} else {
  document.documentElement.dataset.hextraBanner = "visible";
}
// {{- end }}
