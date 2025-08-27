// models/promotion.js - เพิ่มฟิลด์ใหม่
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Admin = require('./admin');

const Promotion = sequelize.define('Promotion', {
  promotion_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  admin_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Admin,
      key: 'admin_id'
    },
    onDelete: 'CASCADE'
  },
  // ✅ เพิ่มฟิลด์ใหม่
  promotion_name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  promotion_discount: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  promotion_condition: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  // เก็บรายการสินค้าเป็น JSON
  promotion_products: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: []
  },
  promotion_startdate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  promotion_enddate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  // ✅ เพิ่มสถานะ
  promotion_status: {
    type: DataTypes.ENUM('active', 'inactive', 'expired'),
    defaultValue: 'active'
  }
}, {
  tableName: 'promotion',
  timestamps: false
});

module.exports = Promotion;