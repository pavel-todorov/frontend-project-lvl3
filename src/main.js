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

const init = async () => {
  initTranslations().then(() => {
    document.body.appendChild(generateMainPage());
    setMainPageModel(initMainPageModel(mainPageModelChangeCallback));
    subscribeOnViewEvents(mainPageViewEvents);
  });
};

export default init;
