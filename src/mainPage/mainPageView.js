/* eslint functional/no-let: ["off"] */
// const bootstrap = require('../../node_modules/bootstrap/dist/js/bootstrap');

const {
  sortByTitleDesc,
} = require('../utils/sorting');

let i18nFunction;

const generateForm = () => {
  const label = document.createElement('span');
  label.classList.add('input-group-text');
  label.textContent = i18nFunction('mainPage.form.inputLabel');

  const input = document.createElement('input');
  input.name = 'url';
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
  button.disabled = false;
  button.textContent = i18nFunction('mainPage.form.submitButtonText');

  const form = document.createElement('form');
  form.classList.add('container', 'mt-3', 'needs-validation');
  form.setAttribute('novalidate', '');
  form.appendChild(formGroup);
  form.appendChild(button);

  return document.createElement('div').appendChild(form);
};

const generateModals = () => {
  const modals = document.createElement('div');
  modals.innerHTML = `
      <div class="modal hide fade" tabindex="-1" id="simpleModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="modalTitle"></h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
            </button>
          </div>
          <div class="modal-body">
            <p id="modalBody"></p>
          </div>
          <div class="modal-footer">
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal">${i18nFunction('mainPage.modal.closeButton')}</button>
          </div>
        </div>
      </div>
    </div>
  `;
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
  const info = `${new Date()}: ${text}`;
  const base = document.querySelector('#base');
  base.dataset.comment = `${base.dataset.comment}\n${info}`;
};

const generateMainPage = (i18nFunc) => {
  i18nFunction = i18nFunc;
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
  const rssLink = document.querySelector('#rssLink');
  if (enabled) {
    rssLink.removeAttribute('readonly');
  } else {
    rssLink.setAttribute('readonly', '');
  }
};

const showValidationInfo = (options) => {
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
  return [];
};

const generateItemRow = (item) => {
  let weight = 'font-weight-nomal';
  if (item.isNew !== false) {
    weight = 'font-weight-bold';
  }
  return `
    <tr>
      <td>
        <div class="row">
          <a class="${weight} col-9 link-primary" target="_blank" rel="noopener noreferrer" href="${item.link}" role="link">${item.title}</a>
          <button
            type="button"
            class="btn btn-info col-3 preview"
            data-id="${item.link}">
              ${i18nFunction('mainPage.tables.items.previewButtonTitle')}
          </button>
        </div>
      </td>
    </tr>`;
};

const generateItemsTable = (items) => {
  if (items.length > 0) {
    const itemsHeader = document.createElement('h2');
    itemsHeader.textContent = i18nFunction('mainPage.tables.items.name');

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
  }
  return [];
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
  document.body.classList.add('modal-open');
  modalNode.classList.add('show');
  modalNode.setAttribute('style', 'display: block');
  modalNode.setAttribute('aria-modal', 'true');
  modalNode.removeAttribute('aria-hidden');
  modalNode.setAttribute('role', 'dialog');
  // const modal = new bootstrap.Modal(modalNode);
  // modal.show();
  const div = document.createElement('div');
  div.classList.add('modal-backdrop', 'fade', 'show');
  document.body.appendChild(div);
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
