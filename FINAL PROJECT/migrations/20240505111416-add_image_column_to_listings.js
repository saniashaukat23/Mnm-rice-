"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Listings", "image", {
      type: Sequelize.STRING(1000),
      allowNull: true,
    });
  },

  // down: async (queryInterface, Sequelize) => {
  //   await queryInterface.removeColumn('Listings', 'image');
  // },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
