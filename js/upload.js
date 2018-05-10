'use strict';

(function () {

  var TYPES_OF_IMAGES = {
    'GIF': '',
    'JPEG': '',
    'PNG': ''
  };

  var avatarImgContainer = window.util.adForm.querySelector('.ad-form-header__preview');
  var uploadAvatarImgContainer = window.util.adForm.querySelector('.ad-form-header__input');
  var uploadAdImageControl = window.util.adForm.querySelector('.ad-form__input');
  var previewAdContainer = window.util.adForm.querySelector('.ad-form__photo');
  var previewAdImageContainer = window.util.adForm.querySelector('.ad-form__photo-container');

  var onChangeInputFiles = function (evt) {
    for (var i = 0; i < evt.target.files.length; i++) {
      showPreviewImage(evt.target.files[i], evt.target);
    }
  };

  var showPreviewImage = function (imageFile, elem) {
    var fileRegExp = new RegExp('^image/(' + Object.keys(TYPES_OF_IMAGES).join('|').replace('\+', '\\+') + ')$', 'i');

    if (!fileRegExp.test(imageFile.type)) {
      return;
    }

    var fileReader = new FileReader();
    if (elem.classList.contains('ad-form-header__input')) {
      fileReader.addEventListener('load', displayImageViaFileRaderAvatar);
      fileReader.readAsDataURL(imageFile);
    } else {
      fileReader.addEventListener('load', displayImageViaFileRaderAddImg);
      fileReader.readAsDataURL(imageFile);
    }
  };

  var displayImageViaFileRaderAddImg = function (evt) {
    var clone = previewAdContainer.cloneNode();
    var uploadImage = document.createElement('img');
    uploadImage.style.width = 100 + '%';
    uploadImage.style.height = 100 + '%';
    clone.appendChild(uploadImage);
    previewAdImageContainer.appendChild(clone);
    uploadImage.src = evt.target.result;
  };

  var displayImageViaFileRaderAvatar = function (evt) {
    var uploadImage = avatarImgContainer.querySelector('img');
    uploadImage.src = evt.target.result;
  };

  uploadAvatarImgContainer.addEventListener('change', onChangeInputFiles);
  uploadAdImageControl.addEventListener('change', onChangeInputFiles);

})();
