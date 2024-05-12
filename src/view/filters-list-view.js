import AbstractView from '../framework/view/abstract-view.js';

const createFilterTemplate = ({ filter, isAvailable }, currentFilter) => {
  const disabledSign = !isAvailable ? 'disabled' : '';
  const checkedSign = filter === currentFilter ? 'checked' : '';

  return `<div class="trip-filters__filter">
    <input id="filter-${filter}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter"
      value="${filter}" ${checkedSign} ${disabledSign}>
    <label class="trip-filters__filter-label" for="filter-${filter}">${filter}</label>
  </div>`;
};

const createFiltersListTemplate = (filters, currentFilter) =>
  `<div class="trip-main__trip-controls  trip-controls">
      <div class="trip-controls__filters">
        <h2 class="visually-hidden">Filter events</h2>
        <form class="trip-filters" action="#" method="get">
          ${filters.map((filter) => createFilterTemplate(filter, currentFilter)).join('\n')}
          <button class="visually-hidden" type="submit">Accept filter</button>
        </form>
      </div>
    </div>
  </div>`;
export default class FiltersListView extends AbstractView {
  #filters = null;
  #currentFilter = null;
  #onChange = null;

  constructor({filters, currentFilter, onChange}) {
    super();
    this.#filters = filters;
    this.#currentFilter = currentFilter;
    this.#onChange = onChange;

    this.element.querySelector('.trip-filters').addEventListener('change', (evt) => this.#onFilterChange(evt));
  }

  get template() {
    return createFiltersListTemplate(this.#filters, this.#currentFilter);
  }

  #onFilterChange (evt) {
    this.#onChange(evt.target.value);
  }
}
