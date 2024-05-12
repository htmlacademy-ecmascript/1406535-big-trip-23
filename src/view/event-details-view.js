import AbstractView from '../framework/view/abstract-view.js';
import DestinationView from '../view/destination-view.js';
import OffersView from '../view/offers-view.js';

const createEventDetailsTemplate = (offers, offersIds, destination) => {
  const offersTemplate = offers ? new OffersView({ offers, offersIds }).template : '';
  const destinationTemplate = destination ? new DestinationView({ destination }).template : '';

  return `<section class="event__details">
    ${offersTemplate}
    ${destinationTemplate}
  </section>`;
};

export default class EventDetailsView extends AbstractView {
  #offers = null;
  #offersIds = null;
  #destination = null;

  constructor({ offers, offersIds, destination }) {
    super();
    this.#offers = offers;
    this.#offersIds = offersIds;
    this.#destination = destination;
  }

  get template() {
    return createEventDetailsTemplate(this.#offers, this.#offersIds, this.#destination);
  }
}
