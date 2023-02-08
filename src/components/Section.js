export default class Section {
  constructor({ renderer }, { containerSelector }) {
    this._renderer = renderer;// Св-во renderer — это функция, кот. отвечает за создание и отрисовку данных на странице.//
    this._container = document.querySelector(containerSelector);//селектор контейнера, в кот. нужно добавлять созданные элементы.
  }
  //Содержит публичный метод, который отвечает за отрисовку всех элементов. Отрисовка каждого отд.эл-та должна осуществляться ф-цей renderer.
  renderInitialArray(items) {
    items.forEach((item) => { this._renderer(item) });
  }
  //Содержит публичный метод addItem, который принимает DOM-элемент и добавляет его в контейнер.
  addItem(cardElement) {
    this._container.prepend(cardElement);
  }
}



