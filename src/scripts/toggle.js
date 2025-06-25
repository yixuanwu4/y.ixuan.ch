document.addEventListener("DOMContentLoaded", function () {
  const toggleButton = document.querySelector(".menu-toggle");
  const navList = document.querySelector(".nav-list");

  if (toggleButton && navList) {
    toggleButton.addEventListener("click", () => {
      navList.classList.toggle("show");
      toggleButton.classList.toggle("open");
    });
  }
});