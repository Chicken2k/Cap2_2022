'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Restaurant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Restaurant.belongsTo(models.City, {
        foreignKey: 'cityId'
      }),
      Restaurant.belongsTo(models.User, {
        foreignKey: 'userId'
      }),
      Restaurant.hasMany(models.News, {
        foreignKey: 'restaurantId'
      }),
      Restaurant.hasMany(models.Table, {
        foreignKey: 'restaurantId'
      }),
      Restaurant.hasMany(models.Image, {
        foreignKey: 'restaurantId'
      }),
      Restaurant.hasMany(models.Booking, {
        foreignKey: 'restaurantId'
      })
    }
  };
  Restaurant.init({
    name: DataTypes.STRING(255),
    description: DataTypes.STRING(255),
    address: DataTypes.STRING(255),
  }, {
    sequelize,
    modelName: 'Restaurant',
    paranoid: true,
    deletedAt: 'deletedAt'
  });
  return Restaurant;
};