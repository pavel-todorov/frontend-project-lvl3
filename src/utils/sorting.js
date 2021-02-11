const sortByPubDateDesc = (a, b) => {
  const aDate = Date.parse(a.pubDate);
  const bDate = Date.parse(b.pubDate);
  if (aDate < bDate) {
    return 1;
  }
  if (aDate > bDate) {
    return -1;
  }
  return 0;
};
  
const sortByTitleAsc = (a, b) => {
  if (a.title < b.title) {
    return -1;
  }
  if (a.title > b.title) {
    return 1;
  }
  return 0;
};

const sortByTitleDesc = (a, b) => {
  if (a.title < b.title) {
    return 1;
  }
  if (a.title > b.title) {
    return -1;
  }
  return 0;
};
    
module.exports = {
  sortByPubDateDesc,
  sortByTitleDesc,
  sortByTitleAsc,
}  