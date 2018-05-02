'use strict';

(function () {

  window.backend.dataLoad(function (data) {
    window.data = data;
    console.log(window.data)
  });
})();
