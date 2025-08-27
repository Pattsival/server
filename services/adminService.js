// services/adminService.js
const Admin = require('../models/admin');

const getAllAdmins = async () => {
  return await Admin.findAll();
};

const getAdminById = async (id) => {
  return await Admin.findByPk(id);
};

const createAdmin = async (data) => {
  return await Admin.create(data);
};

const updateAdmin = async (id, data) => {
  const admin = await Admin.findByPk(id);
  if (!admin) return null;
  return await admin.update(data);
};

const deleteAdmin = async (id) => {
  const admin = await Admin.findByPk(id);
  if (!admin) return null;
  await admin.destroy();
  return true;
};

module.exports = {
  getAllAdmins,
  getAdminById,
  createAdmin,
  updateAdmin,
  deleteAdmin,
};
