document.addEventListener("DOMContentLoaded", function () {
  restoreSidebarPosition();
  enableCollapsibles();
});

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
  const currentPosition = sessionStorage.getItem('sidebarScrollPosition');
  if (currentPosition === null || parseInt(currentPosition) !== scrollPosition) {
    sessionStorage.setItem('sidebarScrollPosition', scrollPosition);
  }
}

function restoreSidebarPosition() {
  const sidebarScrollbar = document.querySelector("aside.sidebar-container > .hextra-scrollbar");
  if (sidebarScrollbar) {
    const savedPosition = sessionStorage.getItem('sidebarScrollPosition');
    
    if (savedPosition !== null) {
      sidebarScrollbar.scrollTo({
        top: parseInt(savedPosition),
        behavior: 'instant'
      });
    }

    const debouncedSave = debounce((position) => {
      saveSidebarPosition(position);
    }, 150);
    
    sidebarScrollbar.addEventListener('scroll', function() {
      debouncedSave(this.scrollTop);
    });
  }
}