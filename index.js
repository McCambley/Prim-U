// HEADER FUNCTIONALITY

const header = document.querySelector('.header');
const hamburger = document.querySelector('.header__hamburger');
const headerContainer = document.querySelector('.header__content');
const logo = document.querySelector('.header__logo');
const logoAccent = document.querySelector('.header__logo-accent');
const headerLinks = Array.from(document.querySelectorAll('.header__link'));
const hero = document.querySelector('.hero');

// toggle menuStatus on overlay click
function toggleNavOnOverlay(e) {
  if (e.target.classList.contains('header_open')) {
    toggleNav();
  }
}

// open or close navigation on mobile layous
function toggleNav() {
  // check if the menu is open already
  const menuOpen = headerContainer.classList.contains('header__content_open');
  if (!menuOpen) {
    // if menu is not open
    // extend overlay to device height
    header.classList.add('header_open');
    // change hamburger icon
    hamburger.src = './images/hamburger-close.svg';
    // extend nav container to display hidden links
    headerContainer.classList.add('header__content_open');
    // change logo color
    logo.classList.add('header__logo_opened');
    // listen for click on overlay outside of open nav menu
    header.addEventListener('click', toggleNavOnOverlay);
  } else {
    // if menu is open already, undo the above
    header.classList.remove('header_open');
    hamburger.src = './images/hamburger-open.svg';
    headerContainer.classList.remove('header__content_open');
    logo.classList.remove('header__logo_opened');
    header.removeEventListener('click', toggleNavOnOverlay);
  }
}

// recolor menu items when user scrolls past hero
function recolorScrolledMenu() {
  const heroHeight = hero.offsetHeight;
  // if the user has scrolled beyond the hero block
  if (window.scrollY + 100 > heroHeight) {
    headerContainer.classList.add('header__content_scrolled');
    logo.classList.add('header__logo_scrolled');
    logoAccent.classList.add('header__logo-accent_scrolled');
    headerLinks.forEach(link => {
      link.classList.add('header__link_scrolled');
    });
  } else {
    headerContainer.classList.remove('header__content_scrolled');
    logo.classList.remove('header__logo_scrolled');
    logoAccent.classList.remove('header__logo-accent_scrolled');
    headerLinks.forEach(link => {
      link.classList.remove('header__link_scrolled');
    });
  }
}

hamburger.addEventListener('click', toggleNav);
// TODO refactor this to update less often than every scroll
window.addEventListener('scroll', recolorScrolledMenu);
// TODO refactor this to update less often than every resize
window.addEventListener('resize', recolorScrolledMenu);
