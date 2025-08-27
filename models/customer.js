
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Customer = sequelize.define('Customer', {
  Cus_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  Cus_name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: 'unique_cus_name'
  },
  Cus_password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Cus_email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  Cus_house_no: {
    type: DataTypes.STRING,
    allowNull: true
  },
  Cus_street: {
    type: DataTypes.STRING,
    allowNull: true // สามารถว่างได้
  },
  Cus_subdistrict: {
    type: DataTypes.STRING,
    allowNull: true
  },
  Cus_district: {
    type: DataTypes.STRING,
    allowNull: true
  },
  Cus_province: {
    type: DataTypes.STRING,
    allowNull: true
  },
  Cus_zipcode: {
    type: DataTypes.STRING,
    allowNull: true
  },
  Cus_phone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: 'user' // ค่าเริ่มต้นเป็น user
  }
}, {
  tableName: 'customer',
  timestamps: false
});

module.exports = Customer;
