const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'mysql',
  logging: false, // ใส่ true ถ้าอยากเห็น SQL ที่รัน
});

module.exports = sequelize;