'use strict';

window.util = (function () {
  return {
    KEYCODES: {
      escape: 27,
      enter: 13
    },
    shufflesArray: function (array) {
      var randomNumbers = [];
      var hashArray = [];
      for (var i = array.length - 1; i > 0; i--) {
        randomNumbers = Math.floor(Math.random() * (i + 1));
        hashArray = array[i];
        array[i] = array[randomNumbers];
        array[randomNumbers] = hashArray;
      }
      return array;
    },
    randomNumber: function (min, max) {
      return Math.floor(min + (Math.random()) * (max - min));
    },
    deleteAllElements: function (parentElement, element) {
      parentElement.querySelectorAll(element).forEach(function (currentElement) {
        currentElement.remove();
      });
    },
    convertNodeListToArray: function (array) {
      return Array.prototype.slice.call(array);
    },
    mapSection: document.querySelector('.map'),
    template: document.querySelector('template'),
    adForm: document.querySelector('.ad-form')
  };
})();
