import { getUsers } from './data.min.js';

const userInformation = getUsers();

const pictureTemplate = document.querySelector('#picture').content;
const pictureContainer = document.querySelector('.pictures');
const fragmentPicures = document.createDocumentFragment();

const createPhoto = (information) => {
  for (const picture of information) {
    const pictureItem = pictureTemplate.cloneNode(true);
    const countLikes = pictureItem.querySelector('.picture__likes');
    const countComments = pictureItem.querySelector('.picture__comments');
    const srcPicture = pictureItem.querySelector('.picture__img');

    srcPicture.src = picture.url;
    countLikes.textContent = picture.likes;
    countComments.textContent = picture.comments.length;
    fragmentPicures.appendChild(pictureItem);
  }
  pictureContainer.appendChild(fragmentPicures);
};

createPhoto(userInformation);

export {createPhoto};
