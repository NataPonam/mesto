import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, submitForm }) {
    super({ popupSelector });
    this._submitForm = submitForm;
    this._form = this._popup.querySelector('.form');
    this._inputsForm = this._form.querySelectorAll('.popup__input');// достаём все элементы полей
    this._buttonSubmit = this._popup.querySelector('.popup__btn');
    this._buttonText = this._buttonSubmit.textContent;

  }
  loading(data) {
    if (data) {
      this._buttonSubmit.textContent = 'Сохранение...';
    } else {
      this._buttonSubmit.textContent = this._buttonText;
    }
  }

  _getInputValues() {
    const formValues = {};
    this._inputsForm.forEach((data) => { formValues[data.name] = data.value; });
    return formValues;
  }

  setInputsValues(data) {
    this._inputsForm.forEach((input) => {
      input.value = data[input.name];
    });
  }

  setEventListeners() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitForm(this._getInputValues());
      this.loading(true);
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