import EventPresenter from './event-presenter.js';
import NewEventPresenter from './new-event-presenter.js';
import EventsListView from '../view/events-list-view.js';
import FiltersListView from '../view/filters-list-view.js';
import NewEventButtonView from '../view/new-event-button-view.js';
import SortListView from '../view/sort-list-view.js';
import MessageView from '../view/message-view.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';
import { render, RenderPosition, replace, remove } from '../framework/render.js';
import { getFilters, filtrate, DEFAULT_FILTER } from '../utils/filter.js';
import { sorting, DEFAULT_SORT } from '../utils/sort.js';
import { UpdateType, UserAction, Loading, TimeLimit } from '../consts.js';

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
  #isNewForm = false;

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
    this.#newEventButtonComponent.block();
    this.#sortListComponent = new SortListView({ callback: this.#onSortChange });
    this.#renderEventsListComponent();
    this.#messageComponent = new MessageView({ loading: this.#loading, filter: this.#filter });
    render(this.#messageComponent, this.#bottomContainer, RenderPosition.AFTERBEGIN);
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
    this.#clearEventsList();

    if (!this.events.length || this.#loading) {
      this.#renderMessage();
      return;
    }

    this.#changeMessageToSort();
    this.events.forEach((event) => this.#renderEvent(event));
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

  #renderEventsListComponent() {
    this.#eventsListComponent = new EventsListView();
    render(this.#eventsListComponent, this.#bottomContainer, RenderPosition.BEFOREEND);
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

  #updateEvent(event) {
    this.#eventPresenters.get(event.id).init(event);
  }

  #clearEventsList() {
    this.#onNewEventFormDestroy();
    this.#eventPresenters.forEach((presenter) => presenter.destroy());
    this.#eventPresenters.clear();
  }

  #renderMessage() {
    const prevMessageComponent = this.#messageComponent;
    this.#messageComponent = new MessageView({ loading: this.#loading, filter: this.#filter });
    if (!prevMessageComponent) {
      replace(this.#messageComponent, this.#sortListComponent);
    } else {
      replace(this.#messageComponent, prevMessageComponent);
      remove(prevMessageComponent);
    }
  }

  #changeMessageToSort() {
    if (this.#messageComponent) {
      replace(this.#sortListComponent, this.#messageComponent);
      this.#messageComponent = null;
    }
  }

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

    if (!this.events.length) {
      replace(this.#sortListComponent, this.#messageComponent);
    }

    this.#newEventPresenter = new NewEventPresenter({
      container: this.#eventsListComponent.element,
      destinations: this.destinations,
      getDestinationById: this.#getDestinationById,
      getDestinationByName: this.#getDestinationByName,
      getOffersByType: this.#getOffersByType,
      onDataChange: this.#onViewAction,
      onDestroy: this.#onNewEventFormDestroy,
    });

    this.#newEventPresenter.init();
    this.#isNewForm = true;
  };

  #onNewEventFormDestroy = () => {
    if (!this.#isNewForm) {
      return;
    }

    this.#newEventButtonComponent.unblock();

    if (!this.#eventsModel.events.length) {
      this.#renderMessage();
      }

    this.#newEventPresenter.destroy();
    this.#isNewForm = false;
  };

  #onModeChange = () => {
    this.#onNewEventFormDestroy();
    this.#eventPresenters.forEach((presenter) => presenter.resetView());
  };

  #onModelEvent = (updateType, data) => {
    this.#filtersListComponent.update(this.filters);

    switch (updateType) {
      case UpdateType.PATCH:
        this.#updateEvent(data);
        break;
      case UpdateType.MINOR:
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

  #onViewAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block();

    switch (actionType) {
      case UserAction.UPDATE_EVENT:
        this.#eventPresenters.get(update.id).setSaving();
        try {
          await this.#eventsModel.updateEvent(updateType, update);
        } catch(err) {
          this.#eventPresenters.get(update.id).setAborting();
        }
        break;
      case UserAction.ADD_EVENT:
        this.#newEventPresenter.setSaving();
        try {
          await this.#eventsModel.addEvent(updateType, update);
        } catch(err) {
          this.#newEventPresenter.setAborting();
        }
        break;
      case UserAction.DELETE_EVENT:
        this.#eventPresenters.get(update.id).setDeleting();
        try {
          await this.#eventsModel.deleteEvent(updateType, update);
        } catch(err) {
          this.#eventPresenters.get(update.id).setAborting();
        }
        break;
    }

    this.#uiBlocker.unblock();
  };
}
