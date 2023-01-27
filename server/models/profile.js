const { DataTypes } = require('sequelize');
const { sequelize } = require('../util/database');

module.exports = {
  Profile: sequelize.define('profile', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    address: DataTypes.STRING,
    birthday: DataTypes.STRING,
    occupation: DataTypes.STRING
  }),
};
