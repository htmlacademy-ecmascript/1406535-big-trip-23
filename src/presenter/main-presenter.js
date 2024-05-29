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
  #newEventButtonComponent = null;
  #filter = null;
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

  get filters() {
    const events = this.#eventsModel.events;
    return getFilters(events);
  }

  init() {
    this.#tripInfoPresenter = new TripInfoPresenter({ container: this.#topContainer, model: this.#eventsModel });
    this.#tripInfoPresenter.init();

    this.#renderFiltersComponent();
    this.#renderNewEventButtonComponent();
    this.#renderSortsComponent();

    this.#checkEmptyList();

    this.#eventsPresenter = new EventsPresenter({ container: this.#bottomContainer, model: this.#eventsModel });
    this.#eventsPresenter.init(this.events, this.#sort);
  }

  #renderFiltersComponent() {
    this.#filtersListComponent = new FiltersListView({
      filters: this.filters,
      currentFilter: this.#filter,
      onChange: this.#onFilterChange
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
      onChange: this.#onSortChange
    });
    render(this.#sortListComponent, this.#bottomContainer, RenderPosition.AFTERBEGIN);
  }

  #rerenderEventsList() {
    this.#checkEmptyList();

    if (this.#messageComponent) {
      replace(this.#sortListComponent, this.#messageComponent);
      this.#messageComponent = null;
    }

    this.#eventsPresenter.clearEventsList();
    this.#eventsPresenter.init(this.events, this.#sort);
  }

  #checkEmptyList() {
    if (this.events.length) {
      return;
    }
    this.#messageComponent = new MessageView({ err: this.#isLoadFail, filter: this.#filter });
    replace(this.#messageComponent, this.#sortListComponent);
  }

  #onModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        // Перерисовываем только себя
        this.#eventsPresenter.rerenderEvent(data);
        break;
      case UpdateType.MINOR:
        // Перерисовываем себя и шапку, обновляем компонент фильтра
        this.#filtersListComponent.update(this.filters);
        if (data) {
          this.#eventsPresenter.rerenderEvent(data);
        } else {
          this.#checkEmptyList();
        }
        break;
      case UpdateType.MAJOR:
        // Перерисовываем список и шапку, обновляем компонент фильтра
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
    // Кнопка блокируется
    // Все открытые формы закрываются без сохранения?
    // Фильтр everything и сортировка day.
    // Новая форма появляется первым элементом списка.
    // Кнопки save и cancel
    // Стоимость 0 тип точки flight
    this.#newEventButtonComponent.lock();
  };
}
