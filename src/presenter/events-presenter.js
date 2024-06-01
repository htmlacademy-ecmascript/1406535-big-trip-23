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
  #onDestroy = null;
  #sort = null;

  constructor({ container, model, onDestroy }) {
    this.#container = container;
    this.#eventsModel = model;
    this.#onDestroy = onDestroy;

    render(this.#eventsListComponent, this.#container, RenderPosition.BEFOREEND);

    this.#newEventPresenter = new NewEventPresenter({
      container: this.#eventsListComponent.element,
      model: this.#eventsModel,
      onDataChange: this.#onViewAction,
      onDestroy: this.#onNewEventDestroy,
      getDestinationById: this.#getDestinationById,
      getDestinationByName: this.#getDestinationByName,
      getOffersByType: this.#getOffersByType,
    });
  }

  init(events, sort) {
    if (this.#eventPresenters.size) {
      this.#clearEventsList();
    }

    this.#sort = sort;
    events.forEach((event) => this.#renderEvent(event));
  }

  rerenderEvent(event) {
    this.#eventPresenters.get(event.id).init(event);
  }

  addNewEvent() {
    this.#newEventPresenter.init();
  }

  #renderEvent(event) {
    const eventPresenter = new EventPresenter({
      container: this.#eventsListComponent.element,
      model: this.#eventsModel,
      onDataChange: this.#onViewAction,
      onModeChange: this.#onModeChange,
      getDestinationById: this.#getDestinationById,
      getDestinationByName: this.#getDestinationByName,
      getOffersByType: this.#getOffersByType,
    });

    eventPresenter.init(event);
    this.#eventPresenters.set(event.id, eventPresenter);
  }

  #clearEventsList() {
    this.#eventPresenters.forEach((presenter) => presenter.destroy());
    this.#eventPresenters.clear();
  }

  #deleteEvent(event) {
    this.#eventPresenters.get(event.id).destroy();
    this.#eventPresenters.delete(event.id);
  }

  #getDestinationById = (id) => this.#eventsModel.getDestinationById(id);
  #getDestinationByName = (name) => this.#eventsModel.getDestinationByName(name);
  #getOffersByType = (type) => this.#eventsModel.getOffersByType(type);

  #onViewAction = (actionType, updateType, update, changedOptions) => {
    switch (actionType) {
      case UserAction.UPDATE_EVENT:
        if (changedOptions[this.#sort]) {
          updateType = UpdateType.MAJOR;
        }
        this.#eventsModel.updateEvent(updateType, update);
        break;
      case UserAction.ADD_EVENT:
        this.#onNewEventDestroy();
        this.#eventsModel.addEvent(updateType, update);
        break;
      case UserAction.DELETE_EVENT:
        this.#deleteEvent(update);
        this.#eventsModel.deleteEvent(updateType, update);
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
