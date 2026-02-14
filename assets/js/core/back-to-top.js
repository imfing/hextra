// Back to top button

document.addEventListener("DOMContentLoaded", function () {
  const backToTop = document.querySelector("#backToTop");
  if (backToTop) {
    document.addEventListener("scroll", (e) => {
      if (window.scrollY > 300) {
        backToTop.classList.remove("hx:opacity-0");
        backToTop.removeAttribute("tabindex");
      } else {
        backToTop.classList.add("hx:opacity-0");
        backToTop.setAttribute("tabindex", "-1");
      }
    });
  }
});

function scrollUp() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.scroll({
    top: 0,
    left: 0,
    behavior: prefersReducedMotion ? 'auto' : 'smooth',
  });
}
