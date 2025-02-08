let button = document.querySelector(".main-header__toggle");
let menu = document.querySelector(".main-header__menu");
let header = document.querySelector(".main-header");

button.classList.toggle("main-header__toggle--close");

if (button) {
  button.addEventListener("click", () => {
    if (menu.classList.contains("main-header__menu-closed") == true) {
      menu.classList.remove("main-header__menu-closed");
    } else {
      menu.classList.add("main-header__menu-closed");
    }
  });
}

if (header) {
  header.classList.remove("main-header--nojs");
}
