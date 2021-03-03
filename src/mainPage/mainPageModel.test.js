const initMainPageModel = require('./mainPageModel');

const mainPageModelChangeCallback = (path, value, previousValue, name) => { // previousValue, name
    console.log(`Model changed but not processed: ${path}: ${previousValue} -> ${value} (${name})`);
};

test('Check init recreates model', async () => {
  const model1 = initMainPageModel(mainPageModelChangeCallback);
  model1.view.items = ['test'];
  const model2 = initMainPageModel(mainPageModelChangeCallback);

  expect(model2.view.items.length).toBe(0);
});
