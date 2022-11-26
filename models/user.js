'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        User.belongsTo(models.Role, {
          foreignKey: 'roleId'
        }),
        User.hasMany(models.News, {
          foreignKey: 'userId'
        }),
        User.hasMany(models.Booking, {
          foreignKey: 'userId'
        }),
        User.hasMany(models.Restaurant, {
          foreignKey: 'userId'
        })
    }
  };
  User.init({
    name: DataTypes.STRING(255),
    gioitinh: DataTypes.INTEGER,
    email: DataTypes.STRING(255),
    password: DataTypes.STRING(255),
    avatar: DataTypes.STRING(255),
    tenanh: DataTypes.STRING(255),
    diachi: DataTypes.STRING,
    sdt: DataTypes.STRING,
    ngaysinh: DataTypes.STRING,
    status: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
    paranoid: true,
    deletedAt: 'deletedAt'
  });
  return User;
};