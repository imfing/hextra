// Reset banner offset for sites without a banner
(function () {
  if (!document.querySelector(".hextra-banner")) {
    var s = document.querySelector(".hextra-sidebar-container");
    if (s) s.style.setProperty("--hextra-banner-height", "0px");
    document.documentElement.style.setProperty("--hextra-sidebar-banner-offset", "0px");
  }
})();

(function () {
  var banner = document.querySelector(".hextra-banner");
  if (!banner) return;

  var scheduled = false;

  function setSidebarBannerOffset() {
    scheduled = false;
    var offset = 0;
    if (!document.documentElement.classList.contains("hextra-banner-hidden")) {
      offset = Math.max(0, Math.round(banner.getBoundingClientRect().bottom));
    }
    document.documentElement.style.setProperty("--hextra-sidebar-banner-offset", offset + "px");
  }

  function scheduleSidebarBannerOffset() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(setSidebarBannerOffset);
  }

  setSidebarBannerOffset();
  window.addEventListener("scroll", scheduleSidebarBannerOffset, { passive: true });
  window.addEventListener("resize", scheduleSidebarBannerOffset);
})();

document.addEventListener("DOMContentLoaded", function () {
  var container = document.querySelector(".hextra-sidebar-container");
  if (!container) return;

  // Inline script in sidebar.html handles init before paint;
  // fallback if it didn't run (e.g. CSP blocking inline scripts)
  if (!container.hasAttribute("data-sidebar-ready")) {
    initActiveItem(container);
    restoreSessionState(container);
    container.offsetHeight;
    container.setAttribute("data-sidebar-ready", "");
  }
  // Restore the saved scroll position for stability across navigation, then
  // ensure the active item is visible. scrollToActiveItem() is a no-op when the
  // item already sits within the viewport, so a restored position is preserved
  // unless the active item would otherwise be off-screen.
  restoreSidebarScroll();
  scrollToActiveItem();
  injectMobileTOC(container);
  window.addEventListener("beforeunload", saveSidebarScroll);

  enableCollapsibles();
});

function getSidebarKey(li) {
  var link = li.querySelector(":scope > .hextra-sidebar-item > .hextra-sidebar-link");
  if (link) return link.getAttribute("href");
  var group = li.querySelector(":scope > .hextra-sidebar-item > .hextra-sidebar-group-title");
  if (group) return "group:" + group.textContent.trim();
  return null;
}

function loadSidebarState() {
  try {
    return JSON.parse(sessionStorage.getItem("hextra-sidebar-state")) || {};
  } catch (e) {
    return {};
  }
}

function saveSidebarState(state) {
  try {
    sessionStorage.setItem("hextra-sidebar-state", JSON.stringify(state));
  } catch (e) {}
}

function normalizeSidebarPath(path) {
  return path && path.length > 1 ? path.replace(/\/$/, "") : path;
}

function initActiveItem(container) {
  var currentPath = normalizeSidebarPath(window.location.pathname);
  container.querySelectorAll(".hextra-sidebar-link").forEach(function (link) {
    if (normalizeSidebarPath(link.getAttribute("href")) !== currentPath) return;

    link.classList.remove("hextra-sidebar-link-inactive");
    link.classList.add("hextra-sidebar-link-active", "hextra-sidebar-active-item");
    link.setAttribute("aria-current", "page");

    var item = link.closest(".hextra-sidebar-item");
    if (item) item.setAttribute("data-active", "true");

    var li = link.closest("li");
    while (li) {
      li.classList.add("open");
      var btn = li.querySelector(":scope > .hextra-sidebar-item > .hextra-sidebar-collapsible-button");
      if (btn) btn.setAttribute("aria-expanded", "true");
      li = li.parentElement && li.parentElement.closest("li");
    }
  });
}

function restoreSessionState(container) {
  var state = loadSidebarState();
  container.querySelectorAll("li").forEach(function (li) {
    var key = getSidebarKey(li);
    if (!key || !(key in state)) return;
    if (li.querySelector(".hextra-sidebar-link-active")) return;

    var isOpen = state[key];
    li.classList.toggle("open", isOpen);
    var btn = li.querySelector(":scope > .hextra-sidebar-item > .hextra-sidebar-collapsible-button");
    if (btn) btn.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });
}

function injectMobileTOC(container) {
  var template = container.querySelector("template[data-mobile-toc]");
  if (!template) return;

  var mobileList = container.querySelector(".hextra-sidebar-mobile-list");
  if (!mobileList) return;

  var activeLink = mobileList.querySelector(".hextra-sidebar-active-item");
  if (!activeLink) {
    var desktopActiveLink = container.querySelector(".hextra-sidebar-desktop-list .hextra-sidebar-active-item");
    var activePath = desktopActiveLink && normalizeSidebarPath(desktopActiveLink.getAttribute("href"));
    if (activePath) {
      activeLink = Array.from(mobileList.querySelectorAll(".hextra-sidebar-link")).find(function (link) {
        return normalizeSidebarPath(link.getAttribute("href")) === activePath;
      });
    }
  }

  var li = activeLink ? activeLink.closest("li") : null;
  if (!li) li = mobileList.querySelector("li.open") || mobileList.querySelector("li");
  if (!li) return;

  var item = li.querySelector(":scope > .hextra-sidebar-item");
  if (item) {
    item.after(template.content.cloneNode(true));
  }
}

function enableCollapsibles() {
  document.querySelectorAll(".hextra-sidebar-collapsible-button").forEach(function (button) {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      var list = button.closest("li");
      if (!list) return;

      list.classList.toggle("open");
      var isOpen = list.classList.contains("open");
      button.setAttribute("aria-expanded", isOpen ? "true" : "false");

      var key = getSidebarKey(list);
      if (key) {
        var state = loadSidebarState();
        state[key] = isOpen;
        saveSidebarState(state);
      }
    });
  });
}

function restoreSidebarScroll() {
  var saved = null;
  try {
    saved = sessionStorage.getItem("hextra-sidebar-scroll");
  } catch (e) {}
  if (saved === null) return;
  var scrollbar = document.querySelector("aside.hextra-sidebar-container > .hextra-scrollbar");
  if (scrollbar) scrollbar.scrollTop = parseInt(saved, 10);
}

function saveSidebarScroll() {
  var scrollbar = document.querySelector("aside.hextra-sidebar-container > .hextra-scrollbar");
  if (scrollbar) {
    try {
      sessionStorage.setItem("hextra-sidebar-scroll", scrollbar.scrollTop);
    } catch (e) {}
  }
}

function scrollToActiveItem() {
  var sidebarScrollbar = document.querySelector("aside.hextra-sidebar-container > .hextra-scrollbar");
  var activeItems = document.querySelectorAll(".hextra-sidebar-active-item");
  var visibleActiveItem = Array.from(activeItems).find(function (activeItem) {
    return activeItem.getBoundingClientRect().height > 0;
  });

  if (!visibleActiveItem || !sidebarScrollbar) return;

  var containerRect = sidebarScrollbar.getBoundingClientRect();
  var itemRect = visibleActiveItem.getBoundingClientRect();

  if (itemRect.top >= containerRect.top && itemRect.bottom <= containerRect.bottom) return;

  var scrollTop = sidebarScrollbar.scrollTop;
  var itemCenter = itemRect.top - containerRect.top + scrollTop + itemRect.height / 2;
  sidebarScrollbar.scrollTo({
    behavior: "instant",
    top: itemCenter - containerRect.height / 2,
  });
}
