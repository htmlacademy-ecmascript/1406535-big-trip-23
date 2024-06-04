import EventPresenter from './event-presenter.js';
import NewEventPresenter from './new-event-presenter.js';
import EventsListView from '../view/events-list-view.js';
import FiltersListView from '../view/filters-list-view.js';
import NewEventButtonView from '../view/new-event-button-view.js';
import SortListView from '../view/sort-list-view.js';
import MessageView from '../view/message-view.js';
import { render, RenderPosition, replace } from '../framework/render.js';
import { getFilters, filtrate, DEFAULT_FILTER } from '../utils/filter.js';
import { sorting, DEFAULT_SORT } from '../utils/sort.js';
import { UpdateType, UserAction, Loading, TimeLimit } from '../consts.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';

export default class MainPresenter {
  #topContainer = null;
  #bottomContainer = null;
  #eventsModel = null;
  #sortListComponent = null;
  #filtersListComponent = null;
  #messageComponent = null;
  #newEventButtonComponent = null;
  #eventsListComponent = null;
  #eventPresenters = new Map();
  #newEventPresenter = null;
  #filter = DEFAULT_FILTER;
  #sort = DEFAULT_SORT;
  #loading = Loading.IN_PROGRESS;
  #isNewEventFormOpen = false;
  #deletedEvent = null;

  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimit.LOWER_LIMIT,
    upperLimit: TimeLimit.UPPER_LIMIT
  });

  constructor({ topContainer, bottomContainer, model }) {
    this.#topContainer = topContainer;
    this.#bottomContainer = bottomContainer;
    this.#eventsModel = model;
    this.#eventsModel.addObserver(this.#onModelEvent);

    this.#renderFiltersComponent();
    this.#renderNewEventButtonComponent();
    this.#renderSortsComponent();
    this.#renderEventsListComponent();

    this.#newEventPresenter = new NewEventPresenter({
      container: this.#eventsListComponent.element,
      getDestinationById: this.#getDestinationById,
      getDestinationByName: this.#getDestinationByName,
      getOffersByType: this.#getOffersByType,
      onDataChange: this.#onViewAction,
      onDestroy: this.#onNewEventFormDestroy,
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

  get destinations() {
    return this.#eventsModel.destinations;
  }

  init() {
    this.#filtersListComponent.update(this.filters);
    if (this.#messageComponent) {
      this.#removeMessage();
    }

    if (!this.events.length || this.#loading) {
      if (!this.#eventsModel.events.length) {
        this.#filtersListComponent.reset();
        this.#filter = DEFAULT_FILTER;
        this.#filtersListComponent.update(this.filters);
      }
      this.#renderMessage();
      return;
    }

    this.#renderEvents();
  }

  #getDestinationById = (id) => this.#eventsModel.getDestinationById(id);
  #getDestinationByName = (name) => this.#eventsModel.getDestinationByName(name);
  #getOffersByType = (type) => this.#eventsModel.getOffersByType(type);

  #renderFiltersComponent() {
    this.#filtersListComponent = new FiltersListView({ callback: this.#onFilterChange });
    render(this.#filtersListComponent, this.#topContainer, RenderPosition.BEFOREEND);
  }

  #renderNewEventButtonComponent() {
    this.#newEventButtonComponent = new NewEventButtonView({ callback: this.#addNewEventClick });
    render(this.#newEventButtonComponent, this.#topContainer, RenderPosition.BEFOREEND);
    this.#newEventButtonComponent.block();
  }

  #renderSortsComponent() {
    this.#sortListComponent = new SortListView({ callback: this.#onSortChange });
    render(this.#sortListComponent, this.#bottomContainer, RenderPosition.AFTERBEGIN);
  }

  #renderEventsListComponent() {
    this.#eventsListComponent = new EventsListView();
    render(this.#eventsListComponent, this.#bottomContainer, RenderPosition.BEFOREEND);
  }

  #renderEvents() {
    if (this.#eventPresenters.size) {
      this.#clearEventsList();
    }

    this.events.forEach((event) => this.#renderEvent(event));
  }

  #renderEvent(event) {
    const eventPresenter = new EventPresenter({
      container: this.#eventsListComponent.element,
      destinations: this.destinations,
      getDestinationById: this.#getDestinationById,
      getDestinationByName: this.#getDestinationByName,
      getOffersByType: this.#getOffersByType,
      onDataChange: this.#onViewAction,
      onModeChange: this.#onModeChange,
    });

    eventPresenter.init(event);
    this.#eventPresenters.set(event.id, eventPresenter);
  }

  #renderNewEventForm() {
    this.#newEventPresenter.init(this.destinations);
  }

  #updateEvent(event) {
    this.#eventPresenters.get(event.id).init(event);
  }

  #deleteEvent(event) {
    this.#eventPresenters.get(event.id).destroy();
    this.#eventPresenters.delete(event.id);
  }

  #clearEventsList() {
    this.#eventPresenters.forEach((presenter) => presenter.destroy());
    this.#eventPresenters.clear();
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
  //   if (!this.#eventsModel.events.length) {
  //   this.#filter = DEFAULT_FILTER;
  //   this.#filtersListComponent.update(this.filters);
  //   this.#filtersListComponent.reset());
  //  }
  // }

  #onFilterChange = (changedFilter) => {
    this.#sortListComponent.reset();
    this.#filter = changedFilter;
    this.#sort = DEFAULT_SORT;
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

    this.#renderNewEventForm();
    this.#isNewEventFormOpen = true;
  };

  #onNewEventFormDestroy = () => {
    this.#newEventButtonComponent.unblock();
    this.#newEventPresenter.destroy();

    if (!this.#eventsModel.events.length) {
      this.#renderMessage();
    }
    this.#isNewEventFormOpen = false;
  };

  #onModeChange = () => {
    if (this.#isNewEventFormOpen) {
      this.#onNewEventFormDestroy();
    }

    this.#eventPresenters.forEach((presenter) => presenter.resetView());
  };

  #onModelEvent = (updateType, data) => {
    if (data) {
      this.#updateEvent(data);
      return;
    }
    switch (updateType) {
      case UpdateType.MINOR:
        this.#deleteEvent(this.#deletedEvent);
        break;
      case UpdateType.MAJOR:
        if (this.#isNewEventFormOpen) {
          this.#onNewEventFormDestroy();
        }
        this.init();
        break;
      case UpdateType.INIT:
        if (!this.#eventsModel.destinations.length || !this.#eventsModel.offers.length) {
          this.#loading = Loading.ERROR;
        } else {
          this.#loading = Loading.COMPLETE;
          this.#newEventButtonComponent.unblock();
        }
        this.init();
    }
  };

  #onViewAction = async (actionType, update, changedOptions) => {
    this.#uiBlocker.block();

    switch (actionType) {
      case UserAction.UPDATE_EVENT:
        this.#eventPresenters.get(update.id).setSaving();
        try {
          if (changedOptions.patch) {
            await this.#eventsModel.updateEvent(UpdateType.PATCH, update);
          } else {
            await this.#eventsModel.updateEvent(changedOptions[this.#sort] ? UpdateType.MAJOR : UpdateType.MINOR, update);
          }
        } catch(err) {
          this.#eventPresenters.get(update.id).setAborting();
        }
        break;
      case UserAction.ADD_EVENT:
        this.#newEventPresenter.setSaving();
        try {
          await this.#eventsModel.addEvent(UpdateType.MAJOR, update);
        } catch(err) {
          this.#newEventPresenter.setAborting();
        }
        break;
      case UserAction.DELETE_EVENT:
        this.#eventPresenters.get(update.id).setDeleting();
        try {
          await this.#eventsModel.deleteEvent(UpdateType.MINOR, update);
          this.#deletedEvent = update;
        } catch(err) {
          this.#eventPresenters.get(update.id).setAborting();
        }
        break;
    }

    this.#uiBlocker.unblock();
  };
}
