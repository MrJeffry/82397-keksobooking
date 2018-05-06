'use strict';

(function () {
  var ERROR_BLOCK = {
    POSITION: 'fixed',
    LEFT: 0,
    TOP: 0,
    PADDING_TOP: 30,
    WIDTH: 100,
    HEIGTH: 100,
    FONT_SIZE: 24,
    TEXT_ALIGN: 'center',
    COLOR: 'white',
    BACKGROUND: 'red',
    Z_INDEX: 10
  };

  var TIME_REMOVE_ELEMENT = 3000;

  var NOT_EDITABLE_INPUT = 1;

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

  var AppartamentGuestsErrors = {
    'one-rooms': '1 комната — «для 1 гостя»',
    'two-rooms': '2 комнаты — «для 2 гостей» или «для 1 гостя»',
    'three-rooms': '3 комнаты — «для 3 гостей», «для 2 гостей» или «для 1 гостя»',
    'hundred-rooms': '«не для гостей»'
  };

  var inputs = window.util.adForm.querySelectorAll('fieldset');
  var selectRooms = window.util.adForm.querySelector('[name="rooms"]');
  var selectPlace = window.util.adForm.querySelector('[name="capacity"]');
  var selectsTimeAccommodation = window.util.adForm.querySelector('.ad-form__element--time');

  var selectTypeChangeHandler = function () {
    var selectType = window.util.adForm.querySelector('[name="type"]');
    var labelType = window.util.adForm.querySelector('[name="price"]');
    selectType.addEventListener('change', function () {
      labelType.placeholder = AppartmentPrice[selectType.value];
      labelType.min = AppartmentPrice[selectType.value];
    });
  };

  var resetFormHandler = function () {
    setTimeout(function () {
      addCoordinate();
    });
  };

  var vialidateRoomsSelect = function (rooms, capacity) {
    if (rooms === AppartamentRooms.oneRoom && capacity !== AppartamentGuests.oneGuest) {
      selectPlace.setCustomValidity(AppartamentGuestsErrors['one-rooms']);
    } else if (rooms === AppartamentRooms.twoRooms && capacity !== AppartamentGuests.oneGuest && capacity !== AppartamentGuests.twoGuests) {
      selectPlace.setCustomValidity(AppartamentGuestsErrors['two-rooms']);
    } else if (rooms === AppartamentRooms.threeRooms && capacity === AppartamentGuests.notGuests) {
      selectPlace.setCustomValidity(AppartamentGuestsErrors['three-rooms']);
    } else if (rooms === AppartamentRooms.hundredRooms && capacity !== AppartamentGuests.notGuests) {
      selectPlace.setCustomValidity(AppartamentGuestsErrors['hundred-rooms']);
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

  var successSumbit = function () {
    var success = document.querySelector('.success');
    success.classList.remove('hidden');
    setTimeout(function () {
      success.classList.add('hidden');
      window.util.adForm.reset();
      addCoordinate();
    }, TIME_REMOVE_ELEMENT);
  };

  var errorFormSubmit = function (error) {
    var errorBlock = document.createElement('div');

    errorBlock.style.position = ERROR_BLOCK.POSITION;
    errorBlock.style.left = ERROR_BLOCK.LEFT;
    errorBlock.style.top = ERROR_BLOCK.TOP;
    errorBlock.style.width = ERROR_BLOCK.WIDTH + '%';
    errorBlock.style.height = ERROR_BLOCK.HEIGTH + 'px';
    errorBlock.style.paddingTop = ERROR_BLOCK.PADDING_TOP + 'px';
    errorBlock.style.fontSize = ERROR_BLOCK.FONT_SIZE + 'px';
    errorBlock.style.color = ERROR_BLOCK.COLOR;
    errorBlock.style.textAlign = ERROR_BLOCK.TEXT_ALIGN;
    errorBlock.style.background = ERROR_BLOCK.BACKGROUND;
    errorBlock.style.zIndex = ERROR_BLOCK.Z_INDEX;
    errorBlock.textContent = error;

    window.util.body.appendChild(errorBlock);
    setTimeout(function () {
      errorBlock.remove();
    }, TIME_REMOVE_ELEMENT);
  };

  var formSubmitButtonClickHandler = function () {
    vialidateRoomsSelect(selectRooms.value, selectPlace.value);
    window.util.adForm.addEventListener('submit', function (evt) {
      evt.preventDefault();
      window.backend.dataUpload(new FormData(window.util.adForm), successSumbit, errorFormSubmit);
    });
  };

  var toggleDisabledInputs = function (array, inDisabled) {
    var transformedArray = window.util.convertNodeListToArray(array);
    transformedArray.forEach(function (element) {
      element.disabled = inDisabled;
      if (inDisabled === false && element.children[1].id === 'address') {
        element.children[NOT_EDITABLE_INPUT].readOnly = true;
      }
    });
  };

  var getMainPinCoordinate = function () {
    var mainPin = document.querySelector('.map__pin--main');
    return parseInt(mainPin.style.left, 10) + ',' + parseInt(mainPin.style.top, 10);
  };

  var removeDisabledInputs = function () {
    toggleDisabledInputs(inputs, false);
    window.util.adForm.classList.remove('ad-form--disabled');
  };

  toggleDisabledInputs(inputs, true);

  var formValidate = function () {
    var selectType = window.util.adForm.querySelector('[name="type"]');
    var submitFormButton = window.util.adForm.querySelector('[type="submit"]');

    selectType.addEventListener('focus', selectTypeChangeHandler);
    selectType.addEventListener('blur', function () {
      selectType.removeEventListener('focus', selectTypeChangeHandler);
    });
    selectsTimeAccommodation.addEventListener('change', selectsTimeAccommodationChangeHandler);
    submitFormButton.addEventListener('click', formSubmitButtonClickHandler);
    window.util.adForm.addEventListener('reset', resetFormHandler);
  };

  formValidate();
  var addCoordinate = function () {
    var inputAddres = window.util.adForm.querySelector('[name="address"]');
    inputAddres.value = getMainPinCoordinate();
  };
  addCoordinate();

  window.form = {
    addCoordinate: addCoordinate,
    toggleDisabledInputs: toggleDisabledInputs,
    removeDisabledInputs: removeDisabledInputs
  };

})();
