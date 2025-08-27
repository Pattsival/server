// services/promotionService.js
const Promotion = require('../models/promotion');
const { Op } = require('sequelize'); // ✅ เพิ่ม Op สำหรับ query condition

const getAllPromotions = async () => {
  const promotions = await Promotion.findAll({
    order: [['promotion_id', 'DESC']] // ✅ เรียงตามล่าสุดก่อน
  });
  
  // ✅ เพิ่มการคำนวณสถานะตามวันที่
  return promotions.map(promo => {
    const now = new Date();
    const startDate = new Date(promo.promotion_startdate);
    const endDate = new Date(promo.promotion_enddate);
    
    let status = promo.promotion_status;
    if (now > endDate) {
      status = 'expired';
    } else if (now < startDate) {
      status = 'inactive';
    } else if (now >= startDate && now <= endDate) {
      status = 'active';
    }
    
    return {
      ...promo.toJSON(),
      promotion_status: status
    };
  });
};

const getPromotionById = async (id) => {
  return await Promotion.findByPk(id);
};

// ✅ เพิ่ม function ที่หายไป
const getActivePromotions = async () => {
  const now = new Date();
  
  const promotions = await Promotion.findAll({
    where: {
      promotion_startdate: {
        [Op.lte]: now // เริ่มแล้ว
      },
      promotion_enddate: {
        [Op.gte]: now // ยังไม่หมดอายุ
      }
    },
    order: [['promotion_discount', 'DESC']] // เรียงตามส่วนลดมากสุดก่อน
  });
  
  return promotions.map(promo => ({
    ...promo.toJSON(),
    promotion_status: 'active'
  }));
};

// ✅ เพิ่ม function ที่หายไป
const getProductPromotions = async (productId) => {
  const now = new Date();
  
  const promotions = await Promotion.findAll({
    where: {
      promotion_startdate: {
        [Op.lte]: now
      },
      promotion_enddate: {
        [Op.gte]: now
      }
    }
  });
  
  // กรองเฉพาะโปรโมชั่นที่มีสินค้านี้
  const validPromotions = promotions.filter(promo => {
    if (!promo.promotion_products || !Array.isArray(promo.promotion_products)) {
      return false;
    }
    
    return promo.promotion_products.some(product => 
      product.id === productId || product.id === parseInt(productId)
    );
  });
  
  return validPromotions.map(promo => ({
    ...promo.toJSON(),
    promotion_status: 'active'
  }));
};

const createPromotion = async (data) => {
  console.log('Creating promotion with data:', data); // เพื่อ debug
  
  // ✅ Validate ข้อมูล
  if (!data.promotion_name || !data.promotion_name.trim()) {
    throw new Error('กรุณากรอกชื่อโปรโมชั่น');
  }
  
  if (!data.promotion_discount || data.promotion_discount <= 0 || data.promotion_discount > 100) {
    throw new Error('ส่วนลดต้องอยู่ระหว่าง 1-100%');
  }
  
  if (!data.admin_id) {
    throw new Error('ไม่พบข้อมูล admin_id');
  }
  
  const startDate = new Date(data.promotion_startdate);
  const endDate = new Date(data.promotion_enddate);
  
  // ✅ ตรวจสอบว่าวันที่ valid
  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
    throw new Error('รูปแบบวันที่ไม่ถูกต้อง');
  }
  
  if (startDate >= endDate) {
    throw new Error('วันที่เริ่มต้องน้อยกว่าวันที่สิ้นสุด');
  }
  
  // ✅ ตรวจสอบสินค้า
  if (!data.promotion_products || !Array.isArray(data.promotion_products) || data.promotion_products.length === 0) {
    throw new Error('กรุณาเลือกสินค้าอย่างน้อย 1 รายการ');
  }
  
  // ✅ กำหนดสถานะตามวันที่
  const now = new Date();
  let status = 'active';
  if (now < startDate) {
    status = 'inactive';
  } else if (now > endDate) {
    status = 'expired';
  }
  
  const promotionData = {
    promotion_name: data.promotion_name.trim(),
    promotion_discount: parseFloat(data.promotion_discount),
    promotion_condition: data.promotion_condition?.trim() || '',
    promotion_products: data.promotion_products,
    promotion_startdate: startDate,
    promotion_enddate: endDate,
    promotion_status: status,
    admin_id: parseInt(data.admin_id)
  };
  
  console.log('Final promotion data to save:', promotionData);
  
  return await Promotion.create(promotionData);
};

const updatePromotion = async (id, data) => {
  const promo = await Promotion.findByPk(id);
  if (!promo) {
    throw new Error('ไม่พบโปรโมชั่นที่ต้องการแก้ไข');
  }
  
  // ✅ Validate ถ้ามีการเปลี่ยนแปลง
  if (data.promotion_discount !== undefined) {
    if (data.promotion_discount <= 0 || data.promotion_discount > 100) {
      throw new Error('ส่วนลดต้องอยู่ระหว่าง 1-100%');
    }
  }
  
  if (data.promotion_startdate && data.promotion_enddate) {
    const startDate = new Date(data.promotion_startdate);
    const endDate = new Date(data.promotion_enddate);
    
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      throw new Error('รูปแบบวันที่ไม่ถูกต้อง');
    }
    
    if (startDate >= endDate) {
      throw new Error('วันที่เริ่มต้องน้อยกว่าวันที่สิ้นสุด');
    }
    
    // ✅ อัปเดตสถานะตามวันที่ใหม่
    const now = new Date();
    let status = 'active';
    if (now < startDate) {
      status = 'inactive';
    } else if (now > endDate) {
      status = 'expired';
    }
    
    data.promotion_status = status;
    data.promotion_startdate = startDate;
    data.promotion_enddate = endDate;
  }
  
  // ✅ ทำความสะอาดข้อมูล
  if (data.promotion_name) {
    data.promotion_name = data.promotion_name.trim();
  }
  
  if (data.promotion_condition !== undefined) {
    data.promotion_condition = data.promotion_condition.trim();
  }
  
  await promo.update(data);
  return promo;
};

const deletePromotion = async (id) => {
  const promo = await Promotion.findByPk(id);
  if (!promo) {
    throw new Error('ไม่พบโปรโมชั่นที่ต้องการลบ');
  }

  await promo.destroy();
  return true;
};

module.exports = {
  getAllPromotions,
  getPromotionById,
  createPromotion,
  updatePromotion,
  deletePromotion,
  getActivePromotions, // ✅ เพิ่ม
  getProductPromotions // ✅ เพิ่ม
};