const axios = require('axios');

const download = (link) => {
  return axios
    // .get(`https://hexlet-allorigins.herokuapp.com/get?url=${encodeURIComponent(link)}&disabledCache=true&timestamp=${new Date().getTime()}`);
    .get(`https://hexlet-allorigins.herokuapp.com/get?url=${encodeURIComponent(link)}&disableCache=true`);
};

module.exports = {
  download,
};