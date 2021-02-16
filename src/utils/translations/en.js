const translation = {
  mainPage: {
    title: 'RSS Reader',
    summary: 'Start reading RSS today! It is easy, it is nicely.',
    form: {
      inputLabel: 'RSS link:',
      submitButtonText: 'Add',
      validation: {
        existedField: 'Feeds already exist.',
        ok: 'Rss has been loaded',
        invalidLink: 'Invalid link',
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
    badResponseStatus: 'Response status is not OK',
    notSupportedRSSFormat: 'Not supported RSS format',
  },         
};

module.exports = translation;
