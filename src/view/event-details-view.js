import {createElement} from '../render.js';
import DestinationView from '../view/destination-view.js';
import OffersView from '../view/offers-view.js';

const createEventDetailsTemplate = (offers, destination) => {
  let offersBlock = '';
  let destinationBlock = '';

  if (offers) {
    offersBlock = new OffersView({offers}).getTemplate();
  }

  if (destination) {
    destinationBlock = new DestinationView({destination}).getTemplate();
  }

  return `<section class="event__details">
    ${offersBlock}
    ${destinationBlock}
  </section>`;
};

export default class EventDetailsView {
  constructor({offers, destination}) {
    this.offers = offers;
    this.destination = destination;
  }

  getTemplate() {
    return createEventDetailsTemplate(this.offers, this.destination);
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
