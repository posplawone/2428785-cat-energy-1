let button = document.querySelector(".main-header__toggle");
let menu = document.querySelector(".main-header__menu");
let header = document.querySelector(".main-header");

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

let toggle = document.querySelector(".site-header__toggle");
let smenu = document.querySelector(".site-header__menu");
let sheader = document.querySelector(".site-header");

if (sheader) {
  sheader.classList.remove("site-header--nojs");
}

if (toggle) {
  toggle.addEventListener("click", () => {
    if (smenu.classList.contains("site-header__menu-closed") == true) {
      smenu.classList.remove("site-header__menu-closed");
    } else {
      smenu.classList.add("site-header__menu-closed");
    }
  });
}
