const axios = require('axios');

const download = (link) => {
  return axios
    .get(`https://hexlet-allorigins.herokuapp.com/get?url=${encodeURIComponent(link)}&timestamp=${new Date().getTime()}`);
};

module.exports = {
  download,
};