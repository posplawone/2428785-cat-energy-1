let menu = document.querySelector('.main-header__toggle');
menu.onclick = function () {
  menu.classList.remove('main-header__menu-close');
  menu.classList.add('main-header__menu-close');
};
