'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Phanhoi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
  };
  Phanhoi.init({
    analyzeComment: DataTypes.STRING,
    responseComment: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Phanhoi',
  });
  return Phanhoi;
};