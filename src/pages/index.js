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
import PopupWithConfirmation from '../components/PopupWithConfirmation';

const popupElemProfile = document.querySelector('.popup_profile');
const buttonOpenPopupEditProfile = document.querySelector('.profile__btn-edit');
const profileName = document.querySelector('.profile__name');
const profileInfo = document.querySelector('.profile__info');

const formEditProfile = document.forms['profile-form'];
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_info');
const popupElementPlaces = document.querySelector('.popup_places');
const buttonOpenPopupAddPlace = document.querySelector('.profile__btn-add');

const buttonAskForm = document.querySelector('.popup__btn');

const cardsList = document.querySelector('.cards__list'); //СПИСОК ВСЕХ КАРТОЧЕК//
export const formPlaces = document.forms['places-form'];//ФОРМА//
const placeInput = document.querySelector('.popup__input_type_place'); //ИНПУТ МЕСТО//
const linkImgInput = document.querySelector('.popup__input_type_link'); //ИНПУТ ССЫЛКА//

const popupElementImages = document.querySelector('.popup_img');
const popupPicture = popupElementImages.querySelector('.popup__big-pic');
const pictureFigcaption = popupElementImages.querySelector('.popup__figcaption');
const closeButtons = document.querySelectorAll('.popup__close-icon');

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
  popupProfileForm._getInputValues(userInfo.getUserInfo());
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
  submitForm: (avatar) => {
    api.editAvatar(avatar.link)
      .then(data => { userInfo.avatar(data); popupEditAvatarForm.close(); })
      .catch(err => console.log(`Ошибка: ${err}`))
      .finally(() => popupEditAvatarForm.loading(false))

  }
});

//попап - редактировать профиль
const popupProfileForm = new PopupWithForm({
  popupSelector: ('.popup_profile'),
  submitForm: (data) => {
    return api.editProfile(data)
      .then((res) => {
        userInfo.setUserInfo(res),
          popupProfileForm.close()
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
        renderInitialCards.addItem(createCard(res));
        popupAddPlaceForm.close();
      })
      .catch((err) => console.log(err))
      .finally(() => popupAddPlaceForm.loading(false))

  }
});

function handleCardClick(name, link) {
  popupWithImage.open(name, link);
};

function createCard(item) {
  const cardElement = new Card(
    item, '#cards__template', handleCardClick,
    {
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
            cardElement.counterLikes(res)
          })
          .catch(err => console.log(`Ошибка: ${err}`));
      },
      //убрать лайк//
      handleCardLikeOff: () => {
        api.deleteLike(item._id)
          .then((res) => {
            cardElement.counterLikes(res)
          })
          .catch(err => console.log(`Ошибка: ${err}`));
      }
    })

  return cardElement.getView()
}
//список всех карточек
const renderInitialCards = new Section({
  renderer: (cardInfo) => {
    renderInitialCards.addItem(createCard(cardInfo));
  },
},
  { containerSelector: ('.cards__list') }
);


popupEditAvatarForm.setEventListeners();
popupAddPlaceForm.setEventListeners();
popupProfileForm.setEventListeners();
popupWithImage.setEventListeners();
popupAskForm.setEventListeners();

api.getUser()
  .then(() => {
    userInfo.setUserInfo(),
      userInfo.avatar()
  })
  .catch(err => console.log(err));


Promise.all([api.getAllCards()])
  .then(([initialCards]) => {
    renderInitialCards.renderInitialArray(initialCards);
  })
  .catch(err => console.log(err));
