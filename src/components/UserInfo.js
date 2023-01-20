export default class UserInfo {
  constructor({ nameSelector, infoSelector }) {
    this._nameSelector = document.querySelector(nameSelector);
    this._infoSelector = document.querySelector(infoSelector);
  }
  getUserInfo() {
    return {
      profileInputName: this._nameSelector.textContent,
      profileInputInfo: this._infoSelector.textContent
    }
  }

  setUserInfo(data) {
    this._nameSelector.textContent = data.profileInputName;
    this._infoSelector.textContent = data.profileInputInfo;
  }

}




// /*Класс UserInfo отвечает за управление отображением информации о пользователе на странице. 
/*Этот класс:
/*Принимает в конструктор объект с селекторами двух элементов: элемента имени пользователя и элемента информации о себе.
Содержит публичный метод getUserInfo, который возвращает объект с данными пользователя.
 Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии.
Содержит публичный метод setUserInfo, который принимает новые данные пользователя и добавляет их на страницу.*/
