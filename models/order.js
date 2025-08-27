const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Order = sequelize.define('Order', {
  order_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  customer_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Customer', 
      key: 'Cus_id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Product', 
      key: 'product_id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  order_status: {
    type: DataTypes.ENUM('pending', 'paid', 'shipped', 'completed', 'cancelled'),
    allowNull: false,
    defaultValue: 'pending',
  },
  order_date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  order_address: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  tableName: 'orders',
  timestamps: false,
});

module.exports = Order;
