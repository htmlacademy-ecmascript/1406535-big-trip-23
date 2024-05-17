import { date } from './date.js';

const SortType = {
  DATE: 'day',
  EVENT: 'event',
  DURATION: 'time',
  PRICE: 'price',
  OPTION: 'offers',
};

const DEFAULT_SORT = SortType.DATE;
const DISABLED_SORTS = [SortType.EVENT, SortType.OPTION];

const sorting = {
  [SortType.DATE]: (events) => [...events].sort((a, b) => date.format(a.dateFrom) - date.format(b.dateFrom)),
  [SortType.DURATION]: (events) => [...events].sort((a, b) => date.calcDuration(b.dateFrom, b.dateTo) - date.calcDuration(a.dateFrom, a.dateTo)),
  [SortType.PRICE]: (events) => [...events].sort((a, b) => b.basePrice - a.basePrice),
};

export { sorting, SortType, DEFAULT_SORT, DISABLED_SORTS };
