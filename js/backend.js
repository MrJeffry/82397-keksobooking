'use strict';

(function () {
  var URL = {
    LOAD: 'https://js.dump.academy/keksobooking/data',
    UPLOAD: 'https://js.dump.academy/keksobooking'
  };

  var XHR_STATUS_SUCCESS_OK = 200;
  var XHR_TIMEOUT = 10000;

  var setConfig = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === XHR_STATUS_SUCCESS_OK) {
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

    xhr.timeout = XHR_TIMEOUT;
    return xhr;
  };

  var dataLoad = function (onSuccess, onError) {
    var xhr = setConfig(onSuccess, onError);
    xhr.open('GET', URL.LOAD);
    xhr.send();
  };

  var dataUpload = function (data, onSuccess, onError) {
    var xhr = setConfig(onSuccess, onError);
    xhr.open('POST', URL.UPLOAD);
    xhr.send(data);
  };

  window.backend = {
    dataLoad: dataLoad,
    dataUpload: dataUpload
  };

})();
