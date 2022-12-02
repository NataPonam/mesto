/*
isValid — проверяет валидность поля, внутри вызывает showInputError или hideInputError.
formElement — html-элемент формы, в которой находится проверяемое поле ввода. 
Он нужен для поиска элемента ошибки в форме.
inputElement — проверяемое поле ввода.
Свойство validationMessage есть у всех полей ввода(по умолчанию). 
В нём записан текст сообщения об ошибке.
Чтобы добавить это сообщение в свой код, нужно передать функции showInputError свойство validationMessage. */

const validSelectors = {
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__btn',
  inactiveButtonClass: 'popup__btn_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
};

//Показать элемент ошибки/
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('popup__input_type_error');
  /* inputElement.classList.add(selectors.inputErrorClass);При вызове через селектор стили не применяются*/

  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__input-error_active');
  /*errorElement.classList.add(selectors.errorClass);*/
};
console.log(showInputError);

//Скрыть элемент ошибки/
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);//находим элемент с error по id//
  inputElement.classList.remove('popup__input_type_error');
  errorElement.classList.remove('popup__input-error_active');
  errorElement.textContent = '';
};

//Проверить валидность поля/
const isValid = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    // Передадим сообщение об ошибке третьим аргументом
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

/*функция hasInvalidInput проверяет валидность полей и возвращает true или false.
 На их основе toggleButtonState меняет состояние кнопки*/
// Функция принимает массив полей ввода
// и элемент кнопки, состояние которой нужно менять

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) { /*Если есть хотя бы один невалидный инпут*/
    buttonElement.classList.add('popup__btn_inactive');   /*Добавляем кнопке класс*/
  } else {
    buttonElement.classList.remove('popup__btn_inactive');
    buttonElement.disabled = false;
  }
};

/*Добавим слушатель событий всем полям ввода внутри формы.
 Функция setEventListeners,  примет параметром элемент формы и добавит её полям нужные обработчики:*/

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__btn'); /*Найдем в текущей форме кнопку отправки*/
  toggleButtonState(inputList, buttonElement);/*Вызовем toggleButtonState чтобы сделать ее неактивной до ввода полей*/
  inputList.forEach((inputElement) => { /*Обойдём все элементы полученной коллекции*/
    inputElement.addEventListener('input', () => { /*каждому полю добавим обработчик события input*/
      isValid(formElement, inputElement);/*Внутри колбэка вызовем isValid,передав ей форму и проверяемый элемент */
      toggleButtonState(inputList, buttonElement);/*Вызовем toggleButtonState и передадим ей массив полей и кнопку*/
    });
  });
};

enableValidation = () => {
  const formList = Array.from(document.getElementsByName('form'));
  formList.forEach((formElement) => {
    setEventListeners(formElement);
  });
};
enableValidation();










