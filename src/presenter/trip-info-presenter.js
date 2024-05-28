import TripHeaderView from '../view/trip-header-view.js';
import { render, replace, remove, RenderPosition } from '../framework/render.js';
import { filtrate, DEFAULT_FILTER } from '../utils/filter.js';
import { sorting, DEFAULT_SORT } from '../utils/sort.js';
import { UpdateType } from '../consts.js';

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
    const way = [];

    if (this.events.length > 3) {
      way.push(this.#eventsModel.getDestinationNameById(this.#firstEvent.destination), '...', this.#eventsModel.getDestinationNameById(this.#lastEvent.destination));
    } else {
      this.events.forEach((event) => way.push(this.#eventsModel.getDestinationNameById(event.destination)));
    }
    return way.join(' — ');
  }

  #getEventFullPrice(event) {
    let price = event.basePrice;

    if (event.offers.length) {
      event.offers.forEach((offerId) => {
        price += this.#eventsModel.getOfferPriceById(event.type, offerId);
      });
    }
    return price;
  }

  #getTripPrice(events) {
    let price = 0;
    events.forEach((event) => {
      price += this.#getEventFullPrice(event);
    });
    return price;
  }

  #onModelEvent = (updateType) => {
    if (updateType === UpdateType.PATCH) {
      return;
    }

    this.init();
  };
}
