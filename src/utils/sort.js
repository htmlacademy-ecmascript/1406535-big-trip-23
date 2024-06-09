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
  [SortType.DATE]: (events) => [...events].sort((firstItem, secondItem) => date.format(firstItem.dateFrom) - date.format(secondItem.dateFrom)),
  [SortType.DURATION]: (events) => [...events].sort((firstItem, secondItem) => date.calcDuration(secondItem.dateFrom, secondItem.dateTo) - date.calcDuration(firstItem.dateFrom, firstItem.dateTo)),
  [SortType.PRICE]: (events) => [...events].sort((firstItem, secondItem) => secondItem.basePrice - firstItem.basePrice),
};

export { sorting, SortType, SORT_TYPES, DEFAULT_SORT, DISABLED_SORTS };
