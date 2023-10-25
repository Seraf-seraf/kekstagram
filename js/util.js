const getRandomNumber = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));

  return Math.floor(Math.random() * (upper - lower + 1) + lower);
};

const checkStringLength = (string, length) => string.length <= length;

const getRandomArrayElement = (elements) => elements[getRandomNumber(0, elements.length - 1)];

const getIDFromRange = (min, max) => {
  const previousValues = [];

  return function() {
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    let currentValue;
    do {
      currentValue = getRandomNumber(min, max);
    } while (previousValues.includes(currentValue));

    previousValues.push(currentValue);
    return currentValue;
  };
};

export { getRandomNumber, checkStringLength, getRandomArrayElement, getIDFromRange };
