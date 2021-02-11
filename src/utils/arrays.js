const {
  sortByPubDateDesc,
  sortByTitleAsc,
} = require('./sorting');

const updateArrayWithItems = (source, toUpdate) => {
  const sourceMap = new Map();
  source.forEach((feeds) => {
    if (!sourceMap.has(feeds.id)) {
      sourceMap.set(feeds.id, { feeds, map: new Map() });
    }
    feeds.items.forEach((item) => {
      sourceMap.get(feeds.id).map.set(item.link, item);
    });
  });
  toUpdate.forEach((feeds) => {
    if (!sourceMap.has(feeds.id)) {
      sourceMap.set(feeds.id, { feeds, map: new Map() });
    } else {
      sourceMap.get(feeds.id).feeds = { title: feeds.title, description: feeds.description, id: feeds.id };
    }
    feeds.items.forEach((item) => {
      if (sourceMap.get(feeds.id).map.has(item.link)) {
        const sourceDate = Date.parse(sourceMap.get(feeds.id).map.get(item.link).pubDate);
        const newDate = Date.parse(item.pubDate);
        if (newDate > sourceDate) {
          sourceMap.get(feeds.id).map.set(item.link, item);
        }
      } else {
        sourceMap.get(feeds.id).map.set(item.link, item);
      }
    });
  });
  const result = [];
  sourceMap.forEach((feeds) => {
    const items = [];
    feeds.map.forEach((item) => {
      items.push(item);
    });
    items.sort(sortByPubDateDesc);
    result.push({
      title: feeds.feeds.title,
      description: feeds.feeds.description,
      id: feeds.feeds.id,
      items,
    });
  });
  result.sort(sortByTitleAsc);
  return result;
};

module.exports = {
  updateArrayWithItems,
}