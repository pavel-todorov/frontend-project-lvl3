import './js/bootstrap.min';
import './css/bootstrap.min.css';
import {
  generateMainPage,
  subscribeOnViewEvents,
  setAddButtonEnabled,
} from './mainPageView';
import initMainPageModel from './mainPageModel';

let mainPageModel;

const events = {
  onRSSChange: (event) => {
    console.log(`onRSSChange: ${event.target.value}`);
    mainPageModel.view.form.rssField = event.target.value;
    mainPageModel.view.form.addButtonEnabled = mainPageModel.view.form.rssField !== '';
  },
};

const mainPageModelChangeCallback = (path, value, previousValue, name) => {
  console.log(`mainPageModelChangeCallback: ${path}: ${previousValue} -> ${value} (${name})`);
  switch (path) {
    case 'view.form.addButtonEnabled':
      setAddButtonEnabled(value);
      break;
    default:
      break;
  }
};

document.body.appendChild(generateMainPage());
mainPageModel = initMainPageModel(mainPageModelChangeCallback);
subscribeOnViewEvents(events);
