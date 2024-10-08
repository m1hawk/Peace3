const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  port: process.env.DB_PORT || 3306,
  logging: console.log, // 添加这行来查看详细的日志
  dialectOptions: {
    socketPath: '/tmp/mysql.sock'  // 尝试使用 socket 连接
  }
});

module.exports = sequelize;
