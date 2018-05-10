'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500;
  var MIN_Y_POSITION = 150;
  var MAX_Y_POSITION = 500;
  var MIN_X_POSITION = 20;
  var MAX_X_POSITION = 1100;

  var mapPinMain = window.util.mapSection.querySelector('.map__pin--main');

  var lastTimeout;

  var filter = document.querySelector('.map__filters-container');

  var addFiltersInputsHendler = function () {
    var filterInputs = filter.querySelectorAll('input');
    var filterSelect = filter.querySelectorAll('select');

    filterInputs = window.util.convertNodeListToArray(filterInputs);
    filterSelect = window.util.convertNodeListToArray(filterSelect);

    filterInputs.forEach(function (item) {
      item.addEventListener('change', filtersChangeHendler);
    });

    filterSelect.forEach(function (item) {
      item.addEventListener('change', filtersChangeHendler);
    });
  };

  var setFilters = function () {
    window.card.adCard.remove();
    window.filters.filterData = window.filters.setFilters();
    window.pin.generatePins(window.filters.filterData);
  };

  var filtersChangeHendler = function () {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
      lastTimeout = null;
    }
    lastTimeout = window.setTimeout(setFilters, DEBOUNCE_INTERVAL);
  };

  var mapPinMainMousedownHandler = function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var mapPinMainMousemoveHandler = function (moveEvt) {
      moveEvt.preventDefault();

      var setRestrictMainPinPosition = function (pinCoords, min, max) {
        return Math.max(min, Math.min(pinCoords, max));
      };

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      var mainPinLeft = mapPinMain.offsetLeft - shift.x;
      var mainPinTop = mapPinMain.offsetTop - shift.y;

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      mainPinLeft = setRestrictMainPinPosition(mainPinLeft, MIN_X_POSITION, MAX_X_POSITION);
      mainPinTop = setRestrictMainPinPosition(mainPinTop, MIN_Y_POSITION, MAX_Y_POSITION);

      mapPinMain.style.top = (mainPinTop) + 'px';
      mapPinMain.style.left = (mainPinLeft) + 'px';

      window.form.addCoordinate();

      mapPinMain.addEventListener('mouseup', mapPinMainMouseupHandler);
    };

    var mapPinMainMouseupHandler = function (mouseUpEvent) {
      mouseUpEvent.preventDefault();

      document.removeEventListener('mousemove', mapPinMainMousemoveHandler);
      document.removeEventListener('mouseup', mapPinMainMouseupHandler);

      window.util.mapSection.classList.remove('map--faded');

      window.form.removeDisabledInputs();
      window.pin.generatePins(window.initialData);

    };

    document.addEventListener('mouseup', mapPinMainMouseupHandler);
    document.addEventListener('mousemove', mapPinMainMousemoveHandler);
  };

  mapPinMain.addEventListener('mousedown', mapPinMainMousedownHandler);

  addFiltersInputsHendler();

  window.map = {
    mapPinMainMousedownHandler: mapPinMainMousedownHandler,
    setFilters: setFilters
  };
})();
