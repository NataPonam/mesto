
let popupOpen = document.querySelector('.profile__btn-edit');
let popupElem = document.querySelector('.popup');
let popupClose = popupElem.querySelector('.popup__close-icon');
let profileName = document.querySelector('.profile__name');
let profileInfo = document.querySelector('.profile__info');

let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__name');
let jobInput = document.querySelector('.popup__info');

popupOpen.addEventListener('click', function () {
  popupElem.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileInfo.textContent;
});

popupClose.addEventListener('click', function () {
  popupElem.classList.remove('popup_opened');
});

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileInfo.textContent = jobInput.value;
}
formElement.addEventListener('submit', formSubmitHandler);
