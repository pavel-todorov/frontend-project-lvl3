const onChange = require('on-change');

const model = {
  view: {
    form: {
      rssField: '',
      rssValidation: {
        isValid: true,
        test: '',
        showBorder: false,
      },
      addButtonEnabled: false,
    },
    items: [],
  },
};

const initModel = (callback) => {
  return onChange({
    view: {
      form: {
        rssField: '',
        rssValidation: {
          isValid: true,
          test: '',
          showBorder: false,
        },
        addButtonEnabled: false,
      },
      items: [],
    },
  }, callback);
};

module.exports = initModel;
