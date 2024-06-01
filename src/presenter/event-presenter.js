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
  #getDestinationById = null;
  #getDestinationByName = null;
  #getOffersByType = null;

  constructor({ container, model, onDataChange, onModeChange, getDestinationById, getDestinationByName, getOffersByType }) {
    this.#container = container;
    this.#eventsModel = model;
    this.#onDataChange = onDataChange;
    this.#onModeChange = onModeChange;
    this.#getDestinationById = getDestinationById;
    this.#getDestinationByName = getDestinationByName;
    this.#getOffersByType = getOffersByType;
  }

  init(event) {
    this.#event = event;

    const destinations = this.#eventsModel.destinations;
    const destination = this.#eventsModel.getDestinationNameById(this.#event.destination);
    const prevViewEventComponent = this.#viewEventComponent;
    const prevEditEventComponent = this.#editEventComponent;

    this.#viewEventComponent = new EventView({
      event: {
        ... this.#event,
        destination,
        typeOffers: this.#getOffersByType(this.#event.type)
      },
      onEdit: this.#onEdit,
      onFavoriteClick: this.#onFavoriteClick,
    });

    this.#editEventComponent = new EditEventView({
      event: this.#event,
      destinations,
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

  #changeViewToEdit() {
    replace(this.#editEventComponent, this.#viewEventComponent);
    document.addEventListener('keydown', this.#onEscKeydown);
    this.#onModeChange();
    this.#mode = Mode.EDIT;
  }

  #changeEditToView() {
    this.#editEventComponent.reset();
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
    const changedOptions = {
      [SortType.DATE]: this.#event.dateFrom !== event.dateFrom,
      [SortType.DURATION]: this.#event.dateFrom !== event.dateFrom || this.#event.dateTo !== event.dateTo,
      [SortType.PRICE]: this.#event.basePrice !== event.basePrice,
    };

    this.#onDataChange(UserAction.UPDATE_EVENT, UpdateType.MINOR, event, changedOptions);
    this.#changeEditToView();
  };

  #onFormReset = () => {
    this.#changeEditToView();
  };
}
