// ---
// HEADER FUNCTIONALITY
// ---

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

// --
// END HEADER
// BEGIN VIDEO
// --

const primlancerVideoButton = document.querySelector('.primlancers__video-button');
const primlancerVideo = document.querySelector('.primlancers__video');
const primlancerOverlay = document.querySelector('.primlancers__overlay');
const primlancerContainer = document.querySelector('.primlancers__video-container');

function playVideo() {
  primlancerVideo.play();
  primlancerOverlay.classList.add('primlancers__overlay_playing');
  window.addEventListener('keydown', pauseWithSpace);
  primlancerVideo.controls = true;
}

function pauseVideo() {
  primlancerOverlay.classList.remove('primlancers__overlay_playing');
  primlancerVideo.pause();
  primlancerVideo.currentTime = 0;
  window.removeEventListener('keydown', pauseWithSpace);
  primlancerVideo.controls = false;
}

function pauseWithSpace(evt) {
  if (evt.keyCode == 32) {
    evt.preventDefault();
    pauseVideo();
  }
}

primlancerVideoButton.addEventListener('click', playVideo);
primlancerVideo.addEventListener('click', pauseVideo);

// ---
// END VIDEO
// BEGIN CAROUSEL
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
  });

  leftArrow.addEventListener('click', scrollLeft);
  rightArrow.addEventListener('click', scrollRight);

  window.addEventListener('scroll', setProgressSize);
  window.addEventListener('resize', setProgressSize);
});

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

// ---
// END Carousels
// BEGIN FAQ FUNCTIONALITY
// ---

const questionArray = Array.from(document.querySelectorAll('.faq__question-container'));
const showMoreButtonArray = Array.from(document.querySelectorAll('.faq__show-button'));

// Individual question listeners
function setQuestionListeners() {
  questionArray.forEach(item => {
    const toggle = item.querySelector('.faq__question-toggle');
    const question = item.querySelector('.faq__question-subcontainer');
    const answer = item.querySelector('.faq__answer');

    question.addEventListener('click', () => {
      const questionOpen = question.classList.contains('faq__question-subcontainer_open');
      if (!questionOpen) {
        question.classList.add('faq__question-subcontainer_open');
        answer.classList.add('faq__answer_open');
        toggle.src = './images/faq-close.svg';
      } else {
        question.classList.remove('faq__question-subcontainer_open');
        answer.classList.remove('faq__answer_open');
        toggle.src = './images/faq-open.svg';
      }
    });
  });
}

function toggleQuestionsArray(questionArray, button, closed, reverseFlag, interval) {
  questionArray.forEach((question, index, array) => {
    // timeout opens displays each question in the section in sequence
    setTimeout(() => {
      if (closed) {
        // open question
        question.classList.add('faq__question-container_show');
        button.textContent = 'show less';
      } else {
        // hide question
        question.classList.remove('faq__question-container_show');
        button.textContent = 'show more';
      }
      // this equation is used to reverse the sequence in which elements are
      // hidden depending on whether the button is "showing more" or "showing less"
    }, Math.abs((reverseFlag - index) * interval));
  });
}

// Show more button listeners
function setShowMoreListener() {
  showMoreButtonArray.forEach(button => {
    // question group arrays
    const secondaryQuestionArray = Array.from(button.parentElement.querySelectorAll('.faq__question-container_group_secondary'));
    const tertiaryQuestionArray = Array.from(button.parentElement.querySelectorAll('.faq__question-container_group_tertiary'));
    const quaternaryQuestionArray = Array.from(button.parentElement.querySelectorAll('.faq__question-container_group_quaternary'));
    // question group combination arrays
    const threeGroupArray = [...secondaryQuestionArray, ...tertiaryQuestionArray, ...quaternaryQuestionArray];
    // interleave last two question groups
    const twoGroupArray = tertiaryQuestionArray
      .map((value, index) => {
        return [value, quaternaryQuestionArray[index]];
      })
      .flat()
      .filter(question => question != null);
    let closed = false;
    let interval = 25;
    button.addEventListener('click', () => {
      closed = !closed;
      if (window.innerWidth >= 1024) {
        // open only the third section of questions when the screen is larger than or equal to 1024px
        // begin iterating over each element in the section
        let reverseFlag = closed ? 0 : twoGroupArray.length;
        toggleQuestionsArray(twoGroupArray, button, closed, reverseFlag, interval);
        // toggleQuestionsArray(quaternaryQuestionArray, button, closed, reverseFlag, interval);
      } else {
        // open the second and third sections of questions when the screen is  not larger than or equal to 1024px
        let reverseFlag = closed ? 0 : threeGroupArray.length;
        toggleQuestionsArray(threeGroupArray, button, closed, reverseFlag, interval);
      }
    });
  });
}

function setFaqEventListeners() {
  // Individual question listeners
  setQuestionListeners();
  // Button listeners
  setShowMoreListener();
}

setFaqEventListeners();

// ---
// END FAQ FUNCTIONALITY
// ---

// tertiaryQuestionArray.forEach((question, index, array) => {
//   // timeout opens displays each question in the section in sequence
//   setTimeout(() => {
//     if (closed) {
//       // open question
//       question.classList.add('faq__question-container_show');
//       button.textContent = 'show less';
//       reverseFlag = array.length;
//     } else {
//       // hide question
//       question.classList.remove('faq__question-container_show');
//       button.textContent = 'show more';
//       reverseFlag = 0;
//     }
//     // this equation is used to reverse the sequence in which elements are
//     // hidden depending on whether the button is "showing more" or "showing less"
//   }, Math.abs((reverseFlag - index) * interval));
// });

// extendedSecondaryQuestionArray.forEach((question, index, array) => {
//   setTimeout(() => {
//     if (closed) {
//       question.classList.add('faq__question-container_show');
//       button.textContent = 'show less';
//       reverseFlag = array.length;
//     } else {
//       question.classList.remove('faq__question-container_show');
//       button.textContent = 'show more';
//       reverseFlag = 0;
//     }
//   }, Math.abs((reverseFlag - index) * interval));
// });
// HERO FUNCTIONALITY
