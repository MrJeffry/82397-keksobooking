'use strict';

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
var FEAUTERES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
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
var GENERATE_PINS = 8;
var template = document.querySelector('template');

document.querySelector('.map').classList.remove('map--faded');


var randomNumber = function (min, max) {
  return Math.floor(min + (Math.random()) * (max - min));
};

var generateAdContents = function () {
  var addContents = [];
  for (var i = 0; i < GENERATE_PINS; i++) {
    addContents[i] = {
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
        'checkin': CHECKINS[i],
        'checkout': CHECKOUTS[i],
        'features': FEAUTERES,
        'description': '',
        'photos': PHOTOS
      },
      'location': {
        'x': randomNumber(300, 900),
        'y': randomNumber(150, 500)
      }
    };
  }
  return addContents;
};

var pinContents = generateAdContents();

var createPin = function (adContents) {
  var templatePin = template.content.querySelector('.map__pin');
  var myPin = templatePin.cloneNode(true);
  var myPinImg = myPin.querySelector('img');

  myPin.style.left = adContents.location.x - 25 + 'px';
  myPin.style.top = adContents.location.y - 35 + 'px';
  myPinImg.src = adContents.author.avatar;
  myPinImg.alt = adContents.offer.title;

  return myPin;
};

var generatePins = function (arrayAd) {
  var myFragment = document.createDocumentFragment();
  for (var i = 0; i < arrayAd.length; i++) {
    myFragment.appendChild(createPin(arrayAd[i]));
  }
  return myFragment;
};
var myFragment = generatePins(pinContents);

var generateAdCard = function (pinContent) {
  var templateAdCard = template.content.querySelector('.map__card');
  var adCard = templateAdCard.cloneNode(true);

  var adCardAvatar = adCard.querySelector('.popup__avatar');
  var adCardTitle = adCard.querySelector('.popup__title');
  var adCardAdress = adCard.querySelector('.popup__text--address');
  var adCardPrice = adCard.querySelector('.popup__text--price');
  var adCardType = adCard.querySelector('.popup__type');
  var adCardСapacity = adCard.querySelector('.popup__text--capacity');
  var adCardTimes = adCard.querySelector('.popup__text--time');
  var adCardFeatures = adCard.querySelector('.popup__features');
  var adCardDescription = adCard.querySelector('.popup__description');
  var adCardPhotos = adCard.querySelector('.popup__photos');
  var adCardPhotosImg = adCardPhotos.querySelector('img');
  var adCardPhotosItems = adCardPhotosImg.cloneNode(true);

  adCardAvatar.src = pinContent.author.avatar;
  adCardTitle.textContent = pinContent.offer.title;
  adCardAdress.textContent = pinContent.offer.address;
  adCardPrice.innerHTML = pinContent.offer.price + '₽/<span>ночь</span>';
  adCardType.textContent = AppartmentTypes[pinContent.offer.type];

  adCardСapacity.textContent = pinContent.offer.rooms + ' комнаты для ' + pinContent.offer.rooms + ' гостей';
  adCardTimes.textContent = 'Заезд после ' + pinContent.offer.checkin + ' , выезд до ' + pinContent.offer.checkout;
  adCardFeatures.textContent = pinContent.offer.features;
  adCardDescription.textContent = pinContent.offer.description;

  for (var i = 0; i < pinContent.offer.photos.length; i++) {
    adCardPhotosItems.src = pinContent.offer.photos[i];
  }
  adCardPhotos.appendChild(adCardPhotosItems);
  return adCard;
};

var adCard = generateAdCard(pinContents[1]);

document.querySelector('.map__pins').appendChild(myFragment);
document.querySelector('.map__filters-container').insertAdjacentElement('beforeBegin', adCard);
// Перетасовка массива
// Алгоритм Фишера Ейца

// Функция которая будет генарить много пинов
// Функция которая будет эти пины рендерить
