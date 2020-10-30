
const popups = document.querySelectorAll('.modal');
const buyButtons = document.querySelectorAll('.button-buy');
const writeUsButton = document.querySelector('.contacts-button');
const writeUsPopup = document.querySelector('.modal-write-us');
const mapButton = document.querySelector('.contacts-map');
const mapPopup = document.querySelector('.modal-map');
const noticePopup = document.querySelector('.modal-notice');
const promoSlides = document.querySelectorAll('.promo-slider-slide');
const sliderPagination = document.querySelectorAll('.promo-slider-pagination-item');
const nextButton = document.querySelector('.slider-button-next');
const backButton = document.querySelector('.slider-button-back');
const servicesButtons = document.querySelectorAll('.services-button');
const servicesSlides = document.querySelectorAll('.services-item');


// МОДАЛЬНЫЕ ОКНА


let closePopupForClick = function (button, popup) {
  button.addEventListener('click', function () {
    popup.classList.remove('modal-show');
  });
  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 27) {
      popup.classList.remove('modal-show');
    }
  });
}

let closePopups = function (popups) {
  for (let counter = 0; counter < popups.length; counter++) {
    let currentPopup = popups[counter];
    let currentCloseButton = currentPopup.querySelector('.close');
    closePopupForClick(currentCloseButton, currentPopup);
  }
}

let showPopupForClick = function (button, popup) {
  button.addEventListener('click', function (evt) {
    evt.preventDefault();
    popup.classList.add('modal-show');
  })
}

let showPopups = function (buttons, popup) {
  for (let counter = 0; counter < buttons.length; counter++) {
    let currentButton = buttons[counter];
    showPopupForClick(currentButton, popup);
  }
}

if (mapPopup) {
  let showMapPopup = showPopupForClick(mapButton, mapPopup);
  showMapPopup;
}

let showNoticePopup = showPopups(buyButtons, noticePopup);
showNoticePopup;

closePopups(popups);


// ОБРАТНАЯ СВЯЗЬ


if (writeUsPopup) {
  const writeUsForm = writeUsPopup.querySelector('form');
  const writeUsUserName = writeUsPopup.querySelector('[name=user-name]');
  const writeUsUserEmail = writeUsPopup.querySelector('[name=user-email]');
  const writeUsText = writeUsPopup.querySelector('[name=text]');
  let isStorageSupport;

  let getStorageElement = function (key) {
    let storage;
    try {
      storage = localStorage.getItem(key);
      isStorageSupport = true;
    } catch {
      isStorageSupport = false;
    }
    return storage;
  }

  writeUsButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    writeUsPopup.classList.remove('error');
    writeUsPopup.classList.add('modal-show');
    writeUsPopup.classList.add('showingPopup');
    writeUsUserName.value = getStorageElement('name');
    writeUsUserEmail.value = getStorageElement('email');
    writeUsText.value = '';
    if (!writeUsUserName.value) {
      writeUsUserName.focus();
    } else if (!writeUsUserEmail.value) {
      writeUsUserEmail.focus();
    } else {
      writeUsText.focus();
    }
  })

  writeUsForm.addEventListener('submit', function (evt) {
    if (!writeUsUserName.value || !writeUsUserEmail.value || !writeUsText.value) {
      evt.preventDefault();
      writeUsPopup.classList.remove('error');
      writeUsPopup.offsetWidth = writeUsPopup.offsetWidth;
      writeUsPopup.classList.add('error');
    } else if (isStorageSupport) {
      localStorage.setItem('name', writeUsUserName.value);
      localStorage.setItem('email', writeUsUserEmail.value);
    }
  })
}


// ПРОМО-СЛАЙДЕР


let switchElement = function (element) {
  element.classList.toggle('current');
}

let switchSlide = function (slide, paginationItem) {
  switchElement(slide);
  switchElement(paginationItem);
}

let switchPromoSlide = function () {
  let counter = 0;
  let sliderSize = promoSlides.length - 1;
  nextButton.addEventListener('click', function () {
    if (counter < sliderSize) {
      switchSlide(promoSlides[counter], sliderPagination[counter]);
      counter++;
      switchSlide(promoSlides[counter], sliderPagination[counter]);
    }
  })
  backButton.addEventListener('click', function () {
    if (counter > 0) {
      switchSlide(promoSlides[counter], sliderPagination[counter]);
      counter--;
      switchSlide(promoSlides[counter], sliderPagination[counter]);
    }
  })
}

switchPromoSlide();


// СЕРВИС СЛАЙДЕР


let closeAllElements = function (elements) {
  for (let counter = 0; counter < elements.length; counter++) {
    let currentElement = elements[counter];
    currentElement.classList.remove('current');
  }
}

let openSlide = function (button, slide) {
  button.addEventListener('click', function () {
    closeAllElements(servicesButtons);
    closeAllElements(servicesSlides);
    button.classList.add('current');
    slide.classList.add('current');
  })
}

let openServicesSlide = function () {
  for (let counter = 0; counter < servicesButtons.length; counter++) {
    let currentButton = servicesButtons[counter];
    let currentSlide = servicesSlides[counter];
    openSlide(currentButton, currentSlide);
  }
}

openServicesSlide();










