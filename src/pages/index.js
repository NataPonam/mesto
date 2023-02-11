import './index.css';
import Api from '../components/Api.js';
import { validConfig } from '../utils/constans.js';
import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js'
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation';

const buttonOpenPopupEditProfile = document.querySelector('.profile__btn-edit');
const formEditProfile = document.forms['profile-form'];//форма профиля//

const buttonOpenPopupAddPlace = document.querySelector('.profile__btn-add');
export const formPlaces = document.forms['places-form'];//форма мест//

const formElementAvatar = document.forms['avatar-form']; //форма аватара
const buttonEditAvatar = document.querySelector('.profile__avatar-wrapper');

const popupWithImage = new PopupWithImage({ popupSelector: ('.popup_img') });
const userInfo = new UserInfo({ name: ('.profile__name'), about: ('.profile__info'), avatar: ('.profile__avatar') });

const profileValidation = new FormValidator(validConfig, formEditProfile);
profileValidation.enableValidation();

const placeValidation = new FormValidator(validConfig, formPlaces);
placeValidation.enableValidation();

const avatarValidation = new FormValidator(validConfig, formElementAvatar);
avatarValidation.enableValidation();

let userId

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-58',
  headers: {
    authorization: '2380923a-f5b9-4b4c-879a-8e7b78ad0407',
    'Content-Type': 'application/json'
  }
});

//кнопка для открытия попап-Аватара//
buttonEditAvatar.addEventListener('click', function () {
  popupEditAvatarForm.open();
  avatarValidation.resetValidation();
});

//кнопка для открытия попап-Профиля//
buttonOpenPopupEditProfile.addEventListener('click', function () {
  popupProfileForm.setInputsValues(userInfo.getUserInfo());
  popupProfileForm.open();
  profileValidation.resetValidation();
});

//кнопка для попап-добавления Места//
buttonOpenPopupAddPlace.addEventListener('click', function () {
  popupAddPlaceForm.open();
  placeValidation.resetValidation();
});

//удаление карточки по кнопке *да* сабмит передать _id //
const popupAskForm = new PopupWithConfirmation({
  popupSelector: ('.popup_conf'),
});

//попап - обновить аватара
const popupEditAvatarForm = new PopupWithForm({
  popupSelector: ('.popup_edit-avatar'),
  submitForm: (data) => {
    api.editAvatar(data)
      .then(data => {
        userInfo.setAvatar(data);
        popupEditAvatarForm.close();
        console.log(data);
      })
      .catch(err => console.log(`Ошибка: ${err}`))
      .finally(() => popupEditAvatarForm.loading(false))
  }
});

//попап - редактировать профиль
const popupProfileForm = new PopupWithForm({
  popupSelector: ('.popup_profile'),
  submitForm: (data) => {
    popupProfileForm.loading(true);
    api.editProfile(data)
      .then((data) => {
        userInfo.setUserInfo(data);
        popupProfileForm.close();
      })
      .catch((err) => console.log(err))
      .finally(() => popupProfileForm.loading(false))
  }
});

//попап - добавить новую карточку
const popupAddPlaceForm = new PopupWithForm({
  popupSelector: ('.popup_places'),
  submitForm: (formValues) => {
    return api.getNewCard({ name: formValues.placeName, link: formValues.placeLink })
      .then((res) => {
        cardSection.addItem(createCard(res));
        popupAddPlaceForm.close();
      })
      .catch((err) => console.log(err))
      .finally(() => popupAddPlaceForm.loading(false))
  }
});

function handleCardClick(name, link) {
  popupWithImage.open(name, link)
};

function createCard(item) {
  const cardElement = new Card(
    item, '#cards__template', handleCardClick,
    {
      userId: userId,
      deleteCard: (id) => {
        // попап-AskForm//
        popupAskForm.open();
        popupAskForm.changeSubmitForm(() => {
          api.deleteCard(id)
            .then((res) => {
              cardElement.delete();
              popupAskForm.close();
              console.log(res);
            })
            .catch((err) => {
              console.log(err);
            })
        })
      },
      //поставить лайк//
      handleCardLikeOn: () => {
        api.addLike(item._id)
          .then((res) => {
            cardElement.updateLikes(res)
          })
          .catch(err => console.log(`Ошибка: ${err}`));
      },
      //убрать лайк//
      handleCardLikeOff: () => {
        api.deleteLike(item._id)
          .then((res) => {
            cardElement.updateLikes(res)
          })
          .catch(err => console.log(`Ошибка: ${err}`));
      }
    })

  return cardElement.getView()
}
//список всех карточек
const cardSection = new Section({
  renderer: (cardInfo) => {
    cardSection.addItem(createCard(cardInfo));
  },
},
  { containerSelector: ('.cards__list') }
);

popupEditAvatarForm.setEventListeners();
popupAddPlaceForm.setEventListeners();
popupProfileForm.setEventListeners();
popupWithImage.setEventListeners();
popupAskForm.setEventListeners();

Promise.all([api.getAllCards(), api.getUser()])
  .then(([initialCards, userData]) => {
    userId = userData._id;
    userInfo.setUserInfo(userData);
    userInfo.setAvatar(userData)

    cardSection.renderInitialArray(initialCards);
  })
  .catch(err => console.log(err));




