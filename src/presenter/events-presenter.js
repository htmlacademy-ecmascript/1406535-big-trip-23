import {render} from '../render.js';
import EditEventView from '../view/edit-event-view.js';
import EventView from '../view/event-view.js';
import EventsListView from '../view/events-list-view.js';
import {EVENTS_NUMBER} from '../consts.js';

export default class EventsPresenter {
  eventsListComponent = new EventsListView();

  constructor({container, model}) {
    this.container = container;
    this.eventsModel = model;
  }

  renderEventsList() {
    render(this.eventsListComponent, this.container);
  }

  renderEditEvent(event) {
    render(new EditEventView({event}), this.eventsListComponent.getElement());
  }

  renderEvent(event) {
    render(new EventView({event}), this.eventsListComponent.getElement());
  }

  init() {
    const events = [...this.eventsModel.getEvents()];
    events.map((event) => this.eventsModel.getExtendedEvent(event));

    this.renderEventsList();
    this.renderEditEvent(events[0]);

    for (let i = 1; i < EVENTS_NUMBER; i++) {
      this.renderEvent(events[i]);
    }
  }
}
