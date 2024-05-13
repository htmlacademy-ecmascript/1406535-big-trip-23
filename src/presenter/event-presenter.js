import EventsListItemView from '../view/events-list-item-view.js';
import EventView from '../view/event-view.js';
import EditEventView from '../view/edit-event-view.js';
import { render, replace } from '../framework/render.js';

export default class EventPresenter {
  #container = null;
  #eventsModel = null;
  #destinations = null;
  #offers = null;
  #event = null;
  #eventsListItemComponent = new EventsListItemView();
  #viewEventComponent = null;
  #editEventComponent = null;

  constructor({ container, model }) {
    this.#container = container;
    this.#eventsModel = model;
    this.#destinations = model.destinations;
    this.#offers = model.offers;

    render(this.#eventsListItemComponent, this.#container);
  }

  init(event) {
    this.#event = event;
    const typeOffers = this.#eventsModel.getOffersByType(this.#event.type);
    const destination = this.#eventsModel.getDestinationById(this.#event.destination);

    this.#viewEventComponent = new EventView({
      event: this.#event,
      destination,
      offers: typeOffers,
      onEdit: () => this.#changeViewToEdit(),
    });

    this.#editEventComponent = new EditEventView({
      event: this.#event,
      destinations: this.#destinations,
      offers: typeOffers,
      onFormSubmit: () => this.#changeEditToView(),
      onFormReset: () => this.#changeEditToView(),
    });

    render(this.#viewEventComponent, this.#eventsListItemComponent.element);
  }

  #changeViewToEdit() {
    replace(this.#editEventComponent, this.#viewEventComponent);
    document.addEventListener('keydown', this.#onEscKeydown);
  }

  #changeEditToView() {
    replace(this.#viewEventComponent, this.#editEventComponent);
    document.removeEventListener('keydown', this.#onEscKeydown);
  }

  #onEscKeydown = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#changeEditToView();
    }
  };
}
