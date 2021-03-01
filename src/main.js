// import i18next from 'i18next';
const { initTranslations } = require('./utils/translations/translations');
const {
  initMainPageController,
  mainPageModelChangeCallback,
  setMainPageModel,
  mainPageViewEvents,
} = require('./mainPage/mainPageController');
const {
  generateMainPage,
  subscribeOnViewEvents,
} = require('./mainPage/mainPageView');
const initMainPageModel = require('./mainPage/mainPageModel');

const init = async () => {
  initTranslations().then((i18nFunction) => {
    initMainPageController(i18nFunction);
    document.body.appendChild(generateMainPage(i18nFunction));
    setMainPageModel(initMainPageModel(mainPageModelChangeCallback));
    subscribeOnViewEvents(mainPageViewEvents);
  });
};

export default init;
