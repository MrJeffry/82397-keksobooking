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

  // var generateAdContents = function (data) {
  //   var adContents = [];
  //   for (var i = 0; i < data.length; i++) {
  //     adContents[i] = {
  //       'author': {
  //         'avatar': data[i].author.avatar
  //       },
  //       'offer': {
  //         'title': data[i].offer.title,
  //         'address': data[i].offer.address,
  //         'price': data[i].offer.price,
  //         'type': data[i].offer.type,
  //         'rooms': data[i].offer.rooms,
  //         'guests': data[i].offer.guests,
  //         'checkin': data[i].offer.checkin,
  //         'checkout': data[i].offer.checkout,
  //         'features': data[i].offer.features,
  //         'description': data[i].offer.description,
  //         'photos': data[i].offer.photos
  //       },
  //       'location': {
  //         'x': data[i].location.x,
  //         'y': data[i].location.y
  //       }
  //     };
  //   }
  //   return adContents;
  // };

  window.data = {
    generateAdContents: generateAdContents
  };

})();
