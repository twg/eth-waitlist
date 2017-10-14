'use strict'
module.exports = (sequelize, DataTypes) => {
  var user = sequelize.define('user', {
    data: DataTypes.JSON
  }, {
    classMethods: {
      associate: function (models) {
        // associations can be defined here
      }
    }
  })
  return user
}