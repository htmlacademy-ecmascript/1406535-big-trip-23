import SortListView from '../view/sort-list-view.js';
import EventsListView from '../view/events-list-view.js';
import MessageView from '../view/message-view.js';
import EventPresenter from './event-presenter.js';
import { render } from '../framework/render.js';
import { filtrate, DEFAULT_FILTER } from '../utils/filter.js';
import { updateItem } from '../utils/utils.js';
export default class EventsPresenter {
  #container = null;
  #eventsModel = null;
  #events = null;
  #isLoadFail = false;
  #eventPresenters = new Map();
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

    if (!this.#events.length) {
      this.#renderEmptyListMessage();
      return;
    }

    this.#renderSortList();
    this.#renderEventsList();
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

  #renderEvent(event) {
    const eventPresenter = new EventPresenter({
      container: this.#eventsListComponent.element,
      model: this.#eventsModel,
      onDataChange: this.#onDataChange,
      onModeChange: this.#onModeChange,
    });
    eventPresenter.init(event);

    this.#eventPresenters.set(event.id, eventPresenter);
  }

  #onDataChange = (updatedEvent) => {
    this.#events = updateItem(this.#events, updatedEvent);
    this.#eventPresenters.get(updatedEvent.id).init(updatedEvent);
  };

  #onModeChange = () => {
    this.#eventPresenters.forEach((presenter) => presenter.resetView());
  };
}
