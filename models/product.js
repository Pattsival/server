// models/product.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Product = sequelize.define('Product', {
  product_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  admin_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  product_name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false // ไม่ให้ซ้ำ
  },
  product_price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  product_detail: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  product_stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  product_img: {
    type: DataTypes.STRING,
    allowNull: true
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'admin'
  }
}, {
  tableName: 'product',
  timestamps: false
});

module.exports = Product;
