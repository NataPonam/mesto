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

//Попап добавления локации//

let popupEl = document.querySelector('.popup__places');
let popupPlaceOpen = document.querySelector('.profile__btn-add');
let popupPlaceClose = popupEl.querySelector('.popup__close-icon');


function openPopupPlaces() {
  popupEl.classList.add('popup__places_opened');

};
function closePopupPlaces() {
  popupEl.classList.remove('popup__places_opened');
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

  const bigPicElement = document.querySelector('.popup__img');
  const imgBig = document.querySelector('.popup__big-pic');
  const titlePic = document.querySelector('.popup__img_title');


  function handleBigSizePic() {
    bigPicElement.classList.toggle('card__img_zoom');
    imgBig.src = image.src;
    titlePic.textContent = title.textContent;
  }


  /*function handleBigSizePic(event) {
    event.target.classList.toggle('card__img_zoom');
  }*/

  image.addEventListener('click', handleBigSizePic); //Повесили клик по картинке//


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

/*//Попап изображения//

function handleBigSizePic(event) {
  event.target.classList.toggle('.card__img_zoom');
}

const bigPic = cardClone.querySelector('.card__img'); //Обявили переменную бигПик//

bigPic.addEventListener('click', handleBigSizePic);
console.log('click'); //Повесили клик по картинке//
*/
//Разобраться!!!//

/*function setListenersForItem(element, image) {
  const deleteButton = element.querySelector('.element__delete');
  deleteButton.addEventListener('click', handleDelete); // TODO передаем ссылку на функцию
  // 
  const likeButton = element.querySelector('.element__like');
  likeButton.addEventListener('click', handleLike);
  // 
  const cardImage = element.querySelector('.element__image-btn');
  cardImage.addEventListener('click', () => handleGenerateImagePopup(element, image));
}

function handleGenerateImagePopup(element, image) {
  const bigImageName = element.textContent;

  imagePopup.src = image.src;
  imageTitle.textContent = bigImageName;
  imagePopup.alt = bigImageName;

  togglePopup(popupImage);
}
/*<section class="popup popup_image_big">
<div class="popup__container popup__container_image_big">
    <img class="popup__big-image" src="https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg" alt="Иваново">
    <button type="button" class="popup__close-button popup__close-button_image_big" aria-label="Закрыть"></button>
    <h2 class="popup__card-name">Иваново</h2>
</div>
</section>
<template class="card-template">
      <article class="element">
         <button class="element__image-btn">
            <img class="element__image" src="https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg" alt="Kamchatka"></button>
            <button type="button" class="element__delete" aria-label="del"></button>
         <div class="element__texts">
            <h2 class="element__text">Камчатка</h2>
            <button type="button" class="element__like" aria-label="like"></button>
         </div>
      </article>
  </template>*/
/*const popupImage = document.querySelector('.popup_image_big');
const popupCloseImage = popupImage.querySelector('.popup__close-button_image_big');
const imageTitle = popupImage.querySelector('.popup__card-name');
const imagePopup = popupImage.querySelector('.popup__big-image');

*/
