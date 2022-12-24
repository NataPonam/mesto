export default class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    return this._cardElement;
  }

  _setData() {
    this._titleElement.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
  }

  _deleteCard() {
    this._newCard.remove();
    this._newCard = null;
  }

  _likeCard(event) {
    event.target.classList.toggle('card__btn_liked');
  }

  _setEventListeners() {
    this._deleteCardBtn.addEventListener('click', () => { this._deleteCard() })

    this._likeCardHeart.addEventListener('click', (event) => { this._likeCard(event) });

    this._cardImage.addEventListener('click', () =>
      this._handleCardClick(this._name, this._link)
    );
  }

  getView() {
    this._cardElement = document.querySelector(this._templateSelector)
      .content.querySelector('.card')
      .cloneNode(true);

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


