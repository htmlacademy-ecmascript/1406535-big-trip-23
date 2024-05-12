import AbstractView from '../framework/view/abstract-view.js';
import TypesListView from '../view/types-list-view.js';
import EventDetailsView from '../view/event-details-view.js';
import { date } from '../utils/date.js';

const createEditEventTemplate = (event, destinations, offers) => {
  const {offers: offersIds, destination: destinationId, type, basePrice, dateFrom, dateTo} = event;
  const eventStart = date.formatDayTime(dateFrom);
  const eventEnd = date.formatDayTime(dateTo);
  const typesListTemplate = new TypesListView(type).template;
  const destination = destinations.find((element) => element.id === destinationId);
  const detailsTemplate = offers || destinations ? new EventDetailsView({ offers, offersIds, destination }).template : '';

  return (
    `<form class="event event--edit" action="#" method="post">
        <header class="event__header">

          ${typesListTemplate}

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              ${type}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-1" type="text"
            name="event-destination" value="${destination.name}" list="destination-list-1">
            <datalist id="destination-list-1">
              ${destinations.map((element) => `<option value="${element.name}"></option>`).join('\n')}
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${eventStart}"> &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${eventEnd}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1"><span class="visually-hidden">${basePrice}</span> &euro;</label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Delete</button>
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </header>

        ${detailsTemplate}
      </form>`);
};

export default class EditEventView extends AbstractView {
  #event = null;
  #destinations = null;
  #offers = null;
  #onReset = null;
  #onSubmit = null;

  constructor({ event, destinations, offers, onFormSubmit, onFormReset }) {
    super();
    this.#event = event;
    this.#destinations = destinations;
    this.#offers = offers;
    this.#onReset = onFormReset;
    this.#onSubmit = onFormSubmit;

    this.element.addEventListener('submit', this.#onFormSubmit);
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#onViewButtonClick);
  }

  get template() {
    return createEditEventTemplate(this.#event, this.#destinations, this.#offers);
  }

  #onFormSubmit = (evt) => {
    evt.preventDefault();
    this.#onSubmit();
  };

  #onViewButtonClick = (evt) => {
    evt.preventDefault();
    this.#onReset();
  };
}
