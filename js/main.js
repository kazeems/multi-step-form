let parent = document.querySelector('.form-area');
let children = parent.querySelectorAll('.form-content');
let formEnd = document.querySelector('.form-finish');
const prevBtn = document.querySelector('.js-back-btn');
const nextBtn = document.querySelector('.js-next-btn');
let userName = document.getElementById('name');
let userEmail = document.getElementById('email');
let userPhone = document.getElementById('phone');
let submittedData = {
  previousStep: 0,
  nextStep: 1,
};

prevBtn.style.opacity = 0;
prevBtn.style.pointerEvents = 'none';

function validateForm(input, elName) {
  let labelHTML = document.querySelector('.label-el').innerHTML;
  let errorHTML = document.querySelector(`.error-${elName}`);

  if (!input.value) {
    errorHTML.innerHTML = 'This field is required';
    return false;
  } else {
    errorHTML.innerHTML = '';
    return true;
  }
}

nextBtn.addEventListener('click', () => {

  const previous = submittedData.previousStep + 1;
  const nextSt = submittedData.nextStep + 1;

  console.log(previous);
  if (nextSt !== children.length) {
    nextPage(nextSt, previous);
  } else {
    const summaryClass = children[children.length - 2].classList[0];
    const summaryHTML = document.querySelector(`.${summaryClass}`);

    summaryHTML.style.display = 'none';
    nextBtn.style.opacity = 0;
    nextBtn.style.pointerEvents = 'none';
    prevBtn.style.opacity = 0;
    prevBtn.style.pointerEvents = 'none';

    formEnd.style.display = 'block';
  }



  // console.log(submittedData);


});

// prevBtn.addEventListener('click', () => {
//   // const stepIcon = document.querySelector(`.js-step-${submittedData.nextStep}`);

//   const previousPage = Number(submittedData.previousStep);

//   nextPage(0);

// });

function nextPage(nextElStep, prevElStep) {
  // console.log(step);

  submittedData.previousStep += 1;
  submittedData.nextStep += 1;

  const PrevElClass = children[prevElStep - 1].classList[0];
  const NextElClass = children[nextElStep - 1].classList[0];

  const prevPageHTML = document.querySelector(`.${PrevElClass}`);
  const NextPageHTML = document.querySelector(`.${NextElClass}`);

  const previousStepIconHTML = document.querySelector(`.js-step-${prevElStep}`);
  const nextStepIconHTML = document.querySelector(`.js-step-${nextElStep}`);

  previousStepIconHTML.classList.remove('active');
  nextStepIconHTML.classList.add('active');


  prevPageHTML.style.display = 'none';
  prevPageHTML.style.pointerEvents = 'none'
  NextPageHTML.style.display = 'block';
  NextPageHTML.style.pointerEvents = 'all';
  prevBtn.style.display = 'block';
  prevBtn.style.opacity = 100;

}


function showStep(nextStep, previousStep) {

  // nextBtn.addEventListener('click', () => {
  nextPage(nextStep, previousStep);


  // if (nextStep !== (children.length)) {

  // }


  // })
}

// nextBtn.addEventListener('click', () => {
//   // console.log(submittedData);

//   nextPage(submittedData.step);
// });



