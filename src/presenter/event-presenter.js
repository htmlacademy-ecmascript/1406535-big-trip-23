import EventView from '../view/event-view.js';
import EditEventView from '../view/edit-event-view.js';
import { render, replace, remove, RenderPosition } from '../framework/render.js';
import { UserAction, UpdateType } from '../consts.js';

const Mode = {
  VIEW: 'view',
  EDIT: 'edit',
};
export default class EventPresenter {
  #container = null;
  #viewEventComponent = null;
  #editEventComponent = null;
  #event = null;
  #destinations = [];
  #getDestinationById = null;
  #getDestinationByName = null;
  #getOffersByType = null;
  #onDataChange = null;
  #onModeChange = null;
  #mode = Mode.VIEW;

  constructor({ container, destinations, getDestinationById, getDestinationByName, getOffersByType, onDataChange, onModeChange }) {
    this.#container = container;
    this.#destinations = destinations;
    this.#getDestinationById = getDestinationById;
    this.#getDestinationByName = getDestinationByName;
    this.#getOffersByType = getOffersByType;
    this.#onDataChange = onDataChange;
    this.#onModeChange = onModeChange;
  }

  init(event) {
    this.#event = event;

    const prevViewEventComponent = this.#viewEventComponent;
    const prevEditEventComponent = this.#editEventComponent;

    this.#viewEventComponent = new EventView({
      event: {
        ... this.#event,
        destination: this.#getDestinationById(this.#event.destination).name,
        typeOffers: this.#getOffersByType(this.#event.type)
      },
      onEdit: this.#onEdit,
      onFavoriteClick: this.#onFavoriteClick,
    });

    this.#editEventComponent = new EditEventView({
      event: this.#event,
      destinations: this.#destinations,
      getDestinationById: this.#getDestinationById,
      getDestinationByName: this.#getDestinationByName,
      getOffersByType: this.#getOffersByType,
      onFormSubmit: this.#onFormSubmit,
      onFormReset: this.#onFormReset,
      onDelete: this.#onDelete,
    });

    if (prevViewEventComponent === null || prevEditEventComponent === null) {
      render(this.#viewEventComponent, this.#container, RenderPosition.BEFOREEND);
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
      this.#changeEditToView();
    }
  }

  destroy() {
    remove(this.#viewEventComponent);
    remove(this.#editEventComponent);
    document.removeEventListener('keydown', this.#onEscKeydown);
  }

  setSaving() {
    if (this.#mode === Mode.EDIT) {
      this.#editEventComponent.updateElement({
        isDisabled: true,
        isSaving: true,
      });
    }
  }

  setDeleting() {
    if (this.#mode === Mode.EDIT) {
      this.#editEventComponent.updateElement({
        isDisabled: true,
        isDeleting: true,
      });
    }
  }

  setAborting() {
    if (this.#mode === Mode.VIEW) {
      this.#viewEventComponent.shake();
      return;
    }

    const resetFormState = () => {
      this.#editEventComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };
    this.#editEventComponent.shake(resetFormState);
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
    this.#onDataChange(UserAction.UPDATE_EVENT, UpdateType.MINOR, event);
  };

  #onFormReset = () => {
    this.#changeEditToView();
  };
}
