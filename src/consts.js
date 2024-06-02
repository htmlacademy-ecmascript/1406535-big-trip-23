const EVENT_TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];
const EVENT_DEFAULT_TYPE = 'flight';
const PLACES = ['Moscow', 'Geneva', 'Berlin', 'London', 'Abu-Dabi', 'New York', 'Paris'];
const EVENTS_NUMBER = 4;

const NEW_EVENT = {
  id: null,
  basePrice: 0,
  dateFrom: null,
  dateTo: null,
  destination: null,
  isFavorite: false,
  offers: [],
  type: 'flight',
};

const HOURS_IN_DAY = 24;
const MINUTES_IN_HOUR = 60;

const UserAction = {
  UPDATE_EVENT: 'UPDATE_EVENT',
  ADD_EVENT: 'ADD_EVENT',
  DELETE_EVENT: 'DELETE_EVENT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};

const Loading = {
  ERROR: 'error',
  IN_PROGRESS: 'progress',
};

export { EVENT_TYPES, PLACES, EVENTS_NUMBER, NEW_EVENT, HOURS_IN_DAY, MINUTES_IN_HOUR, EVENT_DEFAULT_TYPE, UserAction, UpdateType, Loading };
