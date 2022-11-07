let popupElem = document.querySelector('.popup');
let popupOpen = document.querySelector('.profile__btn-edit');
let popupClose = popupElem.querySelector('.popup__close-icon');
let profileName = document.querySelector('.profile__name');
let profileInfo = document.querySelector('.profile__info');

let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__input_type_name');
let jobInput = document.querySelector('.popup__input_type_info');

function openPopup() {
  popupElem.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileInfo.textContent;
};

function closePopup() {
  popupElem.classList.remove('popup_opened');
};

popupOpen.addEventListener('click', openPopup);
popupClose.addEventListener('click', closePopup);

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileInfo.textContent = jobInput.value;
  closePopup();
};

formElement.addEventListener('submit', formSubmitHandler);


