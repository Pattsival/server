const multer = require('multer');
const path = require('path');
const fs = require('fs');

// สร้างโฟลเดอร์ uploads ถ้ายังไม่มี
const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// ตั้งค่า storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // โฟลเดอร์ที่จะเก็บไฟล์
  },
  filename: function (req, file, cb) {
    // ตั้งชื่อไฟล์ใหม่เพื่อป้องกันชื่อซ้ำ
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const fileExtension = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + fileExtension);
  }
});

// ตั้งค่าการกรองไฟล์
const fileFilter = (req, file, cb) => {
  // รับเฉพาะไฟล์รูปภาพ
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('กรุณาอัปโหลดไฟล์รูปภาพเท่านั้น'), false);
  }
};

// สร้าง multer instance
const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // จำกัดขนาดไฟล์ 5MB
  },
  fileFilter: fileFilter
});

module.exports = upload;