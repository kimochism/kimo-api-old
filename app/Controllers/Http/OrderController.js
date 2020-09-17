'use strict'

const Order = use('App/Models/Order');
const OrderProduct = use('App/Models/OrderProduct');

class OrderController {

  async index({ request, response }) {
    const query = request.get();

    const orders = await Order.query().fetch();

    return orders;
  }

  async store({ request, response }) {
    const data = request.all();

    const order = await Order.create(data);

    return order;
  }

  async show({ params, request, response }) {
    const order = await Order.find(params.id);

    await order.load('products');

    return order;
  }

  async update({ params, request, response }) {
    const data = request.all();

    const order = await Order.find(params.id);

    order.merge(data);
    await order.save();

    return order;
  }

  async destroy({ params, request, response }) {
    // const order = await Order.find(params.id);

    // order.merge({ status: 'CANCELED' });
    // await order.save();

    // return order; 
  }

  async storeOrderProduct({ params, request }) {
    const order = await Order.find(params.orderId);

    const orderProduct = await order.products().fetch();
    const orderProductJSON = orderProduct.toJSON();

    if (orderProductJSON && orderProductJSON.length) {
      await order.products()
        .pivotQuery()
        .where('product_id', params.productId)
        .increment('quantity');

      return order;
    }

    await order.products().attach([params.productId]);
    return order;
  }

  async destroyOrderProduct({ params, request }) {
    const order = await Order.find(params.orderId);

    const orderProduct = await OrderProduct.query()
      .where('order_id', params.orderId)
      .where('product_id', params.productId)
      .fetch();

    const orderProductJSON = orderProduct.toJSON();

    if (orderProductJSON && orderProductJSON.length && orderProductJSON[0].quantity > 1) {
      await order.products()
        .pivotQuery()
        .where('product_id', params.productId)
        .decrement('quantity');

      return order;
    }

    await order.products().detach([params.productId]);
    return order;
  }
}

module.exports = OrderController
