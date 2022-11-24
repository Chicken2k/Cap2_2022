'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class City extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      City.hasMany(models.Restaurant, {
        foreignKey: 'cityId'
      })
    }
  };
  City.init({
    name: DataTypes.STRING(255),
  }, {
    sequelize,
    modelName: 'City',
    paranoid: true,
    deletedAt: 'deletedAt'
  });
  return City;
};