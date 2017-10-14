const web3 = require('./../web3')

exports.getWaitlist = function(req, res) {
  web3.eth.getBalance('0x825ed100c69a630770df703a53d14f20b6523edb')
    .then(data => res.json({status: data.toString()}))
}
