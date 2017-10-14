module.exports = function(app) {
  var waitlist = require('../controllers/waitlistController')

  app.route('/waitlist').get(waitlist.getWaitlist)
}
