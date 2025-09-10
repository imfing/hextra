// Minimal, dependency-free image zoom for Hextra
// - Activates on images inside `.content`
// - Close on overlay click or Escape
// - Opt-out with `data-no-zoom` on <img>

(function () {
  function ready(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn, { once: true });
    } else {
      fn();
    }
  }

  function createOverlay(src, alt) {
    const overlay = document.createElement("div");
    overlay.className = "hextra-zoom-image-overlay";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");

    const img = document.createElement("img");
    img.className = "hextra-zoom-image";
    img.src = src;
    if (alt) img.alt = alt;

    overlay.appendChild(img);

    function close() {
      overlay.classList.remove("show");
      document.documentElement.style.removeProperty("overflow");
      window.removeEventListener("keydown", onKeyDown, true);
      overlay.addEventListener(
        "transitionend",
        () => overlay.remove(),
        { once: true }
      );
    }

    function onKeyDown(e) {
      if (e.key === "Escape") close();
    }

    overlay.addEventListener("click", close, { once: true });
    window.addEventListener("keydown", onKeyDown, true);

    document.body.appendChild(overlay);
    // lock scroll
    document.documentElement.style.overflow = "hidden";

    // trigger fade-in
    requestAnimationFrame(() => overlay.classList.add("show"));
  }

  ready(function () {
    const container = document.querySelector(".content");
    if (!container) return;

    container.addEventListener(
      "click",
      function (e) {
        const target = e.target;
        if (!(target instanceof HTMLImageElement)) return;
        if (target.dataset.noZoom === "" || target.dataset.noZoom === "true") return;

        // avoid following parent links when zooming
        e.preventDefault();
        e.stopPropagation();

        const src = target.currentSrc || target.src;
        if (!src) return;
        createOverlay(src, target.alt || "");
      },
      true
    );
  });
})();
