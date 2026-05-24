document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(".hextra-alert-toggle");
  buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      const alert = button.closest(".hextra-alert");
      const contentID = button.getAttribute("aria-controls");
      const content = contentID ? document.getElementById(contentID) : null;
      if (!alert || !content) {
        return;
      }

      const open = alert.dataset.alertFold !== "+";
      alert.dataset.alertFold = open ? "+" : "-";
      button.setAttribute("aria-expanded", open ? "true" : "false");
      content.setAttribute("aria-hidden", open ? "false" : "true");
      if (open) {
        content.removeAttribute("inert");
      } else {
        content.setAttribute("inert", "");
      }
    });
  });
});
