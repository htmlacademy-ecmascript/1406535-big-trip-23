import {render} from '../render.js';
import AddEventView from '../view/add-event-view.js';
import EditEventView from '../view/edit-event-view.js';
import EventView from '../view/event-view.js';
import EventsListView from '../view/events-list-view.js';
import {getRandomArrayElement} from '../utils.js';
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
    const events = [...this.eventsModel.getEvents()];

    this.renderEventsList();
    this.renderEditEvent();

    for (let i = 0; i < EVENTS_NUMBER; i++) {
      this.renderEvent();
    }
  }
}
