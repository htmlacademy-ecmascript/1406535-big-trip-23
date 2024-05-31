import EventView from '../view/event-view.js';
import EditEventView from '../view/edit-event-view.js';
import { render, replace, remove } from '../framework/render.js';
import { UserAction, UpdateType } from '../consts.js';
import { SortType } from '../utils/sort.js';

const Mode = {
  VIEW: 'view',
  EDIT: 'edit',
};

export default class EventPresenter {
  #container = null;
  #eventsModel = null;
  #event = null;
  #viewEventComponent = null;
  #editEventComponent = null;
  #onDataChange = null;
  #onModeChange = null;
  #mode = Mode.VIEW;
  #sort = null;

  constructor({ container, model, onDataChange, onModeChange }) {
    this.#container = container;
    this.#eventsModel = model;
    this.#onDataChange = onDataChange;
    this.#onModeChange = onModeChange;
  }

  init(event, sort) {
    this.#event = event;
    this.#sort = sort;

    const prevViewEventComponent = this.#viewEventComponent;
    const prevEditEventComponent = this.#editEventComponent;

    this.#viewEventComponent = new EventView({
      event: {
        ... this.#event,
        destination: this.#eventsModel.getDestinationNameById(this.#event.destination),
        typeOffers: this.#getOffersByType(this.#event.type)
      },
      onEdit: this.#onEdit,
      onFavoriteClick: this.#onFavoriteClick,
    });

    this.#editEventComponent = new EditEventView({
      event: this.#event,
      // здесь передаем результат выполнения
      destinations: this.#eventsModel.destinations,
      // а здесь передаем метод из модели, можно ли напрямую передать, не создавая обертки в презентере точки, или это нарушает критерии?
      getDestinationById: this.#getDestinationById,
      getDestinationByName: this.#getDestinationByName,
      getOffersByType: this.#getOffersByType,
      onFormSubmit: this.#onFormSubmit,
      onFormReset: this.#onFormReset,
      onDelete: this.#onDelete,
    });

    if (prevViewEventComponent === null || prevEditEventComponent === null) {
      render(this.#viewEventComponent, this.#container);
      return;
    }

    if (this.#mode === Mode.VIEW) {
      replace(this.#viewEventComponent, prevViewEventComponent);
    }

    if (this.#mode === Mode.EDIT) {
      replace(this.#editEventComponent, prevEditEventComponent);
    }

    remove(prevEditEventComponent);
    remove(prevViewEventComponent);
  }

  resetView() {
    if (this.#mode !== Mode.VIEW) {
      this.#editEventComponent.reset(this.#event);
      this.#changeEditToView();
    }
  }

  destroy() {
    remove(this.#viewEventComponent);
    remove(this.#editEventComponent);
    document.removeEventListener('keydown', this.#onEscKeydown);
  }

  #getDestinationById = (id) => this.#eventsModel.getDestinationById(id);
  #getDestinationByName = (name) => this.#eventsModel.getDestinationByName(name);
  #getOffersByType = (type) => this.#eventsModel.getOffersByType(type);

  #changeViewToEdit() {
    replace(this.#editEventComponent, this.#viewEventComponent);
    document.addEventListener('keydown', this.#onEscKeydown);
    this.#onModeChange();
    this.#mode = Mode.EDIT;
  }

  #changeEditToView() {
    replace(this.#viewEventComponent, this.#editEventComponent);
    document.removeEventListener('keydown', this.#onEscKeydown);
    this.#mode = Mode.VIEW;
  }

  #onEscKeydown = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#changeEditToView();
    }
  };

  #onEdit = () => {
    this.#changeViewToEdit();
  };

  #onFavoriteClick = () => {
    this.#onDataChange(UserAction.UPDATE_EVENT, UpdateType.PATCH, {...this.#event, isFavorite: !this.#event.isFavorite});
  };

  #onDelete = () => {
    this.#onDataChange(UserAction.DELETE_EVENT, UpdateType.MINOR, this.#event);
  };

  #onFormSubmit = (event) => {
    const isPriceChanged = this.#event.basePrice !== event.basePrice;
    const isDestinationChanged = this.#event.destination !== event.destination;
    const isStartDateChanged = this.#event.dateFrom !== event.dateFrom;
    const isEndDateChanged = this.#event.dateTo !== event.dateTo;
    const isEventTypeChanged = this.#event.type !== event.type;
    const isNoMajorChanges = !isPriceChanged & !isDestinationChanged & !isStartDateChanged & !isEndDateChanged;

    if (isEventTypeChanged & !this.#event.offers.length & !event.offers.length & isNoMajorChanges) {
      this.#onDataChange(UserAction.UPDATE_EVENT, UpdateType.PATCH, event);
      this.#changeEditToView();
      return;
    }

    switch (this.#sort) {
      case SortType.PRICE:
        this.#onDataChange(UserAction.UPDATE_EVENT, isPriceChanged ? UpdateType.MAJOR : UpdateType.MINOR, event);
        break;
      case SortType.DURATION:
        this.#onDataChange(UserAction.UPDATE_EVENT, isStartDateChanged || isEndDateChanged ? UpdateType.MAJOR : UpdateType.MINOR, event);
        break;
      case SortType.DATE:
        this.#onDataChange(UserAction.UPDATE_EVENT, isStartDateChanged ? UpdateType.MAJOR : UpdateType.MINOR, event);
        break;
      default:
        this.#onDataChange(UserAction.UPDATE_EVENT, UpdateType.MINOR, event);
    }
    this.#changeEditToView();
  };

  #onFormReset = () => {
    this.#changeEditToView();
  };
}
