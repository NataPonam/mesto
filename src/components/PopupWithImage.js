import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor({ popupSelector }) {
    super({ popupSelector });
    this._popupPicture = this._popupSelector.querySelector('.popup__big-pic');
    this._pictureFigcaption = this._popupSelector.querySelector('.popup__figcaption');
  }
  open(name, link) {
    this._popupPicture.src = link;
    this._popupPicture.alt = name;
    this._pictureFigcaption.textContent = name;

    super.open();
  }
}


