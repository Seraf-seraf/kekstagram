import { userImagePreviewContainer, body, uploadForm, scalePhotoBar, getSizePhoto } from './user-image-window.min.js';
import { sliderFilter, onClickFilter, resetFilters } from './filter-slider.min.js';
import { isEscapeKey } from './util.min.js';
import { setData } from './backend.min.js';

const closeWindowUserImage = () => {
  document.removeEventListener('keydown', onEscKeydown);
  body.classList.remove('modal-open');
  userImagePreviewContainer.classList.add('hidden');

  uploadForm.reset();

  scalePhotoBar.removeEventListener('click', getSizePhoto);
  sliderFilter.removeEventListener('change', onClickFilter);
  resetFilters();
};

const onCloseButton = () => {
  closeWindowUserImage();
};

function onEscKeydown(event) {
  const target = event.target;
  if(target.matches('.text__description') || target.matches('.text__hashtags')) {
    event.stopPropagation();
  } else if(isEscapeKey(event)) {
    closeWindowUserImage();
  }
}

// ==================================================================
// ВАЛИДАЦИЯ
// ==================================================================
const form = document.querySelector('.img-upload__form');

const pristine = new Pristine(form, {
  classTo: 'img-upload__text',
  errorTextParent: 'img-upload__text',
  errorTextClass: 'form--error'
}, true);

const hashtags = form.querySelector('.text__hashtags');
const hashtagTemplate = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;

function hashtagValidation() {
  const hashtagsValue = hashtags.value.toLowerCase().trim().split(' ').filter(Boolean);

  if (hashtagsValue.length > 5) {
    return false;
  }

  return hashtagsValue.every((hashtag) => {
    if(hashtagTemplate.test(hashtag) && hashtag.length <= 20) {

      const filteredHashtags = hashtagsValue.filter((find, index, hashtagsArray) => find === hashtag && index !== hashtagsArray.indexOf(find));

      if(filteredHashtags.length > 0) {
        return false;
      }
      return true;
    }
    return false;
  });
}

pristine.addValidator(hashtags, hashtagValidation, 'Хэштеги заполнены неверно');

// Дополнительные настройки для окна с изображением пользователя

const addLoader = () => {
  const loaderContainer = document.querySelector('.img-upload__message');
  loaderContainer.classList.toggle('hidden');
};

const submitButton = document.querySelector('.img-upload__submit');

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Сохраняю...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

const setUserImageSubmit = (onSuccess) => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    if(pristine.validate()) {
      blockSubmitButton();
      setData(onSuccess, unblockSubmitButton, addLoader, formData);
    }
  });
};

export { onCloseButton, onEscKeydown, setUserImageSubmit, closeWindowUserImage };
