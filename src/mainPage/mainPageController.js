const yup = require('yup');
const {
  setAddButtonEnabled,
  showValidationInfo,
  updateFeeds,
  showRSSValue,
} = require('./mainPageView');
const {
  download,
} = require('../utils/network');
const { parseRSSResponse } = require('../utils/parser');
const i18next = require('i18next');
const i18n = i18next.default || i18next;
const { updateArrayWithItems } = require('../utils/arrays');

let model;
let feedsUpdateTimerId;
const schema = yup.object().shape({
  link: yup.string().url(),
});

const updateFeedsHandler = () => {
  console.log(`Time to update feeds: ${new Date()}`);
  const requests = model.view.items.map((feeds) => parseRSSResponse(download(feeds.id)));
  Promise.all(requests)
    .then((results) => {
      // console.log(`Updated feeds: ${JSON.stringify(results)}`);
      const updatedItems = updateArrayWithItems(model.view.items, results);
      model.view.items = updatedItems;
    });
  feedsUpdateTimerId = window.setTimeout(updateFeedsHandler, 5 * 1000);
};

const setTimerForUpdateFeeds = () => {
  if (feedsUpdateTimerId !== undefined) {
    return;
  }
  feedsUpdateTimerId = window.setTimeout(updateFeedsHandler, 5 * 1000);
};

const mainPageModelChangeCallback = (path, value, previousValue, name) => { // previousValue, name
  switch (path) {
    case 'view.form.addButtonEnabled':
      setAddButtonEnabled(value);
      break;
    case 'view.form.rssValidation':
      showValidationInfo(value);
      break;
    case 'view.form.rssField':
      showRSSValue(value);
      break;
    case 'view.items':
      updateFeeds(value);
      if (value.length === 0) {
        window.clearTimeout(feedsUpdateTimerId);
      } else {
        setTimerForUpdateFeeds();
      }
      break;
    default:
      console.log(`Model changed but not processed: ${path}: ${previousValue} -> ${value} (${name})`);
      break;
  }
};

const isRSSValid = (link) => schema.isValid({ link });

const checkFeedsIsExist = (feeds) => {
  const found = model.view.items.find((value) => (value.title === feeds.title));
  return found !== undefined;
};

const mainPageViewEvents = {
  onRSSChange: (event) => {
    // console.log(`onRSSChange: ${event.target.value}`);
    model.view.form.rssField = event.target.value;
    model.view.form.addButtonEnabled = model.view.form.rssField !== '';
  },
  onAddRSSClicked: (event) => {
    // console.log('onAddRSSClicked');
    event.preventDefault();
    const link = model.view.form.rssField;
    isRSSValid(link).then((isLinkValid) => {
      if (isLinkValid) {
        parseRSSResponse(download(link))
          .then((feeds) => {
            // console.log(`Feeds: '${JSON.stringify(feeds)}'`);
            if (checkFeedsIsExist(feeds)) {
              model.view.form.rssValidation = { isValid: false, text: i18n.t('mainPage.form.validation.existedField'), showBorder: true };
            } else {
              model.view.form.rssValidation = { isValid: true, text: i18n.t('mainPage.form.validation.ok'), showBorder: true };
              const newItems = updateArrayWithItems(model.view.items, [ feeds ] );
              model.view.items = newItems;
              // model.view.items.push(feeds);
            }
          })
          .catch((error) => {
            // console.log(`Error while download: ${error}`);
            model.view.form.rssValidation = { isValid: false, text: i18n.t(error.message), showBorder: true };
          });
      } else {
        model.view.form.rssValidation = { isValid: false, text: i18n.t('mainPage.form.validation.invalidLink'), showBorder: true };
      }
    });
  },
};

const setMainPageModel = (modelData) => {
  model = modelData;
};

module.exports = {
  mainPageModelChangeCallback,
  setMainPageModel,
  mainPageViewEvents,
};
