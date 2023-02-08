import Popup from './Popup.js';
export default class PopupWithConfirmation extends Popup {
  constructor({ popupSelector, submitForm }) {
    super({ popupSelector });
    this._submitForm = submitForm;
    this._popupAskForm = this._popup.querySelector('.form');
  }

  changeSubmitForm(newSubmitForm) {
    this._submitForm = newSubmitForm;
  }
  setEventListeners() {
    super.setEventListeners();
    this._popupAskForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitForm();
    })
  }

  close() {
    super.close();
  }
}
