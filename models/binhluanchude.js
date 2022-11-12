'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Binhluanchude extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Binhluanchude.belongsTo(models.Binhluan,
        {
          foreignKey: "binhluanId"
        });
        Binhluanchude.belongsTo(models.Chude, {
        foreignKey: "chudeId"
      })
    }
  };
  Binhluanchude.init({
    binhluanId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Binhluan",
        key: "id"
      }
    },
    chudeId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Chude",
        key: "id"
      }
    },
    binhluancd: DataTypes.STRING,
    analyzeCmt: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Binhluanchude',
  });
  return Binhluanchude;
};