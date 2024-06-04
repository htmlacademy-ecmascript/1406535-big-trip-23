import AbstractView from '../framework/view/abstract-view.js';
import { DEFAULT_FILTER } from '../utils/filter.js';
import { Loading } from '../consts.js';

const createMessageText = ({ loading, filter }) => {
  switch (loading) {
    case Loading.IN_PROGRESS:
      return 'Loading...';
    case Loading.ERROR:
      return 'Failed to load latest route information';
    case Loading.COMPLETE:
      return filter === DEFAULT_FILTER ? 'Click New Event to create your first point' : `There are no ${filter} events now`;
  }
};

export default class MessageView extends AbstractView {
  #data = null;

  constructor(data) {
    super();
    this.#data = data;
  }

  get template() {
    return `<p class="trip-events__msg">${createMessageText(this.#data)}</p>`;
  }
}
