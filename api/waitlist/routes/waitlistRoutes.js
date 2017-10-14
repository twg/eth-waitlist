module.exports = function (app) {
  var waitlist = require('../controllers/waitlistController')

  app.route('/waitlist').get(waitlist.getWaitlist)

  var listController = require('../controllers/admin/listController')

  app.route('/admin/lists')
    .get(listController.getList)

  app.route('/admin/lists')
    .post(listController.postList)

}
