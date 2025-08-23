// {{- if site.Params.banner }}
(function () {
  const closeBtn = document.querySelector(".hextra-banner .hextra-banner-close-button");

  closeBtn.addEventListener("click", () => {
    document.documentElement.classList.add("hextra-banner-hidden");
    document.documentElement.style.setProperty("--hextra-banner-height", "0px");

    localStorage.setItem('{{ site.Params.banner.key | default `banner-closed` }}', "0");
  });
})();
// {{- end -}}
