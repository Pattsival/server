const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const upload = require('../config/multer'); // import multer config

// Routes with file upload support
router.post('/create', upload.single('product_img'), productController.createProduct);
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.put('/:id', upload.single('product_img'), productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;


