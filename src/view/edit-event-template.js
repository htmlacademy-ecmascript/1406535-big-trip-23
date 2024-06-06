import { EVENT_TYPES } from '../consts.js';

const capitalizeFirstLetter = (string) => string[0].toUpperCase() + string.slice(1);

const createTypeTemplate = (type, selectedType) =>
  `<div class="event__type-item">
    <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio"
    name="event-type" value="${type}" ${type === selectedType ? 'checked' : ''}>
    <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${capitalizeFirstLetter(type)}</label>
  </div>`;

const createTypesListTemplate = (type, isDisabled) =>
  `<div class="event__type-wrapper">
    <label class="event__type  event__type-btn" for="event-type-toggle-1">
      <span class="visually-hidden">Choose event type</span>
      <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
    </label>
    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox" ${isDisabled ? 'disabled' : ''}>

    <div class="event__type-list">
      <fieldset class="event__type-group" ${isDisabled ? 'disabled' : ''}>
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

const createDestinationTemplate = (description, pictures) => {
  const picturesTemplate = pictures.length ? createPhotosTemplate(pictures) : '';

  return ` <section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    <p class="event__destination-description">${description}</p>
    ${picturesTemplate}
  </section>`;
};

const createOfferTemplate = (offer, index, offersIds, isDisabled) => {
  const id = `${offer.title.split(' ').pop()}-${index}`;
  const checkedSign = offersIds.includes(offer.id) ? 'checked' : '';
  const disabledSign = isDisabled ? 'disabled' : '';

  return `<div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="event-offer-${id}" type="checkbox"
    name="event-offer-${id}" data-id="${offer.id}" ${checkedSign} ${disabledSign}>
    <label class="event__offer-label" for="event-offer-${id}"><span class="event__offer-title">${offer.title}</span>
      &plus;&euro;&nbsp; <span class="event__offer-price">${offer.price}</span></label>
  </div>`;
};

const createOffersTemplate = (offers, offersIds = [], isDisabled) =>
  `<section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>

    <div class="event__available-offers">
      ${offers.map((item, index) => createOfferTemplate(item, index, offersIds, isDisabled)).join('')}
    </div>
  </section>`;

const createEventDetailsTemplate = (offers, offersIds, {description, pictures}, isDisabled) => {
  const offersTemplate = offers.length ? createOffersTemplate(offers, offersIds, isDisabled) : '';
  const destinationTemplate = pictures?.length || description ? createDestinationTemplate(description, pictures) : '';

  return `<section class="event__details">
    ${offersTemplate}
    ${destinationTemplate}
  </section>`;
};

export { createTypesListTemplate, createEventDetailsTemplate };
