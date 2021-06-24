// FAQ FUNCTIONALITY

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
    button.addEventListener('click', () => {
      console.log(rev);
      if (window.innerWidth >= 1024) {
        tertiaryQuestionArray.forEach((question, index, array) => {
          setTimeout(() => {
            if (!question.classList.contains('faq__question-container_show')) {
              question.classList.add('faq__question-container_show');
              button.textContent = 'show less';
              rev = array.length;
            } else {
              question.classList.remove('faq__question-container_show');
              button.textContent = 'show more';
              rev = 0;
            }
          }, Math.abs((rev - index) * 25));
        });
      } else {
        extendedSecondaryQuestionArray.forEach((question, index, array) => {
          setTimeout(() => {
            if (!question.classList.contains('faq__question-container_show')) {
              question.classList.add('faq__question-container_show');
              button.textContent = 'show less';
              rev = array.length;
            } else {
              question.classList.remove('faq__question-container_show');
              button.textContent = 'show more';
              rev = 0;
            }
          }, Math.abs((rev - index) * 25));
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
