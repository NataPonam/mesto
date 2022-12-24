import { initialCards } from './constans.js';
import FormValidator from './FormValidator.js';
import Card from './Card.js';

const popupElemProfile = document.querySelector('.popup_profile');
const buttonOpenPopupEditProfile = document.querySelector('.profile__btn-edit');
const profileName = document.querySelector('.profile__name');
const profileInfo = document.querySelector('.profile__info');

export const formEditProfile = document.forms['profile-form'];
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_info');
const popupElementPlaces = document.querySelector('.popup_places');
const buttonOpenPopupAddPlace = document.querySelector('.profile__btn-add');

const cardsList = document.querySelector('.cards__list'); //СПИСОК ВСЕХ КАРТОЧЕК//
export const formPlaces = document.forms['places-form'];//ФОРМА//
const placeInput = document.querySelector('.popup__input_type_place'); //ИНПУТ МЕСТО//
const linkImgInput = document.querySelector('.popup__input_type_link'); //ИНПУТ ССЫЛКА//

const popupElementImages = document.querySelector('.popup_img');
const popupPicture = popupElementImages.querySelector('.popup__big-pic');
const pictureFigcaption = popupElementImages.querySelector('.popup__figcaption');
const closeButtons = document.querySelectorAll('.popup__close-icon');

//Валидация !!!! //
const validSelectors = {
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__btn',
  inactiveButtonClass: 'popup__btn_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

const profileValidation = new FormValidator(validSelectors, formEditProfile);
profileValidation.enableValidation();

const placeValidation = new FormValidator(validSelectors, formPlaces);
placeValidation.enableValidation();

//ОБЩАЯ ФУНКЦИЯ ОТКРЫТИЯ/
export function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscape);
  popup.addEventListener('click', closePopupOverlay);
};

//ОБЩАЯ ФУНКЦИЯ ЗАКРЫТИЯ//
export function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscape);
  popup.removeEventListener('click', closePopupOverlay);
};

//ФУНКЦИЯ ОБРАБОТКИ КАРТОЧКИ ПО КЛИКУ//
//устанавливаем ссылку*//устанавливаем подпись картинке//устанавливаем alt картинке/
//открываем попап универсальной функцией, которая навешивает обработчик Escape внутри себя??/
function handleCardClick(name, link) {
  popupPicture.src = link;
  popupPicture.alt = name;
  pictureFigcaption.textContent = name;
  openPopup(popupElementImages);
};

/*ЗАКРЫТИЕ ПО ESCAPE//На весь документ установили слушатель, если нажата калавиша Esc, 
то находим переменную с классом popup_opened и вызываем функцию закрытия попапа*/
const handleEscape = (event) => {
  if (event.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
};

/*ЗАКРЫТИЕ  POPUP ПО OVERLAY// Повесили слушатель на весь документ, 
если событие 'клик' произошло на объекте с классом popup, то 
далее находим переменную с классом popup_opened и вызываем функцию закрытия попапа */
const closePopupOverlay = (event) => {
  if (event.target.classList.contains('popup')) {
    closePopup(event.target);
  }
};

//ПОПАП профиль//
buttonOpenPopupEditProfile.addEventListener('click', function () {
  openPopup(popupElemProfile);
  nameInput.value = profileName.textContent;
  jobInput.value = profileInfo.textContent;
  profileValidation.resetValidation();
});

//УНИВЕРСАЛЬНОЕ ЗАКРЫТИЕ ПО ЛЮБОМУ КРЕСТИКУ//
closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

function submitEditProfileForm(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileInfo.textContent = jobInput.value;
  closePopup(popupElemProfile);
};

formEditProfile.addEventListener('submit', submitEditProfileForm);

//ПОПАП добавления локации//
buttonOpenPopupAddPlace.addEventListener('click', function () {
  openPopup(popupElementPlaces);
  formPlaces.reset();
  placeValidation.resetValidation();
});

const handleSubmitAddPlace = (evt) => {
  evt.preventDefault();
  renderInitialCards({ name: placeInput.value, link: linkImgInput.value });
  formPlaces.reset();
  closePopup(popupElementPlaces);
}

formPlaces.addEventListener('submit', handleSubmitAddPlace);

//Получаем шаблон//
const cardTemplateSelector = '#cards__template'

//Создание карточки//
function createCard(item) {
  const card = new Card(item, cardTemplateSelector, handleCardClick);
  const cardElement = card.getView();
  return cardElement;
}

//Рендер - добавление карточки//
const renderInitialCards = (cardInfo) => {
  const card = createCard(cardInfo);
  cardsList.prepend(card);
};

//Значения для карточек//
initialCards.forEach(renderInitialCards);

export { handleCardClick }