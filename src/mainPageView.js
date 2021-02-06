/* eslint no-alert: "off" */

const generateMainPage = () => {
  const baseHeader = document.createElement('h1');
  baseHeader.textContent = 'RSS Reader';

  const tagLine = document.createElement('summary');
  tagLine.textContent = 'Start reading RSS today! It is easy, it is nicely.';

  const label = document.createElement('span');
  label.classList.add('input-group-text');
  label.textContent = 'RSS link:';

  const input = document.createElement('input');
  input.type = 'text';
  input.classList.add('form-control');
  input.id = 'cssLink';

  const formGroup = document.createElement('div');
  formGroup.classList.add('input-group', 'mb-3');
  formGroup.appendChild(label);
  formGroup.appendChild(input);

  const button = document.createElement('button');
  button.type = 'submit';
  button.classList.add('btn', 'btn-primary');
  button.id = 'addButton';
  button.disabled = true;
  button.textContent = 'Add';

  const form = document.createElement('form');
  form.classList.add('container');
  form.appendChild(formGroup);
  form.appendChild(button);

  const formContaner = document.createElement('div');
  formContaner.classList.add('mt-5');
  formContaner.appendChild(form);

  const main = document.createElement('div');
  main.classList.add('container');
  // main.appendChild(generateSimpleModal());
  main.appendChild(baseHeader);
  main.appendChild(tagLine);
  main.appendChild(formContaner);

  return main;
};

const subscribeOnViewEvents = (events) => {
  document.querySelector('#cssLink').addEventListener('input', events.onRSSChange);
  document.querySelector('#addButton').addEventListener('click', events.onAddRSSClicked);
};

const setAddButtonEnabled = (enabled) => {
  document.querySelector('#addButton').disabled = !enabled;
};

const setRSSFieldValid = (valid) => {
  const input = document.querySelector('#cssLink');
  // console.log(`setRSSFieldValid: ${valid}`);
  if (valid) {
    input.classList.remove('is-invalid');
  } else {
    input.classList.add('is-invalid');
  }
};

const showSimpleModal = (message = '') => {
  alert(message);
};

module.exports = {
  generateMainPage,
  subscribeOnViewEvents,
  setAddButtonEnabled,
  setRSSFieldValid,
  showSimpleModal,
};
