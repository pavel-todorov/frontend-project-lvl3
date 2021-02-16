import './libs/bootstrap/js/bootstrap';
import './libs/bootstrap/css/bootstrap.css';
// import {
//   generateMainPage,
//   subscribeOnViewEvents,
// } from './mainPage/mainPageView';
// import initMainPageModel from './mainPage/mainPageModel';
// import {
//   mainPageModelChangeCallback,
//   setMainPageModel,
//   mainPageViewEvents,
// } from './mainPage/mainPageController';
// import { initTranslations } from './utils/translations/translations';
import 'webpack-icons-installer/bootstrap';
import init from './main'

init().then(() => {});

// initTranslations().then(() => {
//   document.body.appendChild(generateMainPage());
//   setMainPageModel(initMainPageModel(mainPageModelChangeCallback));
//   subscribeOnViewEvents(mainPageViewEvents);
// });
