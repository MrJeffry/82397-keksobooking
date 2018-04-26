'use strict';

(function () {

  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  console.log(util.mapSection)
  var mapPins = window.util.mapSection.querySelector('.map__pins');
  var mapFiltersContainer = window.util.mapSection.querySelector('.map__filters-container');

  var pinContents = window.data.generateAdContents();

  var createPin = function (adContents) {
    var templatePin = window.util.template.content.querySelector('.map__pin');
    var myPin = templatePin.cloneNode(true);
    var myPinImg = myPin.querySelector('img');

    myPin.style.left = adContents.location.x - (PIN_WIDTH / 2) + 'px';
    myPin.style.top = adContents.location.y - (PIN_HEIGHT / 2) + 'px';
    myPinImg.src = adContents.author.avatar;
    myPinImg.alt = adContents.offer.title;

    myPin.addEventListener('click', mapPinClickHandler);

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

  mapPins.appendChild(fragmentPins);

  var mapPinMainMouseupHandler = function (e) {
    e.preventDefault();

    // document.removeEventListener('mousemove', mapPinMainMousemoveHandler);
    document.removeEventListener('mouseup', mapPinMainMouseupHandler);

    window.util.mapSection.classList.remove('map--faded');

    // removeDisabledInputs();
  };

  var mapPinClickHandler = function (evt) {
    var mapPin = mapPins.querySelectorAll('.map__pin');
    var currentTargetIndex = window.util.convertNodeListToArray(mapPin).indexOf(evt.currentTarget);
    mapFiltersContainer.insertAdjacentElement('beforeBegin', generateAdCard(pinContents[currentTargetIndex - 1]));
  };

  console.log(generateAdCard(pinContents[currentTargetIndex - 1]))

})();
