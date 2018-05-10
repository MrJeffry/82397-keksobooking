'use strict';

(function () {

  var TYPES_OF_IMAGES = {
    'GIF': '',
    'JPEG': '',
    'PNG': ''
  };

  var avatarImgContainer = document.querySelector('.ad-form-header__preview');
  var uploadavatarImgContainer = document.querySelector('.ad-form-header__input');

  var uploadAdImageControl = window.util.adForm.querySelector('.ad-form__input');
  var previewadImageContainer = window.util.adForm.querySelector('ad-form__photo');

  var onChangeInputFiles = function () {
    for (var i = 0; i < this.files.length; i++) {
      showPreviewImage(this.files[i]);
    }
  };

  var showPreviewImage = function (imageFile) {
    var fileRegExp = new RegExp('^image/(' + Object.keys(TYPES_OF_IMAGES).join('|').replace('\+', '\\+') + ')$', 'i');

    if (!fileRegExp.test(imageFile.type)) {
      return;
    }

    var fileReader = new FileReader();
    fileReader.addEventListener('load', displayImageViaFileRader);
    fileReader.readAsDataURL(imageFile);
  };

  var displayImageViaFileRader = function (evt) {
    var uploadImage = document.createElement('img');
    window.util.deleteAllElements(avatarImgContainer, 'img');
    avatarImgContainer.appendChild(uploadImage);
    uploadImage.src = evt.target.result;
  };

  uploadavatarImgContainer.addEventListener('change', onChangeInputFiles);
  uploadAdImageControl.addEventListener('change', onChangeInputFiles);

})();
