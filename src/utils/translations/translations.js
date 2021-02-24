const i18next = require('i18next');
const i18n = i18next.default || i18next;
const enTranslation = require('./en');
const ruTranslation = require('./ru');

const initTranslations = () => i18n.init({
    lng: 'en',
    debug: true,
    resources: {
      en: {
        translation: enTranslation,
      },
      ru: {
        translation: ruTranslation,
      }
    }
  });

module.exports = {
  initTranslations,
  i18n,
};