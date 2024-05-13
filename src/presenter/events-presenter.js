import SortListView from '../view/sort-list-view.js';
import EventsListView from '../view/events-list-view.js';
import MessageView from '../view/message-view.js';
import EventPresenter from './event-presenter.js';
import { render } from '../framework/render.js';
import { filtrate, DEFAULT_FILTER } from '../utils/filter.js';
export default class EventsPresenter {
  #container = null;
  #eventsModel = null;
  #events = null;
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
    });

    eventPresenter.init(event);
  }
}
