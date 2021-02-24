const checkIsValidRSS = (doc) => (doc.querySelector('rss') !== null);

const getChannelInfo = (doc) => {
  const title = doc.querySelector('channel title').textContent;
  const description = doc.querySelector('channel description').textContent;
  return {title, description};
};

const getChannelItems = (doc) => {
  const res = [];
  doc.querySelectorAll('channel item').forEach((item) => {
    const title = item.querySelector('title').textContent;
    const description = item.querySelector('description').textContent;
    const link = item.querySelector('link').textContent;
    const pubDate = item.querySelector('pubDate').textContent;
    res.push({ title, description, pubDate, link });
  });
  return res;
};

const parseRSSResponse = (responsePromise) => {
  return responsePromise
    .then((response) => {
      // console.log(`Response: ${JSON.stringify(response)}`);
      const respJSON = response;
      if (respJSON.status !== 200/* || respJSON.data.status.http_code !== 200*/) {
        throw new Error('errors.badResponseStatus');
      }
      const domparser = new DOMParser();
      const doc = domparser.parseFromString(respJSON.data.contents, 'text/xml');
      if (!checkIsValidRSS(doc)) {
        throw new Error('errors.notSupportedRSSFormat');
      }
      const res = getChannelInfo(doc);
      // const res = { title: 'title', description: 'description' };
      const url = new URL(respJSON.config.url);
      const baseUrl = decodeURIComponent(url.searchParams.get('url'));
      // console.log(`Base url: ${baseUrl}`);
      res.id = baseUrl;
      res.items = getChannelItems(doc);
      // res.items = [{
      //   title: 'itm_title',
      //   description: 'itm_description',
      //   link: 'itm_link',
      //   pubDate: 'Wed, 24 Feb 2021 08:04:00 GMT',
      // }];
      return res;
    })
};

module.exports = {
  parseRSSResponse,
};
