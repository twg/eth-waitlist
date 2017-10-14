'use strict';
module.exports = function(app) {
  var waitlist = require('../controllers/waitlistController');

  app.route('/waitlist')
    .get(waitlist.get_waitlist);
};
