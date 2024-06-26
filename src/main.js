import EventsModel from './model/events-model.js';
import MainPresenter from './presenter/main-presenter.js';
import TripInfoPresenter from './presenter/trip-info-presenter.js';
import EventsApiService from './events-api-service.js';
import { URL, AUTHORIZATION } from './consts.js';

const tripMainElement = document.querySelector('.trip-main');
const tripEventsElement = document.querySelector('.trip-events');

const eventsModel = new EventsModel({ apiService: new EventsApiService(URL, AUTHORIZATION) });
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
