const onChange = require('on-change');

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
        addButtonEnabled: true,
      },
      items: [],
    },
  }, callback);
};

module.exports = initModel;
