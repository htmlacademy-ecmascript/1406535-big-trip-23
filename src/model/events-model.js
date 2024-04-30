import {createMockOffers} from '../mock/offers.js';
import {createMockEvents} from '../mock/events.js';
import {createMockDestinations} from '../mock/destinations.js';

export default class EventsModel {
  offers = createMockOffers();
  events = createMockEvents();
  destinations = createMockDestinations();

  getEvents() {
    return this.events;
  }

  getOffers() {
    return this.offers;
  }

  getDestinations() {
    return this.destinations;
  }
}
