import EventPresenter from './event-presenter.js';
import EventsListView from '../view/events-list-view.js';
import { render, RenderPosition } from '../framework/render.js';
import { updateItem } from '../utils/utils.js';
export default class EventsPresenter {
  #container = null;
  #eventsModel = null;
  #events = null;
  #sort = null;
  #eventPresenters = new Map();
  #eventsListComponent = new EventsListView();

  constructor({ container, model, sort }) {
    this.#container = container;
    this.#eventsModel = model;
    this.#sort = sort;

    render(this.#eventsListComponent, this.#container, RenderPosition.BEFOREEND);
  }

  init(events) {
    this.#events = events;
    events.forEach((event) => this.#renderEvent(event));
  }

  #renderEvent(event) {
    const eventPresenter = new EventPresenter({
      container: this.#eventsListComponent.element,
      model: this.#eventsModel,
      sort: this.#sort,
      onDataChange: this.#onDataChange,
      onModeChange: this.#onModeChange,
    });

    eventPresenter.init(event);
    this.#eventPresenters.set(event.id, eventPresenter);
  }

  clearEventsList() {
    this.#eventPresenters.forEach((presenter) => presenter.destroy());
    this.#eventPresenters.clear();
  }

  #onDataChange = (updatedEvent) => {
    // Здесь будет обращение к моделе
    this.#eventPresenters.get(updatedEvent.id).init(updatedEvent);
  };

  #onModeChange = () => {
    this.#eventPresenters.forEach((presenter) => presenter.resetView());
  };
}
