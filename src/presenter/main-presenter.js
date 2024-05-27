import EventsPresenter from './events-presenter.js';
import TripInfoPresenter from './trip-info-presenter.js';
import FiltersListView from '../view/filters-list-view.js';
import NewEventButtonView from '../view/new-event-button-view.js';
import SortListView from '../view/sort-list-view.js';
import MessageView from '../view/message-view.js';
import { render, RenderPosition, replace } from '../framework/render.js';
import { getFilters, filtrate, DEFAULT_FILTER } from '../utils/filter.js';
import { sorting, DEFAULT_SORT } from '../utils/sort.js';

export default class MainPresenter {
  #topContainer = null;
  #bottomContainer = null;
  #eventsModel = null;
  #eventsPresenter = null;
  #initialEvents = null;
  #events = null;
  #tripInfoPresenter = null;
  #filter = null;
  #filters = null;
  #sortListComponent = null;
  #messageComponent = null;
  #sort = null;
  #isLoadFail = false;

  constructor({ topContainer, bottomContainer, model }) {
    this.#topContainer = topContainer;
    this.#bottomContainer = bottomContainer;
    this.#eventsModel = model;

    this.#filter = DEFAULT_FILTER;
    this.#sort = DEFAULT_SORT;
  }

  get events() {
    return this.#eventsModel.events;
  }

  init() {
    this.#initialEvents = [...this.#eventsModel.events];
    this.#filters = getFilters(this.#initialEvents);
    this.#events = filtrate[this.#filter](this.#initialEvents);

    if (this.#filter !== DEFAULT_FILTER) {
      this.#events = filtrate[this.#filter](this.#initialEvents);
    }

    this.#tripInfoPresenter = new TripInfoPresenter({ container: this.#topContainer, model: this.#eventsModel });
    this.#tripInfoPresenter.init(this.#events);

    this.#renderFiltersComponent();
    this.#renderNewEventButtonComponent();
    this.#renderSortsComponent();

    if (!this.#initialEvents.length) {
      this.#renderEmptyListMessage();
      return;
    }

    this.#eventsPresenter = new EventsPresenter({ container: this.#bottomContainer, model: this.#eventsModel });
    this.#eventsPresenter.init(sorting[this.#sort](this.#events));
  }

  #renderFiltersComponent() {
    const filtersComponent = new FiltersListView({
      filters: this.#filters,
      currentFilter: this.#filter,
      onChange: this.#onFilterChange
    });
    render(filtersComponent, this.#topContainer, RenderPosition.BEFOREEND);
  }

  #renderNewEventButtonComponent() {
    const newEventButton = new NewEventButtonView();
    render(newEventButton, this.#topContainer, RenderPosition.BEFOREEND);
  }

  #renderSortsComponent() {
    this.#sortListComponent = new SortListView({
      currentSort: this.#sort,
      onChange: this.#onSortChange
    });
    render(this.#sortListComponent, this.#bottomContainer, RenderPosition.AFTERBEGIN);
  }

  #renderEmptyListMessage() {
    this.#messageComponent = new MessageView({ err: this.#isLoadFail, filter: this.#filter });
    replace(this.#messageComponent, this.#sortListComponent);
  }

  #rerenderEventsList() {
    this.#eventsPresenter.clearEventsList();
    this.#eventsPresenter.init(sorting[this.#sort](this.#events));
  }

  #onFilterChange = (changedFilter) => {
    this.#filter = changedFilter;
    this.#events = filtrate[this.#filter](this.#initialEvents);
    this.#sort = DEFAULT_SORT;
    this.#sortListComponent.resetSort();
    this.#rerenderEventsList();
  };

  #onSortChange = (changedSort) => {
    this.#sort = changedSort;
    this.#rerenderEventsList();
  };
}
