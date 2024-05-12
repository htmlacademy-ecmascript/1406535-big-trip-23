import EventsModel from './model/events-model.js';
import EventsPresenter from './presenter/events-presenter.js';
import TripInfoPresenter from './presenter/trip-info-presenter.js';

const tripInfoContainerElement = document.querySelector('.trip-main');
const eventsContainerElement = document.querySelector('.trip-events');

const eventsModel = new EventsModel();
eventsModel.init();

const eventsPresenter = new EventsPresenter({
  container: eventsContainerElement,
  model: eventsModel
});

const tripInfoPresenter = new TripInfoPresenter({
  container: tripInfoContainerElement,
  model: eventsModel
});

eventsPresenter.filter = 'everything';
eventsPresenter.init();
tripInfoPresenter.filter = 'everything';
tripInfoPresenter.init();
