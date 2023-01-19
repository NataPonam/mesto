import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({ popup, submitForm }) {
    super({ popup });
    this._submitForm = submitForm;
    this._form = popup.querySelector('.form');
    this._inputsForm = this._form.querySelectorAll('.popup__input');// достаём все элементы полей

  }
  _getInputValues() {
    this._formValues = {};
    this._inputsForm.forEach((data) => { this._formValues[data.name] = data.value; });
    return this._formValues;
  }

  setEventListeners() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitForm(this._getInputValues());
    });
    super.setEventListeners();
  }

  close() {
    super.close();
    this._form.reset();
  }
}

/*Создайте класс PopupWithForm, который наследует от Popup. Этот класс:
Кроме селектора попапа принимает в конструктор колбэк сабмита формы.
Содержит приватный метод _getInputValues, который собирает данные всех полей формы.
Перезаписывает родительский метод setEventListeners. Метод setEventListeners 
класса PopupWithForm должен не только добавлять обработчик клика иконке закрытия, но и добавлять обработчик сабмита формы.
Перезаписывает родительский метод close, так как при закрытии попапа форма должна ещё и сбрасываться.
Для каждого попапа создавайте свой экземпляр класса PopupWithForm.*/