"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Comment.belongsTo(models.Restaurant, {
        foreignKey: "restaurantId",
      }),
        Comment.belongsTo(models.User, {
          foreignKey: "userId",
        });
    }
  }
  Comment.init(
    {
      content: DataTypes.STRING(255),
      analyzeComment: DataTypes.STRING(255),
      responseComment: DataTypes.STRING(255),
      date: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Comment",
      paranoid: true,
      deletedAt: "deletedAt",
    }
  );
  return Comment;
};
