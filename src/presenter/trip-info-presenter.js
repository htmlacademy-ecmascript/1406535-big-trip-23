import TripHeaderView from '../view/trip-header-view.js';
import { render, replace, remove, RenderPosition } from '../framework/render.js';
import { filtrate, DEFAULT_FILTER } from '../utils/filter.js';
import { sorting, DEFAULT_SORT } from '../utils/sort.js';
import { UpdateType } from '../consts.js';

const SHOWN_POINTS = 3;
export default class TripInfoPresenter {
  #container = null;
  #eventsModel = null;
  #tripHeaderComponent = null;
  #firstEvent = null;
  #lastEvent = null;

  constructor({ container, model }) {
    this.#container = container;
    this.#eventsModel = model;

    this.#eventsModel.addObserver(this.#onModelEvent);
  }

  get events() {
    const events = this.#eventsModel.events;
    const filteredEvents = filtrate[DEFAULT_FILTER](events);
    return sorting[DEFAULT_SORT](filteredEvents);
  }

  init() {
    if (!this.events.length) {
      remove(this.#tripHeaderComponent, this.#container);
      return;
    }

    this.#setStartEnd();

    const prevTripHeaderComponent = this.#tripHeaderComponent;

    this.#tripHeaderComponent = new TripHeaderView({
      title: this.#getTripWay(),
      dateFrom: this.#firstEvent.dateFrom,
      dateTo: this.#lastEvent.dateTo,
      price: this.#getTripPrice(this.events),
    });

    if (!prevTripHeaderComponent) {
      render(this.#tripHeaderComponent, this.#container, RenderPosition.AFTERBEGIN);
      return;
    }

    replace(this.#tripHeaderComponent, prevTripHeaderComponent);
    remove(prevTripHeaderComponent);
  }

  #setStartEnd() {
    this.#firstEvent = this.events[0];
    this.#lastEvent = this.events[this.events.length - 1];
  }

  #getTripWay() {
    let wayPoints = [];

    if (this.events.length > SHOWN_POINTS) {
      wayPoints.push(this.#eventsModel.getDestinationNameById(this.#firstEvent.destination),
        '...', this.#eventsModel.getDestinationNameById(this.#lastEvent.destination));
    } else {
      wayPoints = Array.from(this.events, (event) => this.#eventsModel.getDestinationNameById(event.destination));
    }
    return wayPoints.join(' — ');
  }

  #getEventFullPrice(event) {
    return event.offers.reduce((sum, offerId) => sum + this.#eventsModel.getOfferPriceById(event.type, offerId), event.basePrice);
  }

  #getTripPrice(events) {
    return events.reduce((sum, event) => sum + this.#getEventFullPrice(event), 0);
  }

  #onModelEvent = (updateType) => {
    if (updateType === UpdateType.PATCH) {
      return;
    }

    this.init();
  };
}
