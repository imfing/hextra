/**
 * Check if the element is visible.
 * @param {Element} element Dom element
 * @returns boolean
 */
function isVisible(element) {
  return element.offsetWidth > 0 || element.offsetHeight > 0;
}

document.addEventListener("DOMContentLoaded", function () {
  scrollToActiveItem();
  enableCollapsibles();
});

function enableCollapsibles() {
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
          link.classList.add("active");
          link.classList.remove("inactive");

          if (!isVisible(link)) {
            return;
          }
          // recursively open parent lists
          let parent = link.parentElement;
          while (parent && !parent.classList.contains("hextra-sidebar-container")) {
            if (parent.tagName === "LI" && parent.classList.contains("hextra-sidebar-item")) {
              parent.classList.add("open");
            }
            parent = parent.parentElement;
          }
        }
      });
    }
  }
}

function scrollToActiveItem() {
  const sidebarScrollbar = document.querySelector("aside.sidebar-container > .hextra-scrollbar");
  const activeItems = document.querySelectorAll(".sidebar-active-item");
  const visibleActiveItem = Array.from(activeItems).find(function (activeItem) {
    return activeItem.getBoundingClientRect().height > 0;
  });

  if (!visibleActiveItem) {
    return;
  }

  const yOffset = visibleActiveItem.clientHeight;
  const yDistance = visibleActiveItem.getBoundingClientRect().top - sidebarScrollbar.getBoundingClientRect().top;
  sidebarScrollbar.scrollTo({
    behavior: "instant",
    top: yDistance - yOffset,
  });
}
