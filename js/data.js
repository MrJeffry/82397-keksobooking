'use strict';

(function () {

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

  var GENERATE_PINS = 8;

  var generateAdContents = function () {
    var adContents = [];
    for (var i = 0; i < GENERATE_PINS; i++) {
      adContents[i] = {
        'author': {
          'avatar': AVATARS[i]
        },
        'offer': {
          'title': TITLES[i],
          'address': [window.util.randomNumber(300, 900), window.util.randomNumber(150, 500)],
          'price': window.util.randomNumber(1000, 1000000),
          'type': TYPES[i],
          'rooms': window.util.randomNumber(1, 5),
          'guests': window.util.randomNumber(1, 5),
          'checkin': CHECKINS[window.util.randomNumber(0, 2)],
          'checkout': CHECKOUTS[window.util.randomNumber(0, 2)],
          'features': window.util.shufflesArray(FEAUTERES),
          'description': '',
          'photos': window.util.shufflesArray(PHOTOS)
        },
        'location': {
          'x': window.util.randomNumber(300, 900),
          'y': window.util.randomNumber(150, 500)
        }
      };
    }
    return adContents;
  };
  window.data = {
    generateAdContents: generateAdContents
  };

})();
