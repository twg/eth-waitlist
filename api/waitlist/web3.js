var Web3 = require('web3');
var TestRPC = require("ethereumjs-testrpc");
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
var geth = require("geth");

module.exports = web3