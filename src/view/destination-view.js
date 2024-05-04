import {createElement} from '../render.js';

const createPhotosTemplate = (photos) =>
  `<div class="event__photos-container">
    <div class="event__photos-tape">
      ${photos.map((element) => `<img class="event__photo" src="${element.src}" alt="${element.description}">`).join('\n')}
    </div>
  </div>`;

const createDestinationTemplate = (destination) => {
  const {description, pictures} = destination;

  const photosTemplate = pictures.length !== 0 ? createPhotosTemplate(pictures) : '';

  return ` <section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    <p class="event__destination-description">${description}</p>

    ${photosTemplate}
  </section>`;
};

export default class DestinationView {
  constructor({destination}) {
    this.destination = destination;
  }

  getTemplate() {
    return createDestinationTemplate(this.destination);
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
