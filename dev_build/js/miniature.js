import { userInformation } from './backend.min.js';
import { debounce } from './util.min.js';
// //Шаблон миниатюрной картинки на главной их генерируется 25 штук

const clearMiniatures = () => {
  const pictureContainer = document.querySelector('.pictures');
  while(pictureContainer.querySelector('.picture')) {
    pictureContainer.removeChild(pictureContainer.querySelector('.picture'));
  }
};

const getMiniature = ({url, likes, comments}) => {
  const pictureContainer = document.querySelector('.pictures');
  const pictureTemplate = document.querySelector('#picture').content;
  const pictureItem = pictureTemplate.cloneNode(true);
  const srcPicture = pictureItem.querySelector('.picture__img');
  //количесвто лайков и коммментариев отображаются при наведении
  const countLikes = pictureItem.querySelector('.picture__likes');
  const countComments = pictureItem.querySelector('.picture__comments');

  srcPicture.src = url;
  countLikes.textContent = likes;
  countComments.textContent = comments.length;
  pictureContainer.appendChild(pictureItem);
  document.querySelector('.img-filters').classList.remove('img-filters--inactive');
};

// 3 кнопки сортировки миниатюр
const defaultMiniaturesButton = document.querySelector('#filter-default');
const randomMiniaturesButton = document.querySelector('#filter-random');
const discussedMiniatureButton = document.querySelector('#filter-discussed');

let newInformation = [];
const DEBOUNCE_DELAY = 500;

discussedMiniatureButton.addEventListener('click', debounce((event) => {
  document.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
  event.target.classList.add('img-filters__button--active');

  newInformation = userInformation
    .slice(0, 25)
    .sort((a, b) => b.comments.length - a.comments.length);
  clearMiniatures();
  newInformation.forEach(getMiniature);
}, DEBOUNCE_DELAY));

defaultMiniaturesButton.addEventListener('click', debounce((event) => {
  document.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
  event.target.classList.add('img-filters__button--active');

  newInformation = userInformation.slice(0, 25);
  clearMiniatures();
  newInformation.forEach(getMiniature);
}, DEBOUNCE_DELAY));

randomMiniaturesButton.addEventListener('click', debounce((event) => {
  document.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
  event.target.classList.add('img-filters__button--active');

  newInformation = userInformation.slice(0, 10).sort(() => 0.5 - Math.random());
  clearMiniatures();
  newInformation.forEach(getMiniature);
}, DEBOUNCE_DELAY));

const setMiniatures = (callback) => {
  newInformation = userInformation.slice(0, 25);
  callback(newInformation);
};

export { getMiniature, newInformation, setMiniatures };
