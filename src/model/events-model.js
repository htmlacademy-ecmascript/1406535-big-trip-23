import Observable from '../framework/observable.js';
import { getObjectFromArrayByKey } from '../utils/utils.js';
import { UpdateType } from '../consts.js';
export default class EventsModel extends Observable {
  #events = [];
  #destinations = [];
  #offers = [];
  #apiService = null;

  constructor({ apiService }) {
    super();
    this.#apiService = apiService;
  }

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

  async updateEvent(updateType, update) {
    const index = this.#events.findIndex((event) => event.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting task');
    }

    try {
      const response = await this.#apiService.updateEvent(update);
      const updatedEvent = this.#apiService.adaptToClient(response);
      this.#events = [...this.#events.slice(0, index), updatedEvent, ...this.#events.slice(index + 1)];
      this._notify(updateType, updatedEvent);
    } catch(err) {
      throw new Error('Can\'t update event');
    }
  }

  async addEvent(updateType, update) {
    try {
      const response = await this.#apiService.addEvent(update);
      const newEvent = this.#apiService.adaptToClient(response);
      this.#events.push(newEvent);
      this._notify(updateType, newEvent);
    } catch(err) {
      throw new Error('Can\'t add event');
    }
  }

  async deleteEvent(updateType, update) {
    const index = this.#events.findIndex((event) => event.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting task');
    }
    try {
      await this.#apiService.deleteEvent(update);
      this.#events = [...this.#events.slice(0, index), ...this.#events.slice(index + 1)];
      this._notify(updateType);
    } catch(err) {
      throw new Error('Can\'t delete event');
    }
  }

  async init() {
    try {
      const events = await this.#apiService.events;
      this.#events = events.map(this.#apiService.adaptToClient);
      this.#destinations = await this.#apiService.destinations;
      this.#offers = await this.#apiService.offers;
    } catch(err) {
      this.#events = [];
      this.#destinations = [];
      this.#offers = [];
    }

    this._notify(UpdateType.INIT);
  }
}
