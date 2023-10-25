import { commentsList, showBigPicture, loadMoreComments, commentsLoader, resetShownCommentsCount } from './big-picture.min.js';
import { isEscapeKey } from './util.min.js';
import { newInformation } from './miniature.min.js';

const body = document.body;
const photoList = document.querySelector('.pictures');
const bigPictureWindow = document.querySelector('.big-picture');
const buttonCloseBigPicture = bigPictureWindow.querySelector('.big-picture__cancel');

const closeBigPicture = () => {
  bigPictureWindow.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscKeydown);
  commentsLoader.removeEventListener('click', loadMoreComments);
  resetShownCommentsCount();
  commentsList.textContent = '';
};

const onCloseButton = () => {
  closeBigPicture();
};

function onEscKeydown(event) {
  if (isEscapeKey(event)) {
    closeBigPicture();
  }
}

buttonCloseBigPicture.addEventListener('click', onCloseButton);

const onPhotoClick = (event, data, target) => {
  event.preventDefault();

  document.addEventListener('keydown', onEscKeydown);

  // Получение индекса фотоэлемента в photoListArray
  const photoListArray = Array.from(photoList.querySelectorAll('.picture'));
  const index = photoListArray.indexOf(target);

  showBigPicture(target, data, index);
};

// добавляю событие к контейнеру с фото

photoList.addEventListener('click', (event) => {
  const pictureElement = event.target.closest('.picture');
  const data = newInformation;

  if (pictureElement) {
    // Вызов функции для обработки клика по фотоэлементу
    onPhotoClick(event, data, pictureElement);
  }
});

export { bigPictureWindow };
