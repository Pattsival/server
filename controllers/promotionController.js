const promotionService = require('../services/promotionService');

const getAllPromotions = async (req, res) => {
  try {
    const promos = await promotionService.getAllPromotions();
    res.json({
      success: true,
      data: promos,
      message: 'ดึงข้อมูลโปรโมชั่นสำเร็จ'
    });
  } catch (err) {
    res.status(500).json({ 
      success: false,
      error: 'ไม่สามารถดึงข้อมูลโปรโมชั่นได้',
      details: err.message 
    });
  }
};

const getPromotionById = async (req, res) => {
  try {
    const promo = await promotionService.getPromotionById(req.params.id);
    if (!promo) {
      return res.status(404).json({ 
        success: false,
        error: 'ไม่พบโปรโมชั่น' 
      });
    }
    res.json({
      success: true,
      data: promo,
      message: 'ดึงข้อมูลโปรโมชั่นสำเร็จ'
    });
  } catch (err) {
    res.status(500).json({ 
      success: false,
      error: 'เกิดข้อผิดพลาดในการดึงข้อมูลโปรโมชั่น',
      details: err.message 
    });
  }
};

const createPromotion = async (req, res) => {
  try {
    console.log('Creating promotion with data:', req.body);
    
    const promo = await promotionService.createPromotion(req.body);
    res.status(201).json({
      success: true,
      data: promo,
      message: 'สร้างโปรโมชั่นสำเร็จ'
    });
  } catch (err) {
    console.error('Error creating promotion:', err);
    res.status(400).json({ 
      success: false,
      error: 'ไม่สามารถสร้างโปรโมชั่นได้', 
      details: err.message 
    });
  }
};

const updatePromotion = async (req, res) => {
  try {
    const updated = await promotionService.updatePromotion(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ 
        success: false,
        error: 'ไม่พบโปรโมชั่น' 
      });
    }
    res.json({
      success: true,
      data: updated,
      message: 'อัปเดตโปรโมชั่นสำเร็จ'
    });
  } catch (err) {
    res.status(400).json({ 
      success: false,
      error: 'ไม่สามารถอัปเดตโปรโมชั่นได้', 
      details: err.message 
    });
  }
};

const deletePromotion = async (req, res) => {
  try {
    const deleted = await promotionService.deletePromotion(req.params.id);
    if (!deleted) {
      return res.status(404).json({ 
        success: false,
        error: 'ไม่พบโปรโมชั่น' 
      });
    }
    res.json({
      success: true,
      message: 'ลบโปรโมชั่นสำเร็จ'
    });
  } catch (err) {
    res.status(500).json({ 
      success: false,
      error: 'ไม่สามารถลบโปรโมชั่นได้',
      details: err.message 
    });
  }
};

// Get active promotions
const getActivePromotions = async (req, res) => {
  try {
    const promos = await promotionService.getActivePromotions();
    res.json({
      success: true,
      data: promos,
      message: 'ดึงข้อมูลโปรโมชั่นที่ใช้งานได้สำเร็จ'
    });
  } catch (err) {
    res.status(500).json({ 
      success: false,
      error: 'ไม่สามารถดึงข้อมูลโปรโมชั่นที่ใช้งานได้',
      details: err.message 
    });
  }
};

// Get promotions for a specific product
const getProductPromotions = async (req, res) => {
  try {
    const productId = parseInt(req.params.productId);
    const promos = await promotionService.getProductPromotions(productId);
    res.json({
      success: true,
      data: promos,
      message: 'ดึงข้อมูลโปรโมชั่นของสินค้าสำเร็จ'
    });
  } catch (err) {
    res.status(500).json({ 
      success: false,
      error: 'ไม่สามารถดึงข้อมูลโปรโมชั่นของสินค้าได้',
      details: err.message 
    });
  }
};

module.exports = {
  getAllPromotions,
  getPromotionById,
  createPromotion,
  updatePromotion,
  deletePromotion,
  getActivePromotions,
  getProductPromotions
};