import { date } from './date.js';

const SortType = {
  DATE: 'day',
  EVENT: 'event',
  DURATION: 'time',
  PRICE: 'price',
  OPTION: 'offers',
};

const SORT_TYPES = Object.values(SortType);

const DEFAULT_SORT = SortType.DATE;
const DISABLED_SORTS = [SortType.EVENT, SortType.OPTION];

const sorting = {
  [SortType.DATE]: (events) => [...events].sort((firstEvent, secondEvent) => date.format(firstEvent.dateFrom) - date.format(secondEvent.dateFrom)),
  [SortType.DURATION]: (events) => [...events].sort((firstEvent, secondEvent) => date.calcDuration(secondEvent.dateFrom, secondEvent.dateTo) - date.calcDuration(firstEvent.dateFrom, firstEvent.dateTo)),
  [SortType.PRICE]: (events) => [...events].sort((firstEvent, secondEvent) => secondEvent.basePrice - firstEvent.basePrice),
};

export { sorting, SortType, SORT_TYPES, DEFAULT_SORT, DISABLED_SORTS };
