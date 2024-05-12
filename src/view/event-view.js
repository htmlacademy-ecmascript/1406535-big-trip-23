import AbstractView from '../framework/view/abstract-view.js';
import { date } from '../utils/date.js';

const createOfferTemplate = ({title, price}) =>
  `<li class="event__offer"><span class="event__offer-title">${title}</span>
    &plus;&euro;&nbsp; <span class="event__offer-price">${price}</span>
  </li>`;

const createEventTemplate = (event, destination, offers) => {
  const {type, offers: offersIds, dateFrom, dateTo} = event;

  const eventDate = date.formatDay(dateFrom);
  const eventDateBrief = date.formatBriefDay(dateFrom);
  const eventStartTime = date.formatOnlyTime(dateFrom);
  const eventStartTimeMachine = date.formatMachineTime(dateFrom);
  const eventEndTime = date.formatOnlyTime(dateTo);
  const eventEndTimeMachine = date.formatMachineTime(dateTo);
  const eventDuration = date.calculateDuration(dateFrom, dateTo);

  const offersTemplate = offersIds.length !== 0 ?
    offersIds.map((id) => createOfferTemplate(offers.find((element) => element.id === id))).join('\n') : '';

  const FavoriteClassName = event.isFavorite ? 'event__favorite-btn--active' : '';

  return (
    `<div class="event">
      <time class="event__date" datetime="${eventDate}">${eventDateBrief}</time>

      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
      </div>

      <h3 class="event__title">${type} ${destination.name}</h3>

      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${eventStartTimeMachine}">${eventStartTime}</time> &mdash;
          <time class="event__end-time" datetime="${eventEndTimeMachine}">${eventEndTime}</time>
        </p>
        <p class="event__duration">${eventDuration}</p>
      </div>

      <p class="event__price">&euro;&nbsp; <span class="event__price-value">${event.basePrice}</span></p>

      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        ${offersTemplate}
      </ul>

      <button class="event__favorite-btn ${FavoriteClassName}" type="button">
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z" />
        </svg>
      </button>

      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>`);
};

export default class EventView extends AbstractView {
  #event = null;
  #destination = null;
  #offers = null;
  #onEdit = null;

  constructor({event, destination, offers, onEdit}) {
    super();
    this.#event = event;
    this.#destination = destination;
    this.#offers = offers;
    this.#onEdit = onEdit;

    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#onEditButtonClick);
  }

  get template() {
    return createEventTemplate(this.#event, this.#destination, this.#offers);
  }

  #onEditButtonClick = (evt) => {
    evt.preventDefault();
    this.#onEdit();
  };
}
