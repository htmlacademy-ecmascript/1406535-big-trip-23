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
  #getDestinationById = null;
  #getDestinationByName = null;
  #getOffersByType = null;

  constructor({ container, model, onDataChange, onDestroy, getDestinationById, getDestinationByName, getOffersByType }) {
    this.#container = container;
    this.#eventsModel = model;
    this.#onDataChange = onDataChange;
    this.#onDestroy = onDestroy;
    this.#getDestinationById = getDestinationById;
    this.#getDestinationByName = getDestinationByName;
    this.#getOffersByType = getOffersByType;
  }

  init() {
    const destinations = this.#eventsModel.destinations;

    this.#editEventComponent = new EditEventView({
      event: this.#event,
      destinations,
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
