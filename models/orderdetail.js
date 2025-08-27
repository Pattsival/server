const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Order = require('./order');

const OrderDetail = sequelize.define('OrderDetail', {
  order_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Order,
      key: 'order_id'
    }
  },
 product_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  order_quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  order_total: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
}, {
  tableName: 'order_detail',
  timestamps: false
});

// ความสัมพันธ์
Order.hasMany(OrderDetail, { foreignKey: 'order_id' });
OrderDetail.belongsTo(Order, { foreignKey: 'order_id' });

module.exports = OrderDetail;

