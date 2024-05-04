const EVENT_TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];
const PLACES = ['Moscow', 'Geneva', 'Berlin', 'London', 'Abu-Dabi', 'New York', 'Paris'];
const EVENTS_NUMBER = 4;

const NEW_EVENT = {
  id: '',
  basePrice: 0,
  dateFrom: '2024-05-05T17:00:00.935Z',
  dateTo: '2024-05-05T17:00:00.935Z',
  destination: '',
  isFavorite: false,
  offers: [],
  type: 'flight',
};

const HOURS_IN_DAY = 24;
const MINUTES_IN_HOUR = 60;

export {EVENT_TYPES, PLACES, EVENTS_NUMBER, NEW_EVENT, HOURS_IN_DAY, MINUTES_IN_HOUR};
