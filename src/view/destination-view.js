import {createElement} from '../render.js';

const createPhotosTemplate = (photos) =>
  `<div class="event__photos-container">
    <div class="event__photos-tape">
      ${photos.map((photo) => `<img class="event__photo" src="${photo.src}" alt="${photo.description}">`).join('\n')}
    </div>
  </div>`;

const createDestinationTemplate = (destination) => {
  const {description, pictures} = destination;

  let picturesBlock = '';
  if (pictures.length !== 0) {
    picturesBlock = createPhotosTemplate(pictures);
  }

  return ` <section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    <p class="event__destination-description">${description}</p>
    ${picturesBlock}
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
