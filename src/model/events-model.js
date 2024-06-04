import Observable from '../framework/observable.js';
import { getObjectFromArrayByKey, getRandomInt } from '../utils/utils.js';
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
      this._notify(updateType, update);
    } catch(err) {
      throw new Error('Can\'t update event');
    }
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
