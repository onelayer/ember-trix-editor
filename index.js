/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-trix-editor',

  included: function (app) {
    this._super.included(app);

    app.import(`${app.bowerDirectory}/trix/dist/trix.js`);
    app.import(`${app.bowerDirectory}/trix/dist/trix.css`);
  }
};
