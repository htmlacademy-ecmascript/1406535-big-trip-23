import AbstractView from '../framework/view/abstract-view.js';
import { SortType, DISABLED_SORTS, DEFAULT_SORT } from '../utils/sort.js';

const ID_PREFIX = 'sort-';

const createSortTemplate = (sort, currentSort) => {
  const checkedSign = sort === currentSort ? 'checked' : '';
  const disabledSign = DISABLED_SORTS.includes(sort) ? 'disabled' : '';

  return `<div class="trip-sort__item  trip-sort__item--${sort}">
      <input id="${ID_PREFIX}${sort}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${sort}" ${checkedSign} ${disabledSign}>
      <label class="trip-sort__btn" for="${ID_PREFIX}${sort}">${sort}</label>
    </div>`;
};

const createSortListTemplate = (currentSort) =>
  `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${Object.values(SortType).map((sort) => createSortTemplate(sort, currentSort)).join('\n')}
  </form>`;

export default class SortListView extends AbstractView {
  #currentSort = null;
  #onChange = null;
  #sortElements = null;

  constructor({ currentSort, onChange }) {
    super();
    this.#currentSort = currentSort;
    this.#onChange = onChange;

    this.element.addEventListener('change', this.#onSortChange);
    this.#sortElements = this.element.querySelectorAll('.trip-sort__input');
  }

  get template() {
    return createSortListTemplate(this.#currentSort);
  }

  resetSort() {
    this.#sortElements.forEach((input) => {
      input.checked = input.id === `${ID_PREFIX}${DEFAULT_SORT}`;
    });
  }

  #onSortChange = (evt) => {
    this.#onChange(evt.target.id.replace(ID_PREFIX, ''));
  };
}
