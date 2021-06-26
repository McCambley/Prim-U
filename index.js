// HEADER FUNCTIONALITY

const header = document.querySelector('.header');
const hamburger = document.querySelector('.header__hamburger');
const headerContainer = document.querySelector('.header__content');
const logo = document.querySelector('.header__logo');
const logoAccent = document.querySelector('.header__logo-accent');
const headerLinks = Array.from(document.querySelectorAll('.header__link'));
const hero = document.querySelector('.hero');
const primlancerVideoButton = document.querySelector('.primlancers__video-button')

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
    hamburger.classList.add('header__hamburger_scrolled');
    logo.classList.add('header__logo_scrolled');
    logoAccent.classList.add('header__logo-accent_scrolled');
    headerLinks.forEach(link => {
      link.classList.add('header__link_scrolled');
    });
  } else {
    hamburger.classList.remove('header__hamburger_scrolled');
    headerContainer.classList.remove('header__content_scrolled');
    logo.classList.remove('header__logo_scrolled');
    logoAccent.classList.remove('header__logo-accent_scrolled');
    headerLinks.forEach(link => {
      link.classList.remove('header__link_scrolled');
    });
  }
}
console.log(headerLinks);

//Hide play button and overlay on video and start playing video
function playVideo(event) {
  const videoContainer = event.target.closest('.primlancers__video-container')
  videoContainer.querySelector('.overlay').classList.add('video_active')
  videoContainer.querySelector('.primlancers__video-button').classList.add('video_active')
  videoContainer.querySelector('.primlancers__video').src += "?autoplay=1"
}

primlancerVideoButton.addEventListener('click', playVideo)

hamburger.addEventListener('click', toggleNav);
headerLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth < 768) {
      toggleNav();
    }
  });
});

// TODO refactor this to update less often than every scroll
window.addEventListener('scroll', recolorScrolledMenu);
// TODO refactor this to update less often than every resize
window.addEventListener('resize', recolorScrolledMenu);

// HERO FUNCTIONALITY

// ---
// Carousels Reviews && Products
// ---

const carousels = document.querySelectorAll('.carousel');

carousels.forEach(carousel => {
  const carouselCards = carousel.querySelector('.carousel__cards');
  const carouselCard = carousel.querySelector('.carousel__card');
  const leftArrow = carousel.querySelector('.carousel__scroll-arrow_left');
  const rightArrow = carousel.querySelector('.carousel__scroll-arrow_right');
  const scrollBar = carousel.querySelector('.carousel__scroll-bar');
  const scrollProgress = carousel.querySelector('.carousel__scroll-progress');

  function setProgressSize() {
    scrollProgress.style.width = `${(carouselCards.offsetWidth / carouselCards.scrollWidth) * 100}%`;
  }

  function scrollLeft() {
    carouselCards.scrollLeft -= carouselCard.offsetWidth;
  }

  function scrollRight() {
    carouselCards.scrollLeft += carouselCard.offsetWidth;
  }

  carouselCards.addEventListener('scroll', () => {
    let scrolledDistance = carouselCards.scrollLeft;
    let scrollableWidth = carouselCards.scrollWidth - carouselCards.offsetWidth;
    let barWidth = scrollBar.offsetWidth;
    let progressWidth = scrollProgress.offsetWidth;
    let scrolledPercentage = scrolledDistance / scrollableWidth;
    let buffer = (barWidth - progressWidth) * scrolledPercentage; // + scrolledPercentage * carouselCards.offsetWidth; //(carouselCards.offsetWidth / carouselCards.scrollWidth) * 100;
    scrollProgress.style.marginLeft = `${buffer}px`;
    console.log(`${buffer}px`, scrolledPercentage);
  });

  leftArrow.addEventListener('click', scrollLeft);
  rightArrow.addEventListener('click', scrollRight);

  window.addEventListener('scroll', setProgressSize);
  window.addEventListener('resize', setProgressSize);
});

// ---
// END Carousels

//Click to scroll on carousels
const sliders = document.querySelectorAll('.carousel__cards');
let isDown = false;
let startX;
let scrollLeft;
sliders.forEach(slider => {
  slider.addEventListener('mousedown', e => {
    isDown = true;
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });
  slider.addEventListener('mouseleave', () => {
    isDown = false;
  });
  slider.addEventListener('mouseup', () => {
    isDown = false;
  });
  slider.addEventListener('mousemove', e => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 3; //scroll-fast
    slider.scrollLeft = scrollLeft - walk;
  });
});
