const yup = require('yup');
const {
  setAddButtonEnabled,
  setRSSFieldValid,
  showSimpleModal,
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
    case 'view.form.rssValid':
      setRSSFieldValid(value);
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
      model.view.form.rssValid = isLinkValid;
      if (isLinkValid) {
        parseRSSResponse(download(link))
          .then((feeds) => {
            console.log(`Feeds: '${JSON.stringify(feeds)}'`);
          })
          .catch((error) => {
            console.log(`Error while download: ${error}`);
            showSimpleModal(error);
          });
        // @todo
        model.view.form.rssField = '';
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