import AbstractView from '../framework/view/abstract-view.js';
import { DEFAULT_FILTER } from '../utils/filter.js';

const createMessageText = (err, filter) => {
  if (err) {
    return 'Failed to load latest route information';
  }

  return filter === DEFAULT_FILTER ?
    'Click New Event to create your first point' :
    `There are no ${filter} events now`;
};

const createMessageTemplate = (err, filter) => `<p class="trip-events__msg">${createMessageText(err, filter)}</p>`;

export default class MessageView extends AbstractView {
  #err = null;
  #filter = null;

  constructor({ err, filter }) {
    super();
    this.#err = err;
    this.#filter = filter;
  }

  get template() {
    return createMessageTemplate(this.#err, this.#filter);
  }
}
