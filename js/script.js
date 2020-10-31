//  ФУНКЦИИ


let closePopupOnClick = function (button, popup) {
  button.addEventListener('click', function () {
    popup.classList.remove('modal-show');
  })
  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 27) {
      popup.classList.remove('modal-show');
    }
  })
}

let closePopups = function (popups) {
  for (let counter = 0; counter < popups.length; counter++) {
    let currentPopup = popups[counter];
    let currentCloseButton = currentPopup.querySelector('.close');
    closePopupOnClick(currentCloseButton, currentPopup);
  }
}

let showPopupOnClick = function (button, popup) {
  button.addEventListener('click', function (evt) {
    evt.preventDefault();
    popup.classList.add('modal-show');
  })
}

let showPopups = function (buttons, popup) {
  for (let counter = 0; counter < buttons.length; counter++) {
    let currentButton = buttons[counter];
    showPopupOnClick(currentButton, popup);
  }
}

let addGoodOnClick = function (button, place, goodsField) {
  button.addEventListener('click', function (evt) {
    evt.preventDefault();
    let currentGoodsCount = goodsField.textContent;
    currentGoodsCount++;
    if (currentGoodsCount > 0) {
      place.classList.add('containing');
    }
    goodsField.textContent = currentGoodsCount;
  })
}

let addGood = function (buttons, place, goodsField) {
  for (let counter = 0; counter < buttons.length; counter++) {
    let currentButton = buttons[counter];
    addGoodOnClick(currentButton, place, goodsField);
  }
}

let switchElement = function (element) {
  element.classList.toggle('current');
}


// КАРТА


if (document.querySelector('.contacts-map')) {
  const mapButton = document.querySelector('.contacts-map');
  const mapPopup = document.querySelector('.modal-map');

  let showMapPopup = showPopupOnClick(mapButton, mapPopup);
  showMapPopup;
}


// ДОБАВЛЕНИЕ В КОРЗИНУ


if (document.querySelector('.button-buy')) {
  const buyButtons = document.querySelectorAll('.button-buy');
  const noticePopup = document.querySelector('.modal-notice');
  const cart = document.querySelector('.cart');
  const goodsInCart = document.querySelector('.cart .count');

  let addGoodToCart = addGood(buyButtons, cart, goodsInCart);
  addGoodToCart;
  let showNoticePopup = showPopups(buyButtons, noticePopup);
  showNoticePopup;
}


// ДОБАВЛЕНИЕ В ЗАКЛАДКИ


if (document.querySelector('.button-to-bookmark')) {
  const bookmarkButtons = document.querySelectorAll('.button-to-bookmark');
  const bookmark = document.querySelector('.bookmark');
  const goodsInBookmark = document.querySelector('.bookmark .count');

  let addGoodToBookmark = addGood(bookmarkButtons, bookmark, goodsInBookmark);
  addGoodToBookmark;
}


// ЗАКРЫТИЕ ПОПАПОВ


if (document.querySelector('.modal')) {
  const popups = document.querySelectorAll('.modal');

  closePopups(popups);
}


// ОБРАТНАЯ СВЯЗЬ


if (document.querySelector('.modal-write-us')) {
  const writeUsButton = document.querySelector('.contacts-button');
  const writeUsPopup = document.querySelector('.modal-write-us');
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
      writeUsPopup.classList.remove('showingPopup');
      writeUsPopup.offsetWidth = writeUsPopup.offsetWidth;
      writeUsPopup.classList.add('error');
    } else if (isStorageSupport) {
      localStorage.setItem('name', writeUsUserName.value);
      localStorage.setItem('email', writeUsUserEmail.value);
    }
  })
}


// ПРОМО-СЛАЙДЕР


if (document.querySelector('.promo-slider')) {
  const promoSlides = document.querySelectorAll('.promo-slider-slide');
  const sliderPagination = document.querySelectorAll('.promo-slider-pagination-item');
  const nextButton = document.querySelector('.slider-button-next');
  const backButton = document.querySelector('.slider-button-back');

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
}


// СЕРВИС СЛАЙДЕР


if (document.querySelector('.services-slider')) {
  const servicesButtons = document.querySelectorAll('.services-button');
  const servicesSlides = document.querySelectorAll('.services-item');

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
}


// ВЫХОД НА СТРАНИЦУ ДЕАВТОРИЗАЦИИ.


if (document.querySelector('.user-menu')) {
  const activatiedUserMenu = document.querySelector('.activatied-user-menu');
  const loginMenu = document.querySelector('.login-menu');
  const logOutButton = document.querySelector('.log-out');

  logOutButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    switchElement(activatiedUserMenu);
    switchElement(loginMenu);
  })
}






