// seeders/XXXXXXXXXXXXXX-demo-roles.js
'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Roles', [
      { name: 'Admin' },
      { name: 'User'}
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Roles', null, {});
  }
};