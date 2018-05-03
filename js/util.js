'use strict';
(function () {
  var KEYCODE = {
    ESCAPE: 27,
    ENTER: 13
  };
  var mapSection = document.querySelector('.map');
  var template = document.querySelector('template');
  var adForm = document.querySelector('.ad-form');
  var body = document.querySelector('body');

  var shufflesArray = function (array) {
    var randomNumbers = [];
    var hashArray = [];
    for (var i = array.length - 1; i > 0; i--) {
      randomNumbers = Math.floor(Math.random() * (i + 1));
      hashArray = array[i];
      array[i] = array[randomNumbers];
      array[randomNumbers] = hashArray;
    }
    return array;
  };

  var randomNumber = function (min, max) {
    return Math.floor(min + (Math.random()) * (max - min));
  };

  var deleteAllElements = function (parentElement, element) {
    parentElement.querySelectorAll(element).forEach(function (currentElement) {
      currentElement.remove();
    });
  };

  var convertNodeListToArray = function (array) {
    return Array.prototype.slice.call(array);
  };

  window.util = {
    KEYCODE: KEYCODE,
    mapSection: mapSection,
    template: template,
    adForm: adForm,
    body: body,
    shufflesArray: shufflesArray,
    randomNumber: randomNumber,
    deleteAllElements: deleteAllElements,
    convertNodeListToArray: convertNodeListToArray,
  };

})();
