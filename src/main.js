import {render} from './render.js';
import FiltersListView from './view/filters-list-view.js';
import SortListView from './view/sort-list-view.js';
import EventsPresenter from './presenter/events-presenter.js';
import EventsModel from './model/events-model.js';

const filtersContainerElement = document.querySelector('.trip-controls__filters');
const eventsContainerElement = document.querySelector('.trip-events');
const eventsModel = new EventsModel();
const eventsPresenter = new EventsPresenter({
  container: eventsContainerElement,
  model: eventsModel
});

render(new FiltersListView, filtersContainerElement);
render(new SortListView, eventsContainerElement);

eventsPresenter.init();
