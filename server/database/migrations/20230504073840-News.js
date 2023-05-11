'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('news', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: Sequelize.STRING(255),
      content: Sequelize.STRING(500),
      author: Sequelize.STRING,
      date: Sequelize.DATE,
      profile: Sequelize.STRING(200),
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('bews');
  }
};
