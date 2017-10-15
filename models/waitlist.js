'use strict';
module.exports = (sequelize, DataTypes) => {
  var waitlist = sequelize.define('waitlist', {
    name: DataTypes.STRING,
    contractAddress: DataTypes.STRING,
    ownerPublicKey: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return waitlist;
};