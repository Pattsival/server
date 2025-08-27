const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Customer = require('../models/customer');
const Admin = require('../models/admin');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'กรุณากรอก email และ password' });
    }

    // ตรวจสอบใน Customer table ก่อน
    let user = await Customer.findOne({ where: { Cus_email: email } });
    let userType = 'customer';

    // ถ้าไม่เจอใน Customer ให้ตรวจสอบใน Admin table
    if (!user) {
      user = await Admin.findOne({ where: { admin_email: email } }); // แก้เป็น admin_email
      userType = 'admin';
    }

    if (!user) {
      return res.status(401).json({ message: 'ไม่พบผู้ใช้งาน' });
    }

    // ตรวจสอบรหัสผ่าน
    const passwordField = userType === 'customer' ? user.Cus_password : user.admin_password; // แก้เป็น admin_password
    const isPasswordValid = await bcrypt.compare(password, passwordField);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'รหัสผ่านไม่ถูกต้อง' });
    }

    // สร้าง JWT Token
    const token = jwt.sign(
      {
        id: userType === 'customer' ? user.Cus_id : user.admin_id, // แก้เป็น admin_id
        email: user.Cus_email || user.admin_email, // แก้เป็น admin_email
        role: userType === 'customer' ? (user.role || 'user') : 'admin',
        userType: userType
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    // ส่งข้อมูลกลับ (ไม่รวมรหัสผ่าน)
    const userData = {
      id: userType === 'customer' ? user.Cus_id : user.admin_id, // แก้เป็น admin_id
      name: userType === 'customer' ? user.Cus_name : user.admin_name, // แก้เป็น admin_name
      email: user.Cus_email || user.admin_email, // แก้เป็น admin_email
      role: userType === 'customer' ? (user.role || 'user') : 'admin',
      userType: userType
    };

    res.json({
      message: 'เข้าสู่ระบบสำเร็จ',
      token,
      user: userData
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'เกิดข้อผิดพลาดในระบบ' });
  }
};