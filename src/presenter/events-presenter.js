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

  init() {
    this.#events = [...this.#eventsModel.events];
    this.#destinations = [...this.#eventsModel.destinations];
    this.#offers = [...this.#eventsModel.offers];

    render(this.#eventsListComponent, this.#container);
    this.#events.forEach((event) => this.#renderEvent(event));
  }

  #getOffersByType = (type) => this.#offers.find((element) => element.type === type).offers;
  #getDestinationById = (id) => this.#destinations.find((element) => element.id === id);

  #renderEvent(event) {
    const typeOffers = this.#getOffersByType(event.type);
    const destination = this.#getDestinationById(event.destination);
    const destinations = this.#destinations;

    const onEscKeydown = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        changeEditToView();
      }
    };
    const onFormSubmit = () => changeEditToView();
    const onFormReset = () => changeEditToView();

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

    render(viewEventComponent, this.#eventsListComponent.element);
  }
}
