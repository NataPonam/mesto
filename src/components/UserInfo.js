export default class UserInfo {
  constructor(name, info) {
    this._name = name;
    this._info = info;
  }
  getUserInfo() {
    const userInfo = {
      profileInputName: this._name.textContent,
      profileInputInfo: this._info.textContent
    };
    return userInfo;
  }

  setUserInfo(data) {
    this._name.textContent = data.profileInputName;
    this._info.textContent = data.profileInputInfo;
  }

}




// /*Класс UserInfo отвечает за управление отображением информации о пользователе на странице. 
/*Этот класс:
/*Принимает в конструктор объект с селекторами двух элементов: элемента имени пользователя и элемента информации о себе.
Содержит публичный метод getUserInfo, который возвращает объект с данными пользователя.
 Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии.
Содержит публичный метод setUserInfo, который принимает новые данные пользователя и добавляет их на страницу.*/
