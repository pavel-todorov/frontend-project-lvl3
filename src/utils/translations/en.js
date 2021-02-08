const translation = {
  mainPage: {
    title: 'RSS Reader',
    summary: 'Start reading RSS today! It is easy, it is nicely.',
    form: {
      inputLabel: 'RSS link:',
      submitButtonText: 'Add',
      validation: {
        existedField: 'Feeds already exist.',
        ok: 'Downloaded OK.',
        invalidLink: 'Invalid link',
      },
    },
    tables: {
      feeds: {
        name: 'Feeds',
      },
      items: {
        name: 'Items',
      }
    },
  },
  errors: {
    badResponseStatus: 'Response status is not OK',
    notSupportedRSSFormat: 'Not supported RSS format',
  },         
};

module.exports = translation;
