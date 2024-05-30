import {EVENT_TYPES, EVENT_DEFAULT_TYPE} from '../consts.js';

const createTypeTemplate = (type, selectedType) => {
  const checkedSign = type === selectedType ? 'checked' : '';

  return `<div class="event__type-item">
    <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}" ${checkedSign}>
    <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${type[0].toUpperCase() + type.slice(1)}</label>
  </div>`;
};

const createTypesListTemplate = (type = EVENT_DEFAULT_TYPE) =>
  `<div class="event__type-wrapper">
    <label class="event__type  event__type-btn" for="event-type-toggle-1">
      <span class="visually-hidden">Choose event type</span>
      <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
    </label>
    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

    <div class="event__type-list">
      <fieldset class="event__type-group">
        <legend class="visually-hidden">Event type</legend>
        ${EVENT_TYPES.map((item) => createTypeTemplate(item, type)).join('')}
      </fieldset>
    </div>
  </div>`;

const createPhotosTemplate = (photos) =>
  `<div class="event__photos-container">
    <div class="event__photos-tape">
      ${photos.map((photo) => `<img class="event__photo" src="${photo.src}" alt="${photo.description}">`).join('')}
    </div>
  </div>`;

const createDestinationTemplate = ({ description, pictures }) => {
  const picturesTemplate = pictures.length ? createPhotosTemplate(pictures) : '';

  return ` <section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    <p class="event__destination-description">${description}</p>
    ${picturesTemplate}
  </section>`;
};

const createOfferTemplate = (offer, offersIds) => {
  const id = offer.title.split(' ').pop();
  const checkedSign = offersIds.includes(offer.id) ? 'checked' : '';

  return `<div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="event-offer-${id}-1" type="checkbox" name="event-offer-${id}" ${checkedSign} data-id="${offer.id}">
    <label class="event__offer-label" for="event-offer-${id}-1"><span class="event__offer-title">${offer.title}</span>
      &plus;&euro;&nbsp; <span class="event__offer-price">${offer.price}</span></label>
  </div>`;
};

const createOffersTemplate = (offers, offersIds = []) =>
  `<section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>

    <div class="event__available-offers">
      ${offers.map((item) => createOfferTemplate(item, offersIds)).join('')}
    </div>
  </section>`;

const createEventDetailsTemplate = (offers, offersIds, destination) => {
  const offersTemplate = offers.length ? createOffersTemplate(offers, offersIds) : '';
  const destinationTemplate = Object.keys(destination).length ? createDestinationTemplate(destination) : '';

  return `<section class="event__details">
    ${offersTemplate}
    ${destinationTemplate}
  </section>`;
};

export { createTypesListTemplate, createEventDetailsTemplate };
