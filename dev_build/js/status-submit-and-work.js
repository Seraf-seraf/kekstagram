import { isEscapeKey } from './util.min.js';

const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const successTemplate = document.querySelector('#success').content.querySelector('.success');


const createStatusWindow = (template, title, buttonText) => {
  const statusWindow = template.cloneNode(true);

  if(title && buttonText) {
    statusWindow.querySelector('.title').textContent = title;
    statusWindow.querySelector('button').textContent = buttonText;
  }

  document.body.insertAdjacentElement('beforeend', statusWindow);

  document.querySelector('.status-work button').addEventListener('click', onAsseptStatus);
  document.addEventListener('click', clickOutsideModalWindow);
  document.addEventListener('keydown', onEscKeydown);
};

const getStatusError = () => createStatusWindow(errorTemplate);
const getStatusSuccess = () => createStatusWindow(successTemplate);
const getErrorWorkSite = () => createStatusWindow(errorTemplate, 'Ошибка загрузки сайта', 'Закрыть');

// Настройка закрытия модального окна
function closeStatusWindow() {
  document.querySelector('.status-work button').removeEventListener('click', onAsseptStatus);
  document.removeEventListener('keydown', onEscKeydown);
  document.removeEventListener('click', clickOutsideModalWindow);
  document.querySelector('.status-work').remove();
}

function onAsseptStatus(event) {
  if(event.target.closest('button')) {
    closeStatusWindow();
  }
}

function onEscKeydown(event) {
  if(isEscapeKey(event)) {
    closeStatusWindow();
  }
}

function clickOutsideModalWindow(event) {
  if(!event.target.closest('.status-work > div')) {
    closeStatusWindow();
  }
}

export { getStatusError, getStatusSuccess, getErrorWorkSite };
