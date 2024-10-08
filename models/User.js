const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  twitterId: {
    type: DataTypes.STRING,
    unique: true
  },
  solanaAddress: {
    type: DataTypes.STRING,
    unique: true
  },
  joinYear: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  totalLoss: {
    type: DataTypes.STRING,
    allowNull: false
  },
  yearLoss: {
    type: DataTypes.STRING,
    allowNull: false
  },
  mainLossScenario: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = User;
