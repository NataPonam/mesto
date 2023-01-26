import './index.css';
import Api from '../components/Api.js';
import { initialCards } from '../components/constans.js';
import { validConfig } from '../components/constans.js';
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

const formEditProfile = document.forms['profile-form'];
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

const popupWithImage = new PopupWithImage({ popupSelector: ('.popup_img') });
const userInfo = new UserInfo({ nameSelector: ('.profile__name'), infoSelector: ('.profile__info') });

const profileValidation = new FormValidator(validConfig, formEditProfile);
profileValidation.enableValidation();

const placeValidation = new FormValidator(validConfig, formPlaces);
placeValidation.enableValidation();

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-58',
  headers: {
    authorization: '2380923a-f5b9-4b4c-879a-8e7b78ad0407',
    'Content-Type': 'application/json'
  }
});

//ПОПАП профиль//
buttonOpenPopupEditProfile.addEventListener('click', function () {
  popupProfileForm.open();
  profileValidation.resetValidation();
});

const popupProfileForm = new PopupWithForm({
  popupSelector: ('.popup_profile'),
  submitForm: (data) => { userInfo.setUserInfo(data), popupProfileForm.close() }
});

const popupAddPlaceForm = new PopupWithForm({
  popupSelector: ('.popup_places'),
  submitForm: (formValues) => {
    const cardInfo = { name: formValues.placeName, link: formValues.placeLink };
    renderInitialCards.addItem(createCard(cardInfo));
    popupAddPlaceForm.close();
  }
});

function handleCardClick(name, link) {
  popupWithImage.open(name, link);
};

function createCard(cardInfo) {
  const cardElement = new Card(cardInfo, '#cards__template', handleCardClick);
  return cardElement.getView();
}

buttonOpenPopupAddPlace.addEventListener('click', function () {
  popupAddPlaceForm.open();
  placeValidation.resetValidation();
});

const renderInitialCards = new Section({
  items: initialCards,
  renderer: (cardInfo) => {
    renderInitialCards.addItem(createCard(cardInfo));
  },
},
  { containerSelector: ('.cards__list') }//список всех карточек
);

renderInitialCards.renderInitialArray();

popupAddPlaceForm.setEventListeners();
popupProfileForm.setEventListeners();
popupWithImage.setEventListeners();


