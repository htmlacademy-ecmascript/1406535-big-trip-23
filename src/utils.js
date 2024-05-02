import dayjs from 'dayjs';

const DATE_FORMATS = {
  day: 'YYYY-MM-DD',
  brief: 'MMM D',
  time: 'hh:mm',
  machine: 'YYYY-MM-DDTHH:mm',
  dayTime: 'DD/MM/YY HH:mm',
};

const extendTwoLetter = (value) => value.toString().padStart(2, '0');

const date = {
  formatDayTime(value) {
    return dayjs(value).format(DATE_FORMATS.dayTime);
  },

  formatDay(value) {
    return dayjs(value).format(DATE_FORMATS.day);
  },

  formatBriefDay(value) {
    return dayjs(value).format(DATE_FORMATS.brief);
  },

  formatOnlyTime(value) {
    return dayjs(value).format(DATE_FORMATS.time);
  },

  formatMachineTime(value) {
    return dayjs(value).format(DATE_FORMATS.machine);
  },

  calculateDuration(start, end) {
    start = dayjs(start);
    end = dayjs(end);
    const resultDays = end.diff(start, 'day');
    const resultHours = end.diff(start, 'hour');
    const restHours = resultHours % 24;
    const restMinutes = extendTwoLetter(end.diff(start, 'minute') % 60);

    if (resultDays) {
      return `${extendTwoLetter(resultDays)}D ${extendTwoLetter(restHours)}H ${restMinutes}M`;
    }
    return resultHours ? `${extendTwoLetter(resultHours)}H ${restMinutes}M` : `${restMinutes}M`;
  }
};

const getRandomInt = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (arr) => arr[getRandomInt(0, arr.length - 1)];

const createRandomIdGenerator = (min, max) => {
  const previousValues = [];

  return () => {
    let currentValue = getRandomInt(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInt(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

export {getRandomInt, getRandomArrayElement, createRandomIdGenerator, date};
