'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class News extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
     News.belongsTo(models.Restaurant, {
      foreignKey: 'restaurantId'
     }),
     News.belongsTo(models.User, {
      foreignKey: 'userId'
     })
    }
  };
 News.init({
    name: DataTypes.STRING(255),
    content: DataTypes.STRING(255),
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'News',
    paranoid: true,
    deletedAt: 'deletedAt'
  });
  return News;
};