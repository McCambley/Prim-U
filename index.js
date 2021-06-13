const hamburger = document.querySelector('.header__hamburger');
const headerContainer = document.querySelector('.header__content');
const logo = document.querySelector('.header__logo');

function toggleNav() {
  const menuStatus = headerContainer.classList.contains('header__content_open');
  if (!menuStatus) {
    hamburger.src = './images/hamburger-close.svg';
    headerContainer.classList.add('header__content_open');
    logo.classList.add('header__logo_opened');
  } else {
    hamburger.src = './images/hamburger-open.svg';
    headerContainer.classList.remove('header__content_open');
    logo.classList.remove('header__logo_opened');
  }
}

hamburger.addEventListener('click', toggleNav);
