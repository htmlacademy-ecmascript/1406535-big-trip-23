import TripHeaderView from '../view/trip-header-view.js';
import { render, RenderPosition } from '../framework/render.js';

export default class TripInfoPresenter {
  #container = null;
  #eventsModel = null;
  #tripHeaderComponent = new TripHeaderView();

  constructor({ container, model }) {
    this.#container = container;
    this.#eventsModel = model;
  }

  init() {
    render(this.#tripHeaderComponent, this.#container, RenderPosition.AFTERBEGIN);
  }
}
