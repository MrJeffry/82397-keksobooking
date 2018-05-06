'use strict';

(function () {

  var MIN_PRICE_VALUE = 10000;
  var MAX_PRICE_VALUE = 50000;

  var FilterPriceValues = {
    'any': 'any',
    'middle': 'middle',
    'low': 'low',
    'high': 'high'
  };

  var filterData = [];

  var filter = document.querySelector('.map__filters-container');
  var appartamentTypesSelect = filter.querySelector('[name="housing-type"]');
  var apparmentPriceSelect = filter.querySelector('[name="housing-price"]');
  var roomsPriceSelect = filter.querySelector('[name="housing-rooms"]');
  var apparmentGuestsSelect = filter.querySelector('[name="housing-guests"]');

  var allFeatures = filter.querySelectorAll('input[name="features"]');

  var setFilterByHouseType = function (filterValue, item) {
    return filterValue === 'any' || item === filterValue;
  };

  var setFilterByPriceType = function (price) {
    if (apparmentPriceSelect.value === FilterPriceValues.middle) {
      return (price >= MIN_PRICE_VALUE) && (price < MAX_PRICE_VALUE);
    }

    if (apparmentPriceSelect.value === FilterPriceValues.low) {
      return (price < MIN_PRICE_VALUE);
    }

    if (apparmentPriceSelect.value === FilterPriceValues.high) {
      return (price >= MAX_PRICE_VALUE);
    }

    return true;
  };

  // var setFilterByRooms = function(item) {
  //   if (roomsPriceSelect.value === 'any') {
  //     return item === 'any';
  //   }
  // };

  // var setFilterGuests = function (filterValue, item) {
  //   return filterValue === 'any' || item === filterValue;
  // };

  var setFilterByFeautures = function (filterFeautures, itemFeautures) {
    return filterFeautures.every(function (item) {
      return itemFeautures.indexOf(item) !== -1;
    });
  };

  var setFilters = function () {
    var checkedFeauturesArray = window.util.convertNodeListToArray(allFeatures);
    var selectedFeatures = checkedFeauturesArray.filter(function (item) {
      return item.checked;
    }).map(function (item) {
      return item.value;
    });

    return window.initialData.filter(function (item) {
      if (!setFilterByHouseType(appartamentTypesSelect.value, item.offer.type)) {
        return false;
      }
      if (!setFilterByPriceType(item.offer.price)) {
        return false;
      }
      if (!setFilterByFeautures(selectedFeatures, item.offer.features)) {
        return false;
      }
      // if (!setFilterByRooms(item.offer.rooms)) {
      //   return false;
      // }
      // if (!setFilterGuests(item.offer.guests)) {
      //   return false;
      // }

      return true;
    });
  };

  window.filters = {
    setFilters: setFilters,
    filterData: filterData
  };

})();
