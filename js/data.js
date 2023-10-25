import { getRandomNumber, getRandomArrayElement, getIDFromRange } from './util.min.js';

const NAMES = [
  'Иван', 'Мария', 'Калыван', 'Серафим', 'Виктор', 'Юлия', 'Кристоф', 'Амогус', 'Абобус'
];

const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const DESCRIPTION = [
  'Далеко-далеко за словесными горами в стране.',
  'Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Рукописи речью послушавшись которое предложения.',
  'Далеко-далеко, за словесными.',
  'Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. За.'
];

const USERS_COUNT = 25;

const createMessage = () => Array.from({length: getRandomNumber(1, 2)}, () => getRandomArrayElement(COMMENTS)).join(' ');

const createComment = () => {
  const currentID = getIDFromRange(1, 25);

  return {
    id: currentID(),
    avatar: `img/avatar-${getRandomNumber(1, 6)}.svg`,
    name: getRandomArrayElement(NAMES),
    message: createMessage(),
  };
};

const createUser = () => {
  const currentID = getIDFromRange(1, 25);
  const listID = currentID();

  return {
    id: listID,
    name: getRandomArrayElement(NAMES),
    description: getRandomArrayElement(DESCRIPTION),
    likes: getRandomNumber(15, 200),
    comments: Array.from({length: getRandomNumber(0, 6)}, (_, commentIndex) => createComment(commentIndex + 1)),
    url: `photos/${listID}.jpg`,
    avatar: `img/avatar-${getRandomNumber(1, 6)}.svg`,
  };
};

const getUsers = () => Array.from({ length: USERS_COUNT }, createUser);

export { getUsers };
