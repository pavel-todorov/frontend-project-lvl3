const sortByTitleAsc = (a, b) => {
  if (a.title < b.title) {
    return -1;
  }
  if (a.title > b.title) {
    return 1;
  }
  return 0;
};

const sortByTitleDesc = (a, b) => {
  if (a.title < b.title) {
    return 1;
  }
  if (a.title > b.title) {
    return -1;
  }
  return 0;
};

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
  input.id = 'rssLink';

  const formGroup = document.createElement('div');
  formGroup.id = 'rssInputGroup';
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
  formContaner.appendChild(form);

  const header = document.createElement('div');
  header.classList.add('container', 'mt-5', 'mb-4');
  header.appendChild(baseHeader);
  header.appendChild(tagLine);
  header.appendChild(formContaner);

  const feeds = document.createElement('div');
  feeds.id = 'feedsContainer';
  feeds.classList.add('container', 'mt-4', 'mb-5');

  const content = document.createElement('div');
  content.classList.add('container');
  content.appendChild(header);
  content.appendChild(feeds);

  return content;
};

const subscribeOnViewEvents = (events) => {
  document.querySelector('#rssLink').addEventListener('input', events.onRSSChange);
  document.querySelector('#addButton').addEventListener('click', events.onAddRSSClicked);
};

const setAddButtonEnabled = (enabled) => {
  document.querySelector('#addButton').disabled = !enabled;
};

const showValidationInfo = (options) => {
  const input = document.querySelector('#rssLink');
  if (!options.showBorder) {
    input.classList.remove('is-invalid');
  } else {
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

const updateFeeds = (feedsArray) => {
  const feedsContainer = document.querySelector('#feedsContainer');
  feedsContainer.innerHTML = '';

  const feeds = feedsArray.map((feed) => ({ title: feed.title, description: feed.description }));
  feeds.sort(sortByTitleAsc);
  const items = [];
  feedsArray.forEach((feed) => {
    items.push(...feed.items);
  });
  items.sort(sortByTitleDesc);

  if (feeds.length > 0) {
    const feedsHeader = document.createElement('h2');
    feedsHeader.textContent = 'Feeds';

    const feedsTableBody = document.createElement('tbody');

    const feedsTable = document.createElement('table');
    feedsTable.classList.add('table');
    feedsTable.appendChild(feedsTableBody);

    feedsContainer.appendChild(feedsHeader);
    feedsContainer.appendChild(feedsTable);

    const feedsTableItems = feeds.map((feed) => `<tr><td><h3>${feed.title}</h3><p>${feed.description}</p></td></tr>`).join('\n');
    feedsTableBody.innerHTML = feedsTableItems;
  }

  if (items.length > 0) {
    const itemsHeader = document.createElement('h2');
    itemsHeader.textContent = 'Items';

    const itemsTableBody = document.createElement('tbody');

    const itemsTable = document.createElement('table');
    itemsTable.classList.add('table');
    itemsTable.appendChild(itemsTableBody);

    feedsContainer.appendChild(itemsHeader);
    feedsContainer.appendChild(itemsTable);

    const itemsTableItems = items.map((item) => `<tr><td><h5>${item.title}</h5><p>${item.description}</p></td></tr>`).join('\n');
    itemsTableBody.innerHTML = itemsTableItems;
  }
};

const showRSSValue = (value) => {
  document.querySelector('#rssLink').value = value;
};

module.exports = {
  generateMainPage,
  subscribeOnViewEvents,
  setAddButtonEnabled,
  showValidationInfo,
  updateFeeds,
  showRSSValue,
};
