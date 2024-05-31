import EventPresenter from './event-presenter.js';
import NewEventPresenter from './new-event-presenter.js';
import EventsListView from '../view/events-list-view.js';
import { render, RenderPosition } from '../framework/render.js';
import { UserAction } from '../consts.js';

export default class EventsPresenter {
  #container = null;
  #eventsModel = null;
  #eventPresenters = new Map();
  #newEventPresenter = null;
  #eventsListComponent = new EventsListView();
  #onNewEventCancel = null;
  #sort = null;

  constructor({ container, model, onNewEventCancel }) {
    this.#container = container;
    this.#eventsModel = model;
    this.#onNewEventCancel = onNewEventCancel;

    render(this.#eventsListComponent, this.#container, RenderPosition.BEFOREEND);

    this.#newEventPresenter = new NewEventPresenter({
      container: this.#eventsListComponent.element,
      model: this.#eventsModel,
      onDataChange: this.#onViewAction,
      onDestroy: this.#onNewFormDestroy,
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
    this.#eventPresenters.get(event.id).init(event, this.#sort);
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
    });

    eventPresenter.init(event, this.#sort);
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

  #onViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_EVENT:
        this.#eventsModel.updateEvent(updateType, update);
        break;
      case UserAction.ADD_EVENT:
        this.#eventsModel.addEvent(updateType, update);
        this.#newEventPresenter.destroy();
        this.#onNewEventCancel();
        break;
      case UserAction.DELETE_EVENT:
        this.#deleteEvent(update);
        this.#eventsModel.deleteEvent(updateType, update);
        break;
    }
  };

  #onModeChange = () => {
    this.#onNewFormDestroy();
    this.#eventPresenters.forEach((presenter) => presenter.resetView());
  };

  #onNewFormDestroy = () => {
    this.#newEventPresenter.destroy();
    this.#onNewEventCancel();
  };
}
