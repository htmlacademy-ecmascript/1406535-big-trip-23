import EventsModel from './model/events-model.js';
import MainPresenter from './presenter/main-presenter.js';

const tripMainElement = document.querySelector('.trip-main');
const tripEventsElement = document.querySelector('.trip-events');

const eventsModel = new EventsModel();
eventsModel.init();

const mainPresenter = new MainPresenter({
  topContainer: tripMainElement,
  bottomContainer: tripEventsElement,
  model: eventsModel,
});

mainPresenter.init();
