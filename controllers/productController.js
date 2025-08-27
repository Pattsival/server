// ===== controllers/productController.js (แก้ไข) =====
const productService = require('../services/productService');
const fs = require('fs');
const path = require('path');

const getAllProducts = async (req, res) => {
  try {
    const products = await productService.getAllProducts();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'ไม่สามารถดึงข้อมูลสินค้าได้' });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await productService.getProductById(req.params.id);
    if (!product) return res.status(404).json({ error: 'ไม่พบสินค้า' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในการดึงสินค้า' });
  }
};

const createProduct = async (req, res) => {
  try {
    console.log('Request body:', req.body);
    console.log('Request file:', req.file);
    
    const productData = {
      product_name: req.body.product_name,
      product_price: parseFloat(req.body.product_price),
      product_detail: req.body.product_detail || '',
      product_stock: parseInt(req.body.product_stock),
      admin_id: parseInt(req.body.admin_id),
      product_img: req.file ? req.file.filename : null // ใช้ชื่อไฟล์ที่ multer สร้างให้
    };

    const newProduct = await productService.createProduct(productData);
    res.status(201).json(newProduct);
  } catch (err) {
    // ลบไฟล์ที่อัปโหลดแล้วถ้าเกิดข้อผิดพลาด
    if (req.file && req.file.path) {
      fs.unlinkSync(req.file.path);
    }
    
    console.error('Error creating product:', err);
    res.status(400).json({ error: 'ไม่สามารถสร้างสินค้าได้', details: err.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    console.log('Update request body:', req.body);
    console.log('Update request file:', req.file);
    
    const productId = req.params.id;
    
    // ดึงข้อมูลสินค้าเดิม
    const existingProduct = await productService.getProductById(productId);
    if (!existingProduct) {
      if (req.file && req.file.path) {
        fs.unlinkSync(req.file.path); // ลบไฟล์ใหม่ที่อัปโหลด
      }
      return res.status(404).json({ error: 'ไม่พบสินค้า' });
    }

    const updateData = {
      product_name: req.body.product_name,
      product_price: parseFloat(req.body.product_price),
      product_detail: req.body.product_detail || '',
      product_stock: parseInt(req.body.product_stock)
    };

    // ถ้ามีการอัปโหลดไฟล์ใหม่
    if (req.file) {
      // ลบไฟล์เก่า (ถ้ามี)
      if (existingProduct.product_img) {
        const oldImagePath = path.join('uploads', existingProduct.product_img);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      
      updateData.product_img = req.file.filename;
    }

    const updated = await productService.updateProduct(productId, updateData);
    if (!updated) {
      if (req.file && req.file.path) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(404).json({ error: 'ไม่พบสินค้า' });
    }
    
    res.json(updated);
  } catch (err) {
    // ลบไฟล์ที่อัปโหลดแล้วถ้าเกิดข้อผิดพลาด
    if (req.file && req.file.path) {
      fs.unlinkSync(req.file.path);
    }
    
    console.error('Error updating product:', err);
    res.status(400).json({ error: 'ไม่สามารถอัปเดตสินค้าได้', details: err.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    
    // ดึงข้อมูลสินค้าก่อนลบเพื่อลบไฟล์รูปภาพด้วย
    const product = await productService.getProductById(productId);
    if (!product) {
      return res.status(404).json({ error: 'ไม่พบสินค้า' });
    }

    const deleted = await productService.deleteProduct(productId);
    if (!deleted) {
      return res.status(404).json({ error: 'ไม่พบสินค้า' });
    }

    // ลบไฟล์รูปภาพ (ถ้ามี)
    if (product.product_img) {
      const imagePath = path.join('uploads', product.product_img);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    res.json({ message: 'ลบสินค้าสำเร็จ' });
  } catch (err) {
    console.error('Error deleting product:', err);
    res.status(500).json({ error: 'ไม่สามารถลบสินค้าได้' });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};