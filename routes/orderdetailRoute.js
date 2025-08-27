const express = require('express');
const router = express.Router();
const orderDetailController = require('../controllers/orderDetailController');

// CRUD Routes
router.post('/create', orderDetailController.createOrderDetail);
router.get('/getall', orderDetailController.getAllOrderDetails);
router.get('/:id', orderDetailController.getOrderDetailById);
router.put('/:id', orderDetailController.updateOrderDetail);
router.delete('/:id', orderDetailController.deleteOrderDetail);

module.exports = router;
