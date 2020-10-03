'use strict'

const CustomerBag = use('App/Models/CustomerBag');

class CustomerBagController {

  async index({ request, response }) {
    const queries = request.get();

    const customerBags = CustomerBag.query();

    if (queries.customerId) {
      customerBags.where('customer_id', queries.customerId);
    }

    return await customerBags
      .with('product.images')
      .orderBy('id', 'desc')
      .fetch();
  }

  async store({ request, response }) {
    const { customerId, productId } = request.all();

    const customerBag = await CustomerBag.findOrCreate(
      { customer_id: customerId, product_id: productId },
      { customer_id: customerId, product_id: productId, quantity: 0 }
    );

    customerBag.merge({ quantity: customerBag.quantity + 1 });
    await customerBag.save();

    return customerBag;
  }

  async show({ params, request, response }) {
  }

  async update({ params, request, response }) {
  }

  async destroy({ params, request, response }) {
    const customerBag = await CustomerBag.find(params.id);

    if (customerBag.quantity <= 1) {
      return await customerBag.delete();
    }

    customerBag.merge({ quantity: customerBag.quantity - 1 });
    await customerBag.save();

    return;
  }
}

module.exports = CustomerBagController
