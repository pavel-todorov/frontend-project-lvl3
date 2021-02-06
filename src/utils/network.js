const axios = require('axios');

const download = (link) => {
  return axios
    .get(`https://hexlet-allorigins.herokuapp.com/get?url=${encodeURIComponent(link)}`);
};

module.exports = {
  download,
};