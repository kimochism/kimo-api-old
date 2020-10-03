'use strict'

const Order = use('App/Models/Order');

class OrderController {

  async index({ request, response }) {
    const query = request.get();

    const orders = await Order.query().fetch();

    console.log(orders);
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

    console.log(order.customerId)

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
}

module.exports = OrderController
