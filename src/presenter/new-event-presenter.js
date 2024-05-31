import EditEventView from '../view/edit-event-view.js';
import { render, remove, RenderPosition } from '../framework/render.js';
import { UserAction, UpdateType, NEW_EVENT } from '../consts.js';

export default class NewEventPresenter {
  #container = null;
  #eventsModel = null;
  #event = NEW_EVENT;
  #editEventComponent = null;
  #onDataChange = null;
  #onDestroy = null;

  constructor({ container, model, onDataChange, onDestroy }) {
    this.#container = container;
    this.#eventsModel = model;
    this.#onDataChange = onDataChange;
    this.#onDestroy = onDestroy;
  }

  init() {
    this.#editEventComponent = new EditEventView({
      event: this.#event,
      // здесь передаем результат выполнения
      destinations: this.#eventsModel.destinations,
      // а здесь передаем метод из модели, можно ли напрямую передать, не создавая обертки в презентере точки, или это нарушает критерии?
      getDestinationById: this.#getDestinationById,
      getDestinationByName: this.#getDestinationByName,
      getOffersByType: this.#getOffersByType,
      onFormSubmit: this.#onFormSubmit,
      onCancel: this.#onCancel,
    });

    render(this.#editEventComponent, this.#container, RenderPosition.AFTERBEGIN);
    document.addEventListener('keydown', this.#onEscKeydown);
  }

  destroy() {
    remove(this.#editEventComponent);
    document.removeEventListener('keydown', this.#onEscKeydown);
  }

  #getDestinationById = (id) => this.#eventsModel.getDestinationById(id);
  #getDestinationByName = (name) => this.#eventsModel.getDestinationByName(name);
  #getOffersByType = (type) => this.#eventsModel.getOffersByType(type);

  #onEscKeydown = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#onDestroy();
    }
  };

  #onCancel = () => {
    this.#onDestroy();
  };

  #onFormSubmit = (event) => {
    this.#onDataChange(UserAction.ADD_EVENT, UpdateType.MAJOR, event);
  };
}
