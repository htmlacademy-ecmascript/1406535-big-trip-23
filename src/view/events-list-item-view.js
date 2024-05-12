import AbstractView from '../framework/view/abstract-view.js';

export default class EventsListItemView extends AbstractView {
  get template() {
    return '<li class="trip-events__item"></li>';
  }
}
