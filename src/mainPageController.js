const yup = require('yup');
const {
  setAddButtonEnabled,
  showValidationInfo,
} = require('./mainPageView');
const {
  download,
} = require('./utils/network');
const { parseRSSResponse } = require('./utils/parser');

let model;
const schema = yup.object().shape({
  link: yup.string().url(),
});

const mainPageModelChangeCallback = (path, value) => { // previousValue, name
  // console.log(`mainPageModelChangeCallback: ${path}: ${previousValue} -> ${value} (${name})`);
  switch (path) {
    case 'view.form.addButtonEnabled':
      setAddButtonEnabled(value);
      break;
    case 'view.form.rssValidation':
      showValidationInfo(value);
      break;
    default:
      break;
  }
};

const isRSSValid = (link) => schema.isValid({ link });

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
            console.log(`Feeds: '${JSON.stringify(feeds)}'`);
            model.view.form.rssValidation = { isValid: true, text: 'Downloaded OK.', showBorder: false };
          })
          .catch((error) => {
            console.log(`Error while download: ${error}`);
            model.view.form.rssValidation = { isValid: false, text: error, showBorder: true };
          });
        // @todo
        model.view.form.rssField = '';
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
