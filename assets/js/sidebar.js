document.addEventListener("DOMContentLoaded", function () {
  restoreSidebarPosition();
  enableCollapsibles();
});

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

function saveSidebarPosition() {
  const sidebarScrollbar = document.querySelector("aside.sidebar-container > .hextra-scrollbar");
  if (sidebarScrollbar) {
    const scrollPosition = sidebarScrollbar.scrollTop;
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

    sidebarScrollbar.addEventListener('scroll', function() {
      saveSidebarPosition();
    });
  }
}