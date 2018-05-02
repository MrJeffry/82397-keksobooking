'use strict';
(function () {

  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;

  var mapFiltersContainer = window.util.mapSection.querySelector('.map__filters-container');
  var fragmentPins = document.createDocumentFragment();
  var mapPins = window.util.mapSection.querySelector('.map__pins');

  window.backend.dataLoad(datas);

  var datas = function (data) {
    window.datas = {
      data: data
    };
  };

  var mapPinClickHandler = function (evt) {
    var mapPin = mapPins.querySelectorAll('.map__pin');
    var currentTargetIndex = window.util.convertNodeListToArray(mapPin).indexOf(evt.currentTarget);
    // mapFiltersContainer.insertAdjacentElement('beforeBegin', window.card.generateAdCard(data[currentTargetIndex - 1]));
    console.log(window.datas.data)
  };


  var createPin = function (adContents) {
    var templatePin = window.util.template.content.querySelector('.map__pin');
    var myPin = templatePin.cloneNode(true);
    var myPinImg = myPin.querySelector('img');

    myPin.style.left = adContents.location.x - (PIN_WIDTH / 2) + 'px';
    myPin.style.top = adContents.location.y - (PIN_HEIGHT / 2) + 'px';
    myPinImg.src = adContents.author.avatar;
    myPinImg.alt = adContents.offer.title;

    myPin.addEventListener('click', mapPinClickHandler);
    fragmentPins.appendChild(myPin);
  };

  var generatePins = function (arrayAd) {
    arrayAd.forEach(function (item) {
      //Это и есть ко
      createPin(item, addPinsToMap);
    });
  };

  var addPinsToMap = function () {
    mapPins.appendChild(fragmentPins);
  };

  window.backend.dataLoad(generatePins);

  window.pin = {
    addPinsToMap: addPinsToMap
  };

})();

// Мы загружаем данные в момен загрузки страницы -> наполняем пины -> складываем их в фрагмент -> при движении пина фракмент отображаем на карте

//Что это за дефаулт?
