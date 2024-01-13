
import { getErrorWorkSite, getStatusSuccess, getStatusError } from './status-submit-and-work.min.js';

let userInformation = [];

const getData = async(onSuccess) => {
  try {
    const response = await fetch('https://25.javascript.pages.academy/kekstagram/data');
    const users = await response.json();
    userInformation = users;
    users.forEach((user) => {
      onSuccess(user);
    });
  } catch(error) {
    getErrorWorkSite();
  }
};

const setData = async(onSuccess, statusButton, statusLoader, body) => {
  statusLoader();
  try {
    const response = await fetch('https://25.javascript.pages.academy/kekstagram',
      {
        method: 'POST',
        body
      }
    );
    await response.json();
    onSuccess();
    getStatusSuccess();
    statusButton();
  } catch (error) {
    getStatusError();
    statusButton();
  } finally {
    statusLoader();
  }
};

export { userInformation, getData, setData };
