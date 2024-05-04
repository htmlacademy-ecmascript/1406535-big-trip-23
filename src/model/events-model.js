import {createMockOffers} from '../mock/offers.js';
import {createMockEvents} from '../mock/events.js';
import {createMockDestinations} from '../mock/destinations.js';

const mockEvents = createMockEvents();
const mockDestinations = createMockDestinations();
const mockOffers = createMockOffers();

export default class EventsModel {
  constructor() {
    this.events = [];
    this.destinations = [];
    this.offers = [];
  }

  getEvents() {
    return this.events;
  }

  getDestinations() {
    return this.destinations;
  }

  getOffers() {
    return this.offers;
  }

  init() {
    this.events = mockEvents;
    this.destinations = mockDestinations;
    this.offers = mockOffers;
  }
}
