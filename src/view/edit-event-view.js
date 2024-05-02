import {createElement} from '../render.js';
import TypesListView from '../view/types-list-view.js';
import EventDetailsView from '../view/event-details-view.js';
import {date} from '../utils.js';

const createEditEventTemplate = (event) => {
  const {offers, destination, type, basePrice, dateFrom, dateTo} = event;

  const eventStart = date.formatDayTime(dateFrom);
  const eventEnd = date.formatDayTime(dateTo);

  const typesListBlock = new TypesListView().getTemplate();

  let eventDetailsBlock = '';
  if (offers || destination) {
    eventDetailsBlock = new EventDetailsView({offers, destination}).getTemplate();
  }

  const destinationName = destination ? destination.name : '';

  return `<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">

      ${typesListBlock}

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            ${type}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text"
            name="event-destination" value="${destinationName}" list="destination-list-1">
          <datalist id="destination-list-1">
            <option value="Amsterdam"></option>
            <option value="Geneva"></option>
            <option value="Chamonix"></option>
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time"
            value="${eventStart}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time"
            value="${eventEnd}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">${basePrice}</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Delete</button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>

      ${eventDetailsBlock}

    </form>
  </li>`;
};

export default class EditEventView {
  constructor({event}) {
    this.event = event;
  }

  getTemplate() {
    return createEditEventTemplate(this.event);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
