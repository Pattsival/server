
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 

const Admin = sequelize.define('Admin', {
  admin_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  admin_name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false, // กำหนดให้ username ห้ามซ้ำ
  },
  admin_password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  admin_email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'admin'
  }
}, {
  tableName: 'admin',
  timestamps: false
});

module.exports = Admin;
