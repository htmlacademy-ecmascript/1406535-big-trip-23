import AbstractView from '../framework/view/abstract-view.js';
import { FILTER_TYPES, DEFAULT_FILTER } from '../utils/filter.js';

const ID_PREFIX = 'filter-';

const createFilterTemplate = (filter) =>
  `<div class="trip-filters__filter">
    <input id="${ID_PREFIX}${filter}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter"
      value="${filter}" ${filter === DEFAULT_FILTER ? 'checked' : ''} disabled>
    <label class="trip-filters__filter-label" for="${ID_PREFIX}${filter}">${filter}</label>
  </div>`;

const createFiltersListTemplate = () =>
  `<div class="trip-main__trip-controls  trip-controls">
      <div class="trip-controls__filters">
        <h2 class="visually-hidden">Filter events</h2>
        <form class="trip-filters" action="#" method="get">
          ${FILTER_TYPES.map(createFilterTemplate).join('')}
          <button class="visually-hidden" type="submit">Accept filter</button>
        </form>
      </div>
    </div>
  </div>`;

export default class FiltersListView extends AbstractView {
  #filterElements = null;

  constructor({ callback }) {
    super();

    this.#filterElements = this.element.querySelectorAll('.trip-filters__filter-input');

    this.element.querySelector('form').addEventListener('change', (evt) => {
      callback(evt.target.id.replace(ID_PREFIX, ''));
    });
  }

  get template() {
    return createFiltersListTemplate();
  }

  update(filters) {
    this.#filterElements.forEach((input, index) => {
      input.disabled = !filters[index].isAvailable;
    });
  }

  reset() {
    this.#filterElements.forEach((input) => {
      input.checked = input.id === `${ID_PREFIX}${DEFAULT_FILTER}`;
    });
  }
}
