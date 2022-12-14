"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Reply extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Reply.belongsTo(models.Comment, {
        foreignKey: "commentId",
      });
      Reply.belongsTo(models.User, {
        foreignKey: "userId",
      });
    }
  }
  Reply.init(
    {
      replyContent: DataTypes.STRING(255),
    },
    {
      sequelize,
      modelName: "Reply",
      paranoid: true,
      deletedAt: "deletedAt",
    }
  );
  return Reply;
};
