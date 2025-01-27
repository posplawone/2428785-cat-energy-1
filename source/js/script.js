let button = document.querySelector('.main-header__toggle');
let menu = document.querySelector('.main-header__menu');

button.addEventListener('click', () => {
  if (menu.classList.contains('main-header__menu-closed') == true) {
    menu.classList.remove('main-header__menu-closed');
  } else {
    menu.classList.add('main-header__menu-closed');
  }
})
