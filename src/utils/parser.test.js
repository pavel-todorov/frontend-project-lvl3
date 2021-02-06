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

test('RSS good response with bad data parsing', async () => {
  const response = fs.promises.readFile(getFixturePath('bad_response.txt'), 'utf8')
    .then((response) => JSON.parse(response));
  await expect(parseRSSResponse(response)).rejects.toThrow('Response status is not OK');
});

test('RSS bad http response parsing', async () => {
  const response = fs.promises.readFile(getFixturePath('bad_http_response.txt'), 'utf8')
    .then((response) => JSON.parse(response));
  await expect(parseRSSResponse(response)).rejects.toThrow('Response status is not OK');
});
