const translation = {
  mainPage: {
    title: 'RSS Reader',
    summary: 'Start reading RSS today! It is easy, it is nicely.',
    form: {
      inputLabel: 'RSS link:',
      submitButtonText: 'Add',
      validation: {
        existedField: 'Feeds already exist.',
        ok: 'RSS успешно загружен',
        invalidLink: 'Ссылка должна быть валидным URL',
      },
    },
    tables: {
      feeds: {
        name: 'Feeds',
      },
      items: {
        name: 'Items',
        previewButtonTitle: 'Preview',
      }
    },
    modal: {
      closeButton: 'Close',
      fullArticleButton: 'Full article',
    },
  },
  errors: {
    badResponseStatus: 'Ошибка сети',
    notSupportedRSSFormat: 'Not supported RSS format',
  },         
};

module.exports = translation;
