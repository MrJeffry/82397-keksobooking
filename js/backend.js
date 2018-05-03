'use strict';

(function () {
  var URL = {
    LOAD: 'https://js.dump.academy/keksobooking/data',
    UPLOAD: 'https://js.dump.academy/keksobooking'
  };

  var xhrConfig = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError('Стастус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения. Код ошибки ' + xhr.statusText);
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000;
    return xhr;
  };

  var dataLoad = function (onSuccess, onError) {
    var xhr = xhrConfig(onSuccess, onError);
    xhr.open('GET', URL.LOAD);
    xhr.send();
  };

  var dataUpload = function (data, onSuccess, onError) {
    var xhr = xhrConfig(onSuccess, onError);
    xhr.open('POST', URL.UPLOAD);
    xhr.send(data);
  };

  window.backend = {
    dataLoad: dataLoad,
    dataUpload: dataUpload
  };

})();
