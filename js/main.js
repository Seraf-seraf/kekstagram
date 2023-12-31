import './backend.min.js';
import './miniature.min.js';
import './big-picture.min.js';
import './user-image-window.min.js';
import './status-submit-and-work.min.js';
import { getMiniature, setMiniatures } from './miniature.min.js';
import { getData } from './backend.min.js';
import { closeWindowUserImage, setUserImageSubmit } from './user-image-window-settings.min.js';

getData((users) => {
  setMiniatures(() => getMiniature(users));
});

setUserImageSubmit(closeWindowUserImage);
