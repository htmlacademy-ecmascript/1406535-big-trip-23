import {render} from '../render.js';
import EditEventView from '../view/edit-event-view.js';
import EventView from '../view/event-view.js';
import EventsListView from '../view/events-list-view.js';
export default class EventsPresenter {
  eventsListComponent = new EventsListView();

  constructor({container, model}) {
    this.container = container;
    this.eventsModel = model;
  }

  renderEventsList() {
    render(this.eventsListComponent, this.container);
  }

  renderEditEvent(event, destinations, offers) {
    render(new EditEventView({event, destinations, offers}), this.eventsListComponent.getElement());
  }

  renderEvent(event, destination, offers) {
    render(new EventView({event, destination, offers}), this.eventsListComponent.getElement());
  }

  init() {
    const events = [...this.eventsModel.getEvents()];
    const destinations = [...this.eventsModel.getDestinations()];
    const offers = [...this.eventsModel.getOffers()];

    const getOffersByType = (type) => offers.find((element) => element.type === type).offers;
    const getDestinationById = (id) => destinations.find((element) => element.id === id);

    this.renderEventsList();
    this.renderEditEvent(events[0], destinations, getOffersByType(events[0].type));

    events.forEach((event) => {
      const typeOffers = getOffersByType(event.type);
      const destination = getDestinationById(event.destination);
      this.renderEvent(event, destination, typeOffers);
    });
  }
}
