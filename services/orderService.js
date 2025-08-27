const Order = require('../models/order');

const getAllOrders = async () => {
  return await Order.findAll();
};

const getOrderById = async (id) => {
  return await Order.findByPk(id);
};

const createOrder = async (data) => {
  return await Order.create(data);
};

const updateOrder = async (id, data) => {
  const order = await Order.findByPk(id);
  if (!order) return null;
  return await order.update(data);
};

const deleteOrder = async (id) => {
  const order = await Order.findByPk(id);
  if (!order) return null;
  await order.destroy();
  return true;
};

module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
};
