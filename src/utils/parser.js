const checkIsValidRSS = (doc) => (doc.querySelector('rss') !== null);

const getChannelInfo = (doc) => {
  const title = doc.querySelector('channel title').textContent;
  const description = doc.querySelector('channel description').textContent;
  return { title, description };
};

const getChannelItems = (doc) => {
  const res = [];
  doc.querySelectorAll('channel item').forEach((item) => {
    const title = item.querySelector('title').textContent;
    const description = item.querySelector('description').textContent;
    const link = item.querySelector('link').textContent;
    const pubDate = item.querySelector('pubDate').textContent;
    res.push({
      title, description, pubDate, link,
    });
  });
  return res;
};

const parseRSSResponse = (responsePromise) => (responsePromise
  .then((response) => {
    const respJSON = response;
    if (respJSON.status !== 200 || respJSON.data.contents === null) {
      throw new Error('errors.badResponseStatus');
    }
    const domparser = new DOMParser();
    const doc = domparser.parseFromString(respJSON.data.contents, 'text/xml');
    if (!checkIsValidRSS(doc)) {
      throw new Error('errors.notSupportedRSSFormat');
    }
    const res = getChannelInfo(doc);
    const url = new URL(respJSON.config.url);
    const baseUrl = decodeURIComponent(url.searchParams.get('url'));
    res.id = baseUrl;
    res.items = getChannelItems(doc);
    return res;
  }));

module.exports = {
  parseRSSResponse,
};
