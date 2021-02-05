import './js/bootstrap.min';
import './css/bootstrap.min.css';
import {
  generateMainPage,
  subscribeOnViewEvents,
} from './mainPageView';
import initMainPageModel from './mainPageModel';
import {
  mainPageModelChangeCallback,
  setMainPageModel,
  mainPageViewEvents,
} from './mainPageController';

document.body.appendChild(generateMainPage());
setMainPageModel(initMainPageModel(mainPageModelChangeCallback));
subscribeOnViewEvents(mainPageViewEvents);
