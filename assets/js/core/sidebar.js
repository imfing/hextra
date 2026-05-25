// Reset banner offset for sites without a banner
(function () {
  if (!document.querySelector('.hextra-banner')) {
    var s = document.querySelector('.hextra-sidebar-container');
    if (s) s.style.setProperty('--hextra-banner-height', '0px');
    document.documentElement.style.setProperty('--hextra-sidebar-banner-offset', '0px');
  }
})();

(function () {
  var banner = document.querySelector('.hextra-banner');
  if (!banner) return;

  var scheduled = false;

  function setSidebarBannerOffset() {
    scheduled = false;
    var offset = 0;
    if (!document.documentElement.classList.contains('hextra-banner-hidden')) {
      offset = Math.max(0, Math.round(banner.getBoundingClientRect().bottom));
    }
    document.documentElement.style.setProperty('--hextra-sidebar-banner-offset', offset + 'px');
  }

  function scheduleSidebarBannerOffset() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(setSidebarBannerOffset);
  }

  setSidebarBannerOffset();
  window.addEventListener('scroll', scheduleSidebarBannerOffset, { passive: true });
  window.addEventListener('resize', scheduleSidebarBannerOffset);
})();

document.addEventListener("DOMContentLoaded", function () {
  var container = document.querySelector('.hextra-sidebar-container');
  var isCacheMode = container && container.hasAttribute('data-sidebar-cache');

  if (isCacheMode) {
    // Inline script in sidebar.html handles init before paint;
    // fallback if it didn't run (e.g. CSP blocking inline scripts)
    if (!container.hasAttribute('data-sidebar-ready')) {
      initActiveItem(container);
      restoreSessionState(container);
      container.offsetHeight;
      container.setAttribute('data-sidebar-ready', '');
    }
    if (!restoreSidebarScroll()) scrollToActiveItem();
    injectMobileTOC(container);
    window.addEventListener('beforeunload', saveSidebarScroll);
  } else {
    scrollToActiveItem();
  }

  enableCollapsibles(isCacheMode);
});

function getSidebarKey(li) {
  var link = li.querySelector(':scope > .hextra-sidebar-item > .hextra-sidebar-link');
  if (link) return link.getAttribute('href');
  var group = li.querySelector(':scope > .hextra-sidebar-item > .hextra-sidebar-group-title');
  if (group) return 'group:' + group.textContent.trim();
  return null;
}

function loadSidebarState() {
  try {
    return JSON.parse(sessionStorage.getItem('hextra-sidebar-state')) || {};
  } catch (e) {
    return {};
  }
}

function saveSidebarState(state) {
  try {
    sessionStorage.setItem('hextra-sidebar-state', JSON.stringify(state));
  } catch (e) {}
}

function initActiveItem(container) {
  var currentPath = window.location.pathname;
  container.querySelectorAll('.hextra-sidebar-link').forEach(function (link) {
    if (link.getAttribute('href') !== currentPath) return;

    link.classList.remove('hextra-sidebar-link-inactive');
    link.classList.add('hextra-sidebar-link-active', 'hextra-sidebar-active-item');

    var item = link.closest('.hextra-sidebar-item');
    if (item) item.setAttribute('data-active', 'true');

    var li = link.closest('li');
    while (li) {
      li.classList.add('open');
      var btn = li.querySelector(':scope > .hextra-sidebar-item > .hextra-sidebar-collapsible-button');
      if (btn) btn.setAttribute('aria-expanded', 'true');
      li = li.parentElement && li.parentElement.closest('li');
    }
  });
}

function restoreSessionState(container) {
  var state = loadSidebarState();
  container.querySelectorAll('li').forEach(function (li) {
    var key = getSidebarKey(li);
    if (!key || !(key in state)) return;
    if (li.querySelector('.hextra-sidebar-link-active')) return;

    var isOpen = state[key];
    li.classList.toggle('open', isOpen);
    var btn = li.querySelector(':scope > .hextra-sidebar-item > .hextra-sidebar-collapsible-button');
    if (btn) btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
}

function injectMobileTOC(container) {
  var template = container.querySelector('template[data-mobile-toc]');
  if (!template) return;

  var mobileList = container.querySelector('.hextra-sidebar-mobile-list');
  if (!mobileList) return;

  var activeLink = mobileList.querySelector('.hextra-sidebar-active-item');
  if (!activeLink) return;

  var li = activeLink.closest('li');
  if (!li) return;

  var item = li.querySelector(':scope > .hextra-sidebar-item');
  if (item) {
    item.after(template.content.cloneNode(true));
  }
}

function enableCollapsibles(isCacheMode) {
  document.querySelectorAll(".hextra-sidebar-collapsible-button").forEach(function (button) {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      var list = button.closest('li');
      if (!list) return;

      list.classList.toggle("open");
      var isOpen = list.classList.contains('open');
      button.setAttribute('aria-expanded', isOpen ? 'true' : 'false');

      if (isCacheMode) {
        var key = getSidebarKey(list);
        if (key) {
          var state = loadSidebarState();
          state[key] = isOpen;
          saveSidebarState(state);
        }
      }
    });
  });
}

function restoreSidebarScroll() {
  var saved = sessionStorage.getItem('hextra-sidebar-scroll');
  if (saved === null) return false;
  var scrollbar = document.querySelector("aside.hextra-sidebar-container > .hextra-scrollbar");
  if (!scrollbar) return false;
  scrollbar.scrollTop = parseInt(saved, 10);
  return true;
}

function saveSidebarScroll() {
  var scrollbar = document.querySelector("aside.hextra-sidebar-container > .hextra-scrollbar");
  if (scrollbar) {
    sessionStorage.setItem('hextra-sidebar-scroll', scrollbar.scrollTop);
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
    top: itemCenter - containerRect.height / 2
  });
}
