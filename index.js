require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const adminRoute = require('./routes/adminRoute')
const promotionRoute = require('./routes/promotionRoute');
const customerRoute = require('./routes/customerRoute');
const authRoute = require('./routes/authRoute');
const productRoute = require('./routes/productRoute');
const orderRoute = require('./routes/orderRoute');
const orderDetailRoute = require('./routes/orderdetailRoute');


const connectDB = async () => {
  try {
    // ถ้าใช้ Sequelize (MySQL)
    const sequelize = require('./config/database');
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    console.log(' Database connected and synced');
  } catch (error) {
    console.error(' Database connection error:', error);
    process.exit(1);
  }
};


app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/admin', adminRoute);
app.use('/api/promotion', promotionRoute);
app.use('/api/customer', customerRoute);
app.use('/api/auth', authRoute);
app.use('/api/product', productRoute);
app.use('/api/order', orderRoute);
app.use('/api/orderdetails', orderDetailRoute);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// เชื่อมต่อฐานข้อมูล
connectDB();

// Route เช็กสถานะ API
app.get('/check', (req, res) => {
  console.log('Response check');
  res.status(200).json({
    status: 200,
    success: true,
    data: 'API v1.0 is running',
  });
});

// เริ่มเซิร์ฟเวอร์
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});





