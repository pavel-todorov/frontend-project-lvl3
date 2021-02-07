const yup = require('yup');
const {
  setAddButtonEnabled,
  showValidationInfo,
  updateFeeds,
  showRSSValue,
} = require('./mainPageView');
const {
  download,
} = require('./utils/network');
const { parseRSSResponse } = require('./utils/parser');

let model;
const schema = yup.object().shape({
  link: yup.string().url(),
});

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
              model.view.form.rssValidation = { isValid: false, text: 'Feeds already existed.', showBorder: true };
            } else {
              model.view.form.rssValidation = { isValid: true, text: 'Downloaded OK.', showBorder: false };
              model.view.items.push(feeds);
              model.view.form.rssField = '';
            }
          })
          .catch((error) => {
            console.log(`Error while download: ${error}`);
            model.view.form.rssValidation = { isValid: false, text: error, showBorder: true };
          });
        // @todo
      } else {
        model.view.form.rssValidation = { isValid: false, text: 'Invalid link', showBorder: true };
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
