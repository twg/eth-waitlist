'use strict';
const web3 = require('./../web3')

exports.get_waitlist = function(req, res) {    
    web3.eth.getBalance('0x5608c3bb2bcd38dec056f6a9dcf1b1fc98fab17c')
    .then((data) => {
        res.send({status: data })    
    })
};