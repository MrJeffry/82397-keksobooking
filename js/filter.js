'use strict';

(function () {
  var filter = document.querySelector('.map__filters-container');

  var appartamentTypesSelect = filter.querySelector('[name="housing-type"]');

  var filterData = [];
  appartamentTypesSelect.addEventListener('change', function (e) {
    filterData = window.initialData.filter(function (data) {
      return data.offer.type === e.target.value;
    });
    window.pin.generatePins(filterData);
    window.backend.dataLoad(window.pin.generatePins);
  });
})();
