import {createElement} from '../render.js';
import {EVENT_TYPES, EVENT_DEFAULT_TYPE} from '../consts.js';

const createTypeTemplate = (type, selectedType = EVENT_DEFAULT_TYPE) =>
  `<div class="event__type-item">
    <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type"
      value="${type}" ${type === selectedType ? 'checked' : ''}>
    <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${type[0].toUpperCase() + type.slice(1)}</label>
  </div>`;

const createTypesListTemplate = (type = EVENT_DEFAULT_TYPE) =>
  `<div class="event__type-wrapper">
    <label class="event__type  event__type-btn" for="event-type-toggle-1">
      <span class="visually-hidden">Choose event type</span>
      <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
    </label>
    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

    <div class="event__type-list">
      <fieldset class="event__type-group">
        <legend class="visually-hidden">Event type</legend>
        ${EVENT_TYPES.map((element) => createTypeTemplate(element, type)).join('\n')}
      </fieldset>
    </div>
  </div>`;
export default class TypesListView {
  constructor(type) {
    this.type = type;
  }

  getTemplate() {
    return createTypesListTemplate(this.type);
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
