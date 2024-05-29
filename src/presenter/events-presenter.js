import EventPresenter from './event-presenter.js';
import EventsListView from '../view/events-list-view.js';
import { render, RenderPosition } from '../framework/render.js';
import { UserAction } from '../consts.js';

export default class EventsPresenter {
  #container = null;
  #eventsModel = null;
  #sort = null;
  #eventPresenters = new Map();
  #eventsListComponent = new EventsListView();

  constructor({ container, model }) {
    this.#container = container;
    this.#eventsModel = model;

    render(this.#eventsListComponent, this.#container, RenderPosition.BEFOREEND);
  }

  init(events, sort) {
    this.#sort = sort;
    events.forEach((event) => this.#renderEvent(event));
  }

  clearEventsList() {
    this.#eventPresenters.forEach((presenter) => presenter.destroy());
    this.#eventPresenters.clear();
  }

  rerenderEvent(event) {
    this.#eventPresenters.get(event.id).init(event, this.#sort);
  }

  #renderEvent(event) {
    const eventPresenter = new EventPresenter({
      container: this.#eventsListComponent.element,
      model: this.#eventsModel,
      onDataChange: this.#onViewAction,
      onModeChange: this.#onModeChange,
    });

    eventPresenter.init(event, this.#sort);
    this.#eventPresenters.set(event.id, eventPresenter);
  }

  #deleteEvent(event) {
    this.#eventPresenters.get(event.id).destroy();
    this.#eventPresenters.delete(event.id);
  }

  #onViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_EVENT:
        this.#eventsModel.updateEvent(updateType, update);
        break;
      case UserAction.ADD_EVENT:
        this.#eventsModel.addEvent(updateType, update);
        break;
      case UserAction.DELETE_EVENT:
        this.#deleteEvent(update);
        this.#eventsModel.deleteEvent(updateType, update);
        break;
    }
  };

  #onModeChange = () => {
    this.#eventPresenters.forEach((presenter) => presenter.resetView());
  };
}
