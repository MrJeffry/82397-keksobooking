'use strict';
var avatar = ['img/avatars/user01.png', 'img/avatars/user02.png', 'img/avatars/user03.png', 'img/avatars/user04.png', 'img/avatars/user05.png', 'img/avatars/user06.png', 'img/avatars/user07.png', 'img/avatars/user08.png'];
var title = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var address = ['600', '350'];
var price = ['1000'];
var type = ['palace', 'flat', 'house', 'bungalo'];
var rooms = ['1', '2', '3', '4', '5'];
var guests = ['2'];
var checkin = ['12:00', '13:00', '14:00'];
var checkout = checkin;
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg']
var locationY = 200;
var locationX = 300;

var templatePin = document.querySelector('template').content.querySelector('.map__pin');
var myPin = templatePin.cloneNode(true);
var myFragment = document.createDocumentFragment();
var myPinImg = myPin.querySelector('img');

document.querySelector('.map').classList.remove('map--faded');

for (var i = 0; i < 2; i++) {
  // WHY???
  myPin[i] = templatePin.cloneNode(true);
  myPinImg[i] = myPin[i].querySelector('img');

  myPin[i].style.left = locationX + i * 100 + 'px';
  myPin[i].style.top = locationY + i * 100 + 'px';
  myPinImg[i].src = avatar[i];
  myPinImg[i].alt = title[i];
  myFragment.appendChild(myPin[i]);
}

document.querySelector('.map__pins').appendChild(myFragment);

