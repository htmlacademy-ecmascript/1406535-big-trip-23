import AbstractView from '../framework/view/abstract-view.js';

export default class NewEventButtonView extends AbstractView {
  constructor({ callback }) {
    super();
    this.element.addEventListener('click', (evt) => {
      evt.preventDefault();
      callback();
    });
  }

  get template() {
    return '<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>';
  }

  block() {
    this.element.disabled = true;
  }

  unblock() {
    this.element.disabled = false;
  }
}
