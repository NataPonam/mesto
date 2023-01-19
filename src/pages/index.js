import './index.css'
import { initialCards } from '../components/constans.js'
import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js'
import PopupWithForm from '../components/PopupWithForm.js';

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

const popupWithImage = new PopupWithImage({ popup: popupElementImages });
const userInfo = new UserInfo(profileName, profileInfo);

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

//ПОПАП профиль//
buttonOpenPopupEditProfile.addEventListener('click', function () {
  popupProfileForm.open();
  profileValidation.resetValidation();
});

const popupProfileForm = new PopupWithForm({
  popup: popupElemProfile,
  submitForm: (data) => { userInfo.setUserInfo(data), popupProfileForm.close() }
});

const popupAddPlaceForm = new PopupWithForm({
  popup: popupElementPlaces,
  submitForm: (formValues) => {
    const cardInfo = { name: formValues.placeName, link: formValues.placeLink };
    renderInitialCards.addItem(createCard(cardInfo));
    popupAddPlaceForm.close();
    console.log({ formValues });
  }
});

function handleCardClick(name, link) {
  popupWithImage.open(name, link);
};

function createCard(cardInfo) {
  const cardElement = new Card(cardInfo, '#cards__template', handleCardClick);
  console.log(cardInfo);
  return cardElement.getView();
}

buttonOpenPopupAddPlace.addEventListener('click', function () {
  console.log('click');
  popupAddPlaceForm.open();
  placeValidation.resetValidation();
});

const renderInitialCards = new Section({
  items: initialCards,
  renderer: (cardInfo) => {
    renderInitialCards.addItem(createCard(cardInfo));
  },
},
  cardsList//список всех карточек
);

renderInitialCards.initialArray();

popupAddPlaceForm.setEventListeners();
popupProfileForm.setEventListeners();
popupWithImage.setEventListeners();


export { handleCardClick }