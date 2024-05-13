import SortListView from '../view/sort-list-view.js';
import EventsListView from '../view/events-list-view.js';
import EventsListItemView from '../view/events-list-item-view.js';
import EventView from '../view/event-view.js';
import EditEventView from '../view/edit-event-view.js';
import MessageView from '../view/message-view.js';
import { render, replace } from '../framework/render.js';
import { filtrate, DEFAULT_FILTER } from '../utils/filter.js';
export default class EventsPresenter {
  #container = null;
  #eventsModel = null;
  #events = null;
  #destinations = null;
  #offers = null;
  #isLoadFail = false;
  #eventsListComponent = new EventsListView();
  #sortListComponent = new SortListView();
  _filter = DEFAULT_FILTER;

  constructor({ container, model }) {
    this.#container = container;
    this.#eventsModel = model;
  }

  set filter(value) {
    this._filter = value;
  }

  get filter() {
    return this._filter;
  }

  init() {
    this.#events = [...this.#eventsModel.events];
    if (this.filter !== DEFAULT_FILTER) {
      this.#events = filtrate[this.filter](this.#events);
    }

    this.#destinations = [...this.#eventsModel.destinations];
    this.#offers = [...this.#eventsModel.offers];

    if (!this.#events.length) {
      this.#renderEmptyListMessage();
      return;
    }

    this.#renderSortList();
    this.#renderEventsList();
  }

  #renderEvent(event) {
    const typeOffers = this.#eventsModel.getOffersByType(event.type);
    const destination = this.#eventsModel.getDestinationById(event.destination);
    const destinations = this.#destinations;

    const onEscKeydown = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        changeEditToView();
      }
    };
    const onFormSubmit = () => changeEditToView();
    const onFormReset = () => changeEditToView();

    const eventsListItemComponent = new EventsListItemView();

    const viewEventComponent = new EventView({
      event,
      destination,
      offers: typeOffers,
      onEdit: changeViewToEdit,
    });

    const editEventComponent = new EditEventView({
      event,
      destinations,
      offers: typeOffers,
      onFormSubmit: onFormSubmit,
      onFormReset: onFormReset,
    });

    function changeViewToEdit() {
      replace(editEventComponent, viewEventComponent);
      document.addEventListener('keydown', onEscKeydown);
    }

    function changeEditToView() {
      replace(viewEventComponent, editEventComponent);
      document.removeEventListener('keydown', onEscKeydown);
    }

    render(eventsListItemComponent, this.#eventsListComponent.element);
    render(viewEventComponent, eventsListItemComponent.element);
  }

  #renderEmptyListMessage() {
    render(new MessageView({ err: this.#isLoadFail, filter: this.filter }), this.#container);
  }

  #renderSortList() {
    render(this.#sortListComponent, this.#container);
  }

  #renderEventsList() {
    render(this.#eventsListComponent, this.#container);
    this.#events.forEach((event) => this.#renderEvent(event));
  }
}
