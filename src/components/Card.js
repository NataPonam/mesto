export default class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._placeName = data.name;
    this._placeLink = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector)
      .content.querySelector('.card')
      .cloneNode(true);
    return cardElement;
  }

  _setData() {
    this._titleElement.textContent = this._placeName;
    this._cardImage.src = this._placeLink;
    this._cardImage.alt = this._placeName;
  }

  _deleteCard() {
    this._newCard.remove();
    this._newCard = null;
    this._deleteCardBtn = null;
    this._likeCardHeart = null;
    this._cardImage = null;
  }

  _likeCard(event) {
    event.target.classList.toggle('card__btn_liked');
  }

  _setEventListeners() {
    this._deleteCardBtn.addEventListener('click', () => { this._deleteCard() })

    this._likeCardHeart.addEventListener('click', (event) => { this._likeCard(event) });

    this._cardImage.addEventListener('click', () =>
      this._handleCardClick(this._placeName, this._placeLink)
    );
  }

  getView() {

    this._newCard = this._getTemplate();

    this._titleElement = this._newCard.querySelector('.card__title');
    this._cardImage = this._newCard.querySelector('.card__img');
    this._deleteCardBtn = this._newCard.querySelector('.card__trash');
    this._likeCardHeart = this._newCard.querySelector('.card__btn');

    this._setData();
    this._setEventListeners();

    return this._newCard;
  }
}
