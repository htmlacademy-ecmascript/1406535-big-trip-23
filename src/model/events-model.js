import {createMockOffers} from '../mock/offers.js';
import {createMockEvents} from '../mock/events.js';
import {createMockDestinations} from '../mock/destinations.js';

const mockEvents = createMockEvents();
const mockDestinations = createMockDestinations();
const mockOffers = createMockOffers();

export default class EventsModel {
  #events = null;
  #destinations = null;
  #offers = null;

  get events() {
    return this.#events;
  }

  get destinations() {
    return this.#destinations;
  }

  get offers() {
    return this.#offers;
  }

  init() {
    this.#events = mockEvents;
    this.#destinations = mockDestinations;
    this.#offers = mockOffers;
  }
}
