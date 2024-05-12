import {getRandomInt, getRandomArrayElement, createRandomIdGenerator} from '../utils/utils.js';
import {EVENT_TYPES, PLACES} from '../consts.js';

const EVENTS_NUMBER = 10;
const MAX_PRICE = 10000;
const MAX_OFFERS_NUMBER = 7;
const MAX_ID_NUMBER = 100000;

const DESTINATIONS_IDS = [];
for (let i = 0; i < PLACES.length; i++) {
  DESTINATIONS_IDS.push(`d-${i + 1}`);
}

const getRandomId = createRandomIdGenerator(0, MAX_ID_NUMBER);

const getFormattedRandomInt = (a, b) => {
  const number = getRandomInt(a, b);
  return number < 10 ? `0${number}` : number;
};

const getRandomMonth = () => getFormattedRandomInt(1, 12);
const getRandomDays = () => getFormattedRandomInt(1, 31);
const getRandomHours = () => getFormattedRandomInt(0, 23);
const getRandomMinutes = () => getFormattedRandomInt(0, 59);
const getRandomSeconds = () => getFormattedRandomInt(0, 59);
const getRandomMSeconds = () => getFormattedRandomInt(0, 99);

const createEvent = () => {
  const type = getRandomArrayElement(EVENT_TYPES);
  const offersNumber = getRandomInt(0, MAX_OFFERS_NUMBER);

  const offers = offersNumber ? Array.from({length: offersNumber}, (_, index) => `${type[0]}-${index + 1}`) : [];

  let date1 = `2024-${getRandomMonth()}-${getRandomDays()}T${getRandomHours()}:${getRandomMinutes()}:${getRandomSeconds()}.${getRandomMSeconds()}5Z`;
  let date2 = `2024-${getRandomMonth()}-${getRandomDays()}T${getRandomHours()}:${getRandomMinutes()}:${getRandomSeconds()}.${getRandomMSeconds()}5Z`;
  if (date1 > date2) {
    [date1, date2] = [date2, date1];
  }

  return {
    id: getRandomId(),
    basePrice: getRandomInt(0, MAX_PRICE),
    dateFrom: date1,
    dateTo: date2,
    destination: getRandomArrayElement(DESTINATIONS_IDS),
    isFavorite: Boolean(getRandomInt(0, 1)),
    offers: offers,
    type: type
  };
};

const mockEvents = Array.from({length: EVENTS_NUMBER}, createEvent);

const createMockEvents = () => mockEvents;

export {createMockEvents};
