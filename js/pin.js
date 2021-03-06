'use strict';
(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;

  var mapFiltersContainer = window.util.mapSection.querySelector('.map__filters-container');
  var fragmentPins = document.createDocumentFragment();
  var mapPins = window.util.mapSection.querySelector('.map__pins');

  var mapPinClickHandler = function (evt) {
    var mapPin = mapPins.querySelectorAll('.map__pin');
    var currentTargetIndex = window.util.convertNodeListToArray(mapPin).indexOf(evt.currentTarget);
    if (window.filters.filterData.length !== 0) {
      mapFiltersContainer.insertAdjacentElement('beforeBegin', window.card.generateAdCard(window.filters.filterData[currentTargetIndex - 1]));
    } else {
      mapFiltersContainer.insertAdjacentElement('beforeBegin', window.card.generateAdCard(window.initialData[currentTargetIndex - 1]));
    }
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
    var sliceArrayAd = arrayAd.slice(0, 5);
    sliceArrayAd.forEach(function (item) {
      createPin(item);
    });
    addPinsToMap();
  };

  var removeChildMap = function () {
    var mapPinsChildren = mapPins.querySelectorAll('[type="button"]');
    mapPinsChildren = window.util.convertNodeListToArray(mapPinsChildren);
    mapPinsChildren.forEach(function (item) {
      mapPins.removeChild(item);
    });
  };

  var addPinsToMap = function () {
    if (mapPins.childElementCount <= 2) {
      mapPins.appendChild(fragmentPins);
    } else if (mapPins.childElementCount >= 2) {
      removeChildMap();
      mapPins.appendChild(fragmentPins);
    }
  };

  window.pin = {
    addPinsToMap: addPinsToMap,
    generatePins: generatePins
  };
})();
