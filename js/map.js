'use strict';

(function () {
  var CONTENT_WIDHT = 1200;
  var MIN_Y_POSITION = 80;
  var MAX_Y_POSITION = 568;
  var MIN_X_POSITION = 20;

  var mapPinMain = window.util.mapSection.querySelector('.map__pin--main');

  var lastTimeout;

  var DEBOUNCE_INTERVAL = 500;

  var setPinPosition = function (elem, position) {
    elem.style.top = position.y + 'px';
    elem.style.left = position.x + 'px';

    var locationPositions = {
      minX: MIN_X_POSITION,
      maxX: CONTENT_WIDHT - MIN_X_POSITION,
      minY: MIN_Y_POSITION,
      maxY: MAX_Y_POSITION
    };

    if (elem.offsetTop <= locationPositions.minY) {
      elem.style.top = MIN_Y_POSITION + 'px';
    }

    if (elem.offsetTop >= locationPositions.maxY) {
      elem.style.top = MAX_Y_POSITION + 'px';
    }

    if (elem.offsetLeft <= -locationPositions.minX) {
      elem.style.left = -MIN_X_POSITION + 'px';
    }

    if (elem.offsetLeft >= locationPositions.maxX) {
      elem.style.left = (CONTENT_WIDHT - MIN_X_POSITION) + 'px';
    }
  };

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
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x + 'px');
      mapPinMain.style.top = (mapPinMain.offsetTop - shift.y + 'px');

      var pinPosition = {
        y: (mapPinMain.offsetTop - shift.y),
        x: (mapPinMain.offsetLeft - shift.x)
      };

      setPinPosition(mapPinMain, pinPosition);
      window.form.addCoordinate();

    };

    var mapPinMainMouseupHandler = function (e) {
      e.preventDefault();

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
