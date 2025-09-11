/*!
 * Hextra Image Zoom
 * - Zooms images inside `.content` into a dark, blurred overlay.
 * - Dismiss: overlay click, Esc, wheel/scroll (non-ctrl).
 * - Pinch/trackpad pinch (wheel+ctrl) will NOT dismiss.
 * - Opt out per image via `data-no-zoom`.
 * - Customize via CSS vars: --hextra-image-zoom-backdrop, --hextra-image-zoom-blur.
 */

(function () {
  'use strict';

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

    function close(immediate = false) {
      // trigger dedicated closing transitions for smoother zoom-out
      overlay.classList.add("closing");
      window.removeEventListener("keydown", onKeyDown, true);
      window.removeEventListener("scroll", onScroll, true);
      overlay.removeEventListener("wheel", onWheel);

      if (immediate) {
        overlay.remove();
        return;
      }
      overlay.addEventListener("transitionend", () => overlay.remove(), { once: true });
    }

    function onKeyDown(e) {
      if (e.key === "Escape") close();
    }

    overlay.addEventListener("click", () => close(false), { once: true });
    window.addEventListener("keydown", onKeyDown, true);

    function onWheel(e) { if (e && e.ctrlKey) return; close(true); }
    function onScroll() { close(true); }

    overlay.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("scroll", onScroll, true);

    document.body.appendChild(overlay);

    // trigger fade-in
    requestAnimationFrame(() => overlay.classList.add("show"));
  }

  // Initialize after DOM is parsed; defer script ensures this usually fires immediately
  document.addEventListener('DOMContentLoaded', function () {
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
  }, { once: true });
})();
