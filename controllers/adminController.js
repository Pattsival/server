// controllers/adminController.js
const bcrypt = require('bcryptjs');
const adminService = require('../services/adminService');

const getAllAdmins = async (req, res) => {
  try {
    const admins = await adminService.getAllAdmins();
    res.json(admins);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch admins' });
  }
};

const getAdminById = async (req, res) => {
  try {
    const admin = await adminService.getAdminById(req.params.id);
    if (!admin) return res.status(404).json({ error: 'Admin not found' });
    res.json(admin);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch admin' });
  }
};

const createAdmin = async (req, res) => {
  try {
    const { admin_name, admin_password, admin_email, role } = req.body;

    // Hash password ก่อนเก็บ
    const hashedPassword = await bcrypt.hash(admin_password, 10);

    const newAdmin = await adminService.createAdmin({
      admin_name,
      admin_password: hashedPassword,
      admin_email,
      role
    });

    res.status(201).json(newAdmin);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create admin', details: err.message });
  }
};

const updateAdmin = async (req, res) => {
  try {
    const { admin_password, ...otherData } = req.body;
    let updateData = { ...otherData };

    // ถ้ามีการส่งรหัสมา ให้ hash ก่อน
    if (admin_password) {
      updateData.admin_password = await bcrypt.hash(admin_password, 10);
    }

    const updated = await adminService.updateAdmin(req.params.id, updateData);
    if (!updated) return res.status(404).json({ error: 'Admin not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update admin', details: err.message });
  }
};

const deleteAdmin = async (req, res) => {
  try {
    const deleted = await adminService.deleteAdmin(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Admin not found' });
    res.json({ message: 'Admin deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete admin' });
  }
};

module.exports = {
  getAllAdmins,
  getAdminById,
  createAdmin,
  updateAdmin,
  deleteAdmin,
};
