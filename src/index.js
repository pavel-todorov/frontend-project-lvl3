import './libs/bootstrap/js/bootstrap.min';
import './libs/bootstrap/css/bootstrap.min.css';
import {
  generateMainPage,
  subscribeOnViewEvents,
} from './mainPage/mainPageView';
import initMainPageModel from './mainPage/mainPageModel';
import {
  mainPageModelChangeCallback,
  setMainPageModel,
  mainPageViewEvents,
} from './mainPage/mainPageController';
import { initTranslations } from './utils/translations/translations';

initTranslations().then(() => {
  document.body.appendChild(generateMainPage());
  setMainPageModel(initMainPageModel(mainPageModelChangeCallback));
  subscribeOnViewEvents(mainPageViewEvents);
});
