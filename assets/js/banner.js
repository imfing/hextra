// {{- if site.Params.banner }}
(function () {
  const closeBtn = document.querySelector(".hextra-top-banner .hextra-close-banner");

  closeBtn.addEventListener("click", () => {
    document.documentElement.classList.add("hextra-top-banner-hidden");

    localStorage.setItem('{{ site.Params.banner.key | default `banner-closed` }}', "0");
  });
})();
// {{- end -}}
