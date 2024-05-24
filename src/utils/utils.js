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

const updateItem = (items, update) => items.map((item) => item.id === update.id ? update : item);

const getObjectFromArrayByKey = (arr, key, value) => arr.find((obj) => obj[key] === value);

export { getRandomInt, getRandomArrayElement, createRandomIdGenerator, updateItem, getObjectFromArrayByKey };
