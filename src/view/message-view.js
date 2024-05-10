import AbstractView from '../framework/view/abstract-view.js';
import {DEFAULT_FILTER} from '../utils/filter.js';


const createMessageTemplate = (err, filter) => {
  if (err) {
    return '<p class="trip-events__msg">Failed to load latest route information</p>';
  }
  return filter === DEFAULT_FILTER ?
    '<p class="trip-events__msg">Click New Event to create your first point</p>' :
    `<p class="trip-events__msg">There are no ${filter} events now</p>`;
};

export default class MessageView extends AbstractView {
  #filter = null;
  #err = null;

  constructor({errorLoading = false, filter}) {
    super();
    this.#filter = filter;
    this.#err = errorLoading;
  }

  get template() {
    return createMessageTemplate(this.#err, this.#filter);
  }
}
