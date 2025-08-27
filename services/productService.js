const Product = require('../models/product');

const getAllProducts = async () => {
  return await Product.findAll();
};

const getProductById = async (id) => {
  return await Product.findByPk(id);
};

const createProduct = async (data) => {
  // เช็คชื่อซ้ำ
  const existing = await Product.findOne({ where: { product_name: data.product_name } });
  if (existing) throw new Error('ชื่อสินค้านี้ถูกใช้ไปแล้ว');

  return await Product.create(data);
};

const updateProduct = async (id, data) => {
  const product = await Product.findByPk(id);
  if (!product) return null;

  // ถ้าจะเปลี่ยนชื่อเช็คซ้ำ
  if (data.product_name && data.product_name !== product.product_name) {
    const existing = await Product.findOne({ where: { product_name: data.product_name } });
    if (existing) throw new Error('ชื่อสินค้านี้ถูกใช้ไปแล้ว');
  }

  await product.update(data);
  return product;
};

const deleteProduct = async (id) => {
  const product = await Product.findByPk(id);
  if (!product) return null;

  await product.destroy();
  return true;
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
