import EventsModel from './model/events-model.js';
import MainPresenter from './presenter/main-presenter.js';
import TripInfoPresenter from './presenter/trip-info-presenter.js';

const tripMainElement = document.querySelector('.trip-main');
const tripEventsElement = document.querySelector('.trip-events');

const eventsModel = new EventsModel();
eventsModel.init();

const tripInfoPresenter = new TripInfoPresenter({
  container: tripMainElement,
  model: eventsModel,
});
tripInfoPresenter.init();

const mainPresenter = new MainPresenter({
  topContainer: tripMainElement,
  bottomContainer: tripEventsElement,
  model: eventsModel,
});
mainPresenter.init();
