import EventsListItemView from '../view/events-list-item-view.js';
import EventView from '../view/event-view.js';
import EditEventView from '../view/edit-event-view.js';
import { render, replace, remove } from '../framework/render.js';

const Mode = {
  VIEW: 'view',
  EDIT: 'edit',
  NEW: 'new',
};

export default class EventPresenter {
  #container = null;
  #eventsModel = null;
  #destinations = null;
  #offers = null;
  #event = null;
  #eventsListItemComponent = null;
  #viewEventComponent = null;
  #editEventComponent = null;
  #onDataChange = null;
  #onModeChange = null;
  #mode = Mode.VIEW;

  constructor({ container, model, onDataChange, onModeChange }) {
    this.#container = container;
    this.#eventsModel = model;
    this.#onDataChange = onDataChange;
    this.#onModeChange = onModeChange;
    this.#destinations = model.destinations;
    this.#offers = model.offers;

    this.#eventsListItemComponent = new EventsListItemView();
    render(this.#eventsListItemComponent, this.#container);
  }

  init(event) {
    this.#event = event;

    const prevViewEventComponent = this.#viewEventComponent;
    const prevEditEventComponent = this.#editEventComponent;
    const typeOffers = this.#eventsModel.getOffersByType(this.#event.type);
    const destination = this.#eventsModel.getDestinationById(this.#event.destination);

    this.#viewEventComponent = new EventView({
      event: this.#event,
      destination,
      offers: typeOffers,
      onEdit: this.#onEdit,
      onSelect: this.#onSelect,
    });

    this.#editEventComponent = new EditEventView({
      event: this.#event,
      destinations: this.#destinations,
      offers: typeOffers,
      onFormSubmit: this.#onFormSubmit,
      onFormReset: this.#onFormReset,
    });

    if (prevViewEventComponent === null || prevEditEventComponent === null) {
      render(this.#viewEventComponent, this.#eventsListItemComponent.element);
      return;
    }

    if (this.#mode === Mode.VIEW) {
      replace(this.#viewEventComponent, prevViewEventComponent);
    }

    if (this.#mode === Mode.EDIT) {
      replace(this.#editEventComponent, prevEditEventComponent);
    }

    remove(prevViewEventComponent);
    remove(prevEditEventComponent);
  }

  resetView() {
    if (this.#mode !== Mode.VIEW) {
      this.#changeEditToView();
    }
  }

  destroy() {
    remove(this.#eventsListItemComponent);
  }

  #changeViewToEdit() {
    replace(this.#editEventComponent, this.#viewEventComponent);
    document.addEventListener('keydown', this.#onEscKeydown);
    this.#onModeChange();
    this.#mode = Mode.EDIT;
  }

  #changeEditToView() {
    replace(this.#viewEventComponent, this.#editEventComponent);
    document.removeEventListener('keydown', this.#onEscKeydown);
    this.#mode = Mode.VIEW;
  }

  #onEscKeydown = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#changeEditToView();
    }
  };

  #onEdit = () => {
    this.#changeViewToEdit();
  };

  #onSelect = () => {
    this.#onDataChange({...this.#event, isFavorite: !this.#event.isFavorite});
  };

  #onFormSubmit = () => {
    // this.#onDataChange();
    this.#changeEditToView();
  };

  #onFormReset = () => {
    this.#changeEditToView();
  };
}
