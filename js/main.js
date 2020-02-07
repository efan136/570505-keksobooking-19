'use strict';

var map = document.querySelector('.map');
var mapPinMain = document.querySelector('.map__pin--main');
var mapPinArrowHeight = 22;
var mapPins = document.querySelector('.map__pins');
var mapFiltersContainer = document.querySelector('.map__filters-container');
var ACCOMMODATION = ['palace', 'flat', 'house', 'bungalo'];
var CHECKIN_TIMES = ['12:00', '13:00', '14:00'];
var CHECKOUT_TIMES = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var ACCOMMODATION_PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
];

var ACCOMMODATION_PRICE = 400;
var ACCOMMODATION_DESCRIPTION = 'описание';
var OFFER_TITLE = 'offer heading 0';
var ADDRESS_LOCATION = {'x': 600, 'y': 350};
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var addForm = document.querySelector('.ad-form');
var noticeInputs = document.querySelectorAll('.notice fieldset');
var mapFilterSelects = document.querySelectorAll('.map__filter');
var mapFilterFeatures = document.querySelectorAll('.map__features');
var noticeAddress = document.querySelector('#address');
var accommodationType = document.querySelector('#type');
var accommodationPrice = document.querySelector('#price');
var roomNumber = document.querySelector('#room_number');
var guestsNumber = document.querySelector('#capacity');

var ENTER_KEYCODE = 13;


var sliceArrayRandom = function (arr) {
  return arr.slice(1, getRandomNumber(2, arr.length));
};

var getRandomElementFromArray = function (arr) {
  return arr[Math.floor(arr.length * Math.random())];
};

var getRandomNumber = function (minNumber, maxNumber) {
  return Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
};

var getWidthElement = function (element) {
  return element.getBoundingClientRect().width;
};

var getAccomodationData = function () {
  var accommodationData = [];
  for (var i = 1; i <= 8; i++) {
    var accommodationOptions = {
      author: {
        'avatar': 'img/avatars/user0' + i + '.png'
      },

      offer: {
        title: OFFER_TITLE + i,
        address: ADDRESS_LOCATION,
        price: ACCOMMODATION_PRICE,
        type: getRandomElementFromArray(ACCOMMODATION),
        rooms: getRandomNumber(1, 4),
        guests: getRandomNumber(1, 6),
        checkin: getRandomElementFromArray(CHECKIN_TIMES),
        checkout: getRandomElementFromArray(CHECKOUT_TIMES),
        features: sliceArrayRandom(FEATURES),
        description: ACCOMMODATION_DESCRIPTION + i,
        photos: sliceArrayRandom(ACCOMMODATION_PHOTOS),
      },

      location: {
        x: getRandomNumber(0, getWidthElement(map)),
        y: getRandomNumber(130, 630),
      }
    };
    accommodationData.push(accommodationOptions);
  }

  return accommodationData;
};

var removeClass = function (element, elementClassName) {
  element.classList.remove(elementClassName);
};

var removeChildren = function (parent, childClass) {
  var children = parent.querySelectorAll(childClass);
  for (var i = 0; i < children.length; i++) {
    parent.removeChild(children[i]);
  }
};

var drawPins = function (arr) {
  var pinTemplate = document.querySelector('#pin').content.querySelector('button');
  var pinFragment = document.createDocumentFragment();
  for (var i = 0; i < 8; i++) {
    var element = pinTemplate.cloneNode(true);
    element.style.left = arr[i].location.x - (PIN_WIDTH / 2) + 'px';
    element.style.top = arr[i].location.y - PIN_HEIGHT + 'px';
    var pinImage = element.querySelector('img');
    pinImage.src = arr[i].author.avatar;
    pinImage.alt = arr[i].offer.description;
    pinFragment.appendChild(element);
  }
  mapPins.appendChild(pinFragment);
};


var drawCard = function (arr) {
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var card = cardTemplate.cloneNode(true);
  var cardFragment = document.createDocumentFragment();
  cardFragment.appendChild(card);
  map.insertBefore(cardFragment, mapFiltersContainer);

  var cardTitle = document.querySelector('.popup__title');
  var cardAdress = document.querySelector('.popup__text--address');
  var cardPrice = document.querySelector('.popup__text--price');
  var cardAccommodationType = document.querySelector('.popup__type ');
  var cardRoomsGuests = document.querySelector('.popup__text--capacity');
  var cardCheckinCheckout = document.querySelector('.popup__text--time');
  var cardFeatures = document.querySelector('.popup__features');
  var cardDescription = document.querySelector('.popup__description');
  var cardPhotos = document.querySelector('.popup__photos');
  var cardAvatar = document.querySelector('.popup__avatar');

  cardTitle.textContent = arr[1].offer.title;
  cardAdress.textContent = arr[1].offer.address;
  cardPrice.textContent = arr[1].offer.price + ' /ночь';

  var fillCardAccomodationType = function () {
    if (arr[1].offer.type === 'flat') {
      cardAccommodationType.textContent = 'Квартира';
    } else if (arr[1].offer.type === 'bungalo') {
      cardAccommodationType.textContent = 'Бунгало';
    } else if (arr[1].offer.type === 'house') {
      cardAccommodationType.textContent = 'Дом';
    } else if (arr[1].offer.type === 'palace') {
      cardAccommodationType.textContent = 'Дворец';
    }
  };
  fillCardAccomodationType();

  cardRoomsGuests.textContent = arr[1].offer.rooms + 'Комнат для ' + arr[1].offer.guests + ' гостей';
  cardCheckinCheckout.textContent = 'Заезд после ' + arr[1].offer.checkin + 'выезд до ' + arr[1].offer.checkout;
  cardDescription.textContent = arr[1].offer.description;

  var drawCardFeatures = function () {
    removeChildren(cardFeatures, '.popup__feature');
    var featureFragment = document.createDocumentFragment();
    for (var i = 0; i < arr[1].offer.features.length; i++) {
      var cardFeature = document.createElement('li');
      cardFeature.classList.add('popup__feature');
      featureFragment.appendChild(cardFeature);
      if (arr[1].offer.features[i] === 'wifi') {
        cardFeature.classList.add('popup__feature--wifi');
      } else if (arr[1].offer.features[i] === 'dishwasher') {
        cardFeature.classList.add('popup__feature--dishwasher');
      } else if (arr[1].offer.features[i] === 'parking') {
        cardFeature.classList.add('popup__feature--parking');
      } else if (arr[1].offer.features[i] === 'washer') {
        cardFeature.classList.add('popup__feature--washer');
      } else if (arr[1].offer.features[i] === 'elevator') {
        cardFeature.classList.add('popup__feature--elevator');
      } else if (arr[1].offer.features[i] === 'conditioner') {
        cardFeature.classList.add('popup__feature--conditioner');
      }
    }
    cardFeatures.appendChild(featureFragment);
  };
  drawCardFeatures(getAccomodationData());

  var showPhotoGallery = function () {
    removeChildren(cardPhotos, '.popup__photo'); //  удалил лишние элементы из шаблона карточки фото
    for (var i = 0; i < arr[1].offer.photos.length; i++) {
      var cardPhoto = document.createElement('img');
      cardPhoto.classList.add('popup__photo');
      cardPhoto.src = arr[1].offer.photos[i];
      cardPhoto.width = 45;
      cardPhoto.height = 40;
      cardPhoto.alt = 'Фото жилья';
      cardPhotos.appendChild(cardPhoto);
    }
  };
  showPhotoGallery();

  cardAvatar.src = arr[1].author.avatar;
};

var activateMap = function () {
  removeClass(map, 'map--faded');
  removeClass(addForm, 'ad-form--disabled');
  activateForms(noticeInputs);
  activateForms(mapFilterFeatures);
  activateForms(mapFilterSelects);
  drawPins(getAccomodationData());
  setNoticeAddressActive();
  drawCard(getAccomodationData());
};


var disableForms = function (formsArr) {
  for (var i = 0; i < formsArr.length; i++) {
    formsArr[i].disabled = true;
  }
};

var activateForms = function (formsArr) {
  for (var i = 0; i < formsArr.length; i++) {
    formsArr[i].disabled = false;
  }
};

var setNoticeAddressDisabled = function () {
  noticeAddress.value = Math.round(mapPinMain.offsetLeft + (mapPinMain.offsetWidth / 2)) + ' ' + Math.round(mapPinMain.offsetTop + (mapPinMain.offsetHeight / 2));
};
setNoticeAddressDisabled();

var setNoticeAddressActive = function () {
  noticeAddress.value = Math.round(mapPinMain.offsetLeft + (mapPinMain.offsetWidth / 2)) + ' ' + Math.round(mapPinMain.offsetTop + (mapPinMain.offsetHeight / 2) + mapPinArrowHeight);
};

var setPriseForType = function () {
  if (accommodationType.value === 'bungalo') {
    accommodationPrice.min = 0;
    accommodationPrice.placeholder = 0;
  } else if (accommodationType.value === 'flat') {
    accommodationPrice.min = 1000;
    accommodationPrice.placeholder = 1000;
  } else if (accommodationType.value === 'palace') {
    accommodationPrice.min = 10000;
    accommodationPrice.placeholder = 10000;
  } else if (accommodationType.value === 'house') {
    accommodationPrice.min = 5000;
    accommodationPrice.placeholder = 5000;
  }
};

accommodationType.addEventListener('change', function () {
  setPriseForType();
});

addForm.addEventListener('input', function () {
  if (Number(guestsNumber.value) === 1 && Number(roomNumber.value) === 100) {
    guestsNumber.setCustomValidity('Выберите до 3 комнат для 1 гостя');
  } else if (Number(guestsNumber.value) === 2 && Number(roomNumber.value) === 1) {
    guestsNumber.setCustomValidity('Выберите 2 или 3 комнаты для 2 гостей');
  } else if (Number(guestsNumber.value) === 2 && Number(roomNumber.value) === 100) {
    guestsNumber.setCustomValidity('Выберите 2 или 3 комнаты для 2 гостей');
  } else if (Number(guestsNumber.value) === 3 && Number(roomNumber.value) !== 3) {
    guestsNumber.setCustomValidity('Выберете 3 комнаты для 3 гостей');
  } else if (Number(guestsNumber.value) === 0 && Number(roomNumber.value) < 100) {
    guestsNumber.setCustomValidity('100 комнат - этот пункт не для гостей');
  } else {
    guestsNumber.setCustomValidity('');
  }
});

var deactivateMap = function () {
  disableForms(noticeInputs);
  disableForms(mapFilterFeatures);
  disableForms(mapFilterSelects);
};
deactivateMap();


mapPinMain.addEventListener('mousedown', function (evt) {
  if (evt.which === 1) {
    activateMap();
  }
});

mapPinMain.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    activateMap();
  }
});
