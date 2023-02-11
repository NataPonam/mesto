
export default class Card {
  constructor(data, templateSelector, handleCardClick, { deleteCard, handleCardLikeOn, handleCardLikeOff, userId }) {
    this._data = data;
    this._id = data._id;
    this._placeName = data.name;
    this._placeLink = data.link;
    this._likes = data.likes;
    this._userId = userId;

    this._templateSelector = templateSelector;
    this._deleteCard = deleteCard;
    this._handleCardClick = handleCardClick;
    this._handleCardLikeOn = handleCardLikeOn;
    this._handleCardLikeOff = handleCardLikeOff;
    this._likedCard = 'card__btn_liked';
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

  delete() {
    this._newCard.remove();
    this._newCard = null;
    this._deleteCardBtn = null;
    this._likeCardHeart = null;
    this._cardImage = null;

  }
  //прячем кнопку удаления//
  _hideTrashBtn() {
    if (this._data.owner._id !== this._userId) {
      this._deleteCardBtn.remove()
    }
  }

  //ставим лайк//
  _likeCard() {
    this._likeCardHeart.classList.toggle(this._likedCard);
  }

  //считаем лайки//
  updateLikes(num) {
    this._likeCounter.textContent = num.likes.length;
    this._likeCard();
    console.log(num.likes.length);
  }
  _setInitialCountLike() {
    this._likeCounter.textContent = this._likes.length;
  }

  _setEventListeners() {
    this._deleteCardBtn.addEventListener('click', () => { this._deleteCard(this._id) })

    this._likeCardHeart.addEventListener('click', (event) => {
      event.target.classList.contains(this._likedCard) ?
        this._handleCardLikeOff(this._id) :
        this._handleCardLikeOn(this._id);
    }
    );

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
    this._likeCounter = this._newCard.querySelector('.card__count-like');

    this._likes.some((data) => data._id === this._userId) ?
      this._likeCardHeart.classList.add('card__btn_liked') :
      null;


    this._setData();
    this._setEventListeners();
    this._setInitialCountLike();
    this._hideTrashBtn();

    return this._newCard;
  }
}
