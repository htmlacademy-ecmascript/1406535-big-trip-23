import {getRandomInt, getRandomArrayElement} from '../utils/utils.js';
import {PLACES} from '../consts.js';

const SENTENCES = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Sed sed nisi sed augue convallis suscipit in sed felis.',
  'Aliquam erat volutpat.',
  'Nunc fermentum tortor ac porta dapibus.',
  'In rutrum ac purus sit amet tempus.'
];

const SRC_BEGINS_WITH = 'https://loremflickr.com/248/152?random=';
const MAX_IMAGE_NUMBER = 100000;
const MAX_SENTENCES_NUMBER = 5;

const createDestinationById = (index) => ({
  id: `d-${index + 1}`,
  description: `${PLACES[index]} --- ${Array.from({length: getRandomInt(1, MAX_SENTENCES_NUMBER)}, () => getRandomArrayElement(SENTENCES)).join(' ')}`,
  name: PLACES[index],
  pictures: [
    {
      src: `${SRC_BEGINS_WITH}${getRandomInt(0, MAX_IMAGE_NUMBER)}`,
      description: getRandomArrayElement(SENTENCES)
    },
    {
      src: `${SRC_BEGINS_WITH}${getRandomInt(0, MAX_IMAGE_NUMBER)}`,
      description: getRandomArrayElement(SENTENCES)
    }
  ]
});

const mockDestinations = Array.from({length: PLACES.length}, (_, index) => createDestinationById(index));

const createMockDestinations = () => mockDestinations;

export {createMockDestinations};
