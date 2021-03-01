const i18next = require('i18next');
const i18n = i18next.default || i18next;
const enTranslation = require('./en');
const ruTranslation = require('./ru');

var i18nextInstance;
const initTranslations = async () => {
  i18nextInstance = i18n.createInstance();
  return i18nextInstance.init({
    lng: 'ru',
    debug: true,
    resources: {
      en: {
        translation: enTranslation,
      },
      ru: {
        translation: ruTranslation,
      }
    }
  })
};

module.exports = {
  initTranslations,
  i18nextInstance,
};