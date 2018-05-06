'use strict';

(function () {
  var templateAdCard = window.util.template.content.querySelector('.map__card');
  var adCard = templateAdCard.cloneNode(true);
  var adCardPhoto = adCard.querySelector('.popup__photos');
  var buttonPopupClose = adCard.querySelector('.popup__close');
  var AppartmentTypes = {
    'palace': 'Дворец',
    'flat': 'Квартира',
    'bungalo': 'Бунгало',
    'house': 'Дом'
  };

  var createAdPhotos = function (arrayAdPhotos) {
    var adCardPhotosImg = adCardPhoto.querySelector('img');
    if (!adCardPhotosImg) {
      var adCardPhotosItems = adCardPhotosImg.cloneNode(true);
      adCardPhotosItems.src = arrayAdPhotos;
    }
    return adCardPhotosItems;
  };

  var generatedPhotos = function (arrayAdPhotos) {
    var fragmentAdPhotos = document.createDocumentFragment();
    arrayAdPhotos.forEach(function (item) {
      fragmentAdPhotos.appendChild(createAdPhotos(item));
    });
    return fragmentAdPhotos;
  };

  var generateFeatures = function (arrayAdFeatures) {
    var adCardFeatures = adCard.querySelector('.popup__features');
    var newAdCardFeatures = adCardFeatures.cloneNode();
    adCardFeatures.remove();
    arrayAdFeatures.forEach(function (item) {
      newAdCardFeatures.innerHTML +=
        '<li class="popup__feature popup__feature--' + item + '"></li>';
    });
    return newAdCardFeatures;
  };

  var closeButtonPopupClickHandler = function () {
    adCard.remove();
    buttonPopupClose.removeEventListener('click', closeButtonPopupClickHandler);
    buttonPopupClose.removeEventListener('keydown', popupPressEnterKeyHandler);
    document.removeEventListener('keydown', popupPressEscKeyHandler);
  };

  var popupPressEscKeyHandler = function (evt) {
    if (evt.keyCode === window.util.KEYCODE.ESCAPE) {
      adCard.remove();
      removePopupHandlers();
    }
  };

  var popupPressEnterKeyHandler = function (evt) {
    if (evt.keyCode === window.util.KEYCODE.ENTER) {
      adCard.remove();
      removePopupHandlers();
    }
  };
  var removePopupHandlers = function () {
    buttonPopupClose.removeEventListener('click', closeButtonPopupClickHandler);
    buttonPopupClose.removeEventListener('keydown', popupPressEnterKeyHandler);
    document.removeEventListener('keydown', popupPressEscKeyHandler);
  };

  var generateAdCard = function (pinContent) {
    var adCardAvatar = adCard.querySelector('.popup__avatar');
    var adCardTitle = adCard.querySelector('.popup__title');
    var adCardAdress = adCard.querySelector('.popup__text--address');
    var adCardPrice = adCard.querySelector('.popup__text--price');
    var adCardType = adCard.querySelector('.popup__type');
    var adCardСapacity = adCard.querySelector('.popup__text--capacity');
    var adCardTimes = adCard.querySelector('.popup__text--time');
    var adCardDescription = adCard.querySelector('.popup__description');

    adCardAvatar.src = pinContent.author.avatar;
    adCardTitle.textContent = pinContent.offer.title;
    adCardAdress.textContent = pinContent.offer.address;
    adCardPrice.innerHTML = pinContent.offer.price + '₽/<span>ночь</span>';
    adCardType.textContent = AppartmentTypes[pinContent.offer.type];
    adCardСapacity.textContent = pinContent.offer.rooms + ' комнаты для ' +
      pinContent.offer.guests + ' гостей';
    adCardTimes.textContent = 'Заезд после ' + pinContent.offer.checkin +
      ' , выезд до ' + pinContent.offer.checkout;
    buttonPopupClose.tabIndex = '0';

    var newAdCardFeatures = generateFeatures(pinContent.offer.features);
    adCardDescription.insertAdjacentElement('beforeBegin', newAdCardFeatures);
    adCardDescription.textContent = pinContent.offer.description;

    var fragmentAdPhotos = generatedPhotos(pinContent.offer.photos);
    window.util.deleteAllElements(adCardPhoto, 'img');
    adCardPhoto.appendChild(fragmentAdPhotos);

    buttonPopupClose.addEventListener('click', closeButtonPopupClickHandler);
    document.addEventListener('keydown', popupPressEscKeyHandler);
    document.addEventListener('keydown', popupPressEnterKeyHandler);

    return adCard;
  };

  window.card = {
    generateAdCard: generateAdCard,
    adCard: adCard
  };

})();
