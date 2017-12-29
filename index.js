/* eslint-env node */
'use strict';

module.exports = {
  name: 'ember-bootstrap-select',
  included: function(app) {
    this._super.included(app);

    app.import('node_modules/bootstrap-select/dist/css/bootstrap-select.min.css');
    app.import('node_modules/bootstrap-select/dist/js/bootstrap-select.min.js');
  }
};
