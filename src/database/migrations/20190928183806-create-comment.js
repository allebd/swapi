export const up = (queryInterface, Sequelize) => queryInterface.createTable('Comments', {
  id: {
    allowNull: false,
    primaryKey: true,
    type: Sequelize.UUID
  },
  commentBody: {
    allowNull: false,
    type: Sequelize.STRING
  },
  movieId: {
    allowNull: false,
    type: Sequelize.INTEGER
  },
  publicIp: {
    allowNull: false,
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
});
export const down = (queryInterface) => queryInterface.dropTable('Comments');
