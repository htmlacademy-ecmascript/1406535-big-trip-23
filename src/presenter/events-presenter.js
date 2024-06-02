import EventPresenter from './event-presenter.js';
import NewEventPresenter from './new-event-presenter.js';
import EventsListView from '../view/events-list-view.js';
import { render, RenderPosition } from '../framework/render.js';
import { UpdateType, UserAction } from '../consts.js';

export default class EventsPresenter {
  #container = null;
  #eventsModel = null;
  #eventPresenters = new Map();
  #newEventPresenter = null;
  #eventsListComponent = new EventsListView();
  #destinations = null;
  #sort = null;
  #onDestroy = null;

  constructor({ container, model, onDestroy }) {
    this.#container = container;
    this.#eventsModel = model;
    this.#onDestroy = onDestroy;
    this.#destinations = this.#eventsModel.destinations;

    render(this.#eventsListComponent, this.#container, RenderPosition.BEFOREEND);

    this.#newEventPresenter = new NewEventPresenter({
      container: this.#eventsListComponent.element,
      getDestinationById: this.#getDestinationById,
      getDestinationByName: this.#getDestinationByName,
      getOffersByType: this.#getOffersByType,
      onDataChange: this.#onViewAction,
      onDestroy: this.#onNewEventDestroy,
    });
  }

  get destinations() {
    return this.#eventsModel.destinations;
  }

  init(events, sort) {
    if (this.#eventPresenters.size) {
      this.#clearEventsList();
    }

    events.forEach((event) => this.#renderEvent(event));
    this.#sort = sort;
  }

  rerenderEvent(event) {
    this.#eventPresenters.get(event.id).init(event);
  }

  renderNewEvent() {
    this.#newEventPresenter.init(this.#destinations);
  }

  #renderEvent(event) {
    const eventPresenter = new EventPresenter({
      container: this.#eventsListComponent.element,
      destinations: this.destinations,
      getDestinationById: this.#getDestinationById,
      getDestinationByName: this.#getDestinationByName,
      getOffersByType: this.#getOffersByType,
      onDataChange: this.#onViewAction,
      onModeChange: this.#onModeChange,
    });

    eventPresenter.init(event);
    this.#eventPresenters.set(event.id, eventPresenter);
  }

  #deleteEvent(event) {
    this.#eventPresenters.get(event.id).destroy();
    this.#eventPresenters.delete(event.id);
  }

  #clearEventsList() {
    this.#eventPresenters.forEach((presenter) => presenter.destroy());
    this.#eventPresenters.clear();
  }

  #getDestinationById = (id) => this.#eventsModel.getDestinationById(id);
  #getDestinationByName = (name) => this.#eventsModel.getDestinationByName(name);
  #getOffersByType = (type) => this.#eventsModel.getOffersByType(type);

  #onViewAction = (actionType, update, changedOptions) => {
    switch (actionType) {
      case UserAction.UPDATE_EVENT:
        if (changedOptions.patch) {
          this.#eventsModel.updateEvent(UpdateType.PATCH, update);
          break;
        }
        this.#eventsModel.updateEvent(changedOptions[this.#sort] ? UpdateType.MAJOR : UpdateType.MINOR, update);
        break;
      case UserAction.ADD_EVENT:
        this.#onNewEventDestroy();
        this.#eventsModel.addEvent(UpdateType.MAJOR, update);
        break;
      case UserAction.DELETE_EVENT:
        this.#deleteEvent(update);
        this.#eventsModel.deleteEvent(UpdateType.MINOR, update);
        break;
    }
  };

  #onModeChange = () => {
    this.#onNewEventDestroy();
    this.#eventPresenters.forEach((presenter) => presenter.resetView());
  };

  #onNewEventDestroy = () => {
    this.#newEventPresenter.destroy();
    this.#onDestroy();
  };
}
