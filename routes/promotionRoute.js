const express = require('express');
const router = express.Router();
const promotionController = require('../controllers/promotionController');

// GET routes
router.get('/', promotionController.getAllPromotions);
router.get('/active', promotionController.getActivePromotions);
router.get('/product/:productId', promotionController.getProductPromotions);
router.get('/:id', promotionController.getPromotionById);

// POST routes
router.post('/create', promotionController.createPromotion);

// PUT routes
router.put('/:id', promotionController.updatePromotion);

// DELETE routes
router.delete('/:id', promotionController.deletePromotion);

module.exports = router;