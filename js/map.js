'use strict';

var CONTENT_WIDHT = 1200;
var MIN_Y_POSITION = 80;
var MAX_Y_POSITION = 568;
var MIN_X_POSITION = 20;


var KEYCODES = {
  escape: 27,
  enter: 13
};

var AppartmentPrice = {
  'palace': 10000,
  'flat': 1000,
  'bungalo': 0,
  'house': 5000
};

var AppartamentGuests = {
  'oneGuest': '1',
  'twoGuests': '2',
  'threeGuests': '3',
  'notGuests': '0'
};

var AppartamentRooms = {
  'oneRoom': '1',
  'twoRooms': '2',
  'threeRooms': '3',
  'hundredRooms': '100'
};


var mapPinMain = mapSection.querySelector('.map__pin--main');
var inputs = AdForm.querySelectorAll('fieldset');
var selectRooms = AdForm.querySelector('[name="rooms"]');
var selectPlace = AdForm.querySelector('[name="capacity"]');
var selectsTimeAccommodation = AdForm.querySelector('.ad-form__element--time');

var removePopupHandlers = function () {
  buttonPopupClose.removeEventListener('click', closeButtonPopupClickHandler);
  buttonPopupClose.removeEventListener('keydown', popupPressEnterKeyHandler);
  document.removeEventListener('keydown', popupPressEscKeyHandler);
};

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
    addCoordinate();

  };

  var mapPinMainMouseupHandler = function (e) {
    e.preventDefault();

    document.removeEventListener('mousemove', mapPinMainMousemoveHandler);
    document.removeEventListener('mouseup', mapPinMainMouseupHandler);

    mapSection.classList.remove('map--faded');

    removeDisabledInputs();
    mapPins.appendChild(fragmentPins);
  };

  document.addEventListener('mouseup', mapPinMainMouseupHandler);
  document.addEventListener('mousemove', mapPinMainMousemoveHandler);
};

mapPinMain.addEventListener('mousedown', mapPinMainMousedownHandler);

var closeButtonPopupClickHandler = function () {
  adCard.remove();
  buttonPopupClose.removeEventListener('click', closeButtonPopupClickHandler);
  buttonPopupClose.removeEventListener('keydown', popupPressEnterKeyHandler);
  document.removeEventListener('keydown', popupPressEscKeyHandler);
};

var popupPressEscKeyHandler = function (evt) {
  if (evt.keyCode === KEYCODES.escape) {
    adCard.remove();
    removePopupHandlers();
  }
};

var popupPressEnterKeyHandler = function (evt) {
  if (evt.keyCode === KEYCODES.enter) {
    adCard.remove();
    removePopupHandlers();
  }
};

var selectTypeChangeHandler = function () {
  var selectType = AdForm.querySelector('[name="type"]');
  var labelType = AdForm.querySelector('[name="price"]');
  selectType.addEventListener('change', function () {
    labelType.placeholder = AppartmentPrice[selectType.value];
    labelType.min = AppartmentPrice[selectType.value];
  });
};

var vialidateRoomsSelect = function (rooms, capacity) {
  if (rooms === AppartamentRooms.oneRoom && capacity !== AppartamentGuests.oneGuest) {
    selectPlace.setCustomValidity('1 комната — «для 1 гостя»');
  } else if (rooms === AppartamentRooms.twoRooms && capacity !== AppartamentGuests.oneGuest && capacity !== AppartamentGuests.twoGuests) {
    selectPlace.setCustomValidity('2 комнаты — «для 2 гостей» или «для 1 гостя»');
  } else if (rooms === AppartamentRooms.threeRooms && capacity === AppartamentGuests.notGuests) {
    selectPlace.setCustomValidity('3 комнаты — «для 3 гостей», «для 2 гостей» или «для 1 гостя»');
  } else if (rooms === AppartamentRooms.hundredRooms && capacity !== AppartamentGuests.notGuests) {
    selectPlace.setCustomValidity('«не для гостей»');
  } else {
    selectPlace.setCustomValidity('');
  }
};

var selectsTimeAccommodationChangeHandler = function (evt) {
  if (evt.target.nextElementSibling) {
    evt.target.nextElementSibling.value = evt.target.value;
  } else {
    evt.target.previousElementSibling.value = evt.target.value;
  }
};

var formSubmitButtonClickHandler = function () {
  vialidateRoomsSelect(selectRooms.value, selectPlace.value);
};

var toggleDisabledInputs = function (array, inDisabled) {
  var transformedArray = convertNodeListToArray(array);
  transformedArray.forEach(function (element) {
    element.disabled = inDisabled;
    if (inDisabled === false && element.children[1].id === 'address') {
      element.children[1].readOnly = true;
    }
  });
};

var getMainPinCoordinate = function () {
  var mainPin = document.querySelector('.map__pin--main');
  return parseInt(mainPin.style.left, 10) + ',' + parseInt(mainPin.style.top, 10);
};

var addCoordinate = function () {
  var inputAddres = AdForm.querySelector('[name="address"]');
  inputAddres.value = getMainPinCoordinate();
};

var removeDisabledInputs = function () {
  toggleDisabledInputs(inputs, false);
  // mapPinMain.removeEventListener('mousedown', mapPinMainMousedownHandler);
  AdForm.classList.remove('ad-form--disabled');
};

toggleDisabledInputs(inputs, true);

var formValidate = function () {
  var selectType = AdForm.querySelector('[name="type"]');
  var submitFormButton = AdForm.querySelector('[type="submit"]');

  selectType.addEventListener('focus', selectTypeChangeHandler);
  selectType.addEventListener('blur', function () {
    selectType.removeEventListener('focus', selectTypeChangeHandler);
  });
  selectsTimeAccommodation.addEventListener('change', selectsTimeAccommodationChangeHandler);
  submitFormButton.addEventListener('click', formSubmitButtonClickHandler);
};

addCoordinate();
formValidate();
