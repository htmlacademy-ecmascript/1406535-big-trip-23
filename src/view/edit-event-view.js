import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { createTypesListTemplate, createEventDetailsTemplate } from '../view/edit-event-template.js';
import { date } from '../utils/date.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import he from 'he';
import { FIVE_MINUTES } from '../consts.js';

const createEditEventTemplate = (event, destinations, typeOffers) => {
  const { offers: offersIds, destination, type, basePrice, dateFrom, dateTo, isDisabled, isSaving, isDeleting } = event;
  const eventStart = dateFrom ? date.formatDayTime(dateFrom) : '';
  const eventEnd = dateTo ? date.formatDayTime(dateTo) : '';
  const typesListTemplate = createTypesListTemplate(type, isDisabled);
  const detailsTemplate = typeOffers.length || destination ? createEventDetailsTemplate(typeOffers, offersIds, destination, isDisabled) : '';
  const destinationName = destination?.name || '';

  return (
    `<li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">

          ${typesListTemplate}

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">${type}</label>
            <input class="event__input  event__input--destination" id="event-destination-1" type="text"
              name="event-destination" value="${he.encode(destinationName)}" list="destination-list-1" ${isDisabled ? 'disabled' : ''}>
            <datalist id="destination-list-1">
              ${destinations.map((element) => `<option value="${element.name}"></option>`).join('')}
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text"
              name="event-start-time" value="${eventStart}" ${isDisabled ? 'disabled' : ''}> &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text"
              name="event-end-time" value="${eventEnd}" ${isDisabled ? 'disabled' : ''}>
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1"><span class="visually-hidden">${basePrice}</span> &euro;</label>
            <input class="event__input  event__input--price" id="event-price-1" type="number"
              name="event-price" value="${basePrice}" min=0 ${isDisabled ? 'disabled' : ''}>
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit" ${isDisabled ? 'disabled' : ''}>
            ${isSaving ? 'Saving...' : 'Save'}
          </button>
          <button class="event__reset-btn" type="reset">
            ${isDeleting ? 'Deleting...' : 'Delete'}
          </button>
          <button class="event__rollup-btn" type="button"><span class="visually-hidden">Open event</span></button>
        </header>

        ${detailsTemplate}

       </form>
    </li>`);
};

export default class EditEventView extends AbstractStatefulView {
  #event = null;
  #destinations = [];
  #typeOffers = [];
  #datapickerStart = null;
  #datapickerEnd = null;
  #onReset = null;
  #onSubmit = null;
  #onDelete = null;
  #onCancel = null;
  #getDestinationById = null;
  #getDestinationByName = null;
  #getOffersByType = null;
  #isNewEvent = false;

  constructor({ event, destinations, getDestinationById, getDestinationByName, getOffersByType, onFormSubmit, onFormReset, onDelete, onCancel }) {
    super();
    this.#event = event;
    this.#destinations = destinations;
    this.#getDestinationById = getDestinationById;
    this.#getDestinationByName = getDestinationByName;
    this.#getOffersByType = getOffersByType;
    this.#onReset = onFormReset;
    this.#onSubmit = onFormSubmit;
    this.#onDelete = onDelete;
    this.#onCancel = onCancel;
    this.#typeOffers = this.#getOffersByType(event.type);

    if (!event.id) {
      this.#isNewEvent = true;
    }

    this._setState(EditEventView.parseEventToState(event, this.#isNewEvent ? '' : this.#getDestinationById(event.destination)));
    this._restoreHandlers();
  }

  get template() {
    return createEditEventTemplate(this._state, this.#destinations, this.#typeOffers);
  }

  _restoreHandlers() {
    this.element.querySelector('form').addEventListener('submit', this.#onFormSubmit);
    this.element.querySelector('.event__type-group').addEventListener('change', this.#onEventTypeChange);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#onDestinationChange);
    this.element.querySelector('.event__input--price').addEventListener('blur', this.#onPriceChange);
    this.#setDatepickers();

    const editToViewButton = this.element.querySelector('.event__rollup-btn');
    const eventResetButton = this.element.querySelector('.event__reset-btn');

    if (this.#isNewEvent) {
      editToViewButton.remove();
      eventResetButton.innerText = 'Cancel';
      eventResetButton.addEventListener('click', this.#onCancelButtonClick);
    } else {
      editToViewButton.addEventListener('click', this.#onViewButtonClick);
      eventResetButton.addEventListener('click', this.#onDeleteButtonClick);
    }
  }

  removeElement() {
    super.removeElement();

    if (this.#datapickerStart) {
      this.#datapickerStart.destroy();
      this.#datapickerStart = null;
      this.#datapickerEnd.destroy();
      this.#datapickerEnd = null;
    }
  }

  reset() {
    this.updateElement({ ...this.#event, destination: this.#getDestinationById(this.#event.destination) });
  }

  #setDatepickers() {
    this.#datapickerStart = flatpickr(this.element.querySelector('[name="event-start-time"]'),
      {
        dateFormat: 'd/m/y H:i',
        enableTime: true,
        'time_24hr': true,
        defaultDate: this._state.dateFrom,
        maxDate: this._state.dateTo,
        onChange: this.#onStartDateChange,
      },
    );

    this.#datapickerEnd = flatpickr(this.element.querySelector('[name="event-end-time"]'),
      {
        dateFormat: 'd/m/y H:i',
        enableTime: true,
        'time_24hr': true,
        defaultDate: this._state.dateTo,
        minDate: this._state.dateFrom,
        onChange: this.#onEndDateChange,
      },
    );
  }

  #getCheckedOfferIds() {
    return Array.from(this.element.querySelectorAll('.event__offer-checkbox:checked'), (offer) => offer.dataset.id);
  }

  #onEventTypeChange = (evt) => {
    const changedType = evt.target.value;
    this.#typeOffers = this.#getOffersByType(changedType);
    this.updateElement({ type: changedType, offers: [] });
  };

  #onDestinationChange = (evt) => {
    if (!this.#getDestinationByName(evt.target.value)) {
      evt.target.value = '';
      return;
    }
    this.updateElement({ destination: this.#getDestinationByName(evt.target.value) });
  };

  #onPriceChange = (evt) => this._setState({ basePrice: parseInt(evt.target.value, 10) });

  #onStartDateChange = ([userDate]) => {
    this._setState({ dateFrom: userDate });
    this.#datapickerEnd.set('minDate', userDate.getTime() + FIVE_MINUTES);
  };

  #onEndDateChange = ([userDate]) => {
    this._setState({ dateTo: userDate });
    this.#datapickerStart.set('maxDate', userDate);
  };

  #onFormSubmit = (evt) => {
    evt.preventDefault();
    this._setState({ offers: this.#getCheckedOfferIds() });
    this.#onSubmit(EditEventView.parseStateToEvent(this._state, this._state.destination.id));
  };

  #onViewButtonClick = (evt) => {
    evt.preventDefault();
    this.#onReset();
  };

  #onDeleteButtonClick = (evt) => {
    evt.preventDefault();
    this.#onDelete();
  };

  #onCancelButtonClick = (evt) => {
    evt.preventDefault();
    this.#onCancel();
  };

  static parseEventToState(event, destination) {
    return {
      ...event,
      destination,
      isDisabled: false,
      isSaving: false,
      isDeleting: false,
    };
  }

  static parseStateToEvent(state, destination) {
    const event = {
      ...state,
      destination
    };

    delete event.isDisabled;
    delete event.isSaving;
    delete event.isDeleting;

    return event;
  }
}
