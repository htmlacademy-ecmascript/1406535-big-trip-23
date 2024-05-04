import {createElement} from '../render.js';
import DestinationView from '../view/destination-view.js';
import OffersView from '../view/offers-view.js';

const createEventDetailsTemplate = (offers = [], offersIds = [], destination = '') => {
  const offersTemplate = offers ? new OffersView({offers, offersIds}).getTemplate() : '';
  const destinationTemplate = destination ? new DestinationView({destination}).getTemplate() : '';

  return `<section class="event__details">
    ${offersTemplate}
    ${destinationTemplate}
  </section>`;
};

export default class EventDetailsView {
  constructor({offers, offersIds, destination}) {
    this.offers = offers;
    this.offersIds = offersIds;
    this.destination = destination;
  }

  getTemplate() {
    return createEventDetailsTemplate(this.offers, this.offersIds, this.destination);
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
