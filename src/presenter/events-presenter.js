import {render} from '../render.js';

import AddEventView from '../view/add-event-view.js';
import EditEventView from '../view/edit-event-view.js';
import EventView from '../view/event-view.js';
import EventsListView from '../view/events-list-view.js';

export default class EventsPresenter {
  eventsListComponent = new EventsListView();

  constructor({container}) {
    this.container = container;
  }

  renderEventsList() {
    render(this.eventsListComponent, this.container);
  }

  renderAddEvent() {
    render(new AddEventView, this.eventsListComponent.getElement());
  }

  renderEditEvent() {
    render(new EditEventView, this.eventsListComponent.getElement());
  }

  renderEvent() {
    render(new EventView, this.eventsListComponent.getElement());
  }

  init() {
    this.renderEventsList();
    this.renderEditEvent();

    for (let i = 0; i < 3; i++) {
      this.renderEvent();
    }
  }
}
