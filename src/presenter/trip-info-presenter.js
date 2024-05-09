import {render} from '../framework/render.js';
import {getFilters, DEFAULT_FILTER} from '../utils/filter.js';
import TripHeaderView from '../view/trip-header-view.js';
import FiltersListView from '../view/filters-list-view.js';
import NewEventButtonView from '../view/new-event-button-view.js';

export default class TripInfoPresenter {
  #container = null;
  #eventsModel = null;
  #filters = null;
  #filter = DEFAULT_FILTER;
  #tripHeaderComponent = new TripHeaderView('123');
  #buttonComponent = new NewEventButtonView();

  constructor({container, model}) {
    this.#container = container;
    this.#eventsModel = model;
  }

  set filter(value) {
    this.#filter = value;
  }

  get filter() {
    return this.#filter;
  }

  init() {
    const events = [...this.#eventsModel.events];
    this.#filters = getFilters(events);

    render(this.#tripHeaderComponent, this.#container);
    render(new FiltersListView({ filters: this.#filters, currentFilter: this.#filter }), this.#container);
    render(this.#buttonComponent, this.#container);
  }
}
