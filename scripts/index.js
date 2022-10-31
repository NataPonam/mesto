
let popupOpen = document.querySelector('.profile__btn-edit');
let popupElem = document.querySelector('.popup');
let popupClose = popupElem.querySelector('.popup__close-icon');

popupOpen.addEventListener('click', function () {
  popupElem.classList.add('popup_opened');
});

popupClose.addEventListener('click', function () {
  popupElem.classList.remove('popup_opened');
});
