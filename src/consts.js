const EVENT_TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];
const EVENT_DEFAULT_TYPE = EVENT_TYPES[5];

const NEW_EVENT = {
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
const FIVE_MINUTES = 5 * 60000;

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
  COMPLETE: null,
};

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

const URL = 'https://23.objects.htmlacademy.pro/big-trip';
const AUTHORIZATION = 'Basic pfljk,fkjec`';

export { EVENT_TYPES, NEW_EVENT, HOURS_IN_DAY, MINUTES_IN_HOUR, FIVE_MINUTES, EVENT_DEFAULT_TYPE, UserAction, UpdateType, Loading, TimeLimit, URL, AUTHORIZATION };
