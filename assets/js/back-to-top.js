const backToTop = document.querySelector("#backToTop");

document.addEventListener("scroll", (event) => {
  if (window.scrollY > 300) {
    backToTop.classList.remove("opacity-0");
  } else {
    backToTop.classList.add("opacity-0");
  }
});


function scrollUp() {
  window.scroll({
    top: 0, 
    left: 0, 
    behavior: 'smooth'
  });
}
