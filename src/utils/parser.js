const checkIsValidRSS = (doc) => (doc.querySelector('rss') !== null);

const getChannelInfo = (doc) => {
  const title = doc.querySelector('channel title').textContent;
  const description = doc.querySelector('channel description').textContent;
  return {title, description};
};

const getChannelItems = (doc) => {
  const res = [];
  doc.querySelectorAll('channel item').forEach((item) => {
    title = item.querySelector('title').textContent;
    description = item.querySelector('description').textContent;
    link = item.querySelector('link').textContent;
    pubDate = item.querySelector('pubDate').textContent;
    res.push({ title, description, pubDate, link });
  });
  return res;
};

const parseRSSResponse = (responsePromise) => {
  return responsePromise
    .then((response) => {
      // console.log(`Response: ${JSON.stringify(response)}`);
      const respJSON = response;
      if (respJSON.status !== 200 || respJSON.data.status.http_code !== 200) {
        throw new Error('errors.badResponseStatus');
      }
      const domparser = new DOMParser();
      const doc = domparser.parseFromString(respJSON.data.contents, 'text/xml');
      if (!checkIsValidRSS(doc)) {
        throw new Error('errors.notSupportedRSSFormat');
      }
      const res = getChannelInfo(doc);
      res.id = respJSON.data.status.url;
      res.items = getChannelItems(doc);
      return res;
    })
};

module.exports = {
  parseRSSResponse,
};
