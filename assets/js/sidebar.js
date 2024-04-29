/**
 * Check if the element is visible.
 * @param {Element} element Dom element
 * @returns boolean
 */
function isVisible(element) {
  return element.offsetWidth > 0 || element.offsetHeight > 0;
}

document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(".hextra-sidebar-collapsible-button");
  buttons.forEach(function (button) {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      const list = button.parentElement.parentElement;
      if (list) {
        list.classList.toggle("open");
      }
    });
  });

  const isCached = "{{- site.Params.page.sidebar.cache | default false -}}" === "true";
  const currentPagePath = window.location.href;

  if (isCached) {
    // find the current page in the sidebar and open the parent lists
    const sidebar = document.querySelector(".hextra-sidebar-container");
    if (sidebar) {
      // find a tags and compare href with current page path
      const links = sidebar.querySelectorAll("a");
      links.forEach(function (link) {
        const linkPath = link.href;

        if (currentPagePath === linkPath) {
          // add active class to the link
          link.classList.add("sidebar-item-active");
          link.classList.remove("sidebar-item-inactive");

          if (!isVisible(link)) {
            return;
          }
          // recursively open parent lists
          let parent = link.parentElement;
          while (parent && !parent.classList.contains("hextra-sidebar-container")) {
            if (parent.tagName === "LI" && parent.classList.contains("sidebar-item-list")) {
              parent.classList.add("open");
            }
            parent = parent.parentElement;
          }
        }
      });
    }
  }
});
