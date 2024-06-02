import AbstractView from '../framework/view/abstract-view.js';
import { sortTypes, DISABLED_SORTS, DEFAULT_SORT } from '../utils/sort.js';

const ID_PREFIX = 'sort-';

const createSortTemplate = (sort) => {
  const checkedSign = sort === DEFAULT_SORT ? 'checked' : '';
  const disabledSign = DISABLED_SORTS.includes(sort) ? 'disabled' : '';

  return `<div class="trip-sort__item  trip-sort__item--${sort}">
      <input id="${ID_PREFIX}${sort}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${sort}" ${checkedSign} ${disabledSign}>
      <label class="trip-sort__btn" for="${ID_PREFIX}${sort}">${sort}</label>
    </div>`;
};
export default class SortListView extends AbstractView {
  #sortElements = null;

  constructor({ callback }) {
    super();
    this.#sortElements = this.element.querySelectorAll('.trip-sort__input');
    this.element.addEventListener('change', (evt) => {
      callback(evt.target.id.replace(ID_PREFIX, ''));
    });
  }

  get template() {
    return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      ${sortTypes.map(createSortTemplate).join('')}</form>`;
  }

  reset() {
    this.#sortElements.forEach((input) => {
      input.checked = input.id === `${ID_PREFIX}${DEFAULT_SORT}`;
    });
  }
}
