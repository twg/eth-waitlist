module.exports = function (app) {
  var waitlist = require('../controllers/waitlistController')

  app.route('/waitlist').get(waitlist.getWaitlist)

  var adminListController = require('../controllers/admin/listController')

  app.route('/admin/lists')
    .get(adminListController.getList)

  app.route('/admin/lists')
    .post(adminListController.postList)

  var listController = require('../controllers/listController')

  app.route('/lists/:id')
    .get(listController.getList)

  app.route('/lists/:id/add')
    .post(listController.postList)

}
