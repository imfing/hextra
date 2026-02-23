document.addEventListener("DOMContentLoaded", function () {
  // Hugo task lists render bare checkboxes; provide an accessible name.
  document.querySelectorAll("main#content li > input[type='checkbox']").forEach(function (checkbox) {
    if (checkbox.hasAttribute("aria-label") || checkbox.hasAttribute("aria-labelledby")) {
      return;
    }
    var listItem = checkbox.closest("li");
    if (!listItem) return;

    var labelText = listItem.textContent.replace(/\s+/g, " ").trim();
    if (labelText) {
      checkbox.setAttribute("aria-label", labelText);
    }
  });
});
