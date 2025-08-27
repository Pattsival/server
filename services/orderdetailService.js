const OrderDetail = require('../models/orderdetail');
const Order = require('../models/order');

class OrderDetailService {
  // ✅ Create
  static async createOrderDetail(data) {
    return await OrderDetail.create(data);
  }

  // ✅ Read All
  static async getAllOrderDetails() {
    return await OrderDetail.findAll({
      include: [{ model: Order }]
    });
  }

  // ✅ Read by order_id
  static async getOrderDetailById(orderId) {
    return await OrderDetail.findOne({
      where: { order_id: orderId },
      include: [{ model: Order }]
    });
  }

  // ✅ Update
  static async updateOrderDetail(orderId, data) {
    const updated = await OrderDetail.update(data, {
      where: { order_id: orderId }
    });
    return updated[0]; // 0 = ไม่เจอ, 1 = สำเร็จ
  }

  // ✅ Delete
  static async deleteOrderDetail(orderId) {
    return await OrderDetail.destroy({
      where: { order_id: orderId }
    });
  }
}

module.exports = OrderDetailService;
