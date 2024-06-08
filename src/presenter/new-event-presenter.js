import EditEventView from '../view/edit-event-view.js';
import { render, remove, RenderPosition } from '../framework/render.js';
import { UserAction, UpdateType, NEW_EVENT } from '../consts.js';

export default class NewEventPresenter {
  #container = null;
  #newEventComponent = null;
  #event = NEW_EVENT;
  #destinations = [];
  #getDestinationById = null;
  #getDestinationByName = null;
  #getOffersByType = null;
  #onDataChange = null;
  #onDestroy = null;

  constructor({ container, destinations, getDestinationById, getDestinationByName, getOffersByType, onDataChange, onDestroy }) {
    this.#container = container;
    this.#destinations = destinations;
    this.#getDestinationById = getDestinationById;
    this.#getDestinationByName = getDestinationByName;
    this.#getOffersByType = getOffersByType;
    this.#onDataChange = onDataChange;
    this.#onDestroy = onDestroy;
  }

  init() {
    this.#newEventComponent = new EditEventView({
      event: this.#event,
      destinations: this.#destinations,
      getDestinationById: this.#getDestinationById,
      getDestinationByName: this.#getDestinationByName,
      getOffersByType: this.#getOffersByType,
      onFormSubmit: this.#onFormSubmit,
      onCancel: this.#onCancel,
    });

    render(this.#newEventComponent, this.#container, RenderPosition.AFTERBEGIN);
    document.addEventListener('keydown', this.#onEscKeydown);
  }

  destroy() {
    remove(this.#newEventComponent);
    document.removeEventListener('keydown', this.#onEscKeydown);
  }

  setSaving() {
    this.#newEventComponent.updateElement({
      isDisabled: true,
      isSaving: true,
    });
  }

  setAborting() {
    const resetFormState = () => {
      this.#newEventComponent.updateElement({
        isDisabled: false,
        isSaving: false,
      });
    };

    this.#newEventComponent.shake(resetFormState);
  }

  #onEscKeydown = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#onDestroy();
    }
  };

  #onCancel = () => {
    this.#onDestroy();
  };

  #onFormSubmit = (event) => {
    this.#onDataChange(UserAction.ADD_EVENT, UpdateType.MINOR, event);
  };
}
