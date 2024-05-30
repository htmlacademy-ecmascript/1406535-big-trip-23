import EventsListItemView from '../view/events-list-item-view.js';
import EditEventView from '../view/edit-event-view.js';
import { render, remove } from '../framework/render.js';
import { UserAction, UpdateType, NEW_EVENT } from '../consts.js';

export default class NewEventPresenter {
  #container = null;
  #eventsModel = null;
  #event = NEW_EVENT;
  #eventsListItemComponent = null;
  #editEventComponent = null;
  #onDataChange = null;
  #onDestroy = null;

  constructor({ container, model, onDataChange, onDestroy }) {
    this.#container = container;
    this.#eventsModel = model;
    this.#onDataChange = onDataChange;
    this.#onDestroy = onDestroy;

    this.#eventsListItemComponent = new EventsListItemView();
    render(this.#eventsListItemComponent, this.#container);
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

    render(this.#editEventComponent, this.#eventsListItemComponent.element);
    document.addEventListener('keydown', this.#onEscKeydown);
  }


  destroy() {
    remove(this.#eventsListItemComponent);
    document.removeEventListener('keydown', this.#onEscKeydown);
    this.#onDestroy();
  }

  #getDestinationById = (id) => this.#eventsModel.getDestinationById(id);
  #getDestinationByName = (name) => this.#eventsModel.getDestinationByName(name);
  #getOffersByType = (type) => this.#eventsModel.getOffersByType(type);

  #onEscKeydown = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.destroy();
    }
  };

  #onCancel = () => {
    this.destroy();
  };

  #onFormSubmit = (event) => {
    this.#onDataChange(UserAction.ADD_EVENT, UpdateType.MAJOR, event);
  };
}
