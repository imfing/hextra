document.addEventListener("DOMContentLoaded", function () {
  initializeSidebar();
});

function initializeSidebar() {
  const sidebarScrollbar = document.querySelector("aside.sidebar-container > .hextra-scrollbar");
  if (!sidebarScrollbar) return;

  enableCollapsibles();
  restoreSidebarPosition(sidebarScrollbar);

  const debouncedSave = debounce((position) => {
    saveSidebarPosition(position);
  }, 150);
  
  sidebarScrollbar.addEventListener('scroll', function() {
    debouncedSave(this.scrollTop);
  });

  document.querySelectorAll('a').forEach(link => {
    if (link.hostname === window.location.hostname) {
      link.addEventListener('click', function(e) {
        saveSidebarPosition(sidebarScrollbar.scrollTop);
      });
    }
  });
}

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function enableCollapsibles() {
  const buttons = document.querySelectorAll(".hextra-sidebar-collapsible-button");
  buttons.forEach(function (button) {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      const list = button.parentElement.parentElement;
      if (list) {
        list.classList.toggle("open")
      }
    });
  });
}

function saveSidebarPosition(scrollPosition) {
  localStorage.setItem('sidebarScrollPosition', scrollPosition);
}

function restoreSidebarPosition(sidebarScrollbar) {
  const savedPosition = localStorage.getItem('sidebarScrollPosition');
  
  if (savedPosition !== null) {
    requestAnimationFrame(() => {
      sidebarScrollbar.scrollTop = parseInt(savedPosition);
    });
  }
}