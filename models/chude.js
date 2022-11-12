'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Chude extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
  };
  Chude.init({
    chuDe: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Chude',
  });
  return Chude;
};