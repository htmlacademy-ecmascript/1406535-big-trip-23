import AbstractView from '../framework/view/abstract-view.js';

const createOfferTemplate = (offer, offersIds) => {
  const id = offer.title.split(' ').pop();
  const checkedSign = offersIds.includes(offer.id) ? 'checked' : '';

  return `<div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="event-offer-${id}-1" type="checkbox" name="event-offer-${id}" ${checkedSign}>
    <label class="event__offer-label" for="event-offer-${id}-1"><span class="event__offer-title">${offer.title}</span>
      &plus;&euro;&nbsp; <span class="event__offer-price">${offer.price}</span></label>
  </div>`;
};

const createOffersTemplate = (offers, offersIds = []) =>
  `<section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>

    <div class="event__available-offers">
      ${offers.map((element) => createOfferTemplate(element, offersIds)).join('\n')}
    </div>
  </section>`;

export default class OffersView extends AbstractView {
  #offers = null;
  #offersIds = null;

  constructor({offers, offersIds}) {
    super();
    this.#offers = offers;
    this.#offersIds = offersIds;
  }

  get template() {
    return createOffersTemplate(this.#offers, this.#offersIds);
  }
}
