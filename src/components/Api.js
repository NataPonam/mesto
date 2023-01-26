export default class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
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
/**/ 