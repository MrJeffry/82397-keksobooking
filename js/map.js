'use strict';

var GENERATE_PINS = 8;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;

var AVATARS = [
  'img/avatars/user01.png', 'img/avatars/user02.png', 'img/avatars/user03.png',
  'img/avatars/user04.png', 'img/avatars/user05.png', 'img/avatars/user06.png',
  'img/avatars/user07.png', 'img/avatars/user08.png'
];
var TITLES = [
  'Большая уютная квартира', 'Маленькая неуютная квартира',
  'Огромный прекрасный дворец', 'Маленький ужасный дворец',
  'Красивый гостевой домик', 'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'
];

var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var CHECKINS = ['12:00', '13:00', '14:00'];
var CHECKOUTS = ['12:00', '13:00', '14:00'];
var FEAUTERES = ['wifi', 'dishwasher', 'parking',
  'washer', 'elevator', 'conditioner'
];

var PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

var AppartmentTypes = {
  'palace': 'Дворец',
  'flat': 'Квартира',
  'bungalo': 'Бунгало',
  'house': 'Дом'
};

var template = document.querySelector('template');
var templateAdCard = template.content.querySelector('.map__card');
var adCard = templateAdCard.cloneNode(true);
var adCardPhoto = adCard.querySelector('.popup__photos');

var randomNumber = function (min, max) {
  return Math.floor(min + (Math.random()) * (max - min));
};

var shufflesArray = function (array) {
  var randomNumbers = [];
  var hashArray = [];
  for (var i = array.length - 1; i > 0; i--) {
    randomNumbers = Math.floor(Math.random() * (i + 1));
    hashArray = array[i];
    array[i] = array[randomNumbers];
    array[randomNumbers] = hashArray;
  }
  return array;
};

var deleteAllElements = function (parentElement, element) {
  parentElement.querySelectorAll(element).forEach(function (currentElement) {
    currentElement.remove();
  });
};

var generateAdContents = function () {
  var adContents = [];
  for (var i = 0; i < GENERATE_PINS; i++) {
    adContents[i] = {
      'author': {
        'avatar': AVATARS[i]
      },
      'offer': {
        'title': TITLES[i],
        'address': [randomNumber(300, 900), randomNumber(150, 500)],
        'price': randomNumber(1000, 1000000),
        'type': TYPES[i],
        'rooms': randomNumber(1, 5),
        'guests': randomNumber(1, 5),
        'checkin': CHECKINS[randomNumber(0, 2)],
        'checkout': CHECKOUTS[randomNumber(0, 2)],
        'features': shufflesArray(FEAUTERES),
        'description': '',
        'photos': shufflesArray(PHOTOS)
      },
      'location': {
        'x': randomNumber(300, 900),
        'y': randomNumber(150, 500)
      }
    };
  }
  return adContents;
};

var pinContents = generateAdContents();

var createPin = function (adContents) {
  var templatePin = template.content.querySelector('.map__pin');
  var myPin = templatePin.cloneNode(true);
  var myPinImg = myPin.querySelector('img');

  myPin.style.left = adContents.location.x - (PIN_WIDTH / 2) + 'px';
  myPin.style.top = adContents.location.y - (PIN_HEIGHT / 2) + 'px';
  myPinImg.src = adContents.author.avatar;
  myPinImg.alt = adContents.offer.title;

  return myPin;
};

var generatePins = function (arrayAd) {
  var fragmentPins = document.createDocumentFragment();
  for (var i = 0; i < arrayAd.length; i++) {
    fragmentPins.appendChild(createPin(arrayAd[i]));
  }
  return fragmentPins;
};

var fragmentPins = generatePins(pinContents);

var createAdPhotos = function (arrayAdPhotos) {
  var adCardPhotosImg = adCardPhoto.querySelector('img');
  var adCardPhotosItems = adCardPhotosImg.cloneNode(true);
  adCardPhotosItems.src = arrayAdPhotos;
  return adCardPhotosItems;
};

var generatedPhotos = function (arrayAdPhotos) {
  var fragmentAdPhotos = document.createDocumentFragment();
  for (var i = 0; i < arrayAdPhotos.length; i++) {
    fragmentAdPhotos.appendChild(createAdPhotos(arrayAdPhotos[i]));
  }
  return fragmentAdPhotos;
};

var generateFeatures = function (arrayAdFeatures) {
  var adCardFeatures = adCard.querySelector('.popup__features');
  var newAdCardFeatures = adCardFeatures.cloneNode();
  adCardFeatures.remove();
  for (var i = 0; i < arrayAdFeatures.length; i++) {
    newAdCardFeatures.innerHTML +=
    '<li class="popup__feature popup__feature--' + arrayAdFeatures[i] + '"></li>';
  }
  return newAdCardFeatures;
};

var generateAdCard = function (pinContent) {
  var adCardAvatar = adCard.querySelector('.popup__avatar');
  var adCardTitle = adCard.querySelector('.popup__title');
  var adCardAdress = adCard.querySelector('.popup__text--address');
  var adCardPrice = adCard.querySelector('.popup__text--price');
  var adCardType = adCard.querySelector('.popup__type');
  var adCardСapacity = adCard.querySelector('.popup__text--capacity');
  var adCardTimes = adCard.querySelector('.popup__text--time');
  var adCardDescription = adCard.querySelector('.popup__description');

  adCardAvatar.src = pinContent.author.avatar;
  adCardTitle.textContent = pinContent.offer.title;
  adCardAdress.textContent = pinContent.offer.address;
  adCardPrice.innerHTML = pinContent.offer.price + '₽/<span>ночь</span>';
  adCardType.textContent = AppartmentTypes[pinContent.offer.type];
  adCardСapacity.textContent = pinContent.offer.rooms + ' комнаты для ' +
    pinContent.offer.rooms + ' гостей';
  adCardTimes.textContent = 'Заезд после ' + pinContent.offer.checkin +
    ' , выезд до ' + pinContent.offer.checkout;

  var newAdCardFeatures = generateFeatures(pinContent.offer.features);
  adCardDescription.insertAdjacentElement('beforeBegin', newAdCardFeatures);
  adCardDescription.textContent = pinContent.offer.description;
  var fragmentAdPhotos = generatedPhotos(pinContent.offer.photos);
  deleteAllElements(adCardPhoto, 'img');
  adCardPhoto.appendChild(fragmentAdPhotos);

  return adCard;
};

var arrayForEach = function (array) {
  var newArray = Array.prototype.slice.call(array);
  return newArray;
};

var toggleDisabledInputs = function (array, inDisabled) {
  var transformedArray = arrayForEach(array);
  transformedArray.forEach(function (element) {
    element.disabled = inDisabled;
  });
};

var getAdCardsCoordinate = function () {
  var adcardcoordinate = adCard.querySelector('.popup__text--address').textContent;
  return adcardcoordinate;
};

var mapPinMain = document.querySelector('.map__pin--main');
var form = document.querySelector('.ad-form');
var inputs = form.querySelectorAll('fieldset');

var addCoordinate = function () {
  var inputAddres = form.querySelector('[name="address"]');
  inputAddres.value = getAdCardsCoordinate();
};

var removeDisabledInputs = function () {
  toggleDisabledInputs(inputs, false);
  mapPinMain.removeEventListener('mouseup', mapPinMainMouseupHandler);
  form.classList.remove('ad-form--disabled');
};

var mapPinMainMouseupHandler = function () {
  document.querySelector('.map').classList.remove('map--faded');
  document.querySelector('.map__pins').appendChild(fragmentPins);
  removeDisabledInputs();
  document.querySelectorAll('.map__pin').forEach(function (element, index) {
    element.addEventListener('click', function () {
      var adCards = generateAdCard(pinContents[index - 1]);
      getAdCardsCoordinate();
      addCoordinate();
      document.querySelector('.map__filters-container').insertAdjacentElement('beforeBegin', adCards);
      return adCards;
    });
  });
};

addCoordinate();
toggleDisabledInputs(inputs, true);
mapPinMain.addEventListener('mouseup', mapPinMainMouseupHandler);
