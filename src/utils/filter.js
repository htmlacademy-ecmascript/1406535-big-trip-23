import {date} from './date.js';

const FilterType = {
  ALL: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
};

const DEFAULT_FILTER = FilterType.ALL;

const filtrate = {
  [FilterType.ALL]: (events) => events,
  [FilterType.FUTURE]: (events) => events.filter((event) => date.isFuture(event.dateFrom)),
  [FilterType.PRESENT]: (events) => events.filter((event) => date.isCurrent(event.dateFrom, event.dateTo)),
  [FilterType.PAST]: (events) => events.filter((event) => date.isPast(event.dateTo)),
};

const getFilters = (events) =>
  Object.entries(filtrate).map(
    ([type, filtered]) => ({ filter: type, isAvailable: filtered(events).length !== 0})
  );

export {filtrate, FilterType, DEFAULT_FILTER, getFilters};
