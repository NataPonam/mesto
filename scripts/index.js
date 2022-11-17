let popupElem = document.querySelector('.popup_profile');
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

//Попап добавления локации//

let popupEl = document.querySelector('.popup_places');
let popupPlaceOpen = document.querySelector('.profile__btn-add');
let popupPlaceClose = popupEl.querySelector('.popup__close-icon');


function openPopupPlaces() {
  popupEl.classList.toggle('popup_places_opened');

};
function closePopupPlaces() {
  popupEl.classList.remove('popup_places_opened');
};

popupPlaceOpen.addEventListener('click', openPopupPlaces);
popupPlaceClose.addEventListener('click', closePopupPlaces);

//Карточки//

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

//Переменные//

const cardsBox = document.querySelector('.cards__list'); //СПИСОК ВСЕХ КАРТОЧЕК//
const formPlaces = document.querySelector('.popup__form-places');//ФОРМА//
const place = document.querySelector('.popup__input_type_place'); //ИНПУТ МЕСТО//
const direction = document.querySelector('.popup__input_type_link'); //ИНПУТ ССЫЛКА//

const handleSubmitAddPlace = (event) => {
  event.preventDefault();
  renderCards({ name: place.value, link: direction.value });
  place.value = ' '; //очистить поля//
  direction.value = ' ';
  closePopupPlaces();//закрыть попап по кнопке сохранить//
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
  const title = cardClone.querySelector('.card__title');
  title.textContent = cardInfo.name;

  const image = cardClone.querySelector('.card__img');
  image.src = cardInfo.link;

  const deleteBtn = cardClone.querySelector('.card__trash');
  deleteBtn.addEventListener('click', handleDeleteCard);

  //Лайк карточки//

  const likeBtn = cardClone.querySelector('.card__btn');
  function handleLikeBtn(event) {
    event.target.classList.toggle('card__btn_liked');
  }
  likeBtn.addEventListener('click', handleLikeBtn);

  //Увеличение картинки//

  const bigPicElement = document.querySelector('.popup_img');
  const imgBig = document.querySelector('.popup__big-pic');
  const titlePic = document.querySelector('.popup__figcaption');
  const closePopupImg = document.querySelector('.popup__close-icon_big-pic');

  function handleBigSizePic() {
    bigPicElement.classList.toggle('card__img_zoom');
    imgBig.src = image.src;
    titlePic.textContent = title.textContent;
  }
  image.addEventListener('click', handleBigSizePic); //Повесили клик по картинке//

  //Закрытие попапа с изображением//
  function handleClosePopupImg() {
    bigPicElement.classList.remove('card__img_zoom');
  }
  closePopupImg.addEventListener('click', handleClosePopupImg);

  return cardClone;
}

//Добавление карточки//

const renderCards = (cardInfo) => {
  cardsBox.prepend(generateCard(cardInfo));
};

//Рендер для карточек//

initialCards.forEach((cardInfo) => {
  renderCards(cardInfo);
});

