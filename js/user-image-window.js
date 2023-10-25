import { onCloseButton, onEscKeydown } from './user-image-window-settings.min.js';
import './filter-slider.min.js';

const body = document.body;

const uploadForm = document.querySelector('.img-upload__form');
const uploadButton = document.querySelector('#upload-file');
const userImagePreviewContainer = uploadForm.querySelector('.img-upload__overlay');
const previewUserImage = userImagePreviewContainer.querySelector('.img-upload__preview img');
const previewFilterElements = userImagePreviewContainer.querySelectorAll('.effects__preview');
const closeButtonUserImg = userImagePreviewContainer.querySelector('.img-upload__cancel');
const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

// Не стал выносить в отдельный модуль увелечение и уменьшение фотографии
const scalePhotoBar = userImagePreviewContainer.querySelector('.img-upload__scale');
const currentValueScale = userImagePreviewContainer.querySelector('.scale__control--value');

uploadButton.addEventListener('change', () => {

  const userImage = uploadButton.files[0];
  const fileName = userImage.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if(matches) {
    previewUserImage.src = URL.createObjectURL(userImage);
  }
  previewFilterElements.forEach((element) => {
    element.style.backgroundImage = `url(${URL.createObjectURL(userImage)})`;
  });


  body.classList.add('modal-open');
  userImagePreviewContainer.classList.remove('hidden');

  document.addEventListener('keydown', onEscKeydown);
  closeButtonUserImg.addEventListener('click', onCloseButton);
  scalePhotoBar.addEventListener('click', getSizePhoto);
});

function getSizePhoto(evt) {
  const target = evt.target;
  const currentSize = parseInt(userImagePreviewContainer.querySelector('.scale__control--value').value, 10);

  const minSize = 25;
  const maxSize = 100;

  if(target.closest('.scale__control--smaller') && currentSize > minSize) {
    previewUserImage.style.transform = `scale(${(currentSize - 25) / 100})`;
    currentValueScale.value = `${currentSize - 25}%`;
  } else if(target.closest('.scale__control--bigger') && currentSize < maxSize) {
    previewUserImage.style.transform = `scale(${(currentSize + 25) / 100})`;
    currentValueScale.value = `${currentSize + 25}%`;
  }
}

export { userImagePreviewContainer, body, previewUserImage, uploadButton, uploadForm, scalePhotoBar, getSizePhoto };
