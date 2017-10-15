const db = require('./../../../models')
const User = db.user

module.exports = {
  getList: function (req, res, next) {
    User.findAll({where: {contractAddress: req.params.id}})
      .then((rows) => res.json(rows))
      .catch(next)
  },
  postList: function (req, res, next) {
    let body = req.body
    body.contractAddress = req.params.id

    User.create(body)
      .then((row) => res.json(row))
      .catch(next)
  }
}
