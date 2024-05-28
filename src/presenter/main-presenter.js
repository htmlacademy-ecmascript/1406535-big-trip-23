import EventsPresenter from './events-presenter.js';
import TripInfoPresenter from './trip-info-presenter.js';
import FiltersListView from '../view/filters-list-view.js';
import NewEventButtonView from '../view/new-event-button-view.js';
import SortListView from '../view/sort-list-view.js';
import MessageView from '../view/message-view.js';
import { render, RenderPosition, replace } from '../framework/render.js';
import { getFilters, filtrate, DEFAULT_FILTER } from '../utils/filter.js';
import { sorting, DEFAULT_SORT } from '../utils/sort.js';
import { UpdateType } from '../consts.js';

export default class MainPresenter {
  #topContainer = null;
  #bottomContainer = null;
  #eventsModel = null;
  #eventsPresenter = null;
  #tripInfoPresenter = null;
  #sortListComponent = null;
  #filtersListComponent = null;
  #messageComponent = null;
  #filter = null;
  #filters = null;
  #sort = null;
  #isLoadFail = false;

  constructor({ topContainer, bottomContainer, model }) {
    this.#topContainer = topContainer;
    this.#bottomContainer = bottomContainer;
    this.#eventsModel = model;

    this.#eventsModel.addObserver(this.#onModelEvent);

    this.#filter = DEFAULT_FILTER;
    this.#sort = DEFAULT_SORT;
  }

  get events() {
    const events = this.#eventsModel.events;
    const filteredEvents = filtrate[this.#filter](events);
    return sorting[this.#sort](filteredEvents);
  }

  init() {
    this.#tripInfoPresenter = new TripInfoPresenter({ container: this.#topContainer, model: this.#eventsModel });
    this.#tripInfoPresenter.init();

    this.#filters = getFilters(this.events);
    this.#renderFiltersComponent();

    this.#renderNewEventButtonComponent();
    this.#renderSortsComponent();

    if (!this.events.length) {
      this.#renderEmptyListMessage();
      return;
    }

    this.#eventsPresenter = new EventsPresenter({ container: this.#bottomContainer, model: this.#eventsModel });
    this.#eventsPresenter.init(this.events, this.#sort);
  }

  #renderFiltersComponent() {
    this.#filtersListComponent = new FiltersListView({
      filters: this.#filters,
      currentFilter: this.#filter,
      onChange: this.#onFilterChange
    });
    render(this.#filtersListComponent, this.#topContainer, RenderPosition.BEFOREEND);
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
    this.#eventsPresenter.init(this.events, this.#sort);
  }

  #onModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        // Перерисовываем только себя
        this.#eventsPresenter.rerenderEvent(data);
        break;
      case UpdateType.MINOR:
        // Перерисовываем себя и шапку
        this.#eventsPresenter.rerenderEvent(data);
        break;
      case UpdateType.MAJOR:
        // Перерисовываем список и шапку
        this.#rerenderEventsList();
        break;
    }
  };

  #onFilterChange = (changedFilter) => {
    this.#filter = changedFilter;
    this.#sort = DEFAULT_SORT;
    this.#sortListComponent.resetSort();
    this.#rerenderEventsList();
  };

  #onSortChange = (changedSort) => {
    this.#sort = changedSort;
    this.#rerenderEventsList();
  };
}
