const db = require('./../../../../models')
const Waitlist = db.waitlist

module.exports = {
  getList: function(req, res, next) {
    Waitlist.findAll({ where: { ownerPublicKey: req.query.ownerPublicKey } })
      .then(rows => res.json(rows))
      .catch(next)
  },
  postList: function(req, res, next) {
    Waitlist.create(req.body)
      .then(row => res.json(row))
      .catch(next)
  },
  getListByContractAddress: function(req, res, next) {
    Waitlist.findAll({ where: { contractAddress: req.params.id } })
      .then(rows => res.json(rows[0]))
      .catch(next)
  }
}
