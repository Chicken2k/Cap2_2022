"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Food extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Food.hasMany(models.Restaurant, {
        foreignKey: "foodId",
      });
    }
  }
  Food.init(
    {
      name: DataTypes.STRING(255),
    },
    {
      sequelize,
      modelName: "Food",
      paranoid: true,
      deletedAt: "deletedAt",
    }
  );
  return Food;
};
