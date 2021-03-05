const initMainPageModel = require('./mainPageModel');

test('Check init recreates model', async () => {
  const model1 = initMainPageModel(() => {});
  model1.view.items = ['test'];
  const model2 = initMainPageModel(() => {});

  expect(model2.view.items.length).toBe(0);
});
