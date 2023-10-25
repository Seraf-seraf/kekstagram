import './big-picture-settings.min.js';
import { bigPictureWindow } from './big-picture-settings.min.js';

const body = document.body;
const bigPictureSource = bigPictureWindow.querySelector('.big-picture__img').children[0];

// Шаблон комментария к фото и контейнер с комментариями
const commentTemplate = document.querySelector('#social').content;
const commentsList = bigPictureWindow.querySelector('.social__comments');

const commentDescription = bigPictureWindow.querySelector('.social__caption');

// Верхняя плажка после информации об авторе - кол-во показанных комментариев из общего количества комментариев; кол-во лайков; кнопка загрузки
const commentsCurrentCount = document.querySelector('.comment-count__showed');
const commentsTotalCount = bigPictureWindow.querySelector('.comment-count__total');
const likesCountInBigPicture = document.querySelector('.likes-count');

const commentsLoader = bigPictureWindow.querySelector('.comments-loader');

// Далее функция для генерации большого окошка для каждой фотографии, которые отображены на главной странице

const showBigPicture = (photo, data, index) => {
  // фото-автор(аватарка, альт-описание, описание от автора, кол-во лайков)
  bigPictureSource.src = photo.querySelector('.picture__img').src;
  commentDescription.textContent = data[index].description;

  likesCountInBigPicture.textContent = photo.querySelector('.picture__likes').textContent;
  commentsLoader.classList.remove('hidden');
  body.classList.add('modal-open');

  getComments(data, index);
  loadMoreComments();
  bigPictureWindow.classList.remove('hidden');
  commentsLoader.addEventListener('click', loadMoreComments);
};

function getComments(data, index) {
  for (let i = 0; i < data[index].comments.length; i++) {
    const commentatorsInfoElement = data[index].comments[i];
    commentsTotalCount.textContent = data[index].comments.length;

    const newComment = commentTemplate.cloneNode(true);
    const commentContainer = newComment.querySelector('.social__comment');
    const autorCommentAvatar = newComment.querySelector('.social__picture');
    const commentText = newComment.querySelector('.social__text');

    autorCommentAvatar.src = commentatorsInfoElement.avatar;
    autorCommentAvatar.alt = `Комментарий пользователя ${commentatorsInfoElement.name}`;
    commentText.textContent = commentatorsInfoElement.message;
    commentContainer.classList.add('hidden');
    commentsList.appendChild(newComment);
  }
}

let shownCommentsCount = 0;
const commentsPerLoad = 5;

function loadMoreComments() {
  shownCommentsCount += commentsPerLoad;
  commentsCurrentCount.textContent = shownCommentsCount;

  if (shownCommentsCount >= commentsList.children.length) {
    commentsCurrentCount.textContent = commentsList.children.length;
    commentsLoader.classList.add('hidden');
    commentsLoader.removeEventListener('click', loadMoreComments);
  }

  for (let i = 0; i < commentsPerLoad; i++) {
    const comment = commentsList.children[i + (shownCommentsCount - commentsPerLoad)];

    if (!comment) {
      break;
    }

    comment.classList.remove('hidden');
  }
}

function resetShownCommentsCount() {
  shownCommentsCount = 0;
}

export { commentsList, showBigPicture, loadMoreComments, commentsLoader, resetShownCommentsCount };

