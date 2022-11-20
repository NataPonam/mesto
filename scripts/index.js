const popup = document.querySelector('.popup')

const popupElemProfile = document.querySelector('.popup_profile');
const buttonOpenPopupEditProfile = document.querySelector('.profile__btn-edit');
const buttonClosePopupEditProfile = popupElemProfile.querySelector('.popup__close-icon');
const profileName = document.querySelector('.profile__name');
const profileInfo = document.querySelector('.profile__info');

const formEditProfile = document.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_info');

const popupElementPlaces = document.querySelector('.popup_places');
const buttonOpenPopupAddPlace = document.querySelector('.profile__btn-add');
const buttonClosePopupAddPlace = popupElementPlaces.querySelector('.popup__close-icon');

const cardsList = document.querySelector('.cards__list'); //СПИСОК ВСЕХ КАРТОЧЕК//
const formPlaces = document.querySelector('.popup__form-places');//ФОРМА//
const placeInput = document.querySelector('.popup__input_type_place'); //ИНПУТ МЕСТО//
const linkImgInput = document.querySelector('.popup__input_type_link'); //ИНПУТ ССЫЛКА//

const popupElementImages = document.querySelector('.popup_img');
const popupPicture = popupElementImages.querySelector('.popup__big-pic');
const pictureFigcaption = popupElementImages.querySelector('.popup__figcaption');
const buttonClosePopupImage = document.querySelector('.popup__close-icon_big-pic');

function openPopup(popup) {
  popup.classList.add('popup_opened');///ОБЩАЯ ФУНКЦИЯ ОТКРЫТИЯ/
};

function closePopup(popup) {
  popup.classList.remove('popup_opened');//ОБЩАЯ ФУНКЦИЯ ЗАКРЫТИЯ//
};

//ПОПАП профиль//
buttonOpenPopupEditProfile.addEventListener('click', function () {
  openPopup(popupElemProfile);
  nameInput.value = profileName.textContent;
  jobInput.value = profileInfo.textContent;
});

buttonClosePopupEditProfile.addEventListener('click', function () {
  closePopup(popupElemProfile);
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
});

buttonClosePopupAddPlace.addEventListener('click', function () {
  closePopup(popupElementPlaces);
});

const handleSubmitAddPlace = (event) => {
  event.preventDefault();
  renderInitialCards({ name: placeInput.value, link: linkImgInput.value });
  formPlaces.reset();
  closePopup(popupElementPlaces);
}

formPlaces.addEventListener('submit', handleSubmitAddPlace);

//Получаем шаблон//
const cardTemplate = document.querySelector('#cards__template').content.querySelector('.card');

//Удаление карточки//
const handleDeleteCard = (event) => {
  event.target.closest('.card').remove();
}

//Генерация карточки//
const generateCard = (cardInfo) => {

  const cardClone = cardTemplate.cloneNode(true); //Клон из темплейта, работаем с ним//
  const cardtitle = cardClone.querySelector('.card__title');
  cardtitle.textContent = cardInfo.name;

  const cardImage = cardClone.querySelector('.card__img');
  cardImage.src = cardInfo.link;

  const deleteCardBtn = cardClone.querySelector('.card__trash');
  deleteCardBtn.addEventListener('click', handleDeleteCard);

  //Лайк карточки//

  const likeBtn = cardClone.querySelector('.card__btn');
  function handleLikeBtn(event) {
    event.target.classList.toggle('card__btn_liked');
  }
  likeBtn.addEventListener('click', handleLikeBtn);

  //Увеличение картинки//

  function handleZoomImage() {
    openPopup(popupElementImages);
    popupPicture.src = cardImage.src;
    pictureFigcaption.textContent = cardtitle.textContent;
    popupPicture.alt = cardInfo.name;
  }
  cardImage.addEventListener('click', handleZoomImage); //Повесили клик по картинке//

  return cardClone;
}

buttonClosePopupImage.addEventListener('click', function () {
  closePopup(popupElementImages);
});

//Добавление карточки//
const renderInitialCards = (cardInfo) => {
  cardsList.prepend(generateCard(cardInfo));
};

//Рендер для карточек//
initialCards.forEach((cardInfo) => {
  renderInitialCards(cardInfo);
});

