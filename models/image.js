'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Image.belongsTo(models.Restaurant, {
        foreignKey: 'restaurantId'
      })
    }
  };
  Image.init({
    name: DataTypes.STRING(255),
    description: DataTypes.STRING(255),
    link: DataTypes.STRING(255)
  }, {
    sequelize,
    modelName: 'Image',
  });
  return Image;
};