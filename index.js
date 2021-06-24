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

// ---
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
      console.log(questionOpen);
      if (!questionOpen) {
        console.log('opening');
        question.classList.add('faq__question-subcontainer_open');
        answer.classList.add('faq__answer_open');
        toggle.src = './images/faq-close.png';
      } else {
        console.log('closing');
        question.classList.remove('faq__question-subcontainer_open');
        answer.classList.remove('faq__answer_open');
        toggle.src = './images/faq-open.png';
      }
    });
  });
}

// Show more button listeners
function setShowMoreListener() {
  showMoreButtonArray.forEach(button => {
    const secondaryQuestionArray = Array.from(button.parentElement.querySelectorAll('.faq__question-container_group_secondary'));
    const tertiaryQuestionArray = Array.from(button.parentElement.querySelectorAll('.faq__question-container_group_tertiary'));
    const extendedSecondaryQuestionArray = [...secondaryQuestionArray, ...tertiaryQuestionArray];
    let rev = 0;
    let closed = false;
    let interval = 25;
    button.addEventListener('click', () => {
      closed = !closed;
      if (window.innerWidth >= 1024) {
        // open only the third section of questions when the screen is larger than or equal to 1024px
        // begin iterating over each element in the section
        tertiaryQuestionArray.forEach((question, index, array) => {
          // timeout opens displays each question in the section in sequence
          setTimeout(() => {
            if (closed) {
              // open question
              question.classList.add('faq__question-container_show');
              button.textContent = 'show less';
              rev = array.length;
            } else {
              // hide question
              question.classList.remove('faq__question-container_show');
              button.textContent = 'show more';
              rev = 0;
            }
            // this equation is used to reverse the sequence in which elements are
            // hidden depending on whether the button is "showing more" or "showing less"
          }, Math.abs((rev - index) * interval));
        });
      } else {
        // open the second and third sections of questions when the screen is  not larger than or equal to 1024px
        extendedSecondaryQuestionArray.forEach((question, index, array) => {
          setTimeout(() => {
            if (closed) {
              question.classList.add('faq__question-container_show');
              button.textContent = 'show less';
              rev = array.length;
            } else {
              question.classList.remove('faq__question-container_show');
              button.textContent = 'show more';
              rev = 0;
            }
          }, Math.abs((rev - index) * interval));
        });
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
