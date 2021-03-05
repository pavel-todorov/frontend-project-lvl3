const translation = {
  mainPage: {
    title: 'RSS Reader',
    summary: 'Start reading RSS today! It is easy, it is nicely.',
    form: {
      inputLabel: 'RSS link:',
      submitButtonText: 'Add',
      validation: {
        existedField: 'RSS уже существует',
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
        previewButtonTitle: 'Просмотр',
      }
    },
    modal: {
      closeButton: 'Close',
      fullArticleButton: 'Full article',
    },
  },
  errors: {
    badResponseStatus: 'Ошибка сети',
    notSupportedRSSFormat: 'Ресурс не содержит валидный RSS',
  },         
};

module.exports = translation;
