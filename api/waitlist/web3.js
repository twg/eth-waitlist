const Web3 = require('web3');
const TestRPC = require('ethereumjs-testrpc');
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
const geth = require('geth');

module.exports = web3