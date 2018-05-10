'use strict';

(function () {
  var draggedItem = null;

  var dragstartImageHandler = function (evt) {
    draggedItem = evt.target;
    evt.dataTransfer.setData('text/plain', evt.target.alt);
  };

  var dragoverImageHandler = function (evt) {
    evt.preventDefault();
    return false;
  };

  var dropImageHendler = function (evt) {
    evt.target.style.backgroundColor = '';
    evt.target.append(draggedItem);
    evt.preventDefault();
  };

  var dragenterImageHandler = function (evt) {
    evt.target.style.backgroundColor = 'yellow';
    evt.preventDefault();
  };

  var dragleaveImageHendler = function (evt) {
    evt.target.style.backgroundColor = '';
    evt.preventDefault();
  };

  window.draganddrop = {
    dragstartImageHandler: dragstartImageHandler,
    dragoverImageHandler: dragoverImageHandler,
    dropImageHendler: dropImageHendler,
    dragenterImageHandler: dragenterImageHandler,
    dragleaveImageHendler: dragleaveImageHendler
  };

})();
