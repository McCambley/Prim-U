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
    const questionGroupArray = button.parentElement.querySelectorAll('.faq__question-group');
    button.addEventListener('click', () => {
      questionGroupArray.forEach(group => {
        if (!group.classList.contains('faq__question-group_show')) {
          group.classList.add('faq__question-group_show');
          console.log('showing: ', group);
          button.textContent = 'show less';
        } else {
          group.classList.remove('faq__question-group_show');
          console.log('Hiding: ', group);
          button.textContent = 'show more';
        }
      });
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
