'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Table extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Table.belongsTo(models.Restaurant, {
        foreignKey: 'restaurantId'
      })
    }
  };
  Table.init({
    name: DataTypes.STRING(255),
    numericalOrder: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Table',
    paranoid: true,
    deletedAt: 'deletedAt'
  });
  return Table;
};