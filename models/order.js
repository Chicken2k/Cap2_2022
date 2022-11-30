"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Order.belongsTo(models.Restaurant, {
        foreignKey: "restaurantId",
      }),
        Order.belongsTo(models.User, {
          foreignKey: "userId",
        });
    }
  }
  Order.init(
    {
      status: DataTypes.BOOLEAN,
      date: DataTypes.DATE,
      note: DataTypes.STRING,
      quantity: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Order",
      paranoid: true,
      deletedAt: "deletedAt",
    }
  );
  return Order;
};
