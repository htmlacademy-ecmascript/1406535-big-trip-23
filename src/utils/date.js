import dayjs from 'dayjs';
import { HOURS_IN_DAY, MINUTES_IN_HOUR } from '../consts.js';

const DATE_FORMATS = {
  day: 'YYYY-MM-DD',
  brief: 'MMM D',
  briefReversed: 'D MMM',
  time: 'HH:mm',
  machine: 'YYYY-MM-DDTHH:mm',
  dayTime: 'DD/MM/YY HH:mm',
};

const extendTwoLetter = (value) => value.toString().padStart(2, '0');

const date = {
  format(value) {
    return dayjs(value);
  },

  formatDayTime(value) {
    return dayjs(value).format(DATE_FORMATS.dayTime);
  },

  formatDay(value) {
    return dayjs(value).format(DATE_FORMATS.day);
  },

  formatBriefDay(value) {
    return dayjs(value).format(DATE_FORMATS.brief);
  },

  formatBriefDayReversed(value) {
    return dayjs(value).format(DATE_FORMATS.briefReversed);
  },

  formatOnlyTime(value) {
    return dayjs(value).format(DATE_FORMATS.time);
  },

  formatMachineTime(value) {
    return dayjs(value).format(DATE_FORMATS.machine);
  },

  calcAndFormatDuration(start, end) {
    start = dayjs(start);
    end = dayjs(end);

    const resultDays = end.diff(start, 'day');
    const resultHours = end.diff(start, 'hour');
    const restHours = extendTwoLetter(resultHours % HOURS_IN_DAY);
    const restMinutes = extendTwoLetter(end.diff(start, 'minute') % MINUTES_IN_HOUR);

    const resultParts = [];
    resultParts.push(
      (resultDays ? `${extendTwoLetter(resultDays)}D` : ''),
      (resultHours ? `${restHours}H` : ''),
      `${restMinutes}M`);
    return resultParts.join(' ').trim();
  },

  calcDuration(start, end) {
    start = dayjs(start);
    end = dayjs(end);
    return end.diff(start);
  },

  isCurrent(start, end) {
    return (dayjs().isAfter(start) || dayjs().isSame(start)) && (dayjs().isBefore(end) || dayjs().isSame(end));
  },

  isFuture(start) {
    return dayjs().isBefore(start);
  },

  isPast(end) {
    return dayjs().isAfter(end);
  },
};

export { date };
