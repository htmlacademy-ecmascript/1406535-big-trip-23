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

  getOffersByType(type, ids) {
    const allOffers = this.offers.find((item) => item.type === type).offers;
    const selectedOffers = [];

    if (ids) {
      for (const offer of allOffers) {
        if (ids.includes(offer.id)) {
          selectedOffers.push(offer);
        }
      }
    }

    return selectedOffers.length !== 0 ? selectedOffers : allOffers;
  }

  getEventForView(event) {
    const eventDestination = this.getDestinationById(event.destination);
    event.destination = eventDestination.name;

    const eventOffers = this.getOffersByType(event.type, event.offers);
    event.offers = eventOffers;

    return event;
  }

  getDestinations() {
    return this.destinations;
  }

  getDestinationById(id) {
    return this.destinations.find((item) => item.id === id);
  }
}
