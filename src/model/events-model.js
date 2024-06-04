import { createMockOffers } from '../mock/offers.js';
import { createMockEvents } from '../mock/events.js';
import { createMockDestinations } from '../mock/destinations.js';
import Observable from '../framework/observable.js';
import { getObjectFromArrayByKey, getRandomInt } from '../utils/utils.js';

const mockEvents = createMockEvents();
const mockDestinations = createMockDestinations();
const mockOffers = createMockOffers();

export default class EventsModel extends Observable {
  #events = null;
  #destinations = null;
  #offers = null;

  get destinations() {
    return this.#destinations;
  }

  get offers() {
    return this.#offers;
  }

  get events() {
    return this.#events;
  }

  getDestinationNameById = (id) => getObjectFromArrayByKey(this.#destinations, 'id', id)?.name;

  getDestinationById = (id) => getObjectFromArrayByKey(this.#destinations, 'id', id);

  getDestinationByName = (name) => getObjectFromArrayByKey(this.#destinations, 'name', name);

  getOffersByType = (type) => getObjectFromArrayByKey(this.#offers, 'type', type)?.offers || [];

  getOfferPriceById = (type, id) => {
    const typeOffers = this.getOffersByType(type);
    return getObjectFromArrayByKey(typeOffers, 'id', id)?.price || null;
  };

  updateEvent(updateType, update) {
    const index = this.#events.findIndex((event) => event.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting task');
    }

    this.#events = [...this.#events.slice(0, index), update, ...this.#events.slice(index + 1)];
    this._notify(updateType, update);
  }

  addEvent(updateType, update) {
    const randomId = `dummy_id${getRandomInt(0, 1000)}`;
    this.#events = [{...update, id: randomId}, ...this.#events];
    this._notify(updateType, update);
  }

  deleteEvent(updateType, update) {
    const index = this.#events.findIndex((event) => event.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting task');
    }

    this.#events = [...this.#events.slice(0, index), ...this.#events.slice(index + 1)];
    this._notify(updateType);
  }

  init() {
    this.#events = mockEvents;
    this.#destinations = mockDestinations;
    this.#offers = mockOffers;
  }
}
