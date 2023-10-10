// Dark theme toggle

const themeToggleButtons = document.querySelectorAll(".theme-toggle");

// Change the icons inside the button based on previous settings
if (
  localStorage.getItem("color-theme") === "dark" ||
  (!("color-theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)
) {
  themeToggleButtons.forEach((el) => el.dataset.theme = "dark");
} else {
  themeToggleButtons.forEach((el) => el.dataset.theme = "light");
}

themeToggleButtons.forEach((el) => {
  el.addEventListener("click", function () {
    if (localStorage.getItem("color-theme")) {
      if (localStorage.getItem("color-theme") === "light") {
        document.documentElement.classList.add("dark");
        document.documentElement.style.colorScheme = "dark";
        localStorage.setItem("color-theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        document.documentElement.style.colorScheme = "light";
        localStorage.setItem("color-theme", "light");
      }
    } else {
      if (document.documentElement.classList.contains("dark")) {
        document.documentElement.classList.remove("dark");
        document.documentElement.style.colorScheme = "light";
        localStorage.setItem("color-theme", "light");
      } else {
        document.documentElement.classList.add("dark");
        document.documentElement.style.colorScheme = "dark";
        localStorage.setItem("color-theme", "dark");
      }
    }
    el.dataset.theme = document.documentElement.classList.contains("dark") ? "dark" : "light";
  });
});
