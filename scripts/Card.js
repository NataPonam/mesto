import { openPopup, popupElementImages, popupPicture, pictureFigcaption } from './index.js';

export default class Card {
  constructor({ name, link }) {
    this._name = name;
    this._link = link;
  }

  _getTemplate() {
    const card = document.querySelector('#cards__template')
      .content.querySelector('.card')
      .cloneNode(true);
    return card;
  }

  _setData() {
    const titleElement = this._newCard.querySelector('.card__title');
    titleElement.textContent = this._name;

    const imageElement = this._newCard.querySelector('.card__img');
    imageElement.src = this._link;
  }

  _deleteCard() {
    this._newCard.remove();
    this._newCard = null;
  }

  _likeCard() {
    this.classList.toggle('card__btn_liked');
  }

  _zoomImg() {
    popupPicture.src = this._link;
    pictureFigcaption.textContent = this._name;
    popupPicture.alt = this._name;
    openPopup(popupElementImages);
  }

  _setEventListeners() {
    const deleteCardBtn = this._newCard.querySelector('.card__trash');
    deleteCardBtn.addEventListener('click', () => { this._deleteCard() })

    const likeCard = this._newCard.querySelector('.card__btn');
    likeCard.addEventListener('click', this._likeCard);

    const cardImage = this._newCard.querySelector('.card__img');
    cardImage.addEventListener('click', () => { this._zoomImg() });
  }

  getView() {
    this._newCard = this._getTemplate();
    this._setData();
    this._setEventListeners();

    return this._newCard;
  }
}

