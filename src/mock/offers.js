import {getRandomInt} from '../utils.js';
import {EVENT_TYPES} from '../consts.js';

const OFFERS_TITLE = [
  'Order Uber',
  'Add luggage',
  'Switch to comfort',
  'Rent a car',
  'Add breakfast',
  'Book tickets',
  'Lunch in city'
];

const MAX_PRICE = 200;

const createOfferByType = (type) => ({
  type: type,
  offers: Array.from({length: OFFERS_TITLE.length}, (_, index) => ({
    id: `${type[0]}-${index + 1}`,
    title: OFFERS_TITLE[index],
    price: getRandomInt(0, MAX_PRICE)
  })),
});

const mockOffers = EVENT_TYPES.map((type) => createOfferByType(type));

const createMockOffers = () => mockOffers;

export {createMockOffers};
