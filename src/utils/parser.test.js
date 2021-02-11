const path = require('path');
const fs = require('fs');
const { parseRSSResponse } = require('./parser');

const getFixturePath = (filename) => path.join(__dirname, '__fixtures__', filename);

test('RSS good response parsing', async () => {
  const response = fs.promises.readFile(getFixturePath('normal_response.txt'), 'utf8')
    .then((response) => JSON.parse(response));
  expect(await parseRSSResponse(response)).toMatchObject(
    {
      title: expect.any(String),
      description: expect.any(String),
      items: expect.any(Array)
    },
  );
});

test.each([['bad_response.txt'], ['bad_http_response.txt']])('RSS with %s should trow', async (source) => {
  const response = fs.promises.readFile(getFixturePath(source), 'utf8')
    .then((response) => JSON.parse(response));
  await expect(parseRSSResponse(response)).rejects.toThrow('errors.badResponseStatus');
});
