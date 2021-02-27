const initMainPageModel = require('./mainPage/mainPageModel');
const {
  mainPageModelChangeCallback,
  setMainPageModel,
  mainPageViewEvents,
} = require('./mainPage/mainPageController');
const { initTranslations } = require('./utils/translations/translations');
const {
  generateMainPage,
  subscribeOnViewEvents,
} = require('./mainPage/mainPageView');

const init = async () => {
  initTranslations().then(() => {
    document.body.appendChild(generateMainPage());
    setMainPageModel(initMainPageModel(mainPageModelChangeCallback));
    subscribeOnViewEvents(mainPageViewEvents);
  });
};

export default init;
