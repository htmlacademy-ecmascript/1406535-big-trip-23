import EventsPresenter from './events-presenter.js';
import FiltersListView from '../view/filters-list-view.js';
import NewEventButtonView from '../view/new-event-button-view.js';
import SortListView from '../view/sort-list-view.js';
import MessageView from '../view/message-view.js';
import { render, RenderPosition, replace } from '../framework/render.js';
import { getFilters, filtrate, DEFAULT_FILTER } from '../utils/filter.js';
import { sorting, DEFAULT_SORT } from '../utils/sort.js';
import { UpdateType, Loading } from '../consts.js';

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
  #loading = Loading.IN_PROGRESS;

  constructor({ topContainer, bottomContainer, model }) {
    this.#topContainer = topContainer;
    this.#bottomContainer = bottomContainer;
    this.#eventsModel = model;

    this.#eventsModel.addObserver(this.#onModelEvent);

    this.#renderFiltersComponent();
    this.#renderNewEventButtonComponent();
    this.#renderSortsComponent();

    this.#eventsPresenter = new EventsPresenter({
      container: this.#bottomContainer,
      model: this.#eventsModel,
      onDestroy: this.#onNewEventDestroy
    });
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
    if (!this.#eventsModel.events.length) {
      this.#filter = DEFAULT_FILTER;
      this.#filtersListComponent.update(this.filters);
    }

    if (this.#messageComponent) {
      this.#removeMessage();
    }

    if (!this.events.length || this.#loading) {
      this.#renderMessage();
      return;
    }

    this.#eventsPresenter.init(this.events, this.#sort);
  }

  #renderFiltersComponent() {
    this.#filtersListComponent = new FiltersListView({ callback: this.#onFilterChange });
    render(this.#filtersListComponent, this.#topContainer, RenderPosition.BEFOREEND);
  }

  #renderNewEventButtonComponent() {
    this.#newEventButtonComponent = new NewEventButtonView({ callback: this.#addNewEventClick });
    render(this.#newEventButtonComponent, this.#topContainer, RenderPosition.BEFOREEND);
  }

  #renderSortsComponent() {
    this.#sortListComponent = new SortListView({ callback: this.#onSortChange });
    render(this.#sortListComponent, this.#bottomContainer, RenderPosition.AFTERBEGIN);
  }

  #renderMessage() {
    this.#messageComponent = new MessageView({ loading: this.#loading, filter: this.#filter });
    replace(this.#messageComponent, this.#sortListComponent);
  }

  // Это тоже не совсем удаление...
  #removeMessage() {
    replace(this.#sortListComponent, this.#messageComponent);
    this.#messageComponent = null;
  }

  // Как это можно назвать? Это нужно если текущий фильтр отличается от дефолтного, но мы грохнули все эвенты.
  // #something() {
  //   if (this.#eventsModel.events.length) {
  //     return;
  //   }

  //   this.#filter = DEFAULT_FILTER;
  //   this.#filtersListComponent.update(this.filters);
  // }

  #onModelEvent = (updateType, data) => {
    if (!data & !this.events.length) {
      if (!this.#eventsModel.events.length) {
        this.#filter = DEFAULT_FILTER;
        this.#filtersListComponent.update(this.filters);
      }
      this.#renderMessage();
      return;
    }

    switch (updateType) {
      case UpdateType.PATCH:
        this.#eventsPresenter.rerenderEvent(data);
        break;
      case UpdateType.MINOR:
        this.#filtersListComponent.update(this.filters);
        if (data) {
          this.#eventsPresenter.rerenderEvent(data);
        }
        break;
      case UpdateType.MAJOR:
        this.#filtersListComponent.update(this.filters);
        this.init();
        break;
      case UpdateType.INIT:
        this.#filtersListComponent.update(this.filters);
        this.#loading = !this.#eventsModel.destinations.length || !this.#eventsModel.offers.length ? Loading.ERROR : null;
        this.init();
    }
  };

  #onFilterChange = (changedFilter) => {
    this.#filter = changedFilter;
    this.#sort = DEFAULT_SORT;
    this.#sortListComponent.reset();
    this.init();
  };

  #onSortChange = (changedSort) => {
    this.#sort = changedSort;
    this.init();
  };

  #addNewEventClick = () => {
    this.#newEventButtonComponent.block();

    if (!this.#eventsModel.events.length) {
      replace(this.#sortListComponent, this.#messageComponent);
    } else {
      this.#onFilterChange(DEFAULT_FILTER);
    }

    this.#eventsPresenter.renderNewEvent();
  };

  #onNewEventDestroy = () => {
    this.#newEventButtonComponent.unblock();

    if (!this.#eventsModel.events.length) {
      this.#renderMessage();
    }
  };
}
