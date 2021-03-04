const bootstrap = require('../libs/bootstrap/js/bootstrap');
// const i18next = require('i18next');
// const i18n = i18next.default || i18next;
// const { i18nextInstance } = require('../utils/translations/translations');
// const i18n = i18nextInstance.default || i18nextInstance;

const {
  sortByTitleDesc,
} = require('../utils/sorting');

const generateForm = () => {
  const label = document.createElement('span');
  label.classList.add('input-group-text');
  label.textContent = i18nFunction('mainPage.form.inputLabel');

  const input = document.createElement('input');
  input.name = "url";
  input.setAttribute('required', '');
  input.setAttribute('aria-label', 'url');
  input.type = 'text';
  input.classList.add('form-control');
  input.id = 'rssLink';

  const formGroup = document.createElement('div');
  formGroup.id = 'rssInputGroup';
  formGroup.classList.add('input-group', 'mb-3');
  formGroup.appendChild(label);
  formGroup.appendChild(input);

  const button = document.createElement('button');
  button.name = 'add';
  button.setAttribute('aria-label', 'add');
  button.type = 'submit';
  button.classList.add('btn', 'btn-primary');
  button.id = 'addButton';
  button.disabled = true;
  button.textContent = i18nFunction('mainPage.form.submitButtonText');

  const form = document.createElement('form');
  form.classList.add('container', 'mt-3', 'needs-validation');
  form.setAttribute('novalidate', '');
  form.appendChild(formGroup);
  form.appendChild(button);

  return document.createElement('div').appendChild(form);
};

var i18nFunction;
const generateModals = () => {
  const modals = document.createElement('div');
  modals.innerHTML = `
      <div class="modal hide fade" tabindex="-1" id="simpleModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="modalTitle"></h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div class="modal-body">
            <p id="modalBody"></p>
          </div>
          <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">${i18nFunction('mainPage.modal.closeButton')}</button>
          </div>
        </div>
      </div>
    </div>
  `;
  //  <button type="button" class="btn btn-primary">${i18nFunction('mainPage.modal.fullArticleButton')}</button>
  return modals;
};

const generateHeader = () => {
  const baseHeader = document.createElement('h1');
  baseHeader.textContent = i18nFunction('mainPage.title');

  const tagLine = document.createElement('summary');
  tagLine.textContent = i18nFunction('mainPage.summary');

  const formContaner = generateForm();

  const header = document.createElement('div');
  header.classList.add('container', 'mt-5', 'mb-4');
  header.appendChild(baseHeader);
  header.appendChild(tagLine);
  header.appendChild(formContaner);
  return header;
};

const generateFeedsContainer = () => {
  const feeds = document.createElement('div');
  feeds.id = 'feedsContainer';
  feeds.classList.add('container', 'mt-4', 'mb-5');
  return feeds;
};

const generateComments = (text) => {
  const base = document.querySelector('#base');
  base.dataset.comment = text;
};

const generateMainPage = (i18nFunc) => {
  i18nFunction = i18nFunc;
  console.log(`generateMainPage: i18nFunction = ${typeof i18nFunction}`);
  const content = document.createElement('div');
  content.id = 'base';
  content.classList.add('container');
  content.appendChild(generateModals());
  content.appendChild(generateHeader());
  content.appendChild(generateFeedsContainer());

  return content;
};

let viewEventsSubscribtions;
const subscribeOnViewEvents = (events) => {
  const rssLink = document.querySelector('#rssLink');
  const addButton = document.querySelector('#addButton');
  if (viewEventsSubscribtions !== undefined) {
    rssLink.removeEventListener('input', events.onRSSChange);
    addButton.removeEventListener('click', events.onAddRSSClicked);
  }
  viewEventsSubscribtions = events;
  rssLink.addEventListener('input', events.onRSSChange);
  addButton.addEventListener('click', events.onAddRSSClicked);
};

const setAddButtonEnabled = (enabled) => {
  document.querySelector('#addButton').disabled = !enabled;
};

const showValidationInfo = (options) => {
  console.log(`showValidationInfo: ${JSON.stringify(options)}`);
  const input = document.querySelector('#rssLink');
  input.classList.remove('is-invalid', 'is-valid');
  if (options.showBorder && options.isValid) {
    input.classList.add('is-valid');
  } 
  if (options.showBorder && !options.isValid) {
    input.classList.add('is-invalid');
  }

  const group = document.querySelector('#rssInputGroup');

  const lastItemClasses = group.lastChild.classList;
  if (!lastItemClasses.contains('valid-feedback') && !lastItemClasses.contains('invalid-feedback')) {
    const validationInfo = document.createElement('div');
    group.appendChild(validationInfo);
  }
  group.lastChild.textContent = options.text;
  group.lastChild.classList.remove('invalid-feedback', 'valid-feedback');
  if (options.isValid) {
    group.lastChild.classList.add('valid-feedback');
  } else {
    group.lastChild.classList.add('invalid-feedback');
  }
};

const generateFeedsTable = (feeds) => {
  if (feeds.length > 0) {
    const feedsHeader = document.createElement('h2');
    feedsHeader.textContent = i18nFunction('mainPage.tables.feeds.name');

    const feedsTableBody = document.createElement('tbody');

    const feedsTable = document.createElement('table');
    feedsTable.classList.add('table');
    feedsTable.appendChild(feedsTableBody);

    const feedsTableItems = feeds.map((feed) => `<tr><td><h3>${feed.title}</h3><p>${feed.description}</p></td></tr>`).join('\n');
    feedsTableBody.innerHTML = feedsTableItems;
    return [feedsHeader, feedsTable];
  }
  else {
    return [];
  }
};

const generateItemRow = (item) => {
  let weight = 'font-weight-nomal';
  if (item.isNew) {
    weight = 'font-weight-bold';
  }
  return `
    <tr>
      <td>
        <div class="row">
          <h5 class="${weight} col-10">${item.title}</h5>
          <button
            type="button"
            class="btn btn-info col-2 preview"
            data-id="${item.link}">
              ${i18nFunction('mainPage.tables.items.previewButtonTitle')}
          </button>
        </div>
      </td>
    </tr>`
};

const generateItemsTable = (items) => {
  if (items.length > 0) {
    const itemsHeader = document.createElement('h2');
    itemsHeader.textContent = i18nFunction('mainPage.tables.items.name');;

    const itemsTableBody = document.createElement('tbody');

    const itemsTable = document.createElement('table');
    itemsTable.classList.add('table');
    itemsTable.appendChild(itemsTableBody);
    itemsTable.addEventListener('click', (event) => { 
      if (event.target.classList.contains('preview') && event.target.dataset.id !== undefined) {
        viewEventsSubscribtions.onPreviewClicked(event);
      }
    });

    const itemsTableItems = items.map((item) => generateItemRow(item)).join('\n');
    itemsTableBody.innerHTML = itemsTableItems;
    return [itemsHeader, itemsTable];
  } else {
    return [];
  }
};

const updateFeeds = (feedsArray) => {
  const feedsContainer = document.querySelector('#feedsContainer');
  feedsContainer.innerHTML = '';

  const feeds = feedsArray.map((feed) => ({ title: feed.title, description: feed.description }));
  // feeds.sort(sortByTitleAsc);
  const items = [];
  feedsArray.forEach((feed) => {
    items.push(...feed.items);
  });
  items.sort(sortByTitleDesc);

  const [feedsHeader, feedsTable] = generateFeedsTable(feeds);
  if (feedsHeader !== undefined) {
    feedsContainer.appendChild(feedsHeader);
    feedsContainer.appendChild(feedsTable);
  }

  const [itemsHeader, itemsTable] = generateItemsTable(items);
  if (itemsHeader !== undefined) {
    feedsContainer.appendChild(itemsHeader);
    feedsContainer.appendChild(itemsTable);
  }
};

const showRSSValue = (value) => {
  document.querySelector('#rssLink').value = value;
};

const showModal = (title, body) => {
  document.getElementById('modalTitle').textContent = title;
  document.getElementById('modalBody').textContent = body;
  const modalNode = document.getElementById('simpleModal');
  var modal = new bootstrap.Modal(modalNode);
  modal.show();
};

module.exports = {
  generateMainPage,
  subscribeOnViewEvents,
  setAddButtonEnabled,
  showValidationInfo,
  updateFeeds,
  showRSSValue,
  showModal,
  generateComments,
};
