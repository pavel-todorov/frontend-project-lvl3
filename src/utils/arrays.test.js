const { updateArrayWithItems } = require('./arrays');

const source = [{
  title: 'title1',
  description: 'description1',
  id: 'http://title1.tst',
  items: [
    {
      title: 'title1.2',
      description: 'description1.2',
      pubDate: 'Tue, 09 Feb 2021 05:26:00 GMT',
      link: '1.2',
      isNew: false,
    },
    {
      title: 'title1.1',
      description: 'description1.1',
      pubDate: 'Tue, 09 Feb 2021 05:25:00 GMT',
      link: '1.1',
      isNew: false,
    },
  ],
}];

const newFeeds = [{
  title: 'title1',
  description: 'description1+',
  id: 'http://title1.tst',
  items: [
    {
      title: 'title1.2',
      description: 'description1.2+',
      pubDate: 'Tue, 09 Feb 2021 05:27:00 GMT',
      link: '1.2',
    },
  ],
}];

test('Update array with items normal case', () => {
  const expectResult = [{
    title: 'title1',
    description: 'description1+',
    id: 'http://title1.tst',
    items: [
      {
        title: 'title1.2',
        description: 'description1.2+',
        pubDate: 'Tue, 09 Feb 2021 05:27:00 GMT',
        link: '1.2',
      },
      {
        title: 'title1.1',
        description: 'description1.1',
        pubDate: 'Tue, 09 Feb 2021 05:25:00 GMT',
        link: '1.1',
        isNew: false,
      },
    ],
  }];
  expect(updateArrayWithItems(source, newFeeds)).toEqual(expectResult);
});

test('Update array with empty array', () => {
  expect(updateArrayWithItems(source, [])).toEqual(source);
});
