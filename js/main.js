'use strict';

var map = document.querySelector('.map');
var mapPins = document.querySelector('.map__pins');

var pinTemplate = document.querySelector('#pin').content.querySelector('button');
var fragment = document.createDocumentFragment();

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

var appendElement = function (parent, child) {
  parent.appendChild(child);
};

var createPins = function (arr) {
  for (var i = 0; i < 8; i++) {
    var element = pinTemplate.cloneNode(true);
    element.style.left = arr[i].location.x - (PIN_WIDTH / 2) + 'px';
    element.style.top = arr[i].location.y - PIN_HEIGHT + 'px';
    var pinImage = element.querySelector('img');
    pinImage.src = arr[i].author.avatar;
    pinImage.alt = arr[i].offer.description;
    fragment.appendChild(element);
  }
};

createPins(getAccomodationData());
removeClass(map, 'map--faded');
appendElement(mapPins, fragment);
