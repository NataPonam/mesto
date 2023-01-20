export default class Section {
  constructor({ items, renderer }, { containerSelector }) {
    this._initialArray = items;//Св-во items — это массив данных, кот. нужно добавить на страницу при инициализации класса.
    this._renderer = renderer;// Св-во renderer — это функция, кот. отвечает за создание и отрисовку данных на странице.//
    this._containerSelector = document.querySelector(containerSelector);//селектор контейнера, в кот. нужно добавлять созданные элементы.
  }


  //Содержит публичный метод, который отвечает за отрисовку всех элементов. Отрисовка каждого отд.эл-та должна осуществляться ф-цей renderer.
  renderInitialArray() {
    this._initialArray.forEach(this._renderer)
  }


  //Содержит публичный метод addItem, который принимает DOM-элемент и добавляет его в контейнер.
  addItem(cardElement) {
    this._containerSelector.prepend(cardElement);
  }
}




