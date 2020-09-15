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
      // define association here
    }
  };
  User.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    first_name: {
      type: DataTypes.STRING,
      isAlphanumeric: true,
      required: true,
      allowNull: true
    },
    last_name: {
      type: DataTypes.STRING,
      required: true,
      allowNull: true
    },
    username: {
      type: DataTypes.STRING,
      required: true,
      len: [8, 20],
      allowNull: true
    },
    email: {
      type: DataTypes.STRING,
      isEmail: true,
      len:[7, 50],
      required: true,
      allowNull: true
    },
    midname: {
      type: DataTypes.STRING,
      required: true,
      allowNull: true
    },
    permission_id: {
      type: DataTypes.INTEGER,
      required: true,
      allowNull: false
    },
    about: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    password: {
      type: DataTypes.STRING,
      len: [8, 20],
      allowNull: true
    },
    phone_no: {
      type: DataTypes.STRING,
      allowNull: true
    },
    reset_password_toke: {
      type: DataTypes.STRING,
    },
    reset_password_token_expires: DataTypes.DATE,
    last_login: DataTypes.DATE,
    status: {
      type: DataTypes.ENUM('active', 'inactive'),
      defaultValue: 'active'
    },
    deleted_at: DataTypes.DATE,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'User',
    underscored: true,
    paranoid: true
  });
  return User;
};