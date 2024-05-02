import {createElement} from '../render.js';

const createOfferTemplate = (offer) => {
  const {title, price, mark} = offer;
  const id = title.split(' ').pop();

  return `<div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="event-offer-${id}-1" type="checkbox" name="event-offer-${id}" ${mark}>
    <label class="event__offer-label" for="event-offer-${id}-1">
      <span class="event__offer-title">${title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${price}</span>
    </label>
  </div>`;
};

const createOffersTemplate = (offers) =>
  `<section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>

    <div class="event__available-offers">
      ${offers.map((offer) => createOfferTemplate(offer)).join('\n')}
    </div>
  </section>`;

export default class OffersView {
  constructor({offers}) {
    this.offers = offers;
  }

  getTemplate() {
    return createOffersTemplate(this.offers);
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
