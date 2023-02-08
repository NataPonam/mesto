export default class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  /*Common thing */
  _resControl(res) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Что-то пошло не так: ${res.status}`);
  }


  /*1. Загрузка информации о пользователе с сервера GET https://nomoreparties.co/v1/cohortId/users/me*/
  getUser() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers
    })
      .then(res => this._resControl(res))
      .catch((err) => {
        console.log(err);
      })
  }

  /*2. Загрузка карточек с сервера GET https://mesto.nomoreparties.co/v1/cohortId/cards */
  getAllCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers
    })
      .then(res => this._resControl(res))

  }
  /*3. Редактирование профиля PATCH https://mesto.nomoreparties.co/v1/cohortId/users/me  */
  editProfile(user) {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify({
        name: user.name,
        about: user.about
      })
    })
      .then(res => this._resControl(res))
      .catch((err) => {
        console.log(err);
      })
  }

  /*4. Добавление новой карточки POST https://mesto.nomoreparties.co/v1/cohortId/cards */
  getNewCard(data) {
    return fetch(`${this._url}/cards`, {
      headers: this._headers,
      method: 'POST',
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
      .then(res => this._resControl(res))

      .catch((err) => {
        console.log(err);
      })
  }
  /*5. Отображение количества лайков карточки */


  /*7. Удаление карточки DELETE https://mesto.nomoreparties.co/v1/cohortId/cards/cardId  */
  deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
      headers: this._headers,
      method: 'DELETE',

    })
      .then(res => this._resControl(res))
  }
  /*8.1 Постановка лайка PUT https://mesto.nomoreparties.co/v1/cohortId/cards/cardId/likes */

  addLike(id) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      headers: this._headers,
      method: 'PUT',

    })
      .then(res => this._resControl(res))
  }

  /*8.2 Cнятие лайка DELETE https://mesto.nomoreparties.co/v1/cohortId/cards/cardId/likes*/
  deleteLike(id) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      headers: this._headers,
      method: 'DELETE',

    })
      .then(res => this._resControl(res))
  }
  //9. Обновление аватара пользователя PATCH https://mesto.nomoreparties.co/v1/cohortId/users/me/avatar 
  editAvatar(avatar) {
    return fetch(`${this._url}/users/me/avatar`, {
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify({
        avatar: avatar
      })
    })
      .then(res => this._resControl(res))
      .catch((err) => {
        console.log(err);
      })
  }


}


/*Создан класс Api , внутри которого описаны запросы к серверу. Запросы к серверу не должны быть описаны
внутри других классов или index.js
Каждый метод, включающий обращение к серверу содержит return fetch , т.е возвращает объект Promise
Все операции над DOM включены внутрь цепочки промисов.
Ответ от сервера всегда проверяется на корректность:
  .then(res => {
      if (res.ok) {
        return res.json();
      }

      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    });
Каждый промис содержит обработку ошибок после обращения к серверу.
Внутри класса Api не создаются экземпляры других классов, не вызываются методы других классов.
Используется слабое связывание между классами.*/

