import EventsPresenter from './events-presenter.js';
import FiltersListView from '../view/filters-list-view.js';
import NewEventButtonView from '../view/new-event-button-view.js';
import SortListView from '../view/sort-list-view.js';
import MessageView from '../view/message-view.js';
import { render, RenderPosition, replace } from '../framework/render.js';
import { getFilters, filtrate, DEFAULT_FILTER } from '../utils/filter.js';
import { sorting, DEFAULT_SORT } from '../utils/sort.js';
import { UpdateType } from '../consts.js';
// import { UpdateType, Loading } from '../consts.js';

export default class MainPresenter {
  #topContainer = null;
  #bottomContainer = null;
  #eventsModel = null;
  #eventsPresenter = null;
  #sortListComponent = null;
  #filtersListComponent = null;
  #messageComponent = null;
  #newEventButtonComponent = null;
  #filter = DEFAULT_FILTER;
  #sort = DEFAULT_SORT;
  #loading = null;

  constructor({ topContainer, bottomContainer, model }) {
    this.#topContainer = topContainer;
    this.#bottomContainer = bottomContainer;
    this.#eventsModel = model;

    this.#eventsModel.addObserver(this.#onModelEvent);
  }

  get events() {
    const events = this.#eventsModel.events;
    const filteredEvents = filtrate[this.#filter](events);
    return sorting[this.#sort](filteredEvents);
  }

  get filters() {
    const events = this.#eventsModel.events;
    return getFilters(events);
  }

  init() {
    this.#renderFiltersComponent();
    this.#renderNewEventButtonComponent();
    this.#renderSortsComponent();

    this.#checkEmptyList();

    this.#eventsPresenter = new EventsPresenter({
      container: this.#bottomContainer,
      model: this.#eventsModel,
      onNewEventCancel: this.#onNewEventCancel
    });
    this.#eventsPresenter.init(this.events, this.#sort);
  }

  #renderFiltersComponent() {
    this.#filtersListComponent = new FiltersListView({
      filters: this.filters,
      currentFilter: this.#filter,
      callback: this.#onFilterChange
    });
    render(this.#filtersListComponent, this.#topContainer, RenderPosition.BEFOREEND);
  }

  #renderNewEventButtonComponent() {
    this.#newEventButtonComponent = new NewEventButtonView({ callback: this.#addNewEventClick });
    render(this.#newEventButtonComponent, this.#topContainer, RenderPosition.BEFOREEND);
  }

  #renderSortsComponent() {
    this.#sortListComponent = new SortListView({
      currentSort: this.#sort,
      callback: this.#onSortChange
    });
    render(this.#sortListComponent, this.#bottomContainer, RenderPosition.AFTERBEGIN);
  }

  #rerenderEventsList() {
    this.#checkEmptyList();

    if (this.#messageComponent) {
      replace(this.#sortListComponent, this.#messageComponent);
      this.#messageComponent = null;
    }

    this.#eventsPresenter.init(this.events, this.#sort);
  }

  #checkEmptyList() {
    if (this.events.length) {
      this.#messageComponent = null;
      return;
    }

    if (!this.#eventsModel.events.length) {
      this.#filter = DEFAULT_FILTER;
    }

    this.#messageComponent = new MessageView({ loading: this.#loading, filter: this.#filter });
    replace(this.#messageComponent, this.#sortListComponent);
  }

  #onModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        // Перерисовываем только себя
        this.#eventsPresenter.rerenderEvent(data);
        break;
      case UpdateType.MINOR:
        // Перерисовываем себя и шапку (шапка перерисовывается сама за счет подписки на изменения модели), обновляем компонент фильтра
        this.#filtersListComponent.update(this.filters);
        if (data) {
          this.#eventsPresenter.rerenderEvent(data);
        } else {
          this.#checkEmptyList();
        }
        break;
      case UpdateType.MAJOR:
        // Перерисовываем список и шапку (шапка перерисовывается сама за счет подписки на изменения модели), обновляем компонент фильтра
        this.#filtersListComponent.update(this.filters);
        this.#rerenderEventsList();
        break;
    }
  };

  #onFilterChange = (changedFilter) => {
    this.#filter = changedFilter;
    this.#sort = DEFAULT_SORT;
    this.#sortListComponent.reset();
    this.#rerenderEventsList();
  };

  #onSortChange = (changedSort) => {
    this.#sort = changedSort;
    this.#rerenderEventsList();
  };

  #addNewEventClick = () => {
    this.#newEventButtonComponent.block();

    if (!this.#eventsModel.events.length) {
      replace(this.#sortListComponent, this.#messageComponent);
    } else {
      this.#onFilterChange(DEFAULT_FILTER);
      this.#filtersListComponent.reset();
    }

    this.#eventsPresenter.addNewEvent();
  };

  #onNewEventCancel = () => {
    this.#sortListComponent.unblock();

    if (!this.#eventsModel.events.length) {
      replace(this.#messageComponent, this.#sortListComponent);
    }
  };
}
