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

const initModel = (callback) => (onChange(model, callback));

module.exports = initModel;
