import {render} from './render.js';
import FiltersListView from './view/filters-list-view.js';
import SortListView from './view/sort-list-view.js';
import Presenter from './presenter/presenter.js';

const filtersContainerElement = document.querySelector('.trip-controls__filters');
const eventsContainerElement = document.querySelector('.trip-events');
const presenter = new Presenter({container: eventsContainerElement});

render(new FiltersListView, filtersContainerElement);
render(new SortListView, eventsContainerElement);

presenter.init();
