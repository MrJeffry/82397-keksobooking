'use strict';

(function () {
  window.initialData = [];
  window.backend.dataLoad(function (data) {
    window.initialData = data;
  });
})();
