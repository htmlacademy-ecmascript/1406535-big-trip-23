import {render, replace} from '../framework/render.js';
import EditEventView from '../view/edit-event-view.js';
import EventView from '../view/event-view.js';
import EventsListView from '../view/events-list-view.js';
export default class EventsPresenter {
  #container = null;
  #eventsModel = null;
  #events = [];
  #destinations = [];
  #offers = [];

  #eventsListComponent = new EventsListView();

  constructor({container, model}) {
    this.#container = container;
    this.#eventsModel = model;
  }

  #renderEventsList() {
    render(this.#eventsListComponent, this.#container);
  }

  #getOffersByType = (type) => this.#offers.find((element) => element.type === type).offers;

  #getDestinationById = (id) => this.#destinations.find((element) => element.id === id);

  init() {
    this.#events = [...this.#eventsModel.events];
    this.#destinations = [...this.#eventsModel.destinations];
    this.#offers = [...this.#eventsModel.offers];

    this.#renderEventsList();

    this.#events.forEach((event) => this.#renderEvent(event));
  }

  #renderEvent(event) {
    const escKeydownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceEditToView();
        document.removeEventListener('keydown', escKeydownHandler);
      }
    };

    const typeOffers = this.#getOffersByType(event.type);
    const destination = this.#getDestinationById(event.destination);
    const destinations = this.#destinations;

    const viewEventComponent = new EventView({event, destination, offers: typeOffers,
      onEditClick: () => {
        replaceViewToEdit();
        document.addEventListener('keydown', escKeydownHandler);
      }});

    const editEventComponent = new EditEventView({event, destinations, offers: typeOffers,
      onFormSubmit: () => {
        replaceEditToView();
        document.removeEventListener('keydown', escKeydownHandler);
      }});

    function replaceViewToEdit() {
      replace(editEventComponent, viewEventComponent);
    }

    function replaceEditToView() {
      replace(viewEventComponent, editEventComponent);
    }

    render(viewEventComponent, this.#eventsListComponent.element);
  }
}
