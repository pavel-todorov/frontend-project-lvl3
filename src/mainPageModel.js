const onChange = require('on-change');

const model = {
  view: {
    form: {
      rssField: '',
      addButtonEnabled: false,
    },
    items: [],
  },
};

const initModel = (callback) => (onChange(model, callback));

module.exports = initModel;
