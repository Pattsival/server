const OrderDetailService = require('../services/orderdetailService');

// ✅ Create
exports.createOrderDetail = async (req, res) => {
  try {
    const orderDetail = await OrderDetailService.createOrderDetail(req.body);
    res.status(201).json(orderDetail);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ✅ Read All
exports.getAllOrderDetails = async (req, res) => {
  try {
    const orderDetails = await OrderDetailService.getAllOrderDetails();
    res.json(orderDetails);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Read by ID
exports.getOrderDetailById = async (req, res) => {
  try {
    const orderDetail = await OrderDetailService.getOrderDetailById(req.params.id);

    if (!orderDetail) {
      return res.status(404).json({ message: 'OrderDetail not found' });
    }

    res.json(orderDetail);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Update
exports.updateOrderDetail = async (req, res) => {
  try {
    const updated = await OrderDetailService.updateOrderDetail(req.params.id, req.body);

    if (!updated) {
      return res.status(404).json({ message: 'OrderDetail not found' });
    }

    res.json({ message: 'OrderDetail updated successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ✅ Delete
exports.deleteOrderDetail = async (req, res) => {
  try {
    const deleted = await OrderDetailService.deleteOrderDetail(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: 'OrderDetail not found' });
    }

    res.json({ message: 'OrderDetail deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
