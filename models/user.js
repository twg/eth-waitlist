'use strict'
module.exports = (sequelize, DataTypes) => {
  var user = sequelize.define('user', {
    data: DataTypes.JSON,
    contractAddress: DataTypes.STRING
  }, {
    classMethods: {
      associate: function (models) {
        // associations can be defined here
      }
    }
  })
  return user
}