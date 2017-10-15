'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('waitlists', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      contractAddress: {
        type: Sequelize.STRING
      },
      ownerPublicKey: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
      .then(() => {
        return queryInterface.addIndex('waitlists', ['ownerPublicKey'])
      })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('waitlists')
  }
}