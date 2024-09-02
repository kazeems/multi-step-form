let parent = document.querySelector('.form-area');
let children = parent.querySelectorAll('.form-content');
let formEnd = document.querySelector('.form-finish');
const prevBtn = document.querySelector('.js-back-btn');
const nextBtn = document.querySelector('.js-next-btn');
const toggleCheck = document.querySelector('.js-toggle-switch');
let userName = document.getElementById('name');
let userEmail = document.getElementById('email');
let userPhone = document.getElementById('phone');
let addonElHTML = '';
let totalAmount = 0;
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

  if (NextPageHTML.classList.contains('form-summary')) {
    let totalData = calculateSummary();
    const htmol = document.querySelector('.summary-content');
    document.querySelector('.summary-content').innerHTML += `<div class="wrapper">
      <div class="selected-plan">
        <div class="plan-name">
          <h3>${submittedData.planSelected.planName}</h3>
          <a href="">Change</a>
        </div>
        <span class="plan-price">$${submittedData.planSelected.planPrice}/mo</span>
      </div>
      <hr class="divider">
      ${totalData[0]}
    </div>
    <div class="selected-addons total-price">
      <div class="addon-name">
        <h5>Total (per month)</h5>
      </div>
      <span class="plan-price">+$${totalData[1]}/mo</span>
    </div>
    `;
  }

  prevPageHTML.style.display = 'none';
  prevPageHTML.style.pointerEvents = 'none'
  NextPageHTML.style.display = 'block';
  NextPageHTML.style.pointerEvents = 'all';
  prevBtn.style.display = 'block';
  prevBtn.style.opacity = 100;



  getData();

}

// nextBtn.addEventListener('click', () => {
//   // console.log(submittedData);

//   nextPage(submittedData.step);
// });


function calculateSummary() {

  submittedData.selectedAddons.forEach((addonEl) => {
    addonElHTML += `
  <div class="selected-addons">
    <div class="addon-name">
      <h4>${addonEl.name}</h4>
    </div>
    <span class="plan-price">+$${addonEl.price}/mo</span>
  </div>
  `;

    totalAmount = totalAmount + Number(addonEl.price);

  });

  totalAmount += Number(submittedData.planSelected.planPrice);


  return [addonElHTML, totalAmount];
}

toggleCheck.addEventListener('click', () => {
  let planPrices = {};
  if (toggleCheck.checked === false) {
    planPrices = {
      arcade: 9,
      advance: 12,
      pro: 15,
      duration: 'mo',
    };
  } else {
    planPrices = {
      arcade: 100,
      advance: 120,
      pro: 150,
      duration: 'yr',
    };

    getData();
  }


  renderPlans(planPrices);
});

function renderPlans(prices) {
  let plansHTML = `
    <div class="plan-option selected">
      <div class="icon">
        <img src="assets/images/icon-arcade.svg" alt="arcade">
      </div>
      <div class="plan-details" data-plan-name="Acarde" data-plan-price="${prices.arcade}">
        <p>Arcade</p>
        <span>$${prices.arcade}/${prices.duration}</span>
      </div>
    </div>
    <div class="plan-option">
      <div class="icon">
        <img src="assets/images/icon-advanced.svg" alt="arcade">
      </div>
      <div class="plan-details" data-plan-name="Advanced" data-plan-price="${prices.advance}">
        <p>Advanced</p>
        <span>$${prices.advance}/${prices.duration}/mo</span>
      </div>
    </div>
    <div class="plan-option">
      <div class="icon">
        <img src="assets/images/icon-pro.svg" alt="pro">
      </div>
      <div class="plan-details" data-plan-name="Pro" data-plan-price="${prices.pro}">
        <p>Pro</p>
        <span>$${prices.pro}/${prices.duration}/mo</span>
      </div>
    </div>
  `;
  document.querySelector('.plans').innerHTML = plansHTML;
  getData();
}

function getData() {
  let chosenAddon = [];
  let addonItem = {};
  let planValue = '';
  const elements = document.querySelectorAll('.plan-option');

  elements.forEach(element => {
    if (element.classList.contains('selected')) {
      planValue = element.querySelector('.plan-details');
    }

    element.addEventListener('click', () => {
      elements.forEach(el => el.classList.remove('selected'));

      element.classList.add('selected');

      planValue = element.querySelector('.plan-details');

    });

  });

  const allAddons = document.querySelectorAll('.add-on');

  allAddons.forEach(addon => {
    const checkBoxes = addon.querySelectorAll('.checkbox-addon');

    checkBoxes.forEach((checkBox) => {
      checkBox.addEventListener('click', () => {
        if (checkBox.checked === true) {
          checkBox.checked = false;
        } else if (checkBox.checked === false) {
          checkBox.checked = true;
          const addonDetails = addon.querySelector('.ad-name').innerText;
          const addonPrice = addon.querySelector('.price').innerText;

          const addonPriceArray = Array.from(addonPrice);

          addonItem = {
            name: addonDetails,
            price: addonPriceArray[2],
          }

          chosenAddon.push(addonItem);


        }
      });
    });

    submittedData.selectedAddons = chosenAddon;


  });

  submittedData.planSelected = {
    planName: planValue.dataset.planName,
    planPrice: planValue.dataset.planPrice,
  }

  submittedData.data = {
    userName: userName.value,
    emailAddress: userEmail.value,
    phoneNumber: userPhone.value,
  }
}




