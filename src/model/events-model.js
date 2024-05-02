import {createMockOffers} from '../mock/offers.js';
import {createMockEvents} from '../mock/events.js';
import {createMockDestinations} from '../mock/destinations.js';

export default class EventsModel {
  offers = createMockOffers();
  events = createMockEvents();
  destinations = createMockDestinations();

  getOffers() {
    return this.offers;
  }

  getOffersByType(type, ids) {
    const allOffers = this.offers.find((item) => item.type === type).offers;

    if (ids) {
      for (const offer of allOffers) {
        offer.mark = ids.includes(offer.id) ? 'checked' : '';
      }
    }

    return allOffers;
  }

  getDestinations() {
    return this.destinations;
  }

  getDestinationById(id) {
    return this.destinations.find((item) => item.id === id);
  }

  getEvents() {
    return this.events;
  }

  getExtendedEvent(event) {
    event.destination = this.getDestinationById(event.destination);
    event.offers = this.getOffersByType(event.type, event.offers);

    return event;
  }
}
