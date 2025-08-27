const bcrypt = require('bcrypt');
const Customer = require('../models/customer');

const SALT_ROUNDS = 10;

exports.createCustomer = async (data) => {
  // ตรวจสอบชื่อซ้ำ
  const existingCustomer = await Customer.findOne({ where: { Cus_name: data.Cus_name } });
  if (existingCustomer) {
    throw new Error('ไม่สามารถใช้ชื่อซ้ำได้');
  }

  // เข้ารหัสรหัสผ่าน
  const hashedPassword = await bcrypt.hash(data.Cus_password, SALT_ROUNDS);

  return await Customer.create({
    ...data,
    Cus_password: hashedPassword,
  });
};

exports.getAllCustomers = async () => {
  return await Customer.findAll();
};

exports.getCustomerById = async (id) => {
  return await Customer.findByPk(id);
};

exports.updateCustomer = async (id, data) => {
  const customer = await Customer.findByPk(id);
  if (!customer) throw new Error('ไม่พบลูกค้า');

  if (data.Cus_password) {
    data.Cus_password = await bcrypt.hash(data.Cus_password, SALT_ROUNDS);
  }

  await customer.update(data);
  return customer;
};

exports.deleteCustomer = async (id) => {
  const customer = await Customer.findByPk(id);
  if (!customer) throw new Error('ไม่พบลูกค้า');

  await customer.destroy();
  return { message: 'ลบลูกค้าเรียบร้อยแล้ว' };
};

